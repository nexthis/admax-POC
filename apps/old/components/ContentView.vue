<script setup lang="ts">
interface Props {
  data: { blocks: Array<object> };
}

defineProps<Props>();
</script>

<template>
  <template v-for="item in data.blocks" :key="item.id">
    <p v-if="item.type === 'paragraph'" class="mt-3">{{ item.data.text }}</p>
    <!-- {{ item }} -->
  </template>
</template>
