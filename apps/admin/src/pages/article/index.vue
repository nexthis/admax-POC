<script setup lang="ts">
const headers = [
    { title: "id", key: "id" },
    { title: "content", key: "content" },
    { title: "author", key: "author" },
    { title: "public", key: "public" },
    { title: "created_at", key: "created_at" },
    { title: "actions", key: "actions" },
]
</script>

<template>
    <data-table table="article" :headers="headers">
        <template #actions="{ item }">
            <ActionTableSlot table="article" :id="item.id" />
        </template>
    </data-table>
</template>
