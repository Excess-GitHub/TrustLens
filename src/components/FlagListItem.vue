// FILE: src/components/FlagListItem.vue

<template>
  <div class="flag-list-item" @click="handleClick">
    <div class="flag-icon">{{ flag.icon }}</div>
    <div class="flag-info">
      <div class="flag-name">{{ flag.name }}</div>
      <div v-if="count !== undefined" class="flag-count">{{ count }} {{ count === 1 ? 'time' : 'times' }}</div>
    </div>
    <div class="flag-arrow" :class="{ 'white-arrow': flag.id === 'smearing' }">→</div>
  </div>
</template>

<script setup>
const props = defineProps({
  flag: {
    type: Object,
    required: true
  },
  count: {
    type: Number,
    default: undefined
  }
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>

<style scoped>
.flag-list-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: var(--surface-1);
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: background 0.2s;
}

.flag-list-item:hover {
  background: var(--surface-2);
}

.flag-list-item:active {
  background: var(--surface-2);
}

.flag-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.flag-info {
  flex: 1;
}

.flag-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text);
  margin-bottom: 0.25rem;
}

.flag-count {
  font-size: 0.9rem;
  color: var(--muted);
}

.flag-arrow {
  font-size: 1.5rem;
  color: var(--muted-2);
  margin-left: 1rem;
}

.white-arrow {
  color: #ffffff;
}
</style>

