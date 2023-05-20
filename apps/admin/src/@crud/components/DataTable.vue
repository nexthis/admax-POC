<script setup lang="ts">
import { supabase } from "supabase";
import type { VDataTableServer } from "vuetify/labs/components";
import SearchBar from "../internal/SearchBar.vue";

interface Props {
    table: string,
    headers: VDataTableServer["$props"]["headers"]
}

const props = defineProps<Props>()

const isLoading = ref(true)

const sortBy = ref<VDataTableServer["$props"]["sortBy"]>();
const page = ref<number>();

const data = ref<Array<{ [x: string]: any; }> | null>(null)

onMounted(() => {
    fetchData();
})

function handleOptionsUpdate() {
    fetchData()
}

async function fetchData() {
    isLoading.value = true;
    const response = await query()
    data.value = response.data;
    isLoading.value = false;
}

async function query() {
    const qr = supabase.from(props.table).select("*")
    if (sortBy.value) {
        for (const item of sortBy.value) {
            qr.order(item.key, { ascending: item.order === "asc" })
        }
    }
    return await qr;
}

</script>

<template>
    <VCard>

        <VCardTitle>
            <SearchBar />
        </VCardTitle>


        <VDataTableServer v-if="data" :loading="isLoading" @update:options="handleOptionsUpdate" v-model:sort-by="sortBy"
            v-model:page="page" :items-length="data.length" :items="data" :headers="headers">


            <template v-slot:item="{ item }">
                <tr>
                    <template v-for="(value, name) in item.columns">
                        <td>
                            <slot :name="name" :item="item.columns">{{ value }}</slot>
                        </td>
                    </template>
                </tr>
            </template>



        </VDataTableServer>
    </VCard>
</template>