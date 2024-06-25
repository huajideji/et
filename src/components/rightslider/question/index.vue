<template>
    <div class="questionstyle">
        <!-- 标题 -->
        <h2>{{ datas.text }}</h2>
        <div class="desc">
            根据分类自动调取小宝问问QA板块数据，也支持手动填写。
        </div>

        <div class="card header">
            <el-form :model="datas" :rules="rules" label-position="top" ref="header">
                <el-form-item label="模块名称" prop="name">
                    <el-input type="text" v-model="datas.name" autocomplete="off" maxlength="14" ></el-input>
                </el-form-item>
                <el-radio v-model="datas.is_show" :label="2">创建人命名</el-radio>
                <el-radio v-model="datas.is_show" :label="1">编辑自由命名</el-radio>
                <el-radio v-model="datas.is_show" :label="0" style="margin-top:12px">不显示名称</el-radio>
            </el-form>
        </div>
        <!-- <button id="save" @click="saveData">
            保存
        </button> -->
        <div style="height:100px;"></div>
        <div class="saveBtn flex">
            <span class="saveForm" @click="saveData">检查</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'questionstyle',
    props: {
        datas: Object,
    },
    data() {
        return {
           rules: {
                name: [
                    { required: true, message: '请输入模块名称', trigger: 'blur' },
                ],
            },
        }
    },
    mounted() {
        // this.datas.elementList.includes('更新时间')
    },
    methods: {
        // 获取vuex中方法
        saveData() {
            if (!this.datas.name) {
               this.$message.error('尚未完成编辑，无法保存')
				return
            }
           this.$message.success('当前模块填写完整')
        },
    }
}
</script>
<style scoped lang="less">
.questionstyle {
    >h2 {
        padding: 21px 16px 6px 0;
        font-size: 16px;
        font-weight: 700;
        color: #333333;
    }

    .desc {
        color: #999999;
        margin-top: 3px;
        margin-bottom: 20px;
        font-size: 14px;
    }

     .card {
        background: #f8f8f8;
        border-radius: 5px;
        padding: 18px 10px;
        margin: 12px 0;

        &.header {
            margin: 25px 0;
        }

        .detail {
            margin-right: 15px;
        }

        .tips {
            font-size: 12px;
            color: #666666;
            margin-left: -18px;
            margin-right: 20px;
        }
    }

}
</style>