<script setup lang="ts">
import { supabase } from 'supabase'
import BuyNow from '@core/components/BuyNow.vue'

onMounted(async () => {
  try {
    console.log(await supabase.auth.getUser())
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <VApp>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
      <RouterView />
      <BuyNow />
    </VLayout>
  </VApp>
</template>
