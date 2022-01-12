<template>
    <h1 class="mb-4">Transaction history</h1>
    <MDBTable>
        <thead>
        <tr>
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <!--<tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
        </tr>-->
        <template v-for="row in $store.state.transaction.transactionList" :key="row.id">
            <HistoryRow :row="row"></HistoryRow>
        </template>
        </tbody>
    </MDBTable>
</template>

<script lang="ts">
    import {defineComponent, onMounted} from "vue";
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
                store.dispatch('transaction/getTransactions');
            });
        }
    })
</script>
