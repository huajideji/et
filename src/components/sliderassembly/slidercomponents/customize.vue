<template>
  <div>
    <el-dialog title="自定义主题色" :visible.sync="outerVisible"  width="80%">
    <el-dialog
      width="20%"
      title="保存主题色"
      :visible.sync="innerVisible"
      append-to-body>
      <div class="name-input">
      <span>*主题色名称：</span>
      <el-input v-model="colorName"></el-input>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="innerVisible = false">取 消</el-button>
      <el-button type="primary" @click="savestyle()">保存</el-button>
    </div>
    </el-dialog>
    <div class="custon-wrap">
      <div class="custon-left">
      <ul class="ciston-left-color">
        <li>
          <span>颜色1:{{ color1 }}</span>
          <span>
            <el-color-picker
              v-model="color1"
              show-alpha
              :predefine="predefineColors">
            </el-color-picker>
          </span>
        </li>
        <li>
          <span>颜色2:{{ color2 }}</span>
          <span>
            <el-color-picker
              v-model="color2"
              show-alpha
              :predefine="predefineColors">
            </el-color-picker>
          </span>
        </li>
        <li>
          <span>颜色3:{{ color3 }}</span>
          <span>
            <el-color-picker
              v-model="color3"
              show-alpha
              :predefine="predefineColors">
            </el-color-picker>
          </span>
        </li>
        <li>
          <span>颜色4:{{ color4 }}</span>
          <span>
            <el-color-picker
              v-model="color4"
              show-alpha
              :predefine="predefineColors">
            </el-color-picker>
          </span>
        </li>
      </ul>
      <div style="width: 100%;">
        <el-button @click="innerVisible = true" style="margin-left: 50px; margin-top: 15px;" v-if="chaoguan">保存为主题色</el-button>
      </div>
    </div>
    <div class="custon-right">
      <div class="block" :style="{backgroundColor:color4}">
        <div class="innerblock">
          <div class="module-title">
                <div class="fontIcon-string">
                    <span :class="['colorStyleIcon']" :style="{color:color1}">&#xe603;</span>
                    <span :class="['colorStyleIcon']" :style="{color:color4}">&#xe604;</span>
                </div>
                <span>申请期</span>
            </div>
            <div class="unlimited_button-box" :style="{backgroundColor:color4}">
                <div class="item"  v-for="(item, index) of unlimited_buttonList" :key="index">
						<div :class="['blueline']" :style="{backgroundColor:color1}">
						</div>
            <div class="fontIcon-strings">
                    <span :class="['colorStyleIcon']" :style="{color:color1}">&#xe608;</span>
            </div>
						<div :class="['blue-title']" :style="{color:color1}">
							{{item.title}}
						</div>
                </div>
               
            </div>
            <div class="buttonwrap">
              <button :style="{backgroundColor:color4}">分享</button>
              <button :style="{backgroundColor:color1}">返回本地宝首页</button>
            </div>
        </div>
      </div>
      <div>
        <div class="block" :style="{backgroundColor:color4}">
          
          <div class="innerblock"><div class="module-title">
                <div class="fontIcon-string">
                    <span :class="['colorStyleIcon']" :style="{color:color1}">&#xe603;</span>
                    <span :class="['colorStyleIcon']" :style="{color:color4}">&#xe604;</span>
                </div>
                <span>区级生活补贴</span>
            </div> <span class="selectquxian">选择区县</span>
            <div :style="{backgroundColor:color4}" class="netblock">
              <div class="nettitle">上城区应届生生活补助</div>
                <div class="item">
                  <ul>
                    <li class="netcontentli">
                      <div class="raycolor">补贴标准</div>
                      <div>对来上城就业的三类优秀毕业生</div>
                    </li>
                    <li class="netcontentli">
                      <div class="raycolor">发放方式</div>
                      <div>在杭州市一次性生活补助基础上，再给予本科1万元，硕士3万元、博士5万元</div>
                    </li>
                    <li class="netcontentli">
                      <div class="raycolor">申请对象</div>
                      <div>补助按照先结后补的原则，每年集中申请一次</div>
                    </li>
                  </ul>
          <button :style="{backgroundColor:`${color1}`}" class="button">查看详情</button>

						<div :class="['blue-title']" :style="{color:color1}">
						</div>
                </div>
               
            </div>
        <div>
        </div>
      
      </div>
      </div>
      
      </div>
      <div class="block">
          
          <div class="innerblock" ><div class="module-title">
                <div class="fontIcon-string">
                    <span :class="['colorStyleIcon']" :style="{color:color1}">&#xe603;</span>
                    <span :class="['colorStyleIcon']" :style="{color:color4}">&#xe604;</span>
                </div>
                <span>限行区域</span>
            </div>
            <div class="netblock"  :style="{background: `linear-gradient(180deg, ${color2} 0%, ${color3} 100%)`}">
              <div class="nettitle" :style="{color:color1}">A类城市补助区域</div>
                <div class="item">
                  <ul>
                    <li class="xianxingwrap">
                      <div class="dot" :style="{backgroundColor:`${color1}`}">1</div>
                      <div class="dottext">车辆报备</div>
                    </li>
                    <li class="xianxingwrap">
                      <div class="dot" :style="{backgroundColor:`${color1}`}">2</div>
                      <div class="dottext">通行证</div>
                    </li>
                    <li class="xianxingwrap">
                      <div class="dot" :style="{backgroundColor:`${color1}`}">3</div>
                      <div class="dottext">48小时核酸检测</div>
                    </li>
                  </ul>
                  <div class="huiline"></div>
                  <span>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</span>
          <button :style="{backgroundColor:`${color1}`}" class="button">查看详情</button>

						<div :class="['blue-title']" :style="{color:color1}">
						</div>
                </div>
               
            </div>
        <div>
        </div>
      
      </div>
      </div>
    </div>
    </div>
    
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'custonmize',
  data() {
    return {
      chaoguan:false,
      unlimited_buttonList:[{title:'申请时间'},{title:'申请入口'},{title:'申请时间'},{title:'申请操作流程'},{title:'配置规则'},{title:'配置申请流程图'}],
      colorName: '',
      predefineColors:[],
        color1: 'rgba(140, 74, 255, 1)',
        color2: ' rgba(222,233,255,0.2)',
        color3: 'rgba(235, 242, 255, 1)',
        color4:'rgba(140,74,255,0.05)',
        outerVisible: false,
        innerVisible: false
      };
  },
  props: {
    switch: {
      type: Boolean,
      default:false
    }
  },
  computed: {
  },
  watch: {
    switch(newvalue, oldvalue) {
      this.outerVisible = newvalue

    },
    outerVisible(newValue, oldValue) {
        this.$emit('coloseDia',newValue)
    }
  },
  mounted() {
    let realname = JSON.parse(localStorage.getItem('ET_User_Info2.0')).data 
      console.log(realname)
      let superList = ['阿柴', '爱华', '7哥','车车','稀饭']
				if (superList.includes(realname)){
					this.chaoguan = true
				} else {
					this.chaoguan = false
				} 
  },
  methods: {
    save() {
      let colorArr = [this.color1, this.color2, this.color3, this.color4]
      let senddata = {
        name: '',
        id: '',
        colour:colorArr
      }
      this.$emit('confirColor', senddata)
      this.outerVisible = false
    },
    async savestyle(){
      let params = {
        name: this.colorName,
        colour:[this.color1,this.color2,this.color3,this.color4]
      }
      if (this.colorName) {
        const resdata = await this.$api.addColorStyle(params)
      if (resdata.code == 200) {
        this.$message.success('保存成功')
        this.innerVisible = false
      } else {
        this.$message.warning(resdata.msg)
     }
      } else {
        this.$message.warning('请填写名称')
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
.huiline{
  width: 100%;
  background-color: #999;
  height: 1px;
  margin: 20px 0px;
}
.xianxingwrap{
  display: flex;
  margin-top: 8px;
  .dot{
    margin-right: 15px;
    border-radius: 50%;
    color: #fff;
    width:18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
  }
}
.buttonwrap{
  display: flex;
  button{
    outline: none;
    border: 0px;
    border-radius: 5px;
    padding: 7px 15px;
    margin-top: 15px;
  }
  button:nth-child(1){
    margin-right: 10px;
    flex: 1;
  }
  button:nth-child(2){
    color: #fff;
    flex: 2;
  }
}
.selectquxian{
  display: block;
  margin-bottom: 12px;
}
.raycolor{
  color: #999;
  width:100px;
}
.netcontentli{
  display: flex;
  margin-top: 10px;
  >div:nth-child(2){
    margin-left: auto;
  width:200px;

  }
}
.netblock{
  border-radius: 5px;
  padding: 15px;
  .nettitle{
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }
}
 .unlimited_button-box {
    padding: 15px;
		width:100%;
		display:flex;
		justify-content:start;
		flex-wrap:wrap;
		.item{
			width:50%;
			// height:20px;
			margin-bottom:10px;
			display:flex;
			justify-content:start;
			align-items:center;
			color:rgba(96,101,236,1);
			.fontIcon-strings{
				display:block;	
				margin:0px 5px 0px 5px;
			}
            .blue-title{
                margin-top: -3px;
            }
		}
		.blueline{
			width:2px;
			
			height:13px;
			background: rgba(96,101,236,1);
		}
    }
.innerblock{
  background-color: #fff;
  padding: 15px;
  border-radius: 15px;
}
.name-input{
  span{display: inline-block;width: 180px;}
  display: flex;
  align-items: center;
  width: 300px; 
  margin-top: 20px;
}
.button{
  width: 100%;
  outline: none;
  border: 0px;
  color: #fff;
  padding: 7px 15px;
  border-radius: 15px;
  margin-top: 15px;
}
.ciston-left-color{
  li{
    display: flex;
    align-items: center;
    margin-top: 15px;
    span:first-of-type{
      width: 200px;
      margin-right:15px;

    }
  }
}
.custon-wrap{
  display: flex;
  .block{
    width: 375px;
    height: 400px;
    padding: 10px;
    margin-left: 15px;
  }
  .custon-right{
    display: flex;
  }
}
.module-title {
        display: flex;
        align-items: center;
        margin-bottom: 13.5px;
        font-size: 16px;
        font-weight: 700;
        color: #333;


        >img {
            height: 16px;
            width: auto;
            margin-right: 6px;
        }

    }
</style>