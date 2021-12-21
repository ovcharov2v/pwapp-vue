<template>
    <MDBContainer tag="main" class="content">
        <router-view/>
    </MDBContainer>
</template>

<script lang="ts">
    import {
        MDBContainer,
    } from 'mdb-vue-ui-kit';
    import {defineComponent} from "vue";
    import TheNavbar from "@/components/TheNavbar.vue";

    export default defineComponent({
        components: {
            MDBContainer,
        }
    })
</script>
