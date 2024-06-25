<template>
    <div class="success">
        <img src="@/assets/images/success.png" alt="">
        <div class="tips">
            上传成功！<span>
                {{ num }}s
            </span> 后自动返回专题列表页
        </div>
        <button class="goBack" @click="goBack">
            <img src="@/assets/images/back.png" alt="">
            <span>返回专题列表页</span>
        </button>
    </div>
</template>
<script>
export default {
    name: 'submit',
    data() {
        return {
            num: 3,
            timer: null,
        }
    },
    computed: {

    },
    mounted() {
        this.countdown()
    },
    methods: {
        goBack() {
            clearInterval(this.timer)
            this.$router.push({
                name: 'subjectList'
            })
        },
        countdown() {
            this.timer = setInterval(() => {
                this.num--
                if (this.num === 0) {
                    clearInterval(this.timer)
                    this.$router.push({
                        name: 'subjectList'
                    })
                }
            }, 1000);
        }
    },
}
</script>
<style scoped lang="less">
.success {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    >img {
        width: 260px;
    }

    .tips {
        font-size: 16px;
        color: #333;
        margin-top: 20px;

        >span {
            color: #6065EC;
        }
    }

    .goBack {
        margin-top: 20px;
        border: none;
        background-color: #6065EC;
        border-radius: 4px;
        width: 140px;
        height: 38px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        >span {
            margin-left: 4px;
        }
    }

}
</style>
<style lang="less" >
</style>