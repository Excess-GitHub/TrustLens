// FILE: src/views/LoadingView.vue

<template>
  <div class="loading-view">
    <div class="loading-content">
      <div class="loading-text">Loading...</div>
      
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="progress-text">{{ Math.round(progress) }}%</div>
      </div>
      
      <div class="info-bubble">
        This may take around 1 minute.
      </div>
      
      <button @click="handleCancel" class="cancel-btn">Cancel Check</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTrustLensStore } from '../store/useTrustLensStore.js';

const router = useRouter();
const store = useTrustLensStore();

const media = store.currentMedia;
const progress = store.analysisProgress;
const isAnalyzing = store.isAnalyzing;

if (!media.value) {
  router.push('/');
}

let progressInterval = null;

onMounted(() => {
  if (!isAnalyzing.value) {
    store.startAnalysis();
  }
  
  // Simulate progress
  progressInterval = setInterval(() => {
    const current = progress.value;
    if (current < 100 && isAnalyzing.value) {
      const increment = Math.random() * 5 + 2; // 2-7% per interval
      store.updateAnalysisProgress(Math.min(100, current + increment));
    } else if (current >= 100 && isAnalyzing.value) {
      store.completeAnalysis();
      router.push('/result');
    }
  }, 300); // Update every 300ms
});

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval);
  }
});

const handleCancel = () => {
  store.cancelAnalysis();
  router.push('/');
};
</script>

<style scoped>
.loading-view {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-content {
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.loading-text {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 2rem;
}

.progress-container {
  margin: 2rem 0;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2196F3, #1976D2);
  transition: width 0.3s ease;
  border-radius: 10px;
}

.progress-text {
  font-size: 0.9rem;
  color: #666;
}

.info-bubble {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #666;
}

.cancel-btn {
  width: 100%;
  padding: 1rem;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 2rem;
}

.cancel-btn:hover {
  background: #d32f2f;
}
</style>

