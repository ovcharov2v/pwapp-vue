import {Commit, Dispatch} from 'vuex';
import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL;

interface IUser {
    id: string,
    name: string,
}

interface IState {
    userList: IUser[] | []
}

export default {
    namespaced: true,
    state() {
        return {
            userList: []
        }
    },
    getters: {
    },
    mutations: {
        setUserList(state: IState, payload: IUser[]) {
            state.userList = payload;
        }
    },
    actions: {
        async getUserList({commit, rootState}: { commit: Commit, rootState: any }, payload: any) {
            try {
                const res: any = await axios.post(
                    `${API_URL}/api/protected/users/list`,
                    {filter: payload},
                    {
                        headers: { Authorization: `Bearer ${rootState.auth.token}` }
                    }
                );
                commit('setUserList', res.data)
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
