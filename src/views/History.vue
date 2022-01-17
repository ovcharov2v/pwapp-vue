<template>
    <h1 class="mb-4">Transaction history</h1>
    <MDBTable v-if="haveTransactions">
        <thead>
        <tr>
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Amount</th>
            <th scope="col" v-if="haveActionCol">Action</th>
        </tr>
        </thead>
        <tbody>
            <template v-for="row in $store.state.transaction.transactionList" :key="row.id">
                <HistoryRow :row="row" :haveActionCol="haveActionCol" @updateTransactionList="updateTransactionList"></HistoryRow>
            </template>
        </tbody>
    </MDBTable>
    <h4 v-else>You don't have any transactions yet</h4>
</template>

<script lang="ts">
    import {defineComponent, onMounted, computed} from "vue";
    import {MDBTable} from "mdb-vue-ui-kit";
    import {useStore} from "vuex";
    import HistoryRow from "@/components/HistoryRow.vue";

    export default defineComponent({
        components: {
            MDBTable,
            HistoryRow,
        },
        setup() {
            const store = useStore();

            onMounted(() => {
                updateTransactionList();
            });

            const updateTransactionList = () => {
                store.dispatch('transaction/getTransactions');
            }

            const haveTransactions = computed(() => {
                const transactionList = store.state.transaction.transactionList;
                const result = !!transactionList.length;
                return result;
            });

            const haveActionCol = computed(() => {
                const transactionList = store.state.transaction.transactionList;
                const result = transactionList.some((el: any) => el.amount < 0);
                return result;
            });

            return {
                haveTransactions,
                haveActionCol,
                updateTransactionList
            }
        }
    })
</script>
