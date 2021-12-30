<template>
    <MDBCard class="auth__card m-auto">
        <MDBCardBody tag="form" class="needs-validation" novalidate @submit.prevent="onSubmit">
            <MDBCardTitle class="mb-4">Register</MDBCardTitle>
            <MDBInput
                    label="Name"
                    class="mb-4"
                    v-model="name"
                    @blur="nameBlur"
                    :invalidFeedback="nameError"
                    :isInvalid="isNameInvalid"
                    :isValidated="isNameInvalid"
            />
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
            <MDBInput
                    label="Retype your password"
                    type="password"
                    class="mb-4"
                    v-model="rePassword"
                    @blur="rePasswordBlur"
                    :invalidFeedback="rePasswordError"
                    :isInvalid="isRePasswordInvalid"
                    :isValidated="isRePasswordInvalid"
            />
            <MDBBtn outline="dark" type="submit">Register</MDBBtn>
            <MDBBtn color="link" @click="setForm">Login</MDBBtn>
        </MDBCardBody>
    </MDBCard>
</template>

<script lang="ts">
    import {computed, defineComponent, ref} from "vue";
    import {
        MDBCard,
        MDBCardBody,
        MDBCardTitle,
        MDBBtn,
        MDBInput
    } from 'mdb-vue-ui-kit';
    import {useField, useForm} from "vee-validate";
    import * as yup from "yup";
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

            const {value: name, errorMessage: nameError, handleBlur: nameBlur} = useField(
                'name',
                yup.string()
                    .trim()
                    .required('Name is required')
                    .min(3, 'Min name length is 3')
            );
            const isNameInvalid = computed(() => !!(nameError.value && nameError.value.length))

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

            const {value: rePassword, errorMessage: rePasswordError, handleBlur: rePasswordBlur} = useField(
                'rePassword',
                yup.string()
                    .trim()
                    .required('Retype your password')
                    .min(6, 'Min password length is 6')
                    .test({
                        message: 'Passwords must match',
                        test: function (value) {
                            return value === password.value
                        },
                    })
            );
            const isRePasswordInvalid = computed(() => !!(rePasswordError.value && rePasswordError.value.length))

            const onSubmit = handleSubmit(async (values) => {
                try {
                    await store.dispatch('auth/register', values);
                    router.push('/');
                }
                catch (e) {
                    //
                }
            })

            function setForm() {
                context.emit('changeForm', 'login');
            }

            return {
                name,
                nameError,
                nameBlur,
                isNameInvalid,
                email,
                emailError,
                emailBlur,
                isEmailInvalid,
                password,
                passwordError,
                passwordBlur,
                isPasswordInvalid,
                rePassword,
                rePasswordError,
                rePasswordBlur,
                isRePasswordInvalid,
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
