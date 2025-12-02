// FILE: src/components/TopBar.vue

<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <button @click="handleHelp" class="help-btn" aria-label="Help">Help</button>
      <span v-if="showTime" class="time">{{ currentTime }}</span>
      <button v-if="showBack" @click="handleBack" class="back-btn">← Back</button>
    </div>
    <div class="top-bar-center">
      <div class="brand">
        <div class="brand-name">TrustLens</div>
        <div v-if="title" class="subtitle">{{ title }}</div>
      </div>
    </div>
    <div class="top-bar-right">
      <button v-if="showRightIcon" @click="handleRightClick" class="icon-btn">
        {{ rightIconText || '?' }}
      </button>
      <button v-if="showHome" @click="handleHome" class="home-btn" aria-label="Home">
        <img :src="homeIcon" alt="Home" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  title: String,
  showBack: { type: Boolean, default: false },
  onBack: Function,
  showRightIcon: { type: Boolean, default: false },
  onRightIconClick: Function,
  rightIconText: { type: String, default: '?' },
  showTime: { type: Boolean, default: false },
  showHome: { type: Boolean, default: true }
});

const emit = defineEmits(['back', 'right-click']);

const currentTime = ref('');
const router = useRouter();
const homeIcon = new URL('../Resources/Home.png', import.meta.url).href;

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

const handleHome = () => {
  router.push('/');
};

const handleHelp = () => {
  router.push('/help');
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(90deg, #181818ff 0%, #3d3d3dff 100%);
  color: #fff;
  border-bottom: none;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
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

.brand-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}

.subtitle {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.time {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
}

.back-btn, .icon-btn, .help-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #fff;
}

.back-btn:hover, .icon-btn:hover, .help-btn:hover {
  opacity: 0.7;
}

.home-btn {
  background: transparent;
  border: none;
  padding: 0.25rem;
  margin-left: 0.5rem;
  cursor: pointer;
}

.home-btn img {
  width: 22px;
  height: 22px;
  display: block;
  filter: brightness(0) invert(1);
}
</style>
