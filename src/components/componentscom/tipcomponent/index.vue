<template>
    <div class="tips" >
        <span>
            新建模块时，城市、更新时间、排序都是已有字段，无需手动添加。
        </span>
        <div class="footer">
            <span class="btn" @click="closeTip()">
                我知道了
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tipcomponent',
    data() {
        return {

        }
    },
    methods: {
        closeTip() {
            console.log(this.$parent.showTip)
            this.$parent.showTip = false
        },
    },
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.tips {
    width: 185px;
    height: 150px;
    border-radius: 5px;
    // background: rgba(96, 101, 236, 0.5);
    @include background_color3;
    padding: 16px 20px 23px;
    font-size: 13px;
    color: #FFFFFF;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    left: 480px;
    top: 20px;
    cursor: pointer;
    z-index: 100;

    .footer {
        display: flex;
        justify-content: end;

        .btn {
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 72px;
            height: 30px;
            border-radius: 3px;
            border: 1px solid #fff;
            color: #fff;
        }
    }
}
</style>