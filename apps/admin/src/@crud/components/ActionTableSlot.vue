<script setup lang="ts">
import DeleteButton from '../internal/DeleteButton.vue';
interface Props {
    show?: string,
    id: number,
    table: string,
}
withDefaults(defineProps<Props>(), {
    show: ""
})

const route = useRoute();


</script>


<template>
    <div>
        <VBtn size="small" variant="outlined" :to="`${route.name}2`" icon="mdi-archive-edit-outline" />

        <DeleteButton :table="table" :id="id" />

        <VBtn v-if="show" :href="show" target="_blank" size="small" variant="outlined" class="ml-0 mt-1 ml-lg-2 mt-lg-0"
            icon="mdi-eye-outline" />
        <slot />
    </div>
</template>