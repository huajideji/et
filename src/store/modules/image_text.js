export default {
    state:{
        image_text: [],
        
    },
    mutations:{
        SETIMAGETEXT(state, item) {
            state.image_text[0] = item;
        }
    },
    // 简化数据
    getters:{
        
    },
    actions:{
       
    },
    namespaced: true,
}