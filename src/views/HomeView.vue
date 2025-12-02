// FILE: src/views/HomeView.vue

<template>
  <div class="home-view">
    <TopBar />
    
    <div class="home-content">
      <div class="logo-container">
        <img :src="trustLensIcon" alt="TrustLens" class="brand-logo" />
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
          <button
            @click="handleLinkSubmit"
            class="link-submit-btn"
            :disabled="!linkInput.trim()"
            aria-label="Submit link"
          >
            →
          </button>
        </div>
      </div>
      
      <div class="icon-grid">
        <div class="icon-tile" @click="triggerFileInput('gallery')">
          <img :src="galleryIcon" alt="Gallery" />
          <div class="icon-label">Gallery</div>
        </div>
        <div class="icon-tile" @click="triggerFileInput('files')">
          <img :src="filesIcon" alt="Files" />
          <div class="icon-label">Files</div>
        </div>
        <div class="icon-tile" @click="triggerFileInput('camera')">
          <img :src="cameraIcon" alt="Take Photo" />
          <div class="icon-label">Take Photo</div>
        </div>
      </div>
      
      <input
        ref="fileInputRef"
        type="file"
        :accept="fileAccept"
        :capture="fileCapture"
        style="display: none"
        @change="handleFileSelect"
      />
      
      <div class="journey-card" @click="goToJourney">
        <div class="journey-icon">
          <img :src="detailsIcon" alt="Details" />
        </div>
        <div class="journey-text">Past Results</div>
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
const fileAccept = ref('image/*,video/*');
const fileCapture = ref(null);
let currentSource = 'files';

const galleryIcon = new URL('../Resources/gallery.png', import.meta.url).href;
const filesIcon = new URL('../Resources/files.png', import.meta.url).href;
const cameraIcon = new URL('../Resources/camera.png', import.meta.url).href;
const detailsIcon = new URL('../Resources/Details.png', import.meta.url).href;
const trustLensIcon = new URL('../Resources/TrustLens.png', import.meta.url).href;

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
  if (source === 'camera') {
    fileAccept.value = 'image/*';
    fileCapture.value = 'environment';
  } else {
    fileAccept.value = 'image/*,video/*';
    fileCapture.value = null; // remove capture to show picker/gallery
  }
  // Next tick not strictly necessary; set then click.
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
  // Reset attributes to defaults after use
  if (currentSource === 'camera') {
    fileAccept.value = 'image/*,video/*';
    fileCapture.value = null;
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
  background: var(--bg);
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

.brand-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  display: inline-block;
}

.link-input-section {
  margin: 2rem 0;
}

.input-wrapper {
  display: flex;
  gap: 0.5rem;
  background: var(--surface-1);
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
  transition: background 0.2s, opacity 0.2s;
}

.link-submit-btn:hover:enabled {
  background: #1976D2;
}

.link-submit-btn:disabled {
  background: #9E9E9E;
  cursor: not-allowed;
  opacity: 0.7;
}

.action-buttons {
  display: none;
}

/* New icon tile styles */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 2rem 0;
}

.icon-tile {
  background: var(--surface-1);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.icon-tile:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.icon-tile img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.icon-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
}

.journey-card {
  margin-top: 3rem;
  padding: 1.5rem;
  background: var(--surface-1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 48px;
  height: 48px;
}

.journey-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.journey-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
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
  background: var(--surface-1);
  padding: 2rem;
  border-radius: 12px;
  max-width: 300px;
  width: 90%;
  text-align: center;
}

.modal-content h2 {
  margin: 0 0 1.5rem 0;
  color: var(--text);
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

