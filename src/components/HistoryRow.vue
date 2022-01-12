<template>
    <tr>
        <td>{{row.date}}</td>
        <td>{{row.username}}</td>
        <td :class="[isIncome? 'text-success' : 'text-danger']">{{Math.abs(row.amount)}}</td>
        <td class="row__action">
            <MDBBtn outline="dark" v-if="!isIncome">
                Resend
            </MDBBtn>
        </td>
    </tr>
</template>

<script lang="ts">
    import {defineComponent, PropType} from "vue";
    import {computed} from "@vue/reactivity";
    import {MDBBtn} from "mdb-vue-ui-kit";

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
            }
        },
        components: {
            MDBBtn,
        },
        setup(props) {
            return {
                isIncome: computed(() => parseFloat(props.row.amount) > 0)
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