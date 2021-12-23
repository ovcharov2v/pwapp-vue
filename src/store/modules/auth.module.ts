import {Commit, Dispatch} from 'vuex';
import axios from "axios";
import {error} from '../../utils/error';

const API_KEY = process.env.VUE_APP_API_KEY;

interface IState {
    token: string | null,
}

export default {
    namespaced: true,
    state() {
        return {
            token: null,
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
        logOut(state: IState) {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    actions: {
        async login({commit, dispatch }: { commit: Commit, dispatch:Dispatch  }, payload: any) {
            try {
                const res: any = await axios.post(
                    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
                    {...payload, returnSecureToken: true}
                );
                commit('setToken', res.data.idToken);
            }
            catch (e) {
                await dispatch(
                    'message/setMessage',
                    {type:'danger', text: error(e.response.data.error.message)},
                    { root: true })
                throw new Error();
            }
        },
    }
}
