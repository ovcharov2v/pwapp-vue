<template>
    <MDBNavbar expand="lg" light bg="light" class="header">
        <MDBContainer class="header__container">
            <MDBNavbarNav>
                <MDBNavbarItem to="/" active>
                    Profile
                </MDBNavbarItem>
                <MDBNavbarItem to="transactions">
                    Transactions
                </MDBNavbarItem>
                <MDBNavbarItem to="history">
                    History
                </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBBtn outline="dark">Logout</MDBBtn>
        </MDBContainer>
    </MDBNavbar>
</template>

<script lang="ts">
    import {
        MDBContainer,
        MDBBtn,
        MDBNavbar,
        MDBNavbarNav,
        MDBNavbarItem,
    } from 'mdb-vue-ui-kit';
    import {defineComponent} from "vue";

    export default defineComponent({
        components: {
            MDBContainer,
            MDBBtn,
            MDBNavbar,
            MDBNavbarNav,
            MDBNavbarItem,
        },
    });
</script>

<style lang="scss" scoped>
    .header {
        &__container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
