<template>
  <div class="disclaimer" :class="{ 'hide': datas.is_hide}">
    <p v-if="datas.value_list[0]">免责声明：<span v-html="highLight(datas.value_list[0].content)">{{datas.value_list[0].content}}</span></p>

    <slot name="functions" />
  </div>
</template>

<script>
export default {
    name: 'disclaimer',
    props: {
        datas: Object,
        hide: Boolean,
    },
    methods:{
        highLight(str){
            if(str.includes(this.datas.value_list[0].link_word)){
                str = str.replace(
                    this.datas.value_list[0].link_word, 
                    // 这里是替换成html格式的数据
                    '<a href="'+this.datas.value_list[0].link_word_url+'" style="color:#3F74FC!important;" target="_blank">'+ this.datas.value_list[0].link_word +'</a>'
                )
                return str
            }
            else{
                return str
            }
        }
    }

}
</script>

<style lang="less" scoped>
.disclaimer {
    position: relative;
    &.hide::before {
        content: '';
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        font-size: 20px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .4);
    }
    p {
        margin: 12px;
        color: #666;
        text-align: justify;
        word-break: break-all;
    }
}
</style>
