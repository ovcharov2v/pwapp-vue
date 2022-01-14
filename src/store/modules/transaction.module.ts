import {Commit, Dispatch} from 'vuex';
import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL;

interface INewTransaction {
    username: string,
    amount: string,
}

interface ITransaction {
    id: string,
    date: string,
    username: string,
    amount: string,
    balance: string,
}

interface IState {
    transactionList: ITransaction[] | []
}

export default {
    namespaced: true,
    state() {
        return {
            transactionList: []
        }
    },
    getters: {
    },
    mutations: {
        setTransactionList(state: IState, payload: ITransaction[]) {
            state.transactionList = payload;
        }
    },
    actions: {
        async createTransaction({commit, rootState}: { commit: Commit, rootState: any }, payload: any) {
            try {
                const res: any = await axios.post(
                    `${API_URL}/api/protected/transactions`,
                    {...payload},
                    {
                        headers: { Authorization: `Bearer ${rootState.auth.token}` }
                    }
                );
                commit('user/updateBalance', parseFloat(res.data.trans_token.balance), {root: true});
            }
            catch (error) {
                commit(
                    'message/setMessage',
                    {type: 'danger', text: error.response.data},
                    {root: true})
            }
        },
        async getTransactions({commit, rootState}: { commit: Commit, rootState: any }) {
            try {
                const res: any = await axios.get(
                    `${API_URL}/api/protected/transactions`,
                    {
                        headers: { Authorization: `Bearer ${rootState.auth.token}` }
                    }
                );
                commit('setTransactionList', res.data.trans_token)
            }
            catch (error) {
                commit(
                    'message/setMessage',
                    {type: 'danger', text: error.response.data},
                    {root: true})
            }
        }
    }
}
