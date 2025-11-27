// FILE: src/views/HelpView.vue

<template>
  <div class="help-view">
    <TopBar title="Help" showBack @back="goHome" />
    
    <div class="help-content">
      <div class="help-section">
        <h2>About TrustLens</h2>
        <p>
          TrustLens is a demonstration tool that helps users analyze media content to determine 
          whether it is real or AI-generated. This is a frontend-only demo application that 
          simulates AI analysis using deterministic logic.
        </p>
      </div>
      
      <div class="help-section">
        <h2>How to Use</h2>
        <ol>
          <li>Upload an image or video from your gallery, files, or camera</li>
          <li>Or paste a link to media content</li>
          <li>Click "Check This" to analyze the content</li>
          <li>View the verdict and learn more about the analysis</li>
          <li>Explore your AI journey to see statistics and common flags</li>
        </ol>
      </div>
      
      <div class="help-section">
        <h2>Understanding Results</h2>
        <ul>
          <li><strong>REAL:</strong> The content appears to be authentic with no significant AI artifacts</li>
          <li><strong>AI:</strong> The content shows indicators of AI generation</li>
          <li><strong>Flags:</strong> Specific AI artifacts detected (e.g., finger anomalies, eye inconsistencies)</li>
        </ul>
      </div>
      
      <div class="help-section">
        <h2>Note</h2>
        <p>
          This is a demonstration application. The analysis is simulated and does not perform 
          actual AI detection. Results are based on predefined patterns and deterministic logic 
          for demonstration purposes only.
        </p>
      </div>
      
      <BottomHomeBar />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import TopBar from '../components/TopBar.vue';
import BottomHomeBar from '../components/BottomHomeBar.vue';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.help-view {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 5rem;
}

.help-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.help-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.help-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 0;
}

.help-section p {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin: 0 0 1rem 0;
}

.help-section p:last-child {
  margin-bottom: 0;
}

.help-section ol,
.help-section ul {
  margin: 0;
  padding-left: 1.5rem;
  color: #666;
}

.help-section li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.help-section li:last-child {
  margin-bottom: 0;
}

.help-section strong {
  color: #333;
  font-weight: 600;
}
</style>

