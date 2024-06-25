<template>
    <div class="importfansstyle">
        <!-- 标题 -->
        <h2>{{ datas.text }}</h2>
        <div class="suggest">
            无需设置属性；由于百度限制，导粉可能会出现无图片的情况。
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
    name: 'importfansstyle',
    props: {
        datas: Object,
    },
    data() {
        return {
          
        }
    },
    mounted() {
        // this.datas.elementList.includes('更新时间')
    },
    methods: {
        // 获取vuex中方法
        ...mapMutations('powder_guide', ['SETPOWDERGUIDE']),
        /* 存储需要创建的专题模块数据 */
        saveData() {
            this.SETPOWDERGUIDE(this.datas)
            this.$message({
                message: '保存当前页面编辑样式成功',
                type: 'success'
            });
        },
    }
}
</script>
<style scoped lang="less">
.importfansstyle {

    >h2 {
        padding: 21px 16px 6px 0;
        font-size: 16px;
        font-weight: 700;
        color: #333333;
    }

    .suggest {
        font-size: 12px;
        font-weight: 400;
        color: #999;
    }

    .card {
        background: #f8f8f8;
        border-radius: 5px;
        padding: 18px 10px;
        margin: 12px 0;

        .tips {
            font-size: 12px;
            color: #666666;
        }
    }

}
</style>