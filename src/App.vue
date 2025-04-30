<script setup lang="ts">
// Most script logic moved to MainView.vue
// App.vue now acts primarily as a layout shell
</script>

<template>
  <div id="app" class="flex flex-col items-center p-6 sm:p-10 min-h-screen bg-gray-50">
    <!-- Router view renders the component for the current route -->
    <router-view /> 

    <!-- Footer Area (always visible) -->
    <footer class="mt-auto pt-6 text-center text-xs text-gray-500 w-full">
        <!-- Credits -->
        <div class="mb-2">
          <p>Based on the <a href="http://waitbutwhy.com/2014/05/life-weeks.html" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Your Life in Weeks</a> post by Tim Urban, from <a href="http://waitbutwhy.com/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Wait But Why</a>.</p>
        </div>
         <!-- Privacy Policy Link -->
        <div>
           <!-- Use router-link for navigation -->
           <router-link to="/privacy" class="text-blue-600 hover:underline">Privacy Policy</router-link>
        </div>
    </footer>
  </div>
</template>

<style>
body {
  margin: 0;
}

/* Keep global styles or styles for the App shell here */
/* Styles specific to MainView should be in MainView.vue */
</style>
