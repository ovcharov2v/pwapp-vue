import {Commit} from "vuex";

interface IMessage {
    type: 'info' | 'danger',
    text: string,
}

interface IState {
    message: IMessage | null,
}

export default {
    namespaced: true,
    state() {
        return {
            message: null,
        }
    },
    getters: {
        message(state: IState) {
            return state.message;
        },
    },
    mutations: {
        setMessage(state: IState, message: IMessage) {
            state.message = message;
        },
        clearMessage(state: IState) {
            state.message = null;
        },
    },
    actions: {
        setMessage({commit }: { commit: Commit }, payload: any) {
            commit('setMessage', payload);
        }
    }
}
