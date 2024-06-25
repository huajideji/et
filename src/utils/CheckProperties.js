const checkProperties = (arr) => {
    for (let index of arr) {
        if (arr[index].module_type_id == 1) {
            //icon工具箱
            let value_list = arr[index].setStyle.value_list
            for (let ind of value_list) {
                if (value_list[ind].name == '' || value_list[ind].link_type == '' || value_list[ind].link_url == '' || value_list[ind].image == '') {
                    return false;
                }
            }
        } else if (arr[index].module_type_id == 2) {

        } else if (arr[index].module_type_id == 7) {
            //模块入口
            let value_list = arr[index].setStyle.value_list
            for (let ind of value_list) {
                if (value_list[ind].link_type == '' || value_list[ind].link_url == '' || value_list[ind].image == '') {
                    return false;
                }
            }

        } else if (arr[index].module_type_id == 8) {
            //网点模块
            if (arr[index].setStyle.name = '' || (arr[index].setStyle.is_search == 1 && arr[index].setStyle.no_tips == '')) {
                return false;
            }
            let value_list = arr[index].setStyle.value_list
            for (let ind of value_list) {
                if (value_list[ind].name) {
                    return false;
                }
            }
        } else if (arr[index].module_type_id == 9) {
            //最新消息
            if (arr[index].setStyle.name = '') {
                return false;
            }
        } else if (arr[index].module_type_id == 10) {
            //图文模块
            if (arr[index].setStyle.name = '') {
                return false;
            }
        } else if (arr[index].module_type_id == 11) {
            //文章列表
            if (arr[index].setStyle.name = '') {
                return false;
            }
        } else if (arr[index].module_type_id == 12) {
            //时间轴
            if (arr[index].setStyle.name = '') {
                return false;
            }
        } else if (arr[index].module_type_id == 14) {
            //政策要点
            if (arr[index].setStyle.name = '') {
                return false;
            }
        }
        else if (arr[index].module_type_id == 15) {
            //表格
            if (arr[index].setStyle.name = '' || (arr[index].setStyle.is_search == 1 && arr[index].setStyle.no_tips == '')) {
                return false;
            }
            let value_list = arr[index].setStyle.value_list
            for (let ind of value_list) {
                if (value_list[ind].name) {
                    return false;
                }
            }
        }
    }
}