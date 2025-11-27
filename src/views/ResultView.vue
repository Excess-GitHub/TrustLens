// FILE: src/views/ResultView.vue

<template>
  <div class="result-view">
    <div class="result-content">
      <VerdictMediaCard
        v-if="result && media"
        :media="media"
        :verdict="result.verdict"
        :show-share="true"
      />
      
      <div class="explanation-text">
        {{ result?.shortExplanation }}
      </div>
      
      <div class="action-buttons">
        <button @click="goHome" class="home-btn">Home</button>
        <button @click="goToExplanation" class="learn-btn">Learn More</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTrustLensStore } from '../store/useTrustLensStore.js';
import VerdictMediaCard from '../components/VerdictMediaCard.vue';

const router = useRouter();
const store = useTrustLensStore();

const result = store.lastResult;
const media = computed(() => {
  if (result.value?.media) {
    return result.value.media;
  }
  return store.getMediaById(result.value?.mediaId) || store.currentMedia.value;
});

if (!result.value) {
  router.push('/');
}

const goHome = () => {
  router.push('/');
};

const goToExplanation = () => {
  router.push('/explanation');
};
</script>

<style scoped>
.result-view {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem 1rem;
  padding-bottom: 4rem;
}

.result-content {
  max-width: 600px;
  margin: 0 auto;
}

.explanation-text {
  margin-top: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
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
  background: #FF9800;
  color: white;
}

.learn-btn:hover {
  background: #F57C00;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

.home-btn:active, .learn-btn:active {
  transform: translateY(0);
}
</style>

