// FILE: src/views/JourneyView.vue

<template>
  <div class="journey-view">
    <TopBar title="Your AI Journey" showRightIcon rightIconText="📤" @right-click="handleShare" />
    
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
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTrustLensStore } from '../store/useTrustLensStore.js';
import { FLAG_DEFS } from '../data/fakeAnalysisDb.js';
import TopBar from '../components/TopBar.vue';
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
  background: #f5f5f5;
  padding-bottom: 2rem;
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
  color: #333;
  text-align: center;
  margin: 0;
}

.chart-card {
  background: white;
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
  color: #333;
  margin-bottom: 1rem;
}

.flags-list {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.no-flags {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  color: #666;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

