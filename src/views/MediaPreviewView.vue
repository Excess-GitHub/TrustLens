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
import { ref, computed } from 'vue';
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

const showCancelConfirm = ref(false);

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


