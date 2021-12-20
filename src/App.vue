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

<style lang="scss"></style>
