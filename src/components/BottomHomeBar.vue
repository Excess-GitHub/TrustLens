// FILE: src/components/BottomHomeBar.vue

<template>
  <button @click="handleBack" class="bottom-back-btn" aria-label="Back">← Back</button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  onBack: Function
});

const router = useRouter();

const handleBack = () => {
  if (props.onBack) {
    props.onBack();
  } else {
    router.back();
  }
};
</script>

<style scoped>
.bottom-back-btn {
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  padding: 12px 16px;
  background: #2196F3;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  z-index: 200;
  max-width: calc(100vw - 32px);
}

.bottom-back-btn:hover { background: #1976D2; }
.bottom-back-btn:active { background: #1565C0; }
</style>

