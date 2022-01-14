import {Commit, Dispatch} from 'vuex';
import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

interface IState {
    token: string | null
}

export default {
    namespaced: true,
    getters: {
        token(state: IState) {
            return state.token;
        },
        isAuthentificated(state: IState) {
            return !!state.token;
        }
    },
    mutations: {
        setToken(state: IState, token: string) {
            state.token = token;
            localStorage.setItem('jwt-token', token);
        },
        logOut(state: IState) {
            state.token = null;
            localStorage.removeItem('jwt-token');
        },
    },
    actions: {
        async autoLogin({commit, dispatch}: { commit: Commit, dispatch: Dispatch }, payload: any) {
            const token = localStorage.getItem('jwt-token');
            if(token) {
                commit('setToken', token);
                await dispatch('user/updateUserInfo', token, {root: true});
            }
        },
        async login({commit, dispatch}: { commit: Commit, dispatch: Dispatch }, payload: any) {
            try {
                const res: any = await axios.post(`${API_URL}/sessions/create`, payload);
                commit('setToken', res.data.id_token);
                await dispatch('user/updateUserInfo', res.data.id_token, {root: true});
            }
            catch (error) {
                commit(
                    'message/setMessage',
                    {type: 'danger', text: error.response.data},
                    {root: true})
            }
        },
        async register({commit, dispatch}: { commit: Commit, dispatch: Dispatch }, payload: any) {
            try {
                const res: any = await axios.post(`${API_URL}/users`, payload);
                commit('setToken', res.data.id_token);
                await dispatch('user/updateUserInfo', res.data.id_token,{root: true});
            }
            catch (error) {
                commit(
                    'message/setMessage',
                    {type: 'danger', text: error.response.data},
                    {root: true})
            }
        },
    }
}
