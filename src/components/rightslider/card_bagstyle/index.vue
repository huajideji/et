<template>
    <div class="card_bagstyle">
        <!-- 标题 -->
        <h2>{{ datas.text }}</h2>
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

       <div v-if="datas.value_list[0]">
         <vuedraggable v-model="datas.value_list" v-bind="dragOptions">
           <transition-group>
             <section class="imgList" v-for="(item, index) in datas.value_list" @click="currentIndex = index"
               :key="item + index">
               <!-- <i class="el-icon-circle-close" @click="deleteimg(index)" /> -->
               <span class="delete" @click="deleteimg(index)">
                 <i class="el-icon-close"></i>
               </span>
               <el-form :model="item" :rules="rules" label-width="100px" label-position="top" ref="form">
                 <el-form-item :label="`卡包${index + 1}名称`" prop="name">
                   <el-input v-model="item.name"maxlength="8" show-word-limit></el-input>
                 </el-form-item>
				 <el-form-item :label="`卡包${index + 1}简介`" prop="name">
				   <el-input v-model="item.keyword" maxlength="12" show-word-limit></el-input>
				 </el-form-item>
				 <el-form-item :label="`卡包${index + 1}图片`" prop="image">
				   <el-input v-model="item.image" style="display: none"></el-input>
				   <div class="icon-upload">
				     <el-upload class="avatar-uploader" :action="baseupload" :show-file-list="false" name="image"
				       :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-change="handleChange">
				       <div class="avatar" v-if="item.image" @mouseenter="showIndex = index"
				         @mouseleave="showIndex = null">
				         <img draggable="false" :src="item.image" style="wdith:120px;height:60px; border-radius: 10px"></img>
				        <div class="tip" v-show="showIndex == index">
				           点击修改
				         </div>
				       </div>
				       <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
				       <div v-else class="avatar-uploader-icon">
				         <img draggable="false" src="@/assets/images/nocard.png" style="wdith:120px;height:60px; border-radius: 10px;"></img>
				       </div>
				     </el-upload>
				     <!-- <el-dialog :visible.sync="dialogVisible">
				       <img width="100%" :src="item.src" alt="">
				     </el-dialog> -->
				     <div class="right">
				       
				       <!-- <button class="btn" @click="showGallery">
				         <img src="@/assets/images/search.png" alt="">
				         查看图库
				       </button> -->
				       <el-input v-model="item.image" placeholder="请输入图片链接" @change="checkImage(item)"></el-input>
					   <span style="margin-left:5px;">
					     请上传图片，大小不超过100K
					   </span>
				     </div>
				   </div>
				 </el-form-item>
                 <el-form-item :label="`卡包${index + 1}链接`" prop="link_type">
                   <el-radio-group v-model="item.link_type" @change="chosenType()">
                     <el-radio :label="1">旧专题标识</el-radio>
                     <el-radio :label="2">新专题标识</el-radio>
       			  <el-radio :label="5">编辑自由填写</el-radio>
                     <el-radio :label="3">链接</el-radio>
                     <!-- <span class="tips">由各站点编辑自行填写</span> -->
                     <el-radio :label="4" style="margin-top:16px" v-if="!$parent.pageSetup.is_child">
                       子页面入口
                     </el-radio>
                   </el-radio-group>
                 </el-form-item>
                 <el-form-item prop="link_url" class="http-input" v-show="item.link_type == 1 || item.link_type == 2">
                   <el-input v-model="item.link_url" placeholder="请输入内容" maxlength="30"></el-input>
                 </el-form-item>
                 <el-form-item prop="link_url" class="http-input" v-show="item.link_type == 3">
                   <el-input v-model="item.link_url" placeholder="例如:http://www.baidu.com" @change="checkLinkUrl(item)">
                   </el-input>
                 </el-form-item>
                 <el-form-item label="子页面标识" prop="link_url" v-show="item.link_type == 4" style="margin-top: -10px;">
                   <el-select v-model="item.link_url" placeholder="请选择子页面">
                     <el-option v-for="item in $parent.childrenPageList" :key="item.id" :label="item.code"
                       :value="item.code">
                     </el-option>
                   </el-select>
                 </el-form-item>
                
                 <!-- 图片选择 -->
               </el-form>
             </section>
           </transition-group>
         </vuedraggable>
       </div>
       <button @click="showUpload()" class="uploadImg" >
         +新增
       </button>
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
import vuedraggable from 'vuedraggable' //拖拽组件
import { mapMutations } from 'vuex'
import utils from '../../../utils';
export default {
    name: 'card_bagstyle',
    props: {
        datas: Object,
    },
    data() {
        return {
            dragOptions: {
                //拖拽配置
                animation: 200,
            },
            width: 0,
            height: 0,
            showIndex: null,
            currentIndex: null,
            radio: '1',
            rules: {
                name: [
                    { required: true, message: '请输入模块名称', trigger: 'change' },
                ],
				keyword:[
					{ required: true, message: '请输入卡包简介', trigger: 'change' }
				],
                link_type: [
                    { required: true, message: '请选择链接类型', trigger: 'change' }
                ],
                image: [
                    { required: true, message: '请选择图片', trigger: 'change' }
                ],
                link_url: [
                    { required: true, message: '请输入合法链接', trigger: 'change' },
                ],
            }
        }
    },
    watch: {
    },
    mounted() {
        // 默认加载更多位置标识
		this.datas.value_list.forEach((item,index)=>{
			if(item.link_type==5){
				// item.name = '入口'+(index+1)
			}
		})

    },
    methods: {
		chosenType() {
		  this.datas.value_list[this.currentIndex].link_url = ''
		  setTimeout(() => {
		    this.$refs.form[this.currentIndex].clearValidate('link_url')
		  }, 0);
		},
        ...mapMutations('module_entry', ['SETMODULEENTRY']),
        checkLinkUrl(item) {
            let URL = /^(https?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
            if (!URL.test(item.link_url)&&item.type!=5) {
                // item.link_url = ''
                this.$message.error('请输入合法的跳转链接')
            }
        },
        checkImage(item) {
            let URL = /^(https?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
            if (!URL.test(item.image)) {
                // item.link_url = ''
                this.$message.error("请输入正确的图片地址")
            }
        },
        chosenRedirect() {
            this.datas.value_list[this.currentIndex].link_url = ''
			this.datas.value_list.forEach((item,index)=>{
				if(item.link_type==5){
					item.name = '入口'+(index+1)
				}
			})
			
            setTimeout(() => {
                this.$refs.form[this.currentIndex].clearValidate('link_url')
            }, 0);
        },
        handleIndex(index) {
            
            this.currentIndex = index
        },
        /* 存储需要创建的专题模块数据 */
        saveData() {
          let value = true
          let checkUrl = true
          let URL = /^(https?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
		  if(this.datas.name == ''){
			  checkUrl = false
		  }
          this.datas.value_list.map((item, index) => {
            if (!URL.test(item.image)) {
              checkUrl = false;
            }
            if (item.link_type == 3) {
              if (!URL.test(item.link_url)) {
                // item.link_url = ''
                checkUrl = false;
              }
            }
            if (utils.fieldObjectValueHaveEmpty(item)&&item.link_type != 5) {
              this.$refs.form[index].validate((valid) => {
                if (!valid) {
                  value = false;
                  return false;
                }
              });
            }
        	
          })
         
          if (this.datas.jump_type) {
            if (this.datas.jump_type == 3) {
              if (!URL.test(this.datas.jump_code)) {
                // item.link_url = ''
                checkUrl = false;
              }
            }
        	
        	
            if (this.datas.jump_code.length == 0 || this.datas.jump_place == 4) {
              value = false;
              this.$refs.jump.validate((valid) => {
                if (!valid) {
                  return false;
                }
              });
            }
          }
          if (!checkUrl) {
            this.$message.error("请输入合法的跳转链接")
            return
          }
          if (!value) {
            this.$message.error("请完成必填项")
            return
          }
        
          this.$message.success("当前模块填写完整")
        },
        // 进入图片库
        showGallery() {
            this.$message.error('图片库暂未开放');
        },
        /* 删除图片列表的图片 */
        deleteimg(index) {
            this.datas.value_list.splice(index, 1)
        },
        // 上传失败成功都会回调
        handleChange(file) {
            // 测试服测试使用
            if (file.status == 'fail') {
                this.datas.value_list[this.currentIndex].image = 'https://img2.baidu.com/it/u=1928736049,3128591086&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333'
            }
        },
        // 上传成功
        handleAvatarSuccess(res, file) {
                // this.imageUrl = URL.createObjectURL(file.raw);
      if (res.ret == 200) {
        this.datas.value_list[this.currentIndex].image = res.data
        this.datas.value_list[this.currentIndex].pc_image = res.data
      }
        },
        // 上传前图片格式校验
        beforeAvatarUpload(file) {
            const _this = this;
            const imgType = file.type
            if (['image/png', 'image/jpg'].indexOf(imgType) === -1) {
                this.$message.error('上传图片只能是 jpg、png格式!')
            }
            const isLt2M = file.size / 1024 <100
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过100kb!')
            }
            const isSize = new Promise(function (resolve, reject) {
                _this.width = 315
                if (_this.currentIndex == 0) {
                    _this.height = 262
                } else {
                    _this.height = 119
                }
                const URL = window.URL || window.webkitURL
                const img = new Image()
                img.onload = function () {
                    // const valid = img.width === _this.width && img.height === _this.height
					resolve()
                    // valid ? resolve() : reject()
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
		showUpload(){
			this.datas.value_list.push({id:0,
			link_type: 1,
			link_url:'',
			keyword:`卡包简介${this.datas.value_list.length+1}`,
			image:'https://imgbdb4.bendibao.com/robot/202212/02/20221202152650_19782.png',
			name:`卡包${this.datas.value_list.length+1}`})
		}
    },
    computed: {
        baseupload() {
            return `/api/phalapi/public/?s=App.Robot_Problem.UploadFile`
        },
    },
    components: { vuedraggable, },
}
</script>

<style scoped lang="less">
.card_bagstyle {

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

    .icon-upload {
        display: flex;

        .right {
            font-size: 12px;
            padding-left: 20px;

            &>span {
                display: block;
                line-height: 1.6;
                font-size: 10px;
                color: #999999;
            }

            .btn {
                box-sizing: border-box;
                width: 80px;
                height: 28px;
                line-height: 28px;
                border-radius: 4px;
                border: 1px solid #6065EC;
                background-color: #f8f8f8;
                color: #6065EC;

                >img {
                    margin-right: 4px;
                }
            }

        }
    }

    /* 模块入口列表 */
    .imgList {
        background: #f8f8f8;
        border-radius: 4px;
        padding: 17px 20px 2px;
        margin: 12px 0;
        position: relative;

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

    .card {
        background: #f8f8f8;
        border-radius: 4px;
        padding: 17px 20px 24px;
        margin: 12px 0 !important;
        position: relative;

        &.header {
            margin: 25px 0;
        }

        .detail {
            margin-right: 15px;
        }




    }
	.tip {
	  width:120px;
	  height:60px;
	  position: absolute;
	  left: 0;
	  right: 0;
	  top: 0;
	  bottom: 0;
	  background-color: rgba(0, 0, 0, 0.2);
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  color: #fff;
	}
    .tips {
        font-size: 12px;
        color: #666666;
        margin-left: -18px;
        margin-right: 20px;
    }
	.uploadImg {
	  margin-top: 6px;
	  margin-bottom: 15px;
	  width: 80px;
	  height: 28px;
	  border-radius: 4px;
	  line-height: 28px;
	  border: none;
	  background-color: #6065EC;
	  color: #fff;
	  font-size: 10px;
	}
	
	.icon-upload {
	  display: flex;
	
	  .right {
	    font-size: 12px;
	    padding-left: 20px;
	
	    &>span {
	      display: block;
	      line-height: 1.6;
	      font-size: 10px;
	      color: #999999;
	    }
	
	    .btn {
	      box-sizing: border-box;
	      width: 80px;
	      height: 28px;
	      line-height: 28px;
	      border-radius: 4px;
	      border: 1px solid #6065EC;
	      background-color: #f8f8f8;
	      color: #6065EC;
	
	      >img {
	        margin-right: 4px;
	      }
	    }
	
	  }
	}
	
	.tips {
	  font-size: 12px;
	  color: #666666;
	  margin-left: -18px;
	  margin-right: 20px;
	}
	
	/* icons列表 */
	.imgList {
	  background: #f8f8f8;
	  border-radius: 4px;
	  padding: 17px 20px 2px;
	  margin: 12px 0;
	  position: relative;
	
	  /* 删除图标 */
	  .delete {
	    position: absolute;
	    top: 14px;
	    right: 20px;
	    font-size: 18px;
	    font-weight: bolder;
	    cursor: pointer;
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
	
	  /* 图片字 */
	
	}
	
	.card {
	  background: #f8f8f8;
	  border-radius: 4px;
	  padding: 17px 20px 24px;
	  margin: 12px 0;
	  position: relative;
	
	  .title {
	    font-size: 14px;
	    color: #333333;
	    margin-bottom: 18px;
	  }
	}
	
	/* 其他模块样式 */
	.others-moudle {
	  p {
	    font-size: 14px;
	    font-weight: 700;
	    color: #333333;
	    margin-bottom: 20px;
	  }
	
	
	
	  // 添加搜索样式
	  .redirect-type {
	    .redirect-bottom {
	      margin-top: 15px;
	
	      .title {
	        display: block;
	        margin-bottom: 10px;
	      }
	    }
	
	    .jump-type {
	      margin-top: 17px;
	
	      .title {
	        display: block;
	        margin-bottom: 10px;
	      }
	
	      .type {
	        display: flex;
	        justify-content: space-between;
	        flex-wrap: wrap;
	
	        .type-box {
	          display: flex;
	          flex-direction: column;
	          justify-content: center;
	          margin-bottom: 10px;
	
	          >div {
	            width: 158px;
	            height: 87px;
	            border-radius: 2px;
	            border: 1px solid rgba(217, 217, 217, 1);
	            background-color: #fff;
	            margin-bottom: 8px;
	            position: relative;
	
	            >span {
	              color: #6065EC;
	              font-size: 14px;
	              position: absolute;
	
	              &.top-right {
	                right: 10px;
	                top: 10px;
	              }
	
	              &.bottom-right {
	                right: 10px;
	                bottom: 10px;
	              }
	
	              &.under {
	                // left: 50%;
	                bottom: 10px;
	                transform: translateX(56%);
	              }
	
	            }
	          }
	        }
	      }
	    }
	  }
	}



}
</style>