<script setup lang="ts">
import { useDate } from 'vuetify/labs/date';

const date = useDate()
const headers = [
    { title: "id", key: "id" },
    { title: "content", key: "content" },
    { title: "author", key: "author" },
    { title: "public", key: "public" },
    { title: "created_at", key: "created_at" },
    { title: "actions", key: "actions", sortable: false },
]
</script>

<template>
    <data-table table="article" :headers="headers" label="Article">
        <template #actions="{ item }">
            <ActionTableSlot table="article" :id="item.id" />
        </template>

        <template #created_at="{ item }">
            {{ date.format(item.created_at, "fullDateWithWeekday") }}
        </template>
    </data-table>
</template>
