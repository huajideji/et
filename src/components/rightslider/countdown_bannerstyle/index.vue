<template>
  <div class="countdown_bannerstyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>
    <p class="suggest">
      此模块需创建人填写倒计时的描述文字与倒计时日期，背景图片请找设计，倒计时结束后，数字保持0不变，请及时更换普通banner图模块
    </p>

    <div style="height: 20px" />

    <!-- 表单 -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="datas"
      :rules="rules"
      ref="datas"
    >
      <el-form-item prop="content">
        <div slot="label"><span style="color: red">*</span> 文字描述
        <div style="color:#888;font-size:10px">最多两行，每行字数不能超过12字
          </div></div>
        <el-input
          type="textarea"
          :rows="2"
          resize="none"
          v-model="datas.value_list[0].content"
          maxlength="25"
          @change="textChange"
        ></el-input>
      </el-form-item>
      <el-form-item prop="date">
        <div slot="label"><span style="color: red">*</span> 目标日期</div>

        <el-date-picker
          v-model="datas.value_list[0].target_date"
          type="date"
          :picker-options="pickerOptions"
          style="width: 100%"
          placeholder="选择日期"
          @change="dateChange"
          @clear="dateChange"
        >
        </el-date-picker>
      </el-form-item>
      <!-- 描述 -->
      <el-form-item :hide-required-asterisk="true">
        <div class="upload-title"><span>*</span>上传移动端图片</div>
        <div class="upload-notice">
          请上传宽度750px，高度400px的图片，支持jpg/png格式，大小不超过100kb。
        </div>
        <div class="backgroundImg">
          <el-upload
            class="avatar-uploader"
            :action="baseupload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="handleChange"
            name="image"
          >
            <div class="addImg" v-if="!datas.value_list[0]">
              <i class="el-icon-circle-plus-outline"></i>
              <span>添加图片</span>
            </div>
            <template v-else>
              <img draggable="false" :src="datas.value_list[0].image" alt />
              <div class="changeImg">
                <i class="el-icon-circle-plus-outline"></i>
                <span>修改图片</span>
              </div>
            </template>
          </el-upload>
        </div>
      </el-form-item>
    </el-form>

    <div style="height: 100px"></div>
    <div class="saveBtn flex">
      <span class="saveForm" @click="saveForm">保存</span>
    </div>
    <!-- 上传图片 -->
    <!-- <uploadimg ref="upload" @uploadInformation="uploadInformation" /> -->
  </div>
</template>

<script>
import { log } from 'console'
// import uploadimg from '../../uploadImg' //图片上传

