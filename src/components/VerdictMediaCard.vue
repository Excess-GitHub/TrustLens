// FILE: src/components/VerdictMediaCard.vue

<template>
  <div class="verdict-card" :class="verdictClass">
    <div class="verdict-media">
      <MediaPreviewCard :media="media" />
    </div>
    <div class="verdict-label">
      {{ verdict }}
    </div>
    <button v-if="showShare" @click="handleShare" class="share-btn">
      📤
    </button>
  </div>
</template>

<script setup>
import MediaPreviewCard from './MediaPreviewCard.vue';

const props = defineProps({
  media: {
    type: Object,
    required: true
  },
  verdict: {
    type: String,
    required: true,
    validator: (v) => ['REAL', 'AI'].includes(v)
  },
  showShare: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['share']);

const verdictClass = props.verdict === 'REAL' ? 'verdict-real' : 'verdict-ai';

const handleShare = async () => {
  const message = `TrustLens Analysis: This content is ${props.verdict === 'REAL' ? 'REAL' : 'AI-GENERATED'}. Check it out on TrustLens!`;
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'TrustLens Verdict',
        text: message,
        url: window.location.href
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        alert(message);
      }
    }
  } else {
    alert(message);
  }
  
  emit('share');
};
</script>

<style scoped>
.verdict-card {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.verdict-real {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
}

.verdict-ai {
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
}

.verdict-media {
  padding: 0.5rem;
  background: white;
  margin: 0.5rem;
  border-radius: 8px;
}

.verdict-label {
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.share-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.share-btn:hover {
  transform: scale(1.1);
}

.share-btn:active {
  transform: scale(0.95);
}
</style>

