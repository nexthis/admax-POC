<script setup lang="ts">
const route = useRoute();

const { data, isLoading } = useGetArticle(route.params.slug);
</script>

<template>
  <VContainer v-if="!isLoading">
    <v-row class="mt-10">
      <v-col>
        <h1 class="text-h2 mb-3">{{ data.title }}</h1>
        <NuxtImg class="img-fluid" :src="data.image" />
        <ContentView :data="data.content" />
      </v-col>

      <v-col cols="12" md="2">
        <VSheet> XDDD </VSheet>
      </v-col>
    </v-row>
  </VContainer>
</template>
