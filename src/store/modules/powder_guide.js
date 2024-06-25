// powder_guide
export default {
    state: {
        powder_guide: [],

    },
    mutations: {
        SETPOWDERGUIDE(state, item) {
            state.powder_guide[0] = item
        }
    },
    // 简化数据
    getters: {

    },
    actions: {

    },
    namespaced: true,
}