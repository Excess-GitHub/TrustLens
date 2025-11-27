// FILE: src/views/MediaPreviewView.vue

<template>
  <div class="media-preview-view">
    <TopBar title="Preview" showBack @back="handleCancel" />
    
    <div class="preview-content">
      <MediaPreviewCard v-if="media" :media="media" />
      
      <div class="action-buttons">
        <button @click="handleCheck" class="check-btn">Check This</button>
        <button @click="handleCancel" class="cancel-btn">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTrustLensStore } from '../store/useTrustLensStore.js';
import TopBar from '../components/TopBar.vue';
import MediaPreviewCard from '../components/MediaPreviewCard.vue';

const router = useRouter();
const store = useTrustLensStore();

const media = store.currentMedia;

if (!media.value) {
  router.push('/');
}

const handleCheck = () => {
  store.startAnalysis();
  router.push('/loading');
};

const handleCancel = () => {
  store.cancelAnalysis();
  router.push('/');
};
</script>

<style scoped>
.media-preview-view {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 2rem;
}

.preview-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.check-btn, .cancel-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.check-btn {
  background: #4CAF50;
  color: white;
}

.check-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.cancel-btn {
  background: #f44336;
  color: white;
}

.cancel-btn:hover {
  background: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
}

.check-btn:active, .cancel-btn:active {
  transform: translateY(0);
}
</style>

