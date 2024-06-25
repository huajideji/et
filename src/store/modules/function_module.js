import { log } from "console";

export default {
    state:{
        function_module: [],
        
    },
    mutations:{
        SETFUNCTIONMODULE(state, item) {
            state.function_module[0] = item;
            console.log(state,'state');
        }
    },
    // 简化数据
    getters:{
        
    },
    actions:{
       
    },
    namespaced: true,
}