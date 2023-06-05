<script setup lang="ts">
import { image } from '@/utils/image'

interface Props {
  modelValue?: object
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Props['modelValue']): void
}>()

function createSEO() {
  const data = form.value
  const result = {
    ...data,
  }

  emit('update:modelValue', result)
  dialog.value = false
}

function truncate(str: string, n: number) {
  return str && str.length > n ? `${str.slice(0, n - 1)}...` : str
}

const dialog = ref(false)

const form = ref({
  image: '',
  title: '',
  description: '',
})

console.log(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    initData()
  },
)

function initData() {
  if (props.modelValue) {
    form.value = { ...props.modelValue }

    console.log(form.value)
  }
}

initData()
</script>

<template>
  <VDialog
    v-model="dialog"
    width="100%"
    max-width="540"
    persistent
  >
    <template #activator="{ props }">
      <div
        v-ripple
        v-bind="props"
      >
        <VImg
          aspect-ratio="1.9/1"
          cover
          :src="image(form.image)"
          height="200"
        />
        <VSheet
          border
          class="px-3 py-2"
        >
          <div class="text-subtitle-1">
            {{ truncate(form.title, 60) }}
          </div>
          <div class="text-body-2 mt-1">
            {{ truncate(form.description, 200) }}
          </div>
        </VSheet>
      </div>
    </template>

    <VCard>
      <VCardTitle>Seo</VCardTitle>

      <VCardText>
        <VForm
          class="mt-5"
          @submit.prevent
        >
          <ImageUpload
            :aspect-ratio="1.91 / 1"
            v-model="form.image"
            max-height="150"
          />
          <VTextField
            v-model="form.title"
            class="mt-5"
            label="title"
          />
          <VTextarea
            v-model="form.description"
            class="mt-5"
            label="description"
          />
        </VForm>
      </VCardText>
      <VCardActions>
        <VBtn
          color="primary"
          @click="dialog = false"
        >
          Close Dialog
        </VBtn>
        <VSpacer />
        <VBtn
          color="primary"
          @click="createSEO"
        >
          Save
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
// .title {
//     // 60
// }

// .description {
//     // 200
// }
</style>
