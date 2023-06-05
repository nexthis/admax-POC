<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useDate } from 'vuetify/labs/date'

const { user } = useAuthStore()
const date = useDate()
const headers = [
  { title: 'id', key: 'id' },
  { title: 'title', key: 'title' },
  { title: 'author', key: 'user' },
  { title: 'public', key: 'public' },
  { title: 'created_at', key: 'created_at' },
  { title: 'actions', key: 'actions', sortable: false },
]
</script>

<template>
  <data-table
    table="articles"
    :headers="headers"
    select="user(*)"
    label="Article"
  >
    <template #actions="{ item }">
      <ActionTableSlot
        table="articles"
        :id="item.id"
      />
    </template>

    <template #created_at="{ item }">
      {{ date.format(item.created_at, 'fullDateWithWeekday') }}
    </template>

    <template #user="{ item }">
      {{ item.user.name }}
    </template>
  </data-table>
</template>
