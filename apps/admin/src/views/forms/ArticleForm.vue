<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { useNotification } from '@kyvg/vue3-notification'

import { supabase } from 'supabase'

const route = useRoute()
const router = useRouter()
const { notify } = useNotification()

const id = route.params.id as string | undefined
if (id) fetchData()

const isOpen = ref()

const form = ref({
  seo: {},
  content: {},
  title: '',
  public: false,
  slug: 's',
  image: '',
  tags: [],
})

async function fetchData() {
  const { data, error } = await await supabase.from('articles').select('*').eq('id', id).limit(1).single()
  form.value = { ...data }
}

async function save() {
  const user = await supabase.auth.getUser()
  if (id) {
    const { error } = await supabase
      .from('articles')
      .update([{ ...form.value, user: user.data.user?.id }])
      .eq('id', id)
    if (error) {
      notify({ type: 'error', text: error.message })

      return
    }
  } else {
    const { error } = await supabase.from('articles').insert([{ ...form.value, user: user.data.user?.id }])
    if (error) {
      notify({ type: 'error', text: error.message })

      return
    }
  }
  notify({ type: 'success', text: 'The operation completed' })
  router.back()
}
</script>

<template>
  <VRow class="h-100">
    <VCol
      cols="12"
      lg="8"
    >
      <VCard>
        <VCardTitle>
          <div class="d-flex align-center justify-space-between">
            <div>Article</div>
            <SlugInput v-model="form.slug" />
          </div>
        </VCardTitle>

        <VCardText>
          <ImageUpload
            v-model="form.image"
            :aspect-ratio="16 / 9"
          />
          <div class="d-flex flex-column flex-lg-row gap-5 mt-5">
            <VTextField
              v-model="form.title"
              label="Title"
            />
            {{ form.tags }}
            <TagsSelect v-model="form.tags" />
          </div>
          <AdvanceTextEditor
            v-model="form.content"
            class="mt-5"
          />

          <VBtn
            class="ml-auto mt-5 d-block"
            @click="save"
          >
            {{ id ? 'Update' : 'Save' }}
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>

    <VCol
      cols="12"
      lg="3"
    >
      <VCard>
        <VCardTitle>SEO</VCardTitle>
        <VCardText>
          <SeoEditor v-model="form.seo" />
        </VCardText>
      </VCard>

      <VCard class="mt-5">
        <VCardTitle>Setting</VCardTitle>
        <VCardText>
          <VSwitch
            v-model="form.public"
            label="Public"
          />
          <VSwitch label="Comments" />

          <div class="mt-5">Plan Public</div>
          <VueDatePicker
            @open="isOpen = true"
            @closed="isOpen = false"
          />
          <div :class="{ 'h-calendar': isOpen }" />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.h-calendar {
  height: 400px;
}

.tags {
  max-width: unset;

  @media (min-width: 1280px) {
    max-width: 300px;
  }
}
</style>
