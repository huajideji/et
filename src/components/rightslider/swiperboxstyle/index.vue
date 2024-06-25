<template>
  <div class="swiperboxstyle">
    <!-- 标题 -->
    <h2>轮播图</h2>
    <p class="suggest">建议填写数量不超过8</p>

    <div style="height: 20px" />

    <!-- 表单 -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="datas"
      :rules="rules"
      size="small"
      ref="form"
    >
      <!-- 轮播图配置 -->
      <vuedraggable v-model="datas.value_list" v-bind="dragOptions">
        <transition-group>
          <section
            class="imgBanner"
            v-for="(item, index) in datas.value_list"
            :key="item + index"
            @click="handleIndex(index)"
          >
            <i class="el-icon-close" @click="deleteimg(index)" />

            <div class="block">
              <el-form-item
                :label="'p' + (index + 1) + '轮播图跳转链接'"
                :hide-required-asterisk="true"
              >
                <el-radio-group
                  v-model="item.link_type"
                  @change="chosenRedirect()"
                >
                  <el-radio :label="1">旧专题标识</el-radio>
                  <el-radio :label="2">新专题标识</el-radio>
                  <el-radio :label="3">链接</el-radio>
                </el-radio-group>
                <el-input
                  v-model.trim="item.link_url"
                  v-if="item.link_type == 1 || item.link_type == 2"
                />
                <el-input
                  v-model.trim="item.link_url"
                  v-else
                  placeholder="例如:http://www.baidu.com"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <div class="upload-title">
                  <span>*</span>
                  p{{ index + 1 }}图片
                </div>
                <div class="upload-notice">
                  请上传宽度702px，高度200px的图片，支持jpg/png格式，大小不超过100kb。
                </div>
                <div class="backgroundImg">
                  <el-upload
                    class="avatar-uploader"
                    :action="baseupload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    name="image"
                  >
                    <div class="btns" v-if="!item.image">
                      <!-- <div class="gallery" @click="viewGallery">
                        <img src="@/assets/images/search_purple.png" alt />
                        <span>查看图库</span>
                      </div> -->

                      <div class="addImg" @click="addImg(index)">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>添加图片</span>
                      </div>
                    </div>
                    <template v-else>
                      <img draggable="false" :src="item.image" alt />
                      <div class="changeImg" @click="addImg(index)">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>修改图片</span>
                      </div>
                    </template>
                  </el-upload>
                </div>
              </el-form-item>
            </div>
            <div style="margin-bottom: 20px;">
              <div style="margin-top: 20px;">
                  轮播图标题
                </div>
                <div>
                    <el-input v-model="item.title" placeholder='请输入标题'></el-input>
                </div>
                <div>
                  支持填写{cityname}用于替换城市名称
                </div>
            </div>
          </section>
        </transition-group>
      </vuedraggable>

      <!-- 新增 -->
      <div @click="addList()" class="addBtn">
        <i class="el-icon-plus" />新增
      </div>

      <div style="height: 100px"></div>
      <div class="saveBtn flex">
        <span class="saveForm" @click="saveForm">检查</span>
      </div>

      <!-- 下划线 -->
      <!-- <div class="bor"></div> -->
    </el-form>

    <!-- 上传图片 -->
    <uploadimg ref="upload" @uploadInformation="uploadInformation" />
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable' //拖拽组件
import uploadimg from '../../uploadImg' //图片上传

