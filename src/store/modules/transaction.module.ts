import {Commit, Dispatch} from 'vuex';
import axios from "axios";
import parse from 'date-fns/parse';
import isBefore from 'date-fns/isBefore';

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
                commit(
                    'message/setMessage',
                    {type: 'info', text: `Successfully sent ${payload.amount} PW to ${payload.name}` },
                    {root: true})
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
                const transactionList = res.data.trans_token.sort(function(a: ITransaction, b: ITransaction){
                    const aDate = parse(a.date, 'dd.MM.yyyy, HH:mm:ss', new Date());
                    const bDate = parse(b.date, 'dd.MM.yyyy, HH:mm:ss', new Date());
                    return isBefore(aDate, bDate) ? 1: -1;
                });
                commit('setTransactionList', transactionList)
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
