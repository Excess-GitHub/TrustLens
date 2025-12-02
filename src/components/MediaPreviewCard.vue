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
      <!-- Provider-specific preview area -->
      <div class="provider-preview">
        <!-- YouTube thumbnail preview -->
        <template v-if="provider.type === 'youtube' && provider.thumbnail">
          <div class="thumb-wrapper">
            <img class="thumb" :src="provider.thumbnail" alt="Link preview" />
            <div class="thumb-badge">YouTube</div>
          </div>
        </template>

        <!-- Fallback emoji when no valid Twitter card or no YouTube thumbnail -->
        <template v-else-if="provider.type === 'twitter' || (provider.type === 'youtube' && !provider.thumbnail)">
          <div class="emoji-placeholder">🔗</div>
        </template>

        <!-- Generic link card with favicon only (details in footer) -->
        <template v-else>
          <div class="generic-link">
            <img v-if="provider.favicon" class="favicon" :src="provider.favicon" alt="favicon" />
          </div>
        </template>
      </div>

      <!-- Unified link footer (always shown under preview) -->
      <div class="link-footer">
        <div class="link-host">{{ provider.host }}</div>
        <div class="link-url">{{ truncateUrl(media.url) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

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

const getYouTubeId = (url) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return v;
      const path = u.pathname.split('/');
      const idx = path.indexOf('shorts');
      if (idx !== -1 && path[idx + 1]) return path[idx + 1];
    }
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace('/', '').trim();
      if (id) return id;
    }
  } catch {}
  return null;
};

const getFavicon = (url) => {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.hostname}/favicon.ico`;
  } catch {
    return null;
  }
};

const provider = computed(() => {
  const url = props.media?.url || '';
  const host = getHost(url);
  const lowerHost = host.toLowerCase();
  // YouTube
  const ytId = getYouTubeId(url);
  if (ytId) {
    return {
      type: 'youtube',
      host,
      thumbnail: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
    };
  }
  // Twitter/X
  if (lowerHost.includes('twitter.com') || lowerHost.includes('x.com')) {
    return {
      type: 'twitter',
      host,
      brand: lowerHost.includes('x.com') ? 'X' : 'Twitter',
      favicon: getFavicon(url)
    };
  }
  // Generic
  return {
    type: 'generic',
    host,
    favicon: getFavicon(url)
  };
});
</script>

<style scoped>
.media-preview-card {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface-1);
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
  color: var(--text);
  background: var(--surface-2);
}

.play-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.link-preview {
  padding: 0;
  background: var(--surface-1);
}

.provider-preview { width: 100%; }

.generic-link {
  padding: 1rem 1.25rem 0.5rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.favicon {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.link-info { flex: 1; }
.link-host { font-weight: 600; color: var(--text); margin-bottom: 0.25rem; }
.link-url { font-size: 0.9rem; color: var(--muted); word-break: break-all; }

.thumb-wrapper { position: relative; width: 100%; background: #000; }
.thumb { display: block; width: 100%; height: auto; }
.thumb-badge {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
}

.twitter-card { padding: 1rem 1.25rem; }
.twitter-header { display: flex; align-items: center; gap: 0.5rem; }
.twitter-logo { font-weight: 900; color: #fff; background: #000; border-radius: 6px; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-size: 14px; }
.twitter-host { color: var(--muted); font-size: 0.9rem; }
.twitter-body { margin-top: 0.5rem; }
.twitter-body a { color: #1DA1F2; text-decoration: none; font-weight: 600; }
.twitter-body a:hover { text-decoration: underline; }

.emoji-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 0;
  font-size: 2.25rem;
}

.link-footer {
  padding: 0.75rem 1.25rem 1rem 1.25rem;
  border-top: 1px solid var(--border);
}

.link-footer .link-host { font-weight: 600; color: var(--text); margin-bottom: 0.25rem; }
.link-footer .link-url { font-size: 0.9rem; color: var(--muted); word-break: break-all; }
</style>

