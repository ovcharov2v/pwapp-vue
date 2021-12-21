<template>
  <component :is="`${layout}-layout`" />
</template>

<script lang="ts">
  import {defineComponent, computed} from 'vue';
  import {useRoute} from "vue-router";
  import AuthLayout from './layout/AuthLayout.vue';
  import DashboardLayout from './layout/DashboardLayout.vue';

  export default defineComponent({
    components: {
      AuthLayout,
      DashboardLayout,
    },
    setup() {
      const route = useRoute();

      return {
        layout: computed(() => route.meta.layout)
      }
    }
  });
</script>

<style lang="scss">
  #app {
    font-family: Roboto, Helvetica, Arial, sans-serif;
  }
  .content {
    display: flex;
    align-items: stretch;
    min-height: calc(100vh - 60px);
    padding-top: 64px;
    padding-bottom: 64px;
  }
</style>
