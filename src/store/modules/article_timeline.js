export default {
    state:{
        article_timeline: [],
        
    },
    mutations:{
        SETARTICLETIMELINE(state, item) {
            state.article_timeline[0] = item;
        }
    },
    // 简化数据
    getters:{
        
    },
    actions:{
       
    },
    namespaced: true,
}