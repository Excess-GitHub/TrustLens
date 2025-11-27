// FILE: src/views/HomeView.vue

<template>
  <div class="home-view">
    <TopBar showRightIcon rightIconText="?" @right-click="goToHelp" />
    
    <div class="home-content">
      <div class="logo-container">
        <div class="magnifying-glass">🔍</div>
      </div>
      
      <div class="link-input-section">
        <div class="input-wrapper">
          <input
            v-model="linkInput"
            type="text"
            placeholder="paste link…… /"
            class="link-input"
            @keyup.enter="handleLinkSubmit"
          />
          <button @click="handleLinkSubmit" class="link-submit-btn">→</button>
        </div>
      </div>
      
      <div class="action-buttons">
        <button @click="triggerFileInput('gallery')" class="action-btn gallery-btn">
          📷 Gallery
        </button>
        <button @click="triggerFileInput('files')" class="action-btn files-btn">
          📁 Files
        </button>
        <button @click="triggerFileInput('camera')" class="action-btn camera-btn">
          📸 Take Photo
        </button>
      </div>
      
      <input
        ref="fileInputRef"
        type="file"
        accept="image/*,video/*"
        style="display: none"
        @change="handleFileSelect"
      />
      
      <div class="journey-card" @click="goToJourney">
        <div class="journey-icon">📊</div>
        <div class="journey-text">Your AI Journey</div>
      </div>
    </div>
    
    <!-- Cancelled Check Modal -->
    <div v-if="store.lastCancelled.value" class="modal-overlay" @click="dismissModal">
      <div class="modal-content" @click.stop>
        <h2>Cancelled Check</h2>
        <button @click="dismissModal" class="modal-ok-btn">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTrustLensStore } from '../store/useTrustLensStore.js';
import TopBar from '../components/TopBar.vue';

const router = useRouter();
const store = useTrustLensStore();

const linkInput = ref('');
const fileInputRef = ref(null);
let currentSource = 'files';

const handleLinkSubmit = () => {
  const url = linkInput.value.trim();
  if (url) {
    store.setCurrentMediaFromLink(url);
    linkInput.value = '';
    router.push('/preview');
  }
};

const triggerFileInput = (source) => {
  currentSource = source;
  fileInputRef.value?.click();
};

const handleFileSelect = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    store.setCurrentMediaFromFile(file, currentSource);
    router.push('/preview');
  }
  // Reset input
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
};

const goToJourney = () => {
  router.push('/journey');
};

const goToHelp = () => {
  router.push('/help');
};

const dismissModal = () => {
  store.clearLastCancelled();
};
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 2rem;
}

.home-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.logo-container {
  text-align: center;
  margin: 3rem 0;
}

.magnifying-glass {
  font-size: 6rem;
  display: inline-block;
}

.link-input-section {
  margin: 2rem 0;
}

.input-wrapper {
  display: flex;
  gap: 0.5rem;
  background: white;
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.link-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 1rem;
  font-size: 1rem;
}

.link-submit-btn {
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 1.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
}

.link-submit-btn:hover {
  background: #1976D2;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
}

.action-btn {
  flex: 1;
  padding: 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-btn:active {
  transform: translateY(0);
}

.gallery-btn {
  background: #E3F2FD;
  color: #1976D2;
}

.files-btn {
  background: #FFF3E0;
  color: #F57C00;
}

.camera-btn {
  background: #F3E5F5;
  color: #7B1FA2;
}

.journey-card {
  margin-top: 3rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.journey-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.journey-icon {
  font-size: 2rem;
}

.journey-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

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
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 300px;
  width: 90%;
  text-align: center;
}

.modal-content h2 {
  margin: 0 0 1.5rem 0;
  color: #333;
}

.modal-ok-btn {
  width: 100%;
  padding: 0.75rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.modal-ok-btn:hover {
  background: #1976D2;
}
</style>

