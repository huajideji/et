export default {
    state:{
        article_list: [],
        
    },
    mutations:{
        SETARTICLELIST(state, item) {
            state.article_list[0] = item;
        }
    },
    // 简化数据
    getters:{
        
    },
    actions:{
       
    },
    namespaced: true,
}