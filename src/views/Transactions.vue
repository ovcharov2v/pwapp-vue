<template>
    <MDBCard>
        <MDBCardBody tag="form" class="needs-validation" novalidate @submit.prevent="onSubmit">
            <MDBCardTitle class="mb-4">New transaction</MDBCardTitle>
            <MDBInput
                    label="Recepient name"
                    type="text"
                    class="mb-4"
                    v-model="name"
                    @blur="nameBlur"
                    :invalidFeedback="nameError"
                    :isInvalid="isNameInvalid"
                    :isValidated="isNameInvalid"
            />
            <MDBInput
                    label="Amount"
                    type="number"
                    class="mb-4"
                    v-model="amount"
                    @blur="amountBlur"
                    :invalidFeedback="amountError"
                    :isInvalid="isAmountInvalid"
                    :isValidated="isAmountInvalid"
            />
            <MDBBtn outline="dark" type="submit" class="btn-block">Send PW</MDBBtn>
        </MDBCardBody>
    </MDBCard>
</template>

<script lang="ts">
    import {computed, defineComponent} from "vue";
    import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBInput} from "mdb-vue-ui-kit";
    import {useField, useForm} from "vee-validate";
    import * as yup from "yup";
    import {useStore} from "vuex";

    export default defineComponent({
        components: {
            MDBCard,
            MDBCardBody,
            MDBCardTitle,
            MDBBtn,
            MDBInput
        },
        setup() {
            const store = useStore();
            const {handleSubmit, isSubmitting} = useForm();
            
            const {value: name, errorMessage: nameError, handleBlur: nameBlur} = useField(
                'name',
                yup.string()
                    .trim()
                    .required('Name is required')
                    .min(3, 'Min name length is 3')
            );
            const isNameInvalid = computed(() => !!(nameError.value && nameError.value.length));

            const {value: amount, errorMessage: amountError, handleBlur: amountBlur} = useField(
                'amount',
                yup.string()
                    .trim()
                    .required('Amount is required')
            );
            const isAmountInvalid = computed(() => !!(amountError.value && amountError.value.length));

            const onSubmit = handleSubmit(async (values) => {
                await store.dispatch('transaction/createTransaction', values);
                amount.value = name.value = '';
            })


            return {
                name,
                nameError,
                nameBlur,
                isNameInvalid,
                amount,
                amountError,
                amountBlur,
                isAmountInvalid,
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
