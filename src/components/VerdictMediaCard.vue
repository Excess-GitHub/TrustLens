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
      <span class="share-icon">📤</span>
      <span class="share-text">Share</span>
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
  background: var(--surface-1);
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
  right: 1rem;
  bottom: 1rem;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  border-radius: 9999px;
  height: 40px;
  padding: 0 12px;
  font-size: 0.95rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, background 0.2s;
}

.share-btn:hover {
  transform: translateY(-1px);
  background: rgba(0, 0, 0, 0.7);
}

.share-btn:active {
  transform: translateY(0);
}
</style>

