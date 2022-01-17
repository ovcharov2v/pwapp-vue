<template>
    <tr>
        <td>{{row.date}}</td>
        <td>{{row.username}}</td>
        <td :class="[isIncome? 'text-success' : 'text-danger']">{{Math.abs(row.amount)}}</td>
        <td class="row__action" v-if="haveActionCol">
            <MDBBtn outline="dark" v-if="!isIncome" @click="handleResend">
                Resend
            </MDBBtn>
        </td>
    </tr>
</template>

<script lang="ts">
    import {defineComponent, PropType} from "vue";
    import {computed} from "@vue/reactivity";
    import {MDBBtn} from "mdb-vue-ui-kit";
    import {useStore} from "vuex";

    interface IHistoryRow {
        id: string,
        date: string,
        username: string,
        amount: string,
    }

    export default defineComponent({
        name: "HistoryRow",
        props: {
            row: {
                type: Object as PropType<IHistoryRow>,
                required: true,
            },
            haveActionCol: {
                type: Boolean,
                required: true,
            }
        },
        emits: ['updateTransactionList'],
        components: {
            MDBBtn,
        },
        setup(props, context) {
            const store = useStore();
            const handleResend = async() => {
                const payload = {
                    name: props.row.username,
                    amount: Math.abs(parseFloat(props.row.amount)),
                }
                await store.dispatch('transaction/createTransaction', payload);
                context.emit('updateTransactionList');
            }
            return {
                isIncome: computed(() => parseFloat(props.row.amount) > 0),
                handleResend,
            }
        }
    })
</script>

<style scoped lang="scss">
    .row {
        &__action {
            width: 150px;
        }
    }
</style>