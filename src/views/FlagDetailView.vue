// FILE: src/views/FlagDetailView.vue

<template>
  <div class="flag-detail-view">
    <TopBar :title="flag?.name || 'Flag Detail'" showRightIcon rightIconText="📤" @right-click="handleShare" />
    
    <div class="flag-detail-content">
      <div class="flag-header">
        <div class="flag-icon-large">{{ flag?.icon }}</div>
        <h1 class="flag-title">{{ flag?.name }}</h1>
      </div>
      
      <div class="encountered-section">
        <p class="encountered-text">Times Encountered: {{ count }}</p>
      </div>
      
      <div v-if="matches.length > 0" class="thumbnails-grid">
        <div
          v-for="match in matches"
          :key="match.id"
          class="thumbnail-item"
          @click="viewResult(match)"
        >
          <div class="thumbnail-placeholder">
            <span class="thumbnail-icon">{{ match.media?.type === 'image' ? '🖼️' : match.media?.type === 'video' ? '🎥' : '🔗' }}</span>
          </div>
        </div>
      </div>
      
      <div class="explanation-section">
        <h2 class="section-title">How to spot this flag</h2>
        
        <div v-if="flag?.details && flag.details.length > 0" class="flag-details">
          <div v-for="(detail, index) in flag.details" :key="index" class="flag-detail-item">
            <div v-if="detail.cropImage" class="detail-image">
              <img :src="detail.cropImage" :alt="'Example ' + (index + 1)" />
              <div class="image-placeholder" v-if="!detail.cropImage.startsWith('http') && !detail.cropImage.startsWith('/')">
                Image: {{ detail.cropImage }}
              </div>
            </div>
            <div class="detail-text">{{ detail.text }}</div>
          </div>
        </div>
        <div v-else class="generic-flag-info">
          <p class="flag-description">{{ flag?.description }}</p>
          <ul v-if="flag?.howToDetect && flag.howToDetect.length > 0" class="detection-tips">
            <li v-for="(tip, index) in flag.howToDetect" :key="index">{{ tip }}</li>
          </ul>
        </div>
      </div>
    </div>
    
    <BottomHomeBar />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTrustLensStore } from '../store/useTrustLensStore.js';
import { FLAG_DEFS } from '../data/fakeAnalysisDb.js';
import TopBar from '../components/TopBar.vue';
import BottomHomeBar from '../components/BottomHomeBar.vue';

const route = useRoute();
const router = useRouter();
const store = useTrustLensStore();

const flagId = computed(() => route.params.flagId);
const flag = computed(() => FLAG_DEFS[flagId.value]);

const matches = computed(() => {
  return store.history.value.filter(result => result.flags.includes(flagId.value));
});

const count = computed(() => matches.value.length);

if (!flag.value) {
  router.push('/journey');
}

const viewResult = (result) => {
  // Set the result as the lastResult so explanation view can use it
  store.setLastResult(result);
  router.push('/explanation');
};

const handleShare = () => {
  if (window.print) {
    window.print();
  } else {
    alert('To share this flag detail, use your browser\'s print function and save as PDF.');
  }
};
</script>

<style scoped>
.flag-detail-view {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 5rem;
}

.flag-detail-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.flag-header {
  text-align: center;
  margin-bottom: 2rem;
}

.flag-icon-large {
  font-size: 4rem;
  margin-bottom: 0.5rem;
}

.flag-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.encountered-section {
  text-align: center;
  margin-bottom: 2rem;
}

.encountered-text {
  font-size: 1.2rem;
  color: #666;
  margin: 0;
}

.thumbnails-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.thumbnail-item {
  aspect-ratio: 1;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.thumbnail-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.thumbnail-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
}

.thumbnail-icon {
  font-size: 2rem;
}

.explanation-section {
  margin-top: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

.flag-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.flag-detail-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail-image {
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;
}

.detail-image img {
  width: 100%;
  height: auto;
  display: block;
}

.image-placeholder {
  padding: 3rem;
  text-align: center;
  color: #999;
  font-style: italic;
}

.detail-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

.generic-flag-info {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.flag-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 1.5rem;
}

.detection-tips {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detection-tips li {
  padding: 0.75rem 0;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
  color: #333;
}

.detection-tips li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #2196F3;
  font-size: 1.5rem;
  line-height: 1;
}

@media print {
  .flag-detail-view {
    background: white;
  }
  
  .top-bar, .bottom-home-bar {
    display: none;
  }
  
  .thumbnails-grid {
    display: none;
  }
}
</style>

