<template>
    <div class="auth">
        <transition name="login">
            <div class="auth__card-box" v-if="authType === 'login'">
                <MDBCard class="auth__card m-auto">
                    <MDBCardBody tag="form" class="needs-validation" novalidate @submit.prevent="checkForm">
                        <MDBCardTitle class="mb-4">Login</MDBCardTitle>
                        <MDBInput
                                label="Name"
                                v-model="nameInput"
                                invalidFeedback="Please provide a name"
                                required
                                class="mb-4"
                        />
                        <MDBInput
                                label="Email"
                                v-model="emailInput"
                                invalidFeedback="Please provide a email"
                                required
                                class="mb-4"
                        />
                        <MDBBtn outline="dark" type="submit">Login</MDBBtn>
                        <MDBBtn color="link" @click="authType='register'">Create account</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </transition>
        <transition name="register">
            <div class="auth__card-box" v-if="authType === 'register'">
                <MDBCard class="auth__card m-auto">
                    <MDBCardBody tag="form" class="needs-validation" novalidate @submit.prevent="checkForm">
                        <MDBCardTitle class="mb-4">Register</MDBCardTitle>
                        <MDBInput
                                label="Name"
                                v-model="nameInput"
                                invalidFeedback="Please provide a name"
                                required
                                class="mb-4"
                        />
                        <MDBInput
                                label="Email"
                                type="email"
                                v-model="emailInput"
                                invalidFeedback="Please provide a email"
                                required
                                class="mb-4"
                        />
                        <MDBInput
                                label="Password"
                                type="password"
                                v-model="passwordInput"
                                invalidFeedback="Please provide a password"
                                required
                                class="mb-4"
                        />
                        <MDBInput
                                label="Retype your password"
                                type="password"
                                v-model="repasswordInput"
                                invalidFeedback="Please provide a password"
                                required
                                class="mb-4"
                        />
                        <MDBBtn outline="dark" type="submit">Register</MDBBtn>
                        <MDBBtn color="link" @click="authType='login'">Login</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";
    import {
        MDBCard,
        MDBCardBody,
        MDBCardTitle,
        MDBBtn,
        MDBInput
    } from 'mdb-vue-ui-kit';

    export default defineComponent({
        components: {
            MDBCard,
            MDBCardBody,
            MDBCardTitle,
            MDBBtn,
            MDBInput
        },
        setup() {
            const authType = ref('login');
            const checkForm = (e: any) => {
                e.target.classList.add("was-validated");
            };
            const nameInput = ref("");
            const emailInput = ref("");
            const passwordInput = ref("");
            const repasswordInput = ref("");

            return {
                authType,
                nameInput,
                emailInput,
                passwordInput,
                repasswordInput,
                checkForm
            };
        }
    })
</script>

<style lang="scss">
    .auth {
        position: relative;
        width: 100%;
        overflow: hidden;

        &__card-box {
            display: flex;
            width: 100%;
            height: 100%;
        }

        &__card {
            width: 100%;
            max-width: 300px;
            transform-origin: 50% 50%;
        }
    }

    .invalid-feedback {
        top: 36px;
        margin: 0;
    }

    // Animations
    .login-enter-from,
    .login-leave-to {
        transform: translateX(-300%) scale(0);
        opacity: 0;
    }

    .login-enter-to,
    .login-leave-from {
        transform: translateX(0) scale(1);
        opacity: 1;
    }

    .register-enter-from,
    .register-leave-to {
        transform: translateX(300%) scale(0);
        opacity: 0;
    }

    .register-enter-to,
    .register-leave-from {
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }

    .login-enter-active,
    .login-leave-active,
    .register-enter-active,
    .register-leave-active {
        position: absolute;
        top: 0;
        left: 0;
        transition: transform 0.6s, opacity 0.8s;
    }
</style>
