import {createStore, createLogger} from 'vuex';
import auth from './modules/auth.module';
import user from './modules/user.module';
import transaction from './modules/transaction.module';
import message from './modules/message.module';

const plugins = [];
if (process.env.NODE_ENV === 'development') {
    plugins.push(createLogger());
}

export default createStore({
    plugins,
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        user,
        transaction,
        message,
    }
})
