<template>
    <MDBCard class="auth__card m-auto">
        <MDBCardBody>
            <MDBCardTitle class="mb-4">User profile</MDBCardTitle>
            <dl class="user-data">
                <dt class="user-data__col user-data__col--strong">User ID:</dt>
                <dd class="user-data__col">{{$store.state.user.id}}</dd>
                <dt class="user-data__col user-data__col--strong">Name:</dt>
                <dd class="user-data__col">{{$store.state.user.name}}</dd>
                <dt class="user-data__col user-data__col--strong">Email:</dt>
                <dd class="user-data__col">{{$store.state.user.email}}</dd>
            </dl>
        </MDBCardBody>
    </MDBCard>

</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import {
        MDBCard,
        MDBCardBody,
        MDBCardTitle,
    } from 'mdb-vue-ui-kit';

    export default defineComponent({
        components: {
            MDBCard,
            MDBCardBody,
            MDBCardTitle,
        }
    })
</script>

<style scoped lang="scss">
    .user-data {
        display: grid;
        grid-template-columns: auto auto;
        margin-bottom: 0;

        &__col {
            white-space: nowrap;

            &--strong {
                padding-right: 10px;
            }
        }
    }
</style>
