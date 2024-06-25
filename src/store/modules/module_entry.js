// module_entry
export default {
    state:{
        module_entry: [],
        
    },
    mutations:{
        SETMODULEENTRY(state, item) {
            state.module_entry[0] = item
        }
    },
    // 简化数据
    getters:{
        
    },
    actions:{
       
    },
    namespaced: true,
}