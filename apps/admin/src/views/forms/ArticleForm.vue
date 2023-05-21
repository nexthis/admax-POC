<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';

const isOpen = ref()

const form = ref({
    tags: []
})

</script>

<template>
    <VRow class="h-100">
        <VCol cols="12" lg="8">
            <VCard>
                <VCardTitle>Article </VCardTitle>

                <VCardText>
                    <VImg src="https://picsum.photos/700/500" height="200" cover />
                    <div class="d-flex flex-column flex-lg-row gap-5 mt-5">
                        <VTextField label="Title" />
                        <v-combobox class="tags" v-model="form.tags" :items="['test']" label="Tags" multiple
                            chips></v-combobox>
                    </div>
                    <VTextarea class="mt-5" label="Title" />
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="12" lg="3">

            <VCard>
                <VCardTitle>SEO</VCardTitle>
                <VCardText>
                    XDDD
                </VCardText>
            </VCard>

            <VCard class="mt-5">
                <VCardTitle>Setting</VCardTitle>
                <VCardText>

                    <v-switch label="Public"></v-switch>
                    <v-switch label="Comments"></v-switch>


                    <div class="mt-5">Plan Public</div>
                    <VueDatePicker @open="isOpen = true" @closed="isOpen = false" />
                    <div :class="{ 'h-calendar': isOpen }" />
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>


<style lang="scss" scoped>
.h-calendar {
    height: 400px;
}

.tags {
    max-width: unset;

    @media (min-width: 1280px) {

        max-width: 300px;
    }
}
</style>