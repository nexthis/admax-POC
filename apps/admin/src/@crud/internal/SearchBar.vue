<script setup lang="ts">

import type { VDataTableServer } from "vuetify/labs/components";

interface Props {
    headers: VDataTableServer["$props"]["headers"],
    modelValue: [string, string, string] | []
}
interface Emits {
    (e: 'update:modelValue', value: [string, string, string] | []): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const route = useRoute();

const arrayValueOperators = ['in']
const operators = [
    { title: "=", value: "eq" },
    { title: "!=", value: "neq" },
    { title: ">", value: "gt" },
    { title: "<", value: "lt" },
    { title: ">=", value: "gte" },
    { title: "<=", value: "lte" },
    { title: "like", value: "like" },
    { title: "in", value: "in" }
]

const target = ref<string>(props.modelValue[0] ?? props.headers ? props.headers[0]?.key ?? undefined : undefined)
const operator = ref<string>(props.modelValue[1] ?? operators[0].value)
const text = ref<string>(props.modelValue[2] ?? "")

function search() {
    if (!target.value || !operator.value || !text.value) {
        emits("update:modelValue", [])
        return
    }
    let value = text.value;

    if (arrayValueOperators.includes(operator.value)) {
        value = `(${text.value})`
    }
    emits("update:modelValue", [target.value, operator.value, value])
}

</script>

<template>
    <div class="d-flex justify-space-between align-center">
        <div class="w-100">
            <div class="d-flex max-w">
                <VSelect class="items" v-model="target" :items="headers" density="compact"></VSelect>
                <VSelect class="operator" v-model="operator" :items="operators" density="compact"></VSelect>
                <VTextField v-model="text" @keyup.enter="search" density="compact" />
                <VBtn icon="mdi-search" @click="search" class="ml-2" size="small"></VBtn>
            </div>
        </div>
        <div>
            <VBtn :to="`${route.name}create`">Create</VBtn>

        </div>

    </div>
</template>

<style scoped lang="scss">
.max-w {
    max-width: 450px;
}

.operator {
    max-width: 80px;
}

.items {
    max-width: 180px;
}
</style>