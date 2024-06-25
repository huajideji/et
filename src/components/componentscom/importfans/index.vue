<template>
    <div class="importfans" :class="{ 'hide': datas.is_hide}">
        <div class="daofen-box">
            <span class="text">
                {{ importfans.text }}
            </span>
            <div class="image">
                <img :src="importfans.imgUrl" alt="" />
            </div>
        </div>
        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'importfans',
    props: {
        datas: Object,
        hide: Boolean,
    },
    data() {
        return {
            importfans: {
                text: '温馨提示：微信搜索并关注公众号【成都本地宝】，回复【进出成都】即可获取查看成都各区进出隔离核酸要求，高中低风险区出城规定、查看四川重点地区管控名单划分。',
                imgUrl: 'http://imgbdb4.bendibao.com/cdbdb/edu/20227/18/2022718165628_11839.jpg'
            }

        }
    },
    mounted() {
        // this.datas.elementList.includes('更新时间')
    },
    methods: {

    }
}
</script>
<style scoped lang="less">
.importfans {
    position: relative;

    &.hide::before {
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .daofen-box {
        width: 351px;
        border-radius: 10px;
        background-color: #FFFFFF;
        padding: 17.5px 12px 20px;
        margin: 12px auto;

        .text {
            display: flex;
            font-family: 'PingFang SC';
            line-height: 1.6;
            color: #333333;
            font-size: 14px;
            font-weight: 500;
            padding-bottom: 6px;
            border-bottom: 1px solid #DEE4EE;
            margin-bottom: 14.5px;
        }

        .image {
            text-align: center;

            >img {
                max-width: 100%;
                height: auto;
            }
        }
    }

}
</style>