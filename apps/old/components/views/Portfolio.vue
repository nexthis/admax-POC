<script setup lang="ts">
import { ref } from "vue";
// import { portfolio } from "@/data/CustomComponents";

const { data } = useTopArticles();

// const supabase = useSupabaseClient();

// onMounted(async () => {
//   const { data } = await supabase.storage
//     .from("public")
//     .getPublicUrl("avatars/6S1uNbY3vGOqlmMYM0av.png", {
//       transform: {
//         resize: "cover",
//         height: 150,
//         width: 500,
//       },
//     });

//   console.log(data.publicUrl);
// });
</script>
<template>
  <div>
    <div class="portfolio-component mini-spacer">
      <v-container>
        <!-- -----------------------------------------------
            Start Portfolio Text
        ----------------------------------------------- -->
        <v-row justify="center">
          <v-col cols="12" sm="10" md="9" lg="7">
            <div class="text-center">
              <h2 class="section-title font-weight-medium">
                Our Recent work with three column
              </h2>
              <p class="text-muted">
                You can relay on our amazing features list and also our customer
                services will be great experience for you without doubt and in
                no-time
              </p>
            </div>
          </v-col>
        </v-row>

        <!-- -----------------------------------------------
            End Portfolio Text
        ----------------------------------------------- -->
        <!-- -----------------------------------------------
            Start Portfolio
        ----------------------------------------------- -->
        <v-row class="mt-8">
          <v-col cols="12" md="4" sm="6" v-for="item in data" :key="item.title">
            <nuxt-link :to="`/article/${item.slug}`">
              <v-card class="portfolio-card overflow-hidden card-shadow">
                <div class="portfolio-img">
                  <nuxt-img
                    v-if="item.image"
                    sizes="sm:100vw md:50vw lg:400px"
                    quality="80"
                    :src="item.image"
                  />
                </div>
                <v-card-text class="pa-5">
                  <h5 class="font-weight-medium font-18">{{ item.title }}</h5>
                  <p class="font-14 mb-0 text-muted">{{ item.description }}</p>
                </v-card-text>
              </v-card>
            </nuxt-link>
          </v-col>
        </v-row>
        <!-- -----------------------------------------------
            End Portfolio
        ----------------------------------------------- -->
      </v-container>
    </div>
  </div>
</template>
