import { Store } from 'vuex'

declare module '@vue/runtime-core' {
    interface State {
        token: string | null
    }

    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
