<template>
    <div class="planktabstyle">
        <!-- 标题 -->
        <!-- <h2>{{ datas.text }}</h2> -->
        <div class="desc">
            分享模块，支持复制链接、生成长图、QQ空间、新浪微博分享。若不设置跳转按钮，默认显示跳转至H5主页
        </div>
        <div class="card header">
            <el-form :model="datas" :rules="rules" label-position="top">
                <el-form-item label="模块名称" prop="moduleName" maxlength="10">
                    <el-input type="text" v-model="datas.moduleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-radio v-model="radio" label="1">自由填写</el-radio>
                <el-radio v-model="radio" label="2" disabled>不显示</el-radio>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'planktabstyle',
    props: {
        datas: Object,
    },
    data() {
        return {
            radio: '1',
            rules: {
                moduleName: [
                    { required: true, message: '请输入模块名称', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
            }, // 模块验证列表

        }
    },
    mounted() {
        // this.datas.elementList.includes('更新时间')
    },
    watch: {
        // 控制标题显示与隐藏
        radio(newVal) {
            if (newVal == 1) {
                this.datas.titleHide = false;
            } else {
                this.datas.titleHide = true;
            }
        },
    },
    methods: {

    },
}
</script>
<style scoped lang="less">
.planktabstyle {

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

    }

}
</style>