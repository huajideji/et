// policy_points
export default {
    state:{
        policy_points: [],
        
    },
    mutations:{
        SETPOLICYPOINTS(state, item) {
            state.policy_points[0] = item
        }
    },
    // 简化数据
    getters:{
        
    },
    actions:{
       
    },
    namespaced: true,
}