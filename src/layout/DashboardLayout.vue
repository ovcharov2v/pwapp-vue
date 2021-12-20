<template>
    <the-navbar></the-navbar>
    <router-view/>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import TheNavbar from '../components/TheNavbar.vue'

    export default defineComponent({
        components: {
            TheNavbar,
        }
    })
</script>

<style scoped></style>
