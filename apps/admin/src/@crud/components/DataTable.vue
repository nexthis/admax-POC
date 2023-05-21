<script setup lang="ts">
import { supabase } from "supabase";
import type { VDataTableServer } from "vuetify/labs/components";
import SearchBar from "../internal/SearchBar.vue";

interface Props {
    table: string,
    headers: VDataTableServer["$props"]["headers"],
    label?: string,
    select?: string,
}

const props = defineProps<Props>()

const itemsPerPageOptions = [
    { title: '20', value: 20 },
    { title: '30', value: 30 },
    { title: '40', value: 40 },
    { title: '50', value: 50 },
]

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const sortBy = ref<VDataTableServer["$props"]["sortBy"]>();
const page = ref<number>(1);
const pageSize = ref<number>(itemsPerPageOptions[0].value);
const length = ref<number>(3);
const search = ref<[string, string, string] | []>([]);
const data = ref<Array<{ [x: string]: any; }> | null>(null)
const sortBlocker = ref(true)

onBeforeMount(() => {
    loadDataUrl();
    fetchData();
})
function handleSearchUpdate() {
    setTimeout(() => {
        fetchData()
    });
}

function handleOptionsUpdate(val: any) {
    if (sortBlocker.value) {
        sortBlocker.value = false
        return;
    }

    fetchData()
}

async function fetchData() {
    updateUrl()
    isLoading.value = true;
    const response = await query()
    data.value = response.data;
    length.value = response.count ?? 0;
    isLoading.value = false;
}

async function query() {
    const { from, to } = getPagination();
    const select = "*" + (props.select ? "," + props.select : "")
    console.log(select);

    const qr = supabase.from(props.table).select(select, { count: 'exact' })

    if (sortBy.value) {
        for (const item of sortBy.value) {
            qr.order(item.key, { ascending: item.order === "asc" })
        }
    }
    if (search.value.length) {
        qr.filter(...search.value)
    }

    qr.range(from, to)
    return await qr;
}

function getPagination() {
    const current = page.value - 1;
    const size = pageSize.value - 1;

    const limit = size ? size + 1 : 3;
    const from = current ? current * limit : 0;
    const to = current ? from + size : size;

    return { from, to };
}


function updateUrl() {
    router.push({ path: route.path, query: { sortBy: JSON.stringify(sortBy.value), page: page.value, pageSize: pageSize.value, search: JSON.stringify(search.value) } })
}

function loadDataUrl() {
    if (route.query.sortBy) {
        sortBy.value = JSON.parse(route.query.sortBy)
    }
    if (route.query.page) {
        page.value = Number.parseInt(route.query.page)
    }
    if (route.query.pageSize) {
        pageSize.value = Number.parseInt(route.query.pageSize)
    }
    if (route.query.search && JSON.parse(route.query.search).length) {
        search.value = JSON.parse(route.query.search)
    }
}

</script>

<template>
    <VCard>
        <VCardTitle v-if="label">
            {{ label }}
        </VCardTitle>
        <VCardTitle>
            <SearchBar @update:model-value="handleSearchUpdate" v-model="search" :headers="headers" />
        </VCardTitle>


        <VDataTableServer v-if="data" :loading="isLoading" @update:options="handleOptionsUpdate" must-sort
            v-model:items-per-page="pageSize" :items-per-page-options="itemsPerPageOptions" v-model:sort-by="sortBy"
            v-model:page="page" :items-length="length" :items="data" :headers="headers">

            <template v-slot:item="{ item }">
                <tr>
                    <template v-for="( value, name ) in  item.columns ">
                        <td>
                            <slot :name="name" :item="item.columns">{{ value }}</slot>
                        </td>
                    </template>
                </tr>
            </template>

        </VDataTableServer>
    </VCard>
</template>