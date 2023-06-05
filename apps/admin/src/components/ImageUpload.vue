<script setup lang="ts">
import { supabase } from 'supabase'
import { Crop, Local, Uppload, en } from 'uppload'
import { randomStr } from '@/utils/random'

interface Props {
  aspectRatio?: number
  modelValue?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Props['modelValue']): void
}>()

const imageId = randomStr()
const warperId = randomStr()
const maxHeight = ref(400)
const isLoaded = ref(false)

onMounted(() => {
  init()
})

function init() {
  const uploader = new Uppload({
    lang: en,
    bind: document.getElementById(imageId)!,
    call: document.getElementById(warperId)!,
    uploader: upload,
  })
  const plugins = [new Local()]

  if (props.aspectRatio) {
    // @ts-expect-error
    plugins.push(new Crop({ aspectRatio: props.aspectRatio }))
  }

  uploader.use(plugins)
  grapeImage()
}

watch(
  () => props.modelValue,
  () => {
    grapeImage()
  },
)

async function grapeImage() {
  if (!props.modelValue) return

  const { data, error } = await supabase.storage.from('public').createSignedUrl(props.modelValue, 60)
  document.getElementById(imageId)!.src = data?.signedUrl
}

async function upload(file: Blob, updateProgress?: ((progress: number) => void) | undefined): Promise<string> {
  const extension = file.name.split('.').pop()
  const imgName = `${randomStr(20)}.${extension}`

  const { data, error } = await supabase.storage.from('public').upload(`avatars/${imgName}`, file, {
    cacheControl: '3600',
    upsert: false,
  })

  emit('update:modelValue', data?.path)

  return ''
}
</script>

<template>
  <div
    :id="warperId"
    v-ripple
    class="warper"
  >
    <img
      v-bind="$attrs"
      :id="imageId"
      :style="{ aspectRatio, maxHeight: `${maxHeight}px` }"
      class="pic"
      @load="isLoaded = true"
    />
  </div>
</template>

<style lang="scss" scoped>
.warper {
  position: relative;
}

.pic {
  width: 100%;
  object-fit: contain;
  object-position: center;
  height: auto;
  background-color: gray;
}
</style>
