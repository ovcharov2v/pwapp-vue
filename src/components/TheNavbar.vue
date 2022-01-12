<template>
    <MDBNavbar expand="lg" light bg="light" class="header">
        <MDBContainer class="header__container">
            <MDBNavbarNav>
                <MDBNavbarItem to="/">
                    Profile
                </MDBNavbarItem>
                <MDBNavbarItem to="transactions">
                    Transactions
                </MDBNavbarItem>
                <MDBNavbarItem to="history">
                    History
                </MDBNavbarItem>
            </MDBNavbarNav>
            <p class="mb-0">{{$store.state.user.name}} - {{$store.state.user.balance}}PW</p>
            <MDBBtn outline="dark" @click="logout">Logout</MDBBtn>
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
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";

    export default defineComponent({
        components: {
            MDBContainer,
            MDBBtn,
            MDBNavbar,
            MDBNavbarNav,
            MDBNavbarItem,
        },
        setup() {
            const store = useStore();
            const router = useRouter();
            const logout = () => {
                store.commit('auth/logOut');
                router.push('/auth');
            }
            return {
                logout
            }
        }
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
