<template>
  <component :is="`${layout}-layout`" />
</template>

<script lang="ts">
  import {defineComponent, computed, watch, onMounted} from 'vue';
  import {useRoute} from "vue-router";
  import {useStore} from "vuex";
  import {createToast} from "mosha-vue-toastify";
  import 'mosha-vue-toastify/dist/style.css';
  import AuthLayout from './layout/AuthLayout.vue';
  import DashboardLayout from './layout/DashboardLayout.vue';

  export default defineComponent({
    components: {
      AuthLayout,
      DashboardLayout,
    },
    setup() {
      const store = useStore();
      const route = useRoute();

      const showMessage = (message:any) => {
        createToast(message.text,{
          type: message.type,
          position: 'top-right',
          transition: 'bounce',
          timeout: 3000,
          showIcon: true,
          showCloseButton: true,
          hideProgressBar: true,
        })
      }

      watch(() => store.getters['message/message'], () => {
        const message = store.getters['message/message'];
        if(message) {
          showMessage(message);
        }
      });

      onMounted(() => {
        store.dispatch('auth/autoLogin');
      })

      return {
        layout: computed(() => route.meta.layout),
      }
    }
  });
</script>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 60px);
    padding-top: 64px;
    padding-bottom: 64px;
  }
  .invalid-feedback {
    top: 36px;
    margin-top: 0 !important;
  }
</style>
