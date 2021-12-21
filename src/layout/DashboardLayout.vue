<template>
    <the-navbar></the-navbar>
    <MDBContainer tag="main" class="content">
        <router-view/>
    </MDBContainer>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import {
        MDBContainer,
    } from 'mdb-vue-ui-kit';
    import TheNavbar from '../components/TheNavbar.vue'

    export default defineComponent({
        components: {
            MDBContainer,
            TheNavbar,
        }
    })
</script>

<style scoped></style>
