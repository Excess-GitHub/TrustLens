// FILE: src/views/MediaPreviewView.vue

<template>
  <div class="media-preview-view">
    <TopBar title="Preview" />
    
    <div class="preview-content">
      <MediaPreviewCard v-if="mediaObj" :media="mediaObj" />
      
      <div class="action-buttons">
        <button @click="handleCheck" class="check-btn">Check This</button>
        <button @click="handleCancel" class="cancel-btn">Cancel</button>
      </div>
    </div>
    <BottomHomeBar :onBack="handleCancel" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTrustLensStore } from '../store/useTrustLensStore.js';
import TopBar from '../components/TopBar.vue';
import MediaPreviewCard from '../components/MediaPreviewCard.vue';
import BottomHomeBar from '../components/BottomHomeBar.vue';

const router = useRouter();
const store = useTrustLensStore();

const media = store.currentMedia;
const mediaObj = computed(() => media.value || null);

if (!mediaObj.value) {
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
  background: var(--bg);
  padding-bottom: 5rem;
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
  background: #B9272C;
  color: white;
}

.cancel-btn:hover {
  background: #9E2024;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(185, 39, 44, 0.3);
}

.check-btn:active, .cancel-btn:active {
  transform: translateY(0);
}
</style>


