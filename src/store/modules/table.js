//table
export default {
    state:{
        table: [],  
    },
    mutations:{
        SETTABLE(state, item) {
            state.table[0] = item
        }
    },
    // 简化数据
    getters:{
        
    },
    actions:{
       
    },
    namespaced: true,
}