<template>
    <MDBCard>
        <MDBCardBody tag="form" class="needs-validation" novalidate @submit.prevent="onSubmit" ref="form">
            <MDBCardTitle class="mb-4">New transaction</MDBCardTitle>
            <MDBInput
                    label="Recepient name"
                    type="text"
                    class="mb-4"
                    v-model="name"
                    list="userlist"
                    @blur="nameBlur"
                    :invalidFeedback="nameError"
                    :isInvalid="isNameInvalid"
                    :isValidated="isNameInvalid"
            />
            <datalist id="userlist">
                <option v-for="user in $store.state.recipient.userList" :value="user.name" :key="user.id"></option>
            </datalist>
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
    import {computed, defineComponent, watch, ref} from "vue";
    import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBInput} from "mdb-vue-ui-kit";
    import {useField, useForm} from "vee-validate";
    import * as yup from "yup";
    import {useStore} from "vuex";
    import {emptyStrToNull} from "@/utils/helpers";

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
                yup.number()
                    .required('Amount is required')
                    .min(1, 'Min PW is 1')
                    .max(store.state.user.balance, `Max PW is ${store.state.user.balance}`)
                    .transform(emptyStrToNull)
                    .nullable()
            );
            const isAmountInvalid = computed(() => !!(amountError.value && amountError.value.length));

            const onSubmit = handleSubmit(async (values, { resetForm }) => {
                await store.dispatch('transaction/createTransaction', values);
                resetForm();
            })

            watch(name, async () => {
                if(name.value && name.value.length > 0) {
                    await store.dispatch('recipient/getUserList', name.value);
                }
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
