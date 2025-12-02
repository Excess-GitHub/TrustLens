// FILE: src/App.vue

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// App root component
</script>

<style>
:root {
  /* Muted, neutral background (less blue than before) */
  --bg: #81D2C7;           /* app background */
  --surface-1: #03635D;    /* card/background surfaces */
  --surface-2: #03635D;    /* hover/active surfaces */
  --border: #334155;       /* subtle borders */
  --text: #e5e7eb;         /* primary text */
  --muted: #94a3b8;        /* secondary text */
  --muted-2: #64748b;      /* tertiary text */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text);
  background: var(--bg);
}

#app {
  min-height: 100vh;
}

button {
  font-family: inherit;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease;
}

input {
  font-family: inherit;
}

button:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

button:active {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}
</style>
