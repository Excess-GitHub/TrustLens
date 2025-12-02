// FILE: src/views/LoadingView.vue

<template>
  <div class="loading-view">
    <TopBar />
    <div class="loading-content">
      <div class="loading-icon">
        <img :src="searchIcon" alt="Search" />
      </div>
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
    <!-- Cancel confirmation modal -->
    <div v-if="showCancelConfirm" class="modal-overlay" @click="cancelNo">
      <div class="modal-content" @click.stop>
        <h2>Would you like to cancel this AI check ?</h2>
        <div class="modal-actions">
          <button class="btn-yes" @click="cancelYes">Yes</button>
          <button class="btn-no" @click="cancelNo">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTrustLensStore } from '../store/useTrustLensStore.js';
import TopBar from '../components/TopBar.vue';

const router = useRouter();
const store = useTrustLensStore();

const media = store.currentMedia;
const progress = store.analysisProgress;
const isAnalyzing = store.isAnalyzing;

const searchIcon = new URL('../Resources/Search.png', import.meta.url).href;

if (!media.value) {
  router.push('/');
}

let progressInterval = null;
const showCancelConfirm = ref(false);

onMounted(() => {
  if (!isAnalyzing.value) {
    store.startAnalysis();
  }
  
  // Simulate progress
  progressInterval = setInterval(() => {
    const current = progress.value;
    if (current < 100 && isAnalyzing.value && !showCancelConfirm.value) {
      const increment = Math.random() * 5 + 2; // 2-7% per interval
      store.updateAnalysisProgress(Math.min(100, current + increment));
    } else if (current >= 100 && isAnalyzing.value && !showCancelConfirm.value) {
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
  showCancelConfirm.value = true;
};

const cancelYes = () => {
  store.cancelAnalysis();
  router.push('/');
};

const cancelNo = () => {
  showCancelConfirm.value = false;
};

// no link input on loading screen per spec
</script>

<style scoped>
.loading-view {
  min-height: 100vh;
  background: var(--bg);
  padding-bottom: 2rem;
}

.loading-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
}

.loading-text {
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2rem;
  text-shadow:
    -1px -1px 0 #000,
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000,
     0    0   4px rgba(0,0,0,0.6);
}

.progress-container {
  margin: 2rem 0;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background: var(--border);
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
  color: #ffffff;
}

.info-bubble {
  background: var(--surface-1);
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: var(--muted);
}

.cancel-btn {
  width: 100%;
  padding: 1rem;
  background: #B9272C;
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
  background: #9E2024;
}

.loading-icon {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.loading-icon img {
  width: 56px;
  height: 56px;
  object-fit: contain;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--surface-1);
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 360px;
  width: 92%;
  text-align: center;
}

.modal-content h2 {
  margin: 0 0 1rem 0;
  color: var(--text);
  font-size: 1.1rem;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.btn-yes, .btn-no {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
}

.btn-yes { background: #B9272C; color: #fff; }
.btn-yes:hover { background: #9E2024; }
.btn-no { background: #9E9E9E; color: #fff; }
.btn-no:hover { background: #8A8A8A; }
</style>

