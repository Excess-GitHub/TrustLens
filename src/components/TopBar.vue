// FILE: src/components/TopBar.vue

<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <span v-if="showTime" class="time">{{ currentTime }}</span>
      <button v-if="showBack" @click="handleBack" class="back-btn">← Back</button>
    </div>
    <div class="top-bar-center">
      <h1 v-if="title" class="title">{{ title }}</h1>
    </div>
    <div class="top-bar-right">
      <button v-if="showRightIcon" @click="handleRightClick" class="icon-btn">
        {{ rightIconText || '?' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  title: String,
  showBack: { type: Boolean, default: false },
  onBack: Function,
  showRightIcon: { type: Boolean, default: false },
  onRightIconClick: Function,
  rightIconText: { type: String, default: '?' },
  showTime: { type: Boolean, default: false }
});

const emit = defineEmits(['back', 'right-click']);

const currentTime = ref('');

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

let timeInterval = null;

onMounted(() => {
  if (props.showTime) {
    updateTime();
    timeInterval = setInterval(updateTime, 1000);
  }
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});

const handleBack = () => {
  if (props.onBack) {
    props.onBack();
  } else {
    emit('back');
  }
};

const handleRightClick = () => {
  if (props.onRightIconClick) {
    props.onRightIconClick();
  } else {
    emit('right-click');
  }
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.top-bar-left {
  flex: 1;
  display: flex;
  align-items: center;
}

.top-bar-center {
  flex: 2;
  text-align: center;
}

.top-bar-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.time {
  font-size: 0.9rem;
  color: #666;
}

.back-btn, .icon-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #333;
}

.back-btn:hover, .icon-btn:hover {
  opacity: 0.7;
}
</style>

