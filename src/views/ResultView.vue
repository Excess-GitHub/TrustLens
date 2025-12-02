// FILE: src/views/ResultView.vue

<template>
  <div class="result-view">
    <TopBar />
    <div class="result-content">
      <VerdictMediaCard
        v-if="result && media"
        :media="media"
        :verdict="result.verdict"
        :show-share="true"
      />
      
      <div class="verdict-icon" v-if="result">
        <img :src="result.verdict === 'REAL' ? passIcon : failIcon" :alt="result.verdict === 'REAL' ? 'Pass' : 'Fail'" />
      </div>

      <div class="explanation-text">
        {{ result?.shortExplanation }}
      </div>
      
      <div class="action-buttons">
        <button @click="goHome" class="home-btn">
          <img :src="restartIcon" alt="Restart" />
          <span>Start Over</span>
        </button>
        <button @click="goToExplanation" class="learn-btn" :disabled="isPass" :aria-disabled="isPass">
          <img :src="menuIcon" alt="Menu" />
          <span>Learn More</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTrustLensStore } from '../store/useTrustLensStore.js';
import VerdictMediaCard from '../components/VerdictMediaCard.vue';
import TopBar from '../components/TopBar.vue';

const router = useRouter();
const store = useTrustLensStore();

const result = store.lastResult;
const media = computed(() => {
  if (result.value?.media) {
    return result.value.media;
  }
  return store.getMediaById(result.value?.mediaId) || store.currentMedia.value;
});

const isPass = computed(() => result.value?.verdict === 'REAL');

const passIcon = new URL('../Resources/Pass.png', import.meta.url).href;
const failIcon = new URL('../Resources/Fail.png', import.meta.url).href;
const restartIcon = new URL('../Resources/Restart.png', import.meta.url).href;
const menuIcon = new URL('../Resources/Menu.png', import.meta.url).href;

if (!result.value) {
  router.push('/');
}

const goHome = () => {
  router.push('/');
};

const goToExplanation = () => {
  if (isPass.value) return; // disable navigation for pass results
  router.push('/explanation');
};
</script>

<style scoped>
.result-view {
  min-height: 100vh;
  background: var(--bg);
  padding-bottom: 4rem;
}

.result-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.verdict-icon {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.verdict-icon img {
  width: 56px;
  height: 56px;
  object-fit: contain;
}

.explanation-text {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--surface-1);
  border-radius: 12px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.home-btn, .learn-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.home-btn {
  background: #2196F3;
  color: white;
}

.home-btn:hover {
  background: #1976D2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

.learn-btn {
  background: #C8963E;
  color: white;
}

.learn-btn:hover:enabled {
  background: #A97E32;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(200, 150, 62, 0.3);
}

.learn-btn:disabled {
  background: #9E9E9E;
  cursor: not-allowed;
  opacity: 0.9;
  transform: none;
  box-shadow: none;
}

.home-btn:active, .learn-btn:active {
  transform: translateY(0);
}

.home-btn img, .learn-btn img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  /* Make blue icons appear white on colored buttons for contrast */
  filter: brightness(0) invert(1);
}
</style>

