<script setup lang="ts">
import slugify from 'slugify'

interface Props {
  modelValue?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Props['modelValue']): void
}>()

const isEdited = ref(false)

function onImput(event: InputEvent) {
  emit('update:modelValue', slugify(event?.target?.value ?? ''))
}
</script>

<template>
  <div
    v-if="!isEdited"
    @dblclick="isEdited = true"
    class="text-caption text-decoration-none text-primary font-weight-medium d-inline-flex align-center"
  >
    {{ slugify(modelValue ?? '') }}
  </div>
  <VTextField
    @keydown.enter="isEdited = false"
    :value="modelValue"
    @input="onImput"
    v-if="isEdited"
  />
</template>
