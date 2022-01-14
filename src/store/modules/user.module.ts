import {Commit, Dispatch} from 'vuex';
import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL;

interface IState {
    id: string | null,
    name: string | null,
    email: string | null,
    balance: number,
}

export default {
    namespaced: true,
    state() {
        return {
            id: null,
            name: null,
            email: null,
            balance: 0
        }
    },
    getters: {
    },
    mutations: {
        setUserInfo(state: IState, payload: IState) {
            state.id = payload.id;
            state.name = payload.name;
            state.email = payload.email;
            state.balance = payload.balance;
        },
        clearUserInfo(state: IState) {
            state.id = null;
            state.name = null;
            state.email = null;
            state.balance = 0;
        },
        updateBalance(state: IState, payload: number) {
            state.balance = payload;
        }
    },
    actions: {
        async updateUserInfo({commit}: { commit: Commit }, payload: any) {
            try {
                const res: any = await axios.get(
                    `${API_URL}/api/protected/user-info`,
                    {
                        headers: { Authorization: `Bearer ${payload}` }
                    }
                );
                commit('setUserInfo', res.data.user_info_token);
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