export default {
  name: 'swiperboxstyle',
  components: { uploadimg, vuedraggable },
  props: {
    datas: Object,
  },
  data() {
    return {
      rules: {
        //校验表单输入
        link_url: [
          //专题标识
          { required: true, message: '请输入合法链接', trigger: 'blur' },
        ],
      },
      currentIndex: 0,
      isNull: true,
      dragOptions: {
        //拖拽配置
        animation: 200,
      },
    }
  },

  created() {
    // this.datas.value_list[0].link_type = 1
  },

  methods: {
    // 强制更新表单
    changeInputEvent(val, item) {
      item.link_url = val
      this.$forceUpdate()
      let div = document.getElementsByClassName('rules')
      if (val == '') {
        div[this.currentIndex].style = 'display:block'
      } else {
        div[this.currentIndex].style = 'display:none'
      }
    },
    /*checkLinkUrl(item) {
      let URL =
        /^(https?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
      if (!URL.test(item.link_url)) {
        // item.link_url = ''
        this.$message.error('请输入合法的跳转链接')
      }
    },*/
    chosenRedirect() {
      let div = document.getElementsByClassName('rules')
      div[this.currentIndex].style = 'display:none'
      // console.log(this.currentIndex, 'this.currentIndex')
      this.datas.value_list[this.currentIndex].link_url = ''
    },
    handleIndex(index) {
      this.currentIndex = index
    },
    // 提交
    uploadInformation(res) {
      //   this.datas.value_list[this.currentIndex].src = res
      if (this.datas.value_list[this.currentIndex].id) {
        this.$set(this.datas.value_list, this.currentIndex, {
          id: this.datas.value_list[this.currentIndex].id,
          image: res.data,
          link_url: this.datas.value_list[this.currentIndex].link_url,
          link_type: this.datas.value_list[this.currentIndex].link_type,
        })
      } else {
        this.$set(this.datas.value_list, this.currentIndex, {
          id: 0,
          image: res.data,
          link_url: this.datas.value_list[this.currentIndex].link_url,
          link_type: this.datas.value_list[this.currentIndex].link_type,
        })
      }
    },
    addList() {
      this.datas.value_list.push({
        id: 0,
        image: '',
        link_url: '',
        link_type: 1,
      })
    },
    addImg(res) {
      this.currentIndex = res
      //   this.$refs.upload.showUpload()
    },

    /* 删除图片 */
    deleteimg(index) {
      this.datas.value_list.splice(index, 1)
      if (this.datas.key_list[index]) {
        // let id  = this.datas.key_list[index].id
        // this.$api.reqDeleteModuleData({id : id})
        this.datas.key_list.splice(index, 1)
      }
    },

    // 上传成功
    handleAvatarSuccess(res, file) {
      //   this.datas.value_list[this.currentIndex].src = URL.createObjectURL(file.raw);
      if (this.datas.value_list[this.currentIndex].id) {
        this.$set(this.datas.value_list, this.currentIndex, {
          id: this.datas.value_list[this.currentIndex].id,
          image: res.data,
          link_url: this.datas.value_list[this.currentIndex].link_url,
          link_type: this.datas.value_list[this.currentIndex].link_type,
        })
      } else {
        this.$set(this.datas.value_list, this.currentIndex, {
          id: 0,
          image: res.data,
          link_url: this.datas.value_list[this.currentIndex].link_url,
          link_type: this.datas.value_list[this.currentIndex].link_type,
        })
      }
    },
    // 上传失败成功都会回调
    // handleChange(file) {
    // 	// 测试服测试使用
    // 	if (file.status == 'fail') {
    // 		// this.datas.value_list[this.currentIndex].image = 'https://img2.baidu.com/it/u=1928736049,3128591086&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333'
    // 		this.$set(this.datas.value_list, this.currentIndex, {
    // 			image:
    // 				'https://img2.baidu.com/it/u=1928736049,3128591086&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333',
    // 			link_url: this.datas.value_list[this.currentIndex].link_url,
    // 			link_type: this.datas.value_list[this.currentIndex].link_type,
    // 		})
    // 	}
    // },
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
        const width = 702
        const height = 200
        const URL = window.URL || window.webkitURL
        const img = new Image()
        console.log(img.height,img.width)
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
      this.$set(this.datas.value_list, this.currentIndex, {
        image: this.datas.value_list[this.currentIndex].image,
        link_url: this.datas.value_list[this.currentIndex].link_url,
        link_type: this.datas.value_list[this.currentIndex].link_type,
      })
      // [ { "text":"模块名称", 模块名称,前端使用 "sort":0, 排序 "value_list":{ 字段列表 "link_type":0, 0：专题标识，1：外部链接，2：子页面入口 "link_url":"http://www.baidu.com", 链接内容 "image":"www.jag" 图片 } } ]
      const swiperList = [
        { text: this.datas.text, sort: 0, value_list: this.datas.value_list },
      ]
      this.datas.value_list.forEach((item, index) => {
        if (!item.image || !item.link_url) {
          this.isNull = true
        } else {
          this.isNull = false
        }
      })
      let checkUrl = true
      if (!this.isNull) {
          this.$store.commit('setSwiper', swiperList)
          this.$message.success('当前模块填写完整')

      } else {
        this.$message.error('尚未完成编辑，无法保存')
      }
    },
    // 查看图库
    viewGallery(e) {
      e.stopPropagation()
      this.$message.error('图片库暂未开放')
    },
  },

  computed: {
    baseupload() {
      // return `${window.global_config.BASE_URL}upload/miniShop`
      return `/api/phalapi/public/?s=App.Robot_Problem.UploadFile`
    },
  },
}
</script>

