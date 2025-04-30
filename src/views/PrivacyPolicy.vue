<template>
  <div class="privacy-policy">
    <h1>Privacy Policy for The Good Cup</h1>
    <p>Effective Date: May 2, 2024</p>

    <p>Welcome to The Good Cup! This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (the "App"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the App.</p>

    <p>We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Effective Date" of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.</p>

    <h2>1. COLLECTION OF YOUR INFORMATION</h2>
    <p>We may collect information about you in a variety of ways. The information we may collect via the App depends on the content and materials you use, and includes:</p>
    <ul>
      <li><strong>Personal Data:</strong> Personally identifiable information, such as your email address, that you voluntarily give to us when you register with the App.</li>
      <li><strong>User Content:</strong> Information you provide when using the App, such as details about your coffee beans (name, origin, roast level, flavor notes, description, roasted date, uploaded images), brew devices (name, type, notes), grinders (name, type, notes), brew logs (parameters, ratings, notes), and user settings (default equipment).</li>
      <li><strong>Image Data:</strong> If you use the image analysis feature, images you upload will be temporarily processed to extract coffee bean information.</li>
      <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the App via our backend API (hosted on Vercel), such as your IP address, access times, and potentially device information, primarily for security and operational purposes.</li>
      <li><strong>Mobile Device Access:</strong> We may request access or permission to certain features from your mobile device, including your mobile device's camera and photo library, to provide specific App functionality (like adding bean photos). If you wish to change our access or permissions, you may do so in your device's settings.</li>
      <li><strong>Authentication Tokens:</strong> We store authentication tokens securely on your device to keep you logged in.</li>
    </ul>

    <h2>2. USE OF YOUR INFORMATION</h2>
    <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the App to:</p>
    <ul>
      <li>Create and manage your account.</li>
      <li>Enable core App functionality, such as saving, retrieving, and displaying your coffee beans, equipment, settings, and brew data.</li>
      <li>Process images you upload to extract relevant coffee bean details using third-party services (OpenAI).</li>
      <li>Generate brew suggestions based on your input and brew history using third-party services (OpenAI).</li>
      <li>Respond to user inquiries or support requests (if applicable).</li>
      <li>Monitor and analyze usage and trends to improve your experience with the App.</li>
      <li>Maintain the security and operation of our services.</li>
      <li>Comply with legal obligations.</li>
    </ul>

    <h2>3. DISCLOSURE OF YOUR INFORMATION</h2>
    <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
    <ul>
      <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
      <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, hosting services, database storage, image analysis, and AI-powered suggestions. These include:
        <ul>
          <li>Vercel: Our backend API hosting provider. <sup>1</sup></li>
          <li>OpenAI: For image analysis and brew suggestion features. Images and relevant brew/bean data are sent for processing. <sup>2</sup></li>
        </ul>
      </li>
      <li><strong>Other Third Parties:</strong> We will not share your personal information with any other third parties without your explicit consent, except as described in this policy. We do not sell your personal information.</li>
    </ul>

    <h2>4. SECURITY OF YOUR INFORMATION</h2>
    <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties.</p>

    <h2>5. DATA RETENTION</h2>
    <p>We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies. Generally, your data associated with your account will be retained as long as your account is active.</p>

    <h2>6. YOUR RIGHTS</h2>
    <p>Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
    <ul>
      <li><strong>Access:</strong> The right to request access to the personal information we hold about you.</li>
      <li><strong>Correction:</strong> The right to request correction of inaccurate or incomplete information.</li>
      <li><strong>Deletion:</strong> The right to request the deletion of your personal information and account, subject to certain exceptions.</li>
    </ul>
    <p>To exercise these rights, please contact us using the contact information provided below.</p>

    <h2>7. POLICY FOR CHILDREN</h2>
    <p>We do not knowingly solicit information from or market to children under the age of 13 (or other relevant age threshold). If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>

    <h2>8. CONTACT US</h2>
    <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
    <p>f.strauf@gmail.com</p>
  </div>
</template>

<script setup lang="ts">
// No script logic needed for a static page yet
</script>

<style scoped>
.privacy-policy {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
  line-height: 1.6;
}

.privacy-policy h1, .privacy-policy h2 {
    margin-bottom: 1rem;
    color: #333;
}

.privacy-policy h1 {
    text-align: center;
    margin-bottom: 2rem;
}

.privacy-policy p, .privacy-policy ul {
    margin-bottom: 1rem;
    color: #555;
}

.privacy-policy ul {
    padding-left: 2rem;
}
</style> 