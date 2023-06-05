<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification'
import { supabase } from 'supabase'
import { isEmptyOrSpaces } from '@/@core/utils'

interface Props {
  modelValue?: []
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Props['modelValue']): void
}>()

const { notify } = useNotification()
const select = ref([])
const search = ref()
const lastSearch = useRefHistory(search, { capacity: 2 })

const loading = ref(false)
const items = ref([])
const isEditing = ref(false)

feachData()
async function feachData() {
  const { data } = await supabase.from('tags').select('*').limit(10)
  items.value = data?.map(item => ({ key: item.id, title: item.text })) // ({ key: item.id, value: item.text })
}

async function onEdit() {
  isEditing.value = true

  const clear = () => {
    isEditing.value = false
    lastSearch.clear()
  }

  const values = lastSearch.history.value
  const value = values[1]?.snapshot ?? ''

  if (isEmptyOrSpaces(value)) {
    notify({ title: 'Invalid Value', type: 'error' })
    clear()

    return
  }

  const { data, error } = await supabase.from('tags').insert({ text: value }).select().single()

  if (error) {
    notify({ title: error.message, type: 'error' })
    clear()

    return
  }
  const result = { key: data.id, title: data.text }
  items.value.push(result)
  select.value.push(result)

  clear()
}

function update() {
  emit('update:modelValue', search.value)
}
</script>

<template>
  <VAutocomplete
    v-model="select"
    v-model:search="search"
    @update:model-value="update"
    :loading="loading"
    :items="items"
    :disabled="isEditing"
    class="mx-4"
    density="comfortable"
    hide-no-data
    hide-details
    multiple
    chips
    label="Tags"
    style="max-width: 300px"
  >
    <template #append>
      <VSlideXReverseTransition mode="out-in">
        <VIcon
          :key="`icon-${isEditing}`"
          :color="isEditing ? 'success' : 'info'"
          :icon="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
          @click="onEdit"
        />
      </VSlideXReverseTransition>
    </template>
  </VAutocomplete>
</template>
