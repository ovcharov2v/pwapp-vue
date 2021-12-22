import {Commit} from 'vuex';
import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

interface State {
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
        token(state: State) {
            return state.token;
        },
        isAuthentificated(state: State) {
            return !!state.token;
        }
    },
    mutations: {
        setToken(state: State, token: string) {
            state.token = token;
            localStorage.setItem('jwt-token', token);
        },
        logOut(state: State) {
            state.token = null;
            localStorage.removeItem('jwt-token');
        },
    },
    actions: {
        async login({commit}: { commit: Commit }, payload: any) {
            const res: any = await axios.post(`${API_URL}/sessions/create`, payload);
            commit('setToken', res.id_token);
        },
    }
}
