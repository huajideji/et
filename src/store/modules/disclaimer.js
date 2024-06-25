export default {
    state:{
        disclaimer: [],
    },
    mutations:{
        setDesclaimer(state, item) {
            state.disclaimer[0] = item
        },
    },
    // 简化数据
    getters:{
        
    },
    actions:{
       
    },
    namespaced: true,
}