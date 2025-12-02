// FILE: src/views/JourneyView.vue

<template>
  <div class="journey-view">
    <TopBar title="Your AI Journey" />
    
    <div class="journey-content">
      <div class="stats-section">
        <h2 class="stats-title">Total Content Uploaded: {{ stats.totalUploads }}</h2>
      </div>
      
      <div class="chart-card">
        <StatsPieChart :real-count="stats.realCount" :ai-count="stats.aiCount" />
      </div>
      
      <div class="flags-section">
        <h3 class="flags-title">Most Encountered AI Flags</h3>
        <div v-if="rankedFlags.length > 0" class="flags-list">
          <FlagListItem
            v-for="flagItem in rankedFlags"
            :key="flagItem.flag.id"
            :flag="flagItem.flag"
            :count="flagItem.count"
            @click="goToFlag(flagItem.flag.id)"
          />
        </div>
        <div v-else class="no-flags">
          <p>No AI flags detected yet. Keep checking content to see flags appear here!</p>
        </div>
      </div>

      <button class="floating-share" @click="handleShare">
        <span class="icon">📤</span>
        <span>Share</span>
      </button>
    </div>
    <BottomHomeBar />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTrustLensStore } from '../store/useTrustLensStore.js';
import { FLAG_DEFS } from '../data/fakeAnalysisDb.js';
import TopBar from '../components/TopBar.vue';
import BottomHomeBar from '../components/BottomHomeBar.vue';
import StatsPieChart from '../components/StatsPieChart.vue';
import FlagListItem from '../components/FlagListItem.vue';

const router = useRouter();
const store = useTrustLensStore();

const stats = computed(() => store.getStats());

const rankedFlags = computed(() => {
  const flags = [];
  for (const [flagId, count] of Object.entries(stats.value.flagCounts)) {
    const flag = FLAG_DEFS[flagId];
    if (flag) {
      flags.push({ flag, count });
    }
  }
  return flags.sort((a, b) => b.count - a.count);
});

const goToFlag = (flagId) => {
  router.push(`/flags/${flagId}`);
};

const handleShare = () => {
  if (window.print) {
    window.print();
  } else {
    alert('To share your journey, use your browser\'s print function and save as PDF.');
  }
};
</script>

<style scoped>
.journey-view {
  min-height: 100vh;
  background: var(--bg);
  padding-bottom: 5rem;
}

.journey-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.stats-section {
  margin-bottom: 2rem;
}

.stats-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--surface-1);
  text-align: center;
  margin: 0;
}

.chart-card {
  background: var(--surface-1);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.flags-section {
  margin-top: 3rem;
}

.flags-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--surface-1);
  margin-bottom: 1rem;
}

.flags-list {
  background: var(--surface-1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.no-flags {
  background: var(--surface-1);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  color: var(--muted);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.floating-share {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  border-radius: 9999px;
  height: 44px;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transition: transform 0.2s, background 0.2s;
  z-index: 150;
}

.floating-share:hover {
  transform: translateY(-1px);
  background: rgba(0,0,0,0.7);
}

.floating-share .icon {
  font-size: 1.1rem;
}

@media print {
  .journey-view {
    background: white;
  }
  
  .top-bar {
    display: none;
  }
}
</style>

