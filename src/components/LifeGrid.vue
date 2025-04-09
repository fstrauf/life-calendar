<template>
  <div class="relative pt-6">
    <!-- X-Axis Markers (Week) -->
    <div class="absolute top-0 left-8 right-0 flex text-xs text-gray-500"
         :style="{ width: `calc(100% - ${axisOffset}px)` }">
      <span v-for="week in weekMarkers" :key="`week-${week}`" class="absolute text-center"
            :style="{ left: `calc(${(week - 1) / weeksPerYear * 100}% + ${markerOffsetX}px)` }">
        {{ week }}
      </span>
    </div>

    <!-- Main Content Area (Labels + Grid) -->
    <div class="flex items-start">

      <!-- Y-Axis Labels (Age) -->
      <div class="flex flex-col mr-2 space-y-[0.126rem] pt-1">
        <div v-for="yearLabel in yearLabels" :key="`label-${yearLabel}`"
             class="h-3 flex justify-end text-xs text-gray-500 pr-1" style="font-size: 0.6rem; min-width: 1.5rem;">
          {{ yearLabel }}
        </div>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-52 gap-0.5 border border-gray-300 rounded bg-gray-200 p-1 flex-grow">
        <div
          v-for="weekIndex in totalWeeks"
          :key="weekIndex"
          class="w-3 h-3 border border-gray-300 rounded-sm"
          :class="getWeekClass(weekIndex)"
          :title="`Year ${Math.floor((weekIndex - 1) / weeksPerYear)}, Week ${((weekIndex - 1) % weeksPerYear) + 1}`"
        >
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// --- State Constants ---
const STATE_FUTURE = 'future';
const STATE_ELAPSED = 'elapsed';
const STATE_TIME_OFF = 'timeOff';
const STATE_RETIREMENT = 'retirement';
const STATE_RUNWAY = 'runway';

// --- Component Props ---
const props = defineProps<{
  dateOfBirth: Date | null;
  showRetirement: boolean;
  retirementAge: number;
  runwayYears: number | null;
  timeOffStartAge: number | null;
  timeOffDurationYears: number | null;
}>();

// --- Constants ---
const years = 90;
const weeksPerYear = 52;
const totalWeeks = years * weeksPerYear;

// --- Calculated Values for Labels ---
const yearLabels = computed(() => Array.from({ length: years }, (_, i) => i));

// Constants for styling and layout
const axisOffset = 24;
const markerOffsetX = 4;

// --- Base Calculations ---

const elapsedWeeks = computed(() => {
  if (!props.dateOfBirth) return 0;
  const now = new Date();
  const dob = new Date(props.dateOfBirth);
  const diffTime = now.getTime() - dob.getTime();
  if (diffTime < 0) return 0;
  const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
  return Math.min(diffWeeks, totalWeeks);
});

const timeOffStartWeek = computed(() => {
  if (props.timeOffStartAge === null || props.timeOffStartAge < 0) return -1;
  return props.timeOffStartAge * weeksPerYear + 1;
});

const timeOffDurationWeeks = computed(() => {
  if (props.timeOffDurationYears === null || props.timeOffDurationYears <= 0) return 0;
  return props.timeOffDurationYears * weeksPerYear;
});

const timeOffEndWeek = computed(() => {
  if (timeOffStartWeek.value === -1 || timeOffDurationWeeks.value === 0) return -1;
  const endWeek = timeOffStartWeek.value + timeOffDurationWeeks.value - 1;
  return Math.min(endWeek, totalWeeks);
});

const runwayDurationWeeks = computed(() => {
    if (props.runwayYears === null || props.runwayYears <= 0) return 0;
    return props.runwayYears * weeksPerYear;
});

// --- State Calculation for Each Week ---

