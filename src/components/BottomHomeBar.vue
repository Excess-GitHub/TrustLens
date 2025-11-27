// FILE: src/components/BottomHomeBar.vue

<template>
  <div class="bottom-home-bar">
    <button @click="goHome" class="home-btn">Home</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.bottom-home-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: #fff;
  border-top: 1px solid #e0e0e0;
  z-index: 100;
}

.home-btn {
  width: 100%;
  padding: 1rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.home-btn:hover {
  background: #1976D2;
}

.home-btn:active {
  background: #1565C0;
}
</style>

