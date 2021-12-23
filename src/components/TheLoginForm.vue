<template>
    <MDBCard>
        <MDBCardBody tag="form" class="needs-validation" novalidate @submit.prevent="onSubmit">
            <MDBCardTitle class="mb-4">Login</MDBCardTitle>
            <MDBInput
                    label="Email"
                    type="email"
                    class="mb-4"
                    v-model="email"
                    @blur="emailBlur"
                    :invalidFeedback="emailError"
                    :isInvalid="isEmailInvalid"
                    :isValidated="isEmailInvalid"
            />
            <MDBInput
                    label="Password"
                    type="password"
                    class="mb-4"
                    v-model="password"
                    @blur="passwordBlur"
                    :invalidFeedback="passwordError"
                    :isInvalid="isPasswordInvalid"
                    :isValidated="isPasswordInvalid"
            />
            <MDBBtn outline="dark" type="submit">Login</MDBBtn>
            <MDBBtn color="link" @click="setForm">Create account</MDBBtn>
        </MDBCardBody>
    </MDBCard>
</template>

<script lang="ts">
    import {defineComponent, computed} from "vue";
    import {
        MDBCard,
        MDBCardBody,
        MDBCardTitle,
        MDBBtn,
        MDBInput
    } from 'mdb-vue-ui-kit';
    import * as yup from 'yup';
    import {useField, useForm} from 'vee-validate';
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";

    export default defineComponent({
        props: [],
        emits: ['changeForm'],
        components: {
            MDBCard,
            MDBCardBody,
            MDBCardTitle,
            MDBBtn,
            MDBInput
        },
        setup(props, context) {
            const store = useStore();
            const router = useRouter();
            const {handleSubmit, isSubmitting} = useForm();

            const {value: email, errorMessage: emailError, handleBlur: emailBlur} = useField(
                'email',
                yup.string()
                    .trim()
                    .required('Email is required')
                    .email('Enter valid email')
            );
            const isEmailInvalid = computed(() => !!(emailError.value && emailError.value.length))

            const {value: password, errorMessage: passwordError, handleBlur: passwordBlur} = useField(
                'password',
                yup.string()
                    .trim()
                    .required('Password is required')
                    .min(6, 'Min password length is 6')
            );
            const isPasswordInvalid = computed(() => !!(passwordError.value && passwordError.value.length))

            const onSubmit = handleSubmit(async (values) => {
                try {
                    await store.dispatch('auth/login', values);
                    router.push('/');
                }
                catch (e) {
                    //
                }
            })

            function setForm() {
                context.emit('changeForm', 'register');
            }

            return {
                email,
                emailError,
                emailBlur,
                isEmailInvalid,
                password,
                passwordError,
                passwordBlur,
                isPasswordInvalid,
                setForm,
                onSubmit,
                isSubmitting,
            };
        }
    })
</script>

<style lang="scss">
    .invalid-feedback {
        top: 36px;
        margin: 0;
    }
</style>
