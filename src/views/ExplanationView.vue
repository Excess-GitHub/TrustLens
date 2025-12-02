// FILE: src/views/ExplanationView.vue

<template>
  <div class="explanation-view">
    <TopBar title="Explanation" showRightIcon rightIconText="📤" @right-click="handleShare" />
    
    <div class="explanation-content">
      <div v-if="result && result.details && result.details.length > 0" class="details-list">
        <div v-for="(detail, index) in result.details" :key="index" class="detail-item">
          <div v-if="detail.cropImage" class="detail-image">
            <img :src="detail.cropImage" :alt="'Detail ' + (index + 1)" />
            <div class="image-placeholder" v-if="!detail.cropImage.startsWith('http') && !detail.cropImage.startsWith('/')">
              Image: {{ detail.cropImage }}
            </div>
          </div>
          <div class="detail-text">{{ detail.text }}</div>
        </div>
      </div>
      <div v-else class="generic-explanation">
        <p>{{ result?.shortExplanation || 'Analysis insights are shown below.' }}</p>
      </div>

      <div class="explanation-bubbles">
        <div class="bubble"><strong>Inconsistent Lighting: Multiple light sources illuminating objects with mismatched shadows and highlights.</strong></div>
        <div class="bubble"><strong>Anatomical Irregularities: Subtle distortions in fingers, joints, and limb proportions that deviate from natural human anatomy.</strong></div>
        <div class="bubble"><strong>Smearing: Unnatural blending and “smudging” in background surfaces, particularly around edges of complex objects.</strong></div>
        <div class="bubble"><strong>Asymmetric Details: Facial features slightly misaligned (e.g., uneven eye size, mismatched ear positioning).</strong></div>
        <div class="bubble"><strong>Unnatural Reflections: Reflections on glass/metal surfaces do not correspond to surrounding scene elements.</strong></div>
      </div>
    </div>
    
    <BottomHomeBar :onBack="goToResult" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTrustLensStore } from '../store/useTrustLensStore.js';
import TopBar from '../components/TopBar.vue';
import BottomHomeBar from '../components/BottomHomeBar.vue';

const router = useRouter();
const store = useTrustLensStore();

const result = store.lastResult;

if (!result.value) {
  router.push('/');
}

const handleShare = () => {
  if (window.print) {
    window.print();
  } else {
    alert('To share this explanation, use your browser\'s print function and save as PDF.');
  }
};

const goToResult = () => {
  router.push('/result');
};
</script>

<style scoped>
.explanation-view {
  min-height: 100vh;
  background: var(--bg);
  padding-bottom: 5rem;
}

.explanation-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.details-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.detail-item {
  background: var(--surface-1);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail-image {
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface-2);
}

.detail-image img {
  width: 100%;
  height: auto;
  display: block;
}

.image-placeholder {
  padding: 3rem;
  text-align: center;
  color: var(--muted-2);
  font-style: italic;
}

.detail-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
}

.generic-explanation {
  background: var(--surface-1);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.generic-explanation p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 1rem;
}

.generic-explanation p:last-child {
  margin-bottom: 0;
}

@media print {
  .explanation-view {
    background: white;
  }
  
  .top-bar, .bottom-home-bar {
    display: none;
  }
}

.explanation-bubbles {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.bubble {
  background: var(--surface-1);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.bubble strong {
  display: block;
  color: var(--text);
  font-weight: 700;
  line-height: 1.6;
}
</style>