<style scoped lang="less">
.swiperboxstyle {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 18px;
  box-sizing: border-box;

  // 新增按钮
  .addBtn {
    width: 90px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    border: 0;
    text-align: center;
    font-size: 12px;
    color: #fff;
    background: rgba(96, 101, 236, 1);
  }

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

  .lef {
    ::v-deep.el-form-item__label {
      text-align: left;
    }
  }

  .block {
    margin-bottom: 20px;
    padding: 17px 20px 20px;
    border-radius: 4px;
    background-color: #f8f8f8;

    .title {
      font-size: 14px;
      color: #333;
      font-weight: 400;
      line-height: normal;

      span {
        color: #f33f3f;
      }
    }

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

    .backgroundImg {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 100%;
      height: 179px;
      position: relative;
      margin-top: 18px;
      border: 1px solid rgba(217, 217, 217, 1);
      background: #fff;

      ::v-deep.avatar-uploader {
        height: 100%;
        .el-upload {
          height: 100%;
          border: none;
          overflow: unset;
          display: flex;
          align-items: center;
        }
      }

      img {
        width: 100%;
        height: 100%;
      }

      .btns {
        // display: flex;
        // margin-top: 100%;
        // transform: translate(0%, -100%);

        // 添加图片
        .addImg,
        .gallery {
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

        // 查看图库
        .gallery {
          margin-right: 14px;
          border: 1px solid rgba(96, 101, 236, 1);
          line-height: 30px;
          background-color: #fff;

          img {
            width: 11px;
            height: 11px;
          }
        }
      }

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
        background: #fff;
        span {
          margin-left: 6px;
        }
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
  }

  /* 轮播图样式 */
  .swiperType {
    display: flex;
    justify-content: space-around;
    align-items: center;

    span {
      display: inline-block;
      width: 58px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      background: #ebedf0;
      color: #979797;
      border: 1px solid #fff;
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        border: 1px solid #155bd4;
        color: #155bd4;
      }

      &.active {
        border: 1px solid #155bd4;
        background-color: #e0edff;
        color: #155bd4;
      }
    }
  }

  /* 圆角 */
  .borrediu {
    span {
      display: inline-block;
      width: 48px;
      height: 26px;
      text-align: center;
      line-height: 26px;
      background: #ebedf0;
      color: #979797;
      border: 1px solid #fff;
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        border: 1px solid #155bd4;
        color: #155bd4;
      }

      &.active {
        border: 1px solid #155bd4;
        background-color: #e0edff;
        color: #155bd4;
      }
    }
  }

  ::v-deep.radi .el-radio {
    margin-right: 8px;
  }

  ::v-deep.radi1 .el-radio {
    margin-right: 7px;

    .el-radio__label {
      padding-left: 5px;
    }
  }

  // 上传弹框内容部分
  ::v-deep.uploadIMG .el-dialog__body {
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
  }

  .disable {
    ::v-deep.el-upload {
      display: none !important;
    }
  }

  /* 图片广告列表 */
  .imgBanner {
    position: relative;

    /* 删除图标 */
    .el-icon-close {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
      font-size: 19px;
    }

    /* 图片 */
    .imag {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        display: inline-block;
      }

      span {
        background: rgba(0, 0, 0, 0.5);
        font-size: 12px;
        position: absolute;
        left: 0px;
        bottom: 0px;
        display: inline-block;
        width: 100%;
        text-align: center;
        color: #fff;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
.rules {
  font-size: 12px;
  color: #f56c6c;
  margin-top: -10px;
  display: none;
}
</style>

<style lang="less">
.swiperboxstyle {
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    margin-right: 0;
  }

  .el-form-item:last-of-type {
    margin-bottom: 0;
  }
}
</style>
