import {Commit, Dispatch} from 'vuex';
import axios from "axios";
import {error} from '../../utils/error';

const API_KEY = process.env.VUE_APP_API_KEY;

interface IState {
    token: string | null,
    name: string | null,
    email: string | null,
    balance: number,
}

export default {
    namespaced: true,
    state() {
        return {
            token: null,
            name: null,
            email: null,
            balance: 0
        }
    },
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
            localStorage.setItem('token', token);
        },
        setUser(state: IState, payload: { name: string, email: string, balance: number }) {
            state.name = payload.name;
            state.email = payload.email;
            state.balance = payload.balance;
        },
        logOut(state: IState) {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    actions: {
        async login({commit, dispatch}: { commit: Commit, dispatch: Dispatch }, payload: any) {
            try {
                const res: any = await axios.post(
                    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
                    {...payload, returnSecureToken: true}
                );
                commit('setToken', res.data.idToken);
            } catch (e) {
                commit(
                    'message/setMessage',
                    {type: 'danger', text: error(e.response.data.error.message)},
                    {root: true})
                throw new Error();
            }
        },
        async register({state, commit, dispatch}: { state: IState, commit: Commit, dispatch: Dispatch }, payload: any) {
            try {
                const res: any = await axios.post(
                    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
                    {...payload, returnSecureToken: true}
                );
                commit('setToken', res.data.idToken);
                commit('setUser', {name: payload.name, email: payload.email, balance: 50});
                await axios.post(
                    `https://vuetest-c4710-default-rtdb.firebaseio.com/users.json?auth=${state.token}`,
                    {name: payload.name, email: payload.email, balance: 50},
                );
            } catch (e) {
                await dispatch(
                    'message/setMessage',
                    {type: 'danger', text: error(e.response.data.error.message)},
                    {root: true})
                throw new Error();
            }
        },
    }
}
