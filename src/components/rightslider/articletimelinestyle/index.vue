<template>
    <div class="articletimelinestyle">
        <!-- 标题 -->
        <h2>{{ datas.text }}</h2>
        <div class="desc">
           暂无描述
        </div>
        <div class="card header">
            <el-form :model="datas" :rules="rules" label-position="top" ref="header">
                <el-form-item label="模块名称" prop="name">
                    <el-input type="text" v-model="datas.name" autocomplete="off" maxlength="14"></el-input>
                </el-form-item>
                <el-radio v-model="datas.is_show" :label="2">创建人命名</el-radio>
                <el-radio v-model="datas.is_show" :label="1">编辑自由命名</el-radio>
                <el-radio v-model="datas.is_show" :label="0" style="margin-top:12px">不显示名称</el-radio>
            </el-form>
        </div>
        <div class="elements">
            <p>包含元素</p>
            <div class="card">
                <!-- <el-checkbox-group v-model="datas.elementList"> -->
                <el-checkbox label="城市" name="type" @change="changeCity($event)" :checked="Boolean(this.datas.is_city)">
                </el-checkbox>
                <el-checkbox label="图片" name="type" @change="changeImage($event)"
                    :checked="Boolean(this.datas.is_image)"></el-checkbox>
                <!-- </el-checkbox-group> -->
            </div>
        </div>
        <div class="others-moudle">
            <p>其他模块属性</p>
            <div class="card folding">
                <span style="margin-right:8px">
                    折叠/展开 >
                </span>
                <el-input placeholder="请选择折叠数" v-model="datas.fold" type="number" size="mini" min="0" max="9">
                </el-input>
                <span style="margin-left:8px">
                    行折叠
                </span>
                <span style="color:#999999; font-size:12px; margin-left:5px">
                    默认为0，不折叠
                </span>
            </div>
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
import { mapMutations } from 'vuex'
export default {
    name: 'articletimelinestyle',
    props: {
        datas: Object,
    },
    data() {
        return {
            // radio: '1',
            rules: {
                name: [
                    { required: true, message: '请输入模块名称', trigger: 'blur' },
                ],
            }, // 模块验证列表

        }
    },
    mounted() {

    },
    watch: {
        
    },
    methods: {
        ...mapMutations('article_timeline', ['SETARTICLETIMELINE']),
        changeCity(e) {
            if (e) {
                this.datas.is_city = 1
            } else {
                this.datas.is_city = 0
            }
        },
        changeImage(e) {
            if (e) {
                this.datas.is_image = 1
            } else {
                this.datas.is_image = 0
            }
        },
        /* 存储需要创建的专题模块数据 */
        saveData() {
            let value = true
            if (!this.datas.name.length) {
                value = false;
                this.$refs.header.validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                });
            }
            if (!value) {
                // this.$notify({
                //     message: '请完成必填项',
                //     type: 'warning',
                //     showClose: false,
                //     duration: 1000,
                // });
                this.$message.error("请完成必填项")
                return
            }
            // this.$notify({
            //     message: '保存成功',
            //     type: 'success',
            //     showClose: false,
            //     duration: 1000,
            // });
            this.$message.success("当前模块填写完整")
        },
    },
}
</script>
<style scoped lang="less">
.articletimelinestyle {

    >h2 {
        padding: 21px 16px 6px 0;
        font-size: 16px;
        font-weight: 700;
        color: #333333;
    }


    p {
        font-size: 14px;
        font-weight: 700;
        color: #333333;
        margin-bottom: 20px;
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
<style lang="less">
.articletimelinestyle {
    .folding {
        .el-input {
            width: 60px;
        }

        .foldingNum {
            margin-right: 10px;
            margin-left: 20px;
        }
    }
}
</style>