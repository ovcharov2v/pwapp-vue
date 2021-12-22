<template>
    <div class="auth">
        <transition name="login">
            <div class="auth__card-box" v-if="authType === 'login'">
                <TheLoginForm class="auth__card" @changeForm="changeForm" />
            </div>
        </transition>
        <transition name="register">
            <div class="auth__card-box" v-if="authType === 'register'">
                <TheRegisterForm class="auth__card" @changeForm="changeForm" />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";
    import TheLoginForm from "@/components/TheLoginForm.vue";
    import TheRegisterForm from "@/components/TheRegisterForm.vue";

    export default defineComponent({
        components: {
            TheLoginForm,
            TheRegisterForm
        },
        setup() {
            const authType = ref('login');

            function changeForm(type: string): void {
                authType.value = type;
            }

            return {
                authType,
                changeForm,
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
            margin: auto;
            transform-origin: 50% 50%;
        }
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