export default {
  name: 'countdown_bannerstyle',
  props: {
    datas: Object,
  },
  data() {
    var contentCheck = (rule, value, callback) => {
      if (this.datas.value_list[0].content === '') {
        return callback(new Error('请输入文字描述'))
      } else {
        callback()
      }
    }
    var dateCheck = (rule, value, callback) => {
      if (this.datas.value_list[0].target_date === '') {
        return callback(new Error('请选择目标日期'))
      } else {
        callback()
      }
    }
    return {
      imgText: '', //哪一个图片
      rules: {
        content: [{ validator: contentCheck, trigger: 'blur' }],
        date: [{ validator: dateCheck, trigger: 'blur' }],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        },
      },
    }
  },

  methods: {
    textChange(val) {
      let valArr = val.split('\n')
      if(valArr.length == 1){
        this.datas.value_list[0].content = valArr[0].substring(0, 24)
      }
      if (valArr.length > 2) {
        this.datas.value_list[0].content = valArr[0] + '\n' + valArr[1]
        this.$message.error('最多输入两行')
      }

      if (valArr.length == 2) {
        this.datas.value_list[0].content = valArr[0].substring(0, 12) + '\n' + valArr[1].substring(0, 12)
      }
    },
    dateChange(val) {
      console.log(val);
      if (val) {
        let year = val.getFullYear()
        let month = val.getMonth() + 1
        let day = val.getDate()
        let d1 = new Date(year + '/' + month + '/' + day)
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        this.datas.value_list[0].target_date = year + '-' + month + '-' + day
        let dd = new Date()
        let y = dd.getFullYear()
        let m = dd.getMonth() + 1
        let d = dd.getDate()
        let d2 = new Date(y + '/' + m + '/' + d)
        let iday = (parseInt(d1 - d2) / 1000 / 60 / 60 / 24).toString()
        let arr = []
        for (let i = 0; i < iday.length; i++) {
          arr.push(iday.charAt(i))
        }
        this.datas.value_list[0].dateArr = arr
      } else {
        this.datas.value_list[0].dateArr = []
      }
    },
    // 提交
    // uploadInformation(res) {
    // 	this.datas[this.imgText] = res
    // },
    // 上传成功
    handleAvatarSuccess(res, file) {
      // this.datas.value_list[0].image = res.data.src
      if (this.datas.value_list[0]) {
        this.datas.value_list[0].image = res.data
      } else {
        // this.datas.value_list.push({
        //   image: res.data,
        //   pc_image:
        //     'https://imgbdb4.bendibao.com/szbdb/20228/16/2022816095503_33928.jpg',
        // })
      }
      this.imgText = res.data
    },

    // 上传失败成功都会回调
    handleChange(file) {
      // 测试服测试使用
      if (file.status == 'fail') {
        this.datas.value_list[0].image =
          'https://img2.baidu.com/it/u=1928736049,3128591086&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333'
        this.imgText =
          'https://img2.baidu.com/it/u=1928736049,3128591086&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333'
      }
    },
    // 上传前图片格式校验
    beforeAvatarUpload(file) {
      const imgType = file.type
      if (['image/png', 'image/jpeg', 'image/jpg'].indexOf(imgType) === -1) {
        this.$message.error('上传图片只能是 jpg、png、jpeg格式!')
      }
      const isLt2M = file.size < 102400
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 100kb!')
      }
      const isSize = new Promise(function (resolve, reject) {
        const width = 750
        const height = 400
        const URL = window.URL || window.webkitURL
        const img = new Image()
        img.onload = function () {
          const valid = img.width === width && img.height === height
          valid ? resolve() : reject()
        }
        img.src = URL.createObjectURL(file)
      }).then(
        () => {
          return file
        },
        () => {
          this.$message.error('图片尺寸不规范')
          return Promise.reject()
        }
      )
      return imgType && isLt2M && isSize
    },

    // 保存
    saveForm() {
      console.log(this.datas.value_list[0],'sss')
      if (
        this.datas.value_list[0].content == '' ||
        !this.datas.value_list[0].target_date
      ) {
        this.$message.error('请完成必填项')
      } else {
        if (this.datas.value_list[0].image == '') {
          this.$message.error('图片尚未上传，无法保存')
          return
        }
        this.$message.success('当前模块填写完整')
      }

      // { "text":"模块名称", 模块名称,前端使用 "sort":0, 排序 "value_list":{ 字段列表 "image":"www.jag" 图片 } }
      // const bannerList = [
      // 	{
      // 		text: this.datas.text,
      // 		sort: 0,
      // 		value_list: [{ image: this.datas.value_list[0].image}],
      // 	},
      // ]
      // this.$store.commit('setBanner', bannerList)
    },
  },
  // components: { uploadimg },
  computed: {
    baseupload() {
      // return `${window.global_config.BASE_URL}upload/miniShop`
      // return `/image/upload/miniShop`
      return `/api/phalapi/public/?s=App.Robot_Problem.UploadFile`
    },
  },
}
</script>

<style scoped lang="less">
.countdown_bannerstyle {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 18px 20px;
  box-sizing: border-box;
  /* 标题 */
  h2 {
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
  .el-form {
    // height: 299px;
    padding: 17px 20px 24px;
    border-radius: 4px;
    background-color: #f8f8f8;
    .upload-title {
      font-size: 14px;
      color: #333;
      font-weight: 400;
      line-height: normal;
      span {
        color: #f33f3f;
      }
    }
    .upload-notice {
      margin-top: 9px;
      font-size: 12px;
      color: #999;
      text-align: justify;
      line-height: 16.7px;
    }
    .el-form-item__content {
      line-height: normal;
    }
  }

  .newbackgroundImg {
    height: 50px !important;
  }
  /* 背景图 */
  .backgroundImg {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
    height: 179px;
    position: relative;
    margin-top: 8px;
    border: 1px solid rgba(217, 217, 217, 1);
    background: #fff;

    img {
      width: 100%;
      height: 100%;
    }

    // 添加图片
    .addImg,
    .changeImg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 0 12px;
      border-radius: 4px;
      font-size: 12px;
      color: #6065ec;
      line-height: 32px;
      background: rgba(96, 101, 236, 0.1);
      span {
        margin-left: 6px;
      }
    }

    // 更换图片
    .changeImg {
      background: #fff;
    }

    p {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 20px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      text-align: center;
      line-height: 20px;
    }
  }
  .color-select {
    ::v-deep.el-form-item__content {
      float: right;
    }
  }
  .saveForm {
    margin-top: 20px;
  }
  .avatar-uploader {
    width: 100%;
    height: 100%;
    ::v-deep.el-upload {
      width: 100%;
      height: 100%;
      border: 0;
      position: static;
    }
  }
}
</style>
