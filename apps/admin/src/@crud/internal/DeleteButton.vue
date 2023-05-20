<script setup lang="ts">
interface Props {
    id: number,
    table: string,
}
defineProps<Props>()


const dialog = ref(false);


function handleDeleteItem() {

}

</script>


<template>
    <VDialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
            <VBtn size="small" v-bind="props" variant="outlined" class="ml-2" icon="mdi-trash-can-outline" />
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
                <VBtn color="error" @click="dialog = false">Delete</VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>