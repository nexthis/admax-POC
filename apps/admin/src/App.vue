<template>
  <VApp>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
      <Notifications
        position="top right"
        class="mt-3 mr-3"
      >
        <template #body="props">
          <VAlert
            :color="props.item.type"
            :icon="`$${props.item.type}`"
            :title="props.item.title"
            :text="props.item.text"
          />
        </template>
      </Notifications>

      <RouterView />
    </VLayout>
  </VApp>
</template>
