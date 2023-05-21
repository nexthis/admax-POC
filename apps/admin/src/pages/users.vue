<script setup lang="ts">
const headers = [
    { title: "id", key: "id" },
    { title: "created_at", key: "created_at" },
    { title: "actions", key: "actions", sortable: false, },
]
</script>

<template>
    <data-table table="user" :headers="headers" label="Users">
        <template #actions="{ item }">
            <ActionTableSlot table="article" :id="item.id" />
        </template>
    </data-table>
</template>
