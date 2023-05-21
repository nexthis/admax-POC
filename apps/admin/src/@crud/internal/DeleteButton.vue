<script setup lang="ts">
import { supabase } from "supabase";
interface Props {
    id: number,
    table: string,
}
const props = defineProps<Props>()


const dialog = ref(false);


async function handleDeleteItem() {
    await supabase.from(props.table).delete().eq('id', props.id)
    dialog.value = false
}

</script>


<template>
    <VDialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
            <VBtn size="small" v-bind="props" variant="outlined" class="mt-1 ml-0 ml-lg-2 mt-lg-0"
                icon="mdi-trash-can-outline" />
        </template>
        <VCard>
            <VCardTitle class="text-h5">
                Do you really wont delete this item?
            </VCardTitle>
            <VCardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </VCardText>
            <VCardActions>
                <v-spacer></v-spacer>
                <VBtn color="primary" @click="dialog = false">Close</VBtn>
                <VBtn color="error" @click="handleDeleteItem">Delete</VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>