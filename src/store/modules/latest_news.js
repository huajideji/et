export default {
    state:{
        latest_news: [],
        
    },
    mutations:{
        SETLATESTNEWS(state, item) {
            state.latest_news[0] = item;
        }
    },
    // 简化数据
    getters:{
        
    },
    actions:{
       
    },
    namespaced: true,
}