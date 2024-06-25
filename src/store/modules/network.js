import { log } from "console";

export default {
    state:{
        network: [],
        
    },
    mutations:{
        SETNETWORK(state, item) {
            state.network[0] = item;
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