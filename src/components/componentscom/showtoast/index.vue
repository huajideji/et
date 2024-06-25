<template>
    <div class="showtoast" v-if="showToast">
        <div class="toast-item">
            <img src="@/assets/images/toasts.png" alt="">
            <div class="toast-content">
                <p>{{ hotnew.title }}</p>
                <a :href="hotnew.url">查看详情</a>
            </div>
            <div class="toast-confirm" @click="showToast = false">确定</div>

        </div>

    </div>
</template>
<script>
export default {
    name: 'showtoast',
    data() {
        return {
            hotnew: {},
            showToast:false,
        }

    },
    mounted() {
        // this.datas.elementList.includes('更新时间')
        this.$bus.$on('showDetail', (detail, showToast) => {
            this.hotnew = detail
            this.showToast = showToast
        })
    },
    methods: {
        showAlert() {
            // 弹出遮罩层
          
        }
    }
}
</script>
<style scoped lang="less">
.showtoast {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    .toast-item {
        width: 310px;
        display: flex;
        flex-direction: column;

        >img {
            width: 100%;
            height: auto;
            background: linear-gradient(rgba(0, 0, 0, 0) 50%, #fff 50%);
        }

        .toast-content {
            padding: 20px;
            color: #666;
            background-color: #fff;

            >a {
                display: flex;
                width: 82px;
                height: 24px;
                margin-top: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 12px;
                background-color: #dbeafb;
                color: #3588da;
            }
        }

        .toast-confirm {
            width: 100%;
            height: 50px;
            border-radius: 0 0 13px 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #5994f4;
            color: #fff;
        }
    }
}
</style>