const weekStates = computed(() => {
  const states: string[] = new Array(totalWeeks + 1).fill(STATE_FUTURE);

  // --- Preliminary Calculations for Retirement Adjustment ---
  const elapWeeks = elapsedWeeks.value;
  const toStartWeek = timeOffStartWeek.value;
  const toEndWeek = timeOffEndWeek.value;
  const toDurationWeeksVal = timeOffDurationWeeks.value;
  const runDurationWeeksVal = runwayDurationWeeks.value;

  // 1. Initial retirement boundary based purely on prop
  const initialRetireStartWeek = props.showRetirement && props.retirementAge > 0 && props.retirementAge <= years
                                 ? (props.retirementAge * weeksPerYear + 1)
                                 : (totalWeeks + 2); // Effectively disabled

  // 2. Calculate the weeks that *would* be runway if no time off existed
  const potentialRunwayWeeks = new Set<number>();
  let runwayWeeksCount = 0;
  if (runDurationWeeksVal > 0) {
      for (let i = elapWeeks + 1; i < initialRetireStartWeek; i++) {
          if (runwayWeeksCount >= runDurationWeeksVal) break;
          if (i <= totalWeeks) {
              potentialRunwayWeeks.add(i);
              runwayWeeksCount++;
          }
      }
  }

  // 3. Calculate overlap: how many Time Off weeks fall into the potential Runway period
  let overlapWeeks = 0;
  if (toStartWeek !== -1 && toDurationWeeksVal > 0) {
      for (let i = toStartWeek; i <= toEndWeek; i++) {
          // Ensure the week is actually within grid bounds and after elapsed time
          if (i > elapWeeks && i <= totalWeeks && potentialRunwayWeeks.has(i)) {
              overlapWeeks++;
          }
      }
  }

  // 4. Calculate shortfall and the effective retirement start week
  const shortfallWeeks = Math.max(0, toDurationWeeksVal - overlapWeeks);
  // Only delay if retirement is shown; cap at grid end
  const effectiveRetirementStartWeek = props.showRetirement
                                       ? Math.min(initialRetireStartWeek + shortfallWeeks, totalWeeks + 1)
                                       : (totalWeeks + 2);

  // --- Actual State Painting (Using Effective Retirement Boundary) ---

  // Order: Elapsed -> Retirement -> Runway -> TimeOff

  // 1. Mark Elapsed (Highest priority for past)
  for (let i = 1; i <= elapWeeks; i++) {
     if (i <= totalWeeks) states[i] = STATE_ELAPSED;
  }

  // 2. Mark Retirement (using *effective* start week)
  if (props.showRetirement) {
      for (let i = effectiveRetirementStartWeek; i <= totalWeeks; i++) {
        // Only overwrite future state
        if (states[i] === STATE_FUTURE) states[i] = STATE_RETIREMENT;
      }
  }

  // 3. Mark Runway (fills gap between elapsed and *effective* retirement, up to duration)
  let runwayWeeksPainted = 0;
  if (runDurationWeeksVal > 0) {
      // Iterate only up to the potentially delayed retirement start
      for (let i = elapWeeks + 1; i < effectiveRetirementStartWeek; i++) {
          if (runwayWeeksPainted >= runDurationWeeksVal) break;
          // Only paint if it's currently Future (respects effective retirement boundary)
          if (i <= totalWeeks && states[i] === STATE_FUTURE) {
              states[i] = STATE_RUNWAY;
              runwayWeeksPainted++;
          }
      }
  }

  // 4. Mark Time Off (Overwrite Future OR Runway in its specific period)
  if (toStartWeek !== -1) {
    for (let i = toStartWeek; i <= toEndWeek; i++) {
      // Allow time off to overwrite future/runway, but not retirement or elapsed
      if (i > 0 && i <= totalWeeks && states[i] !== STATE_ELAPSED && states[i] !== STATE_RETIREMENT) {
          states[i] = STATE_TIME_OFF;
      }
    }
  }

  return states;
});

// --- Styling Function ---

const getWeekClass = (weekIndex: number): string => {
  const state = weekStates.value[weekIndex] || STATE_FUTURE;
  switch (state) {
    case STATE_ELAPSED:
      return 'bg-blue-800';
    case STATE_TIME_OFF:
      return 'bg-green-400';
    case STATE_RUNWAY:
      return 'bg-blue-400';
    case STATE_RETIREMENT:
      return 'bg-green-400';
    case STATE_FUTURE:
    default:
      return 'bg-white';
  }
};

// --- Axis Markers --- (Only Week markers needed now)
const weekMarkers = computed(() => {
  return [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
});

</script>

<style scoped>
.grid {
  grid-template-columns: repeat(52, minmax(0, 1fr));
}

.grid > div {
  transition: background-color 0.1s ease-in-out;
}
</style> 