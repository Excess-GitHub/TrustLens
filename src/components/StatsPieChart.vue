// FILE: src/components/StatsPieChart.vue

<template>
  <div class="stats-pie-chart">
    <svg viewBox="0 0 200 200" class="chart-svg">
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="var(--border)"
        stroke-width="40"
      />
      <circle
        v-if="realPercentage > 0"
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#4CAF50"
        stroke-width="40"
        :stroke-dasharray="realCircumference"
        :stroke-dashoffset="0"
        transform="rotate(-90 100 100)"
        class="real-segment"
      />
      <circle
        v-if="aiPercentage > 0"
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#f44336"
        stroke-width="40"
        :stroke-dasharray="aiCircumference"
        :stroke-dashoffset="realDashOffset"
        transform="rotate(-90 100 100)"
        class="ai-segment"
      />
    </svg>
    <div class="chart-legend">
      <div class="legend-item">
        <div class="legend-color real-color"></div>
        <span>Real ({{ realCount }})</span>
      </div>
      <div class="legend-item">
        <div class="legend-color ai-color"></div>
        <span>AI ({{ aiCount }})</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  realCount: {
    type: Number,
    default: 0
  },
  aiCount: {
    type: Number,
    default: 0
  }
});

const total = computed(() => props.realCount + props.aiCount);
const realPercentage = computed(() => total.value > 0 ? (props.realCount / total.value) * 100 : 0);
const aiPercentage = computed(() => total.value > 0 ? (props.aiCount / total.value) * 100 : 0);

const circumference = 2 * Math.PI * 80; // radius = 80
const realCircumference = computed(() => {
  const length = (realPercentage.value / 100) * circumference;
  return `${length} ${circumference}`;
});
const aiCircumference = computed(() => {
  const length = (aiPercentage.value / 100) * circumference;
  return `${length} ${circumference}`;
});
const realDashOffset = computed(() => {
  return -((realPercentage.value / 100) * circumference);
});
</script>

<style scoped>
.stats-pie-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
}

.chart-svg {
  width: 200px;
  height: 200px;
}

.real-segment,
.ai-segment {
  transition: stroke-dasharray 0.3s ease;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.real-color {
  background: #4CAF50;
}

.ai-color {
  background: #f44336;
}
</style>

