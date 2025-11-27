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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background: #f5f5f5;
}

#app {
  min-height: 100vh;
}

button {
  font-family: inherit;
}

input {
  font-family: inherit;
}
</style>

