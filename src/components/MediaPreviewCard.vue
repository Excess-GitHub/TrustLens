// FILE: src/components/MediaPreviewCard.vue

<template>
  <div class="media-preview-card">
    <div v-if="media.type === 'image'" class="image-preview">
      <img :src="media.url" :alt="media.title || 'Preview'" />
    </div>
    <div v-else-if="media.type === 'video'" class="video-preview">
      <video :src="media.url" controls></video>
      <div v-if="!media.url" class="video-placeholder">
        <span class="play-icon">▶</span>
        <p>Video Preview</p>
      </div>
    </div>
    <div v-else-if="media.type === 'link'" class="link-preview">
      <div class="link-icon">🔗</div>
      <div class="link-info">
        <div class="link-host">{{ getHost(media.url) }}</div>
        <div class="link-url">{{ truncateUrl(media.url) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  media: {
    type: Object,
    required: true
  }
});

const getHost = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return 'Link';
  }
};

const truncateUrl = (url) => {
  if (url.length > 50) {
    return url.substring(0, 47) + '...';
  }
  return url;
};
</script>

<style scoped>
.media-preview-card {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  background: #f5f5f5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.image-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.video-preview {
  width: 100%;
  position: relative;
  background: #000;
}

.video-preview video {
  width: 100%;
  height: auto;
  display: block;
}

.video-placeholder {
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background: #333;
}

.play-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.link-preview {
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
}

.link-icon {
  font-size: 2rem;
}

.link-info {
  flex: 1;
}

.link-host {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
}

.link-url {
  font-size: 0.9rem;
  color: #666;
  word-break: break-all;
}
</style>

