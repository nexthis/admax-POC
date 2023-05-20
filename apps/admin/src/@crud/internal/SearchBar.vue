<script setup lang="ts">
const route = useRoute();

</script>

<template>
    <div class="d-flex justify-center align-center">
        <VBtn :to="`${route.name}create`">Create</VBtn>
    </div>

</template>