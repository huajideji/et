<template>
  <div class="decorate" ref="mainPage">
    <div
      v-if="routePath == '/editor'"
    >
      <!-- 标题 -->
      <!-- <h2 v-if="datas.isChild">子页面</h2> -->
      <h2 v-if="datas.is_child">子页面</h2>
      <h2 v-else>主页面</h2>

      <!-- 表单 -->
      <el-form
        label-position="top"
        label-width="80px"
        :model="datas"
        :rules="childrenRules"
        size="small"
        v-if="datas.is_child"
      >
        <div class="block">
          <el-form-item label="子页面名称" prop="name" :key="1">
            <el-input v-model="datas.name" maxlength="6" />
          </el-form-item>
          <el-form-item label="子页面标识" prop="code" :key="2">
            <el-input v-model.trim="datas.code" placeholder="" maxlength="20" />
          </el-form-item>
        </div>
        <!-- <div class="block">
        <el-form-item label="入口" :hide-required-asterisk="true" prop="entrance">
          <el-select v-model="datas.entrance" placeholder="请选择入口">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) of entranceData" :key="index">
            </el-option>
          </el-select>
        </el-form-item>
      </div> -->
      </el-form>

      <el-form
        label-position="top"
        label-width="80px"
        :model="datas"
        :rules="rules"
        size="small"
        v-else
        ref="datas"
      >
        <div class="block">
          <el-form-item
            label="专题名称"
            :hide-required-asterisk="true"
            prop="name"
            :key="3"
          >
            <el-input v-model="datas.name" placeholder="" />
          </el-form-item>
          <el-form-item
            label="专题目录"
            :hide-required-asterisk="true"
            prop="directory"
            :key="10"
          >
          <el-select
                style="width: 222px"
                v-model="datas.directory"
              >
                <el-option
                  v-for="(item, index) in directoryList"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item
            label="专题标识"
            :hide-required-asterisk="true"
            prop="code"
            :key="4"
          >
            <el-input v-model.trim="datas.code" :disabled="isEditor" maxlength="20"/>
          </el-form-item>
        </div>
        <div class="block">
          <el-form-item
            label="专题分类"
            :hide-required-asterisk="true"
            prop="category_one"
            style="margin-bottom: 0"
            :key="5"
          >
            <div class="condition">
              <span>一级专题类别:</span>
              <el-select
                style="width: 222px"
                v-model="datas.category_one"
                @change="searchList()"
              >
                <el-option
                  v-for="(item, index) in typeList"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item
            label=""
            :hide-required-asterisk="true"
            prop="category_two"
            style="margin-bottom: 0"
            :key="6"
          >
            <div class="condition">
              <span>二级专题类别:</span>
              <el-select style="width: 222px" v-model="datas.category_two">
                <el-option
                  v-for="item in typeList1"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>
        <div class="block">
          <div class="block2">
            <el-form-item
              label="专题title"
              :hide-required-asterisk="true"
              prop="title"
            >
              <el-input v-model="datas.title" type="textarea" rows="3" />
            </el-form-item>
            <el-form-item
              label="专题描述"
              :hide-required-asterisk="true"
              prop="describe"
              style="margin-bottom: 0"
            >
              <el-input v-model="datas.describe" type="textarea" rows="3" />
            </el-form-item>
          </div>
        </div>
        <div class="block">
          <div class="title"><span>*</span>城市选择类型</div>
          <div class="block2">
            <el-form-item
              :hide-required-asterisk="true"
              prop="title"
            >
            <el-radio v-model="datas.city_select_type" :label="0">类型一</el-radio>
            <el-radio v-model="datas.city_select_type" :label="1">类型二</el-radio>
            </el-form-item>
          </div>
        </div>
        <div
          class="block"
          v-if="$route.query.type == 0 || $route.query.type == 2"
        >
          <div class="title"><span>*</span>城市选择</div>
          <div class="notice">
            默认选择城市级。全国级展示全国所有数据，城市级展示城市数据+所有区县数据，区县级展示区县数据，若区县选择为“全部”，则展示城市+所有区县的数据。
          </div>
          <el-radio v-model="datas.type" :label="0"
            >全国级专题<span>（无城市选择）</span></el-radio
          >
          <el-radio v-model="datas.type" :label="1"
            >城市级专题<span
              >（有城市选择，不可选择区县，区县数据全部展示在城市页面）</span
            ></el-radio
          >
          <el-radio v-model="datas.type" :label="2"
            >区县级专题<span
              >（有城市选择，可选择区县，区县数据单独在区县页面展示）</span
            ></el-radio
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'decorate',
  props: {
    datas: Object,
  },
  data() {
    return {
      routePath: '',
      radio: 3,
      name: 'decorate',
      isEditor: false,
      rules: {
        //校验表单输入
        name: [
          //专题名称
          { required: true, message: '请输入专题名称', trigger: 'blur' },
        ],
        code: [
          //专题标识
          { required: true, message: '请输入专题标识', trigger: 'blur' },
        ],
        title: [
          //专题title
          { required: true, message: '请输入专题title', trigger: 'blur' },
        ],
        category_one: [
          { required: true, message: '请选择一级分类', trigger: 'change' },
        ],
        category_two: [
          { required: true, message: '请选择二级分类', trigger: 'change' },
        ],
        city: [{ required: true, message: '请输入城市名称', trigger: 'blur' }],
        describe: [
          //专题描述
          { required: true, message: '请输入专题描述', trigger: 'blur' },
        ],
      },
      directoryList: [
      {
          name: '资讯',
          value:'news'
        },
        {
          value:'live',
          name: '办事',
        },
        {
          name: '活动',
          value:'xiuxian',
        },
        {
          name: '特惠',
          value:'youhui',
        },
        {
          name: '招聘',
          value:'job',
        },
        {
          name: '教育',
          value:'edu',
        },
        {
          name: '交通',
          value:'traffic',
        },
        {
          name: '旅游',
          value:'tour',
        },
      ],
      //一级分类
      typeList: [
        {
          name: '办事',
        },
        {
          name: '活动',
        },
        {
          name: '特惠',
        },
        {
          name: '招聘',
        },
        {
          name: '资讯',
        },
        {
          name: '交通',
        },
        {
          name: '教育',
        },
        {
          name: '旅游',
        },
      ],
      //二级分类
      typeList1: [],
      childrenRules: {
        name: [
          //子页面名称
          { required: true, message: '请输入子页面名称', trigger: 'blur' },
        ],
        code: [
          //子页面标识
          { required: true, message: '请输入子页面标识', trigger: 'blur' },
        ],
        entrance: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
        category_one: [
          { required: true, message: '请选择一级分类', trigger: 'change' },
        ],
        category_two: [
          { required: true, message: '请选择二级分类', trigger: 'change' },
        ],
      },
    }
  },

  created() {
    setTimeout(() => {
      if (this.datas.creater && this.$route.query.isTemp != 1) {
        this.isEditor = true
      }
    }, 500)
  },
  mounted() {
    this.routePath = this.$route.path
    console.log('路由', this.$route.path)
    this.changeTypeList()
    if (this.datas.city_a == '' && this.datas.city_b == '') {
      this.datas.city_a = '出发地'
      this.datas.city_b = '目的地'
    }
    if (this.$route.query.type) {
      this.zhuantiType = this.$route.query.type

      this.datas.topic_type = this.$route.query.type
    }
    sessionStorage.setItem(
      'guideRight3',
      parseInt(this.$refs.mainPage.getBoundingClientRect().width)
    )
  },
  beforeDestroy() {
    // 移除对 sessionStorage 的监听
    window.removeEventListener('setItem', () => {})
  },
  methods: {
    //修改子菜单
    searchList() {
      if (this.datas.category_two) {
        this.datas.category_two = ''
      }
      this.$nextTick(() => {
        this.$refs['datas'].clearValidate('category_two') //清楚当前select的校验规则
      })
      // this.datas.category_two = ''
      this.changeTypeList()
      // console.log(this.datas.category_two)
    },
    //初始化选项列表
    changeTypeList() {
      switch (this.datas.category_one) {
        case '办事':
          this.typeList1 = [
            {
              name: '房产',
            },
            {
              name: '补贴',
            },
            {
              name: '个税',
            },
            {
              name: '办事易专题',
            },
            {
              name: '百度政务专题',
            },
            {
              name: '五险一金',
            },
            {
              name: '入户政策',
            },
            {
              name: '证件办理',
            },
            {
              name: '疫苗接种',
            },
            {
              name: '毕业就业',
            },
            {
              name: '婚姻',
            },
            {
              name: '证明',
            },
          ]
          break
        case '疫情':
          this.typeList1 = [
            {
              name: '疫情消息',
            },
            {
              name: '病例信息',
            },
            {
              name: '隔离政策',
            },
            {
              name: '出行政策',
            },
            {
              name: '风险等级',
            },
            {
              name: '核酸检测',
            },
            {
              name: '疫情管控措施',
            },
            {
              name: '其他专题',
            },
          ]
          break
        case '资讯':
          this.typeList1 = [
            {
              name: '经济活动',
            },
            {
              name: '日常生活',
            },
            {
              name: '网点地图',
            },
            {
              name: '节假日',
            },
            {
              name: '重大事件',
            },
            {
              name: '其他专题',
            },
            {
              name: '医院',
            },
          ]
          break
        case '交通':
          this.typeList1 = [
            {
              name: '限行',
            },
            {
              name: '出行方式',
            },
            {
              name: '线路规划',
            },
            {
              name: '车牌摇号',
            },
            {
              name: '地铁',
            },
            {
              name: '车主办事',
            },
          ]
          break
        case '教育':
          this.typeList1 = [
            {
              name: '政策',
            },
            {
              name: '入学',
            },
            {
              name: '学区',
            },
            {
              name: '中考',
            },
            {
              name: '高考',
            },
            {
              name: '暑假',
            },
            {
              name: '考证',
            },
            {
              name: '军人',
            },
          ]
          break
        case '旅游':
          this.typeList1 = [
            {
              name: '节日活动',
            },
            {
              name: '休闲活动',
            },
            {
              name: '演出展览',
            },
            {
              name: '体育赛事',
            },
            {
              name: '景点信息',
            },
            {
              name: '重大活动',
            },
          ]
          break
          case '活动':
          this.typeList1 = [
            {
              name: '博览展会',
            },
            {
              name: '音乐演出',
            },
            {
              name: '剧场演出',
            },
            {
              name: '休闲展览',
            },
            {
              name: '民俗活动',
            },
            {
              name: '光影演出',
            },
            {
              name: '体育赛事',
            },
            {
              name: '摆摊市集',
            },
            {
              name: '时令活动',
            },
            {
              name: '学校开放',
            },
          ]
          break
          case '招聘':         
          this.typeList1 = [
            {
              name: '招聘会',
            },
            {
              name: '事业单位',
            },
            {
              name: '政府部门',
            },
            {
              name: '国企央企',
            },
            {
              name: '军队文职',
            },
            {
              name: '大厂招聘',
            },
          ]
          break
          case '特惠':              
          this.typeList1 = [
            {
              name: '交通',
            },
            {
              name: '文旅',
            },
            {
              name: '餐饮',
            },
            {
              name: '购物',
            },
            {
              name: '生活',
            },
          ]
          break
        case '':
          this.typeList1 = []
          break
      }
    },
    handleCityName(name, val) {
      if (name == 'city_a') {
        this.$EventBus.$emit('aMsg', { city_a: val })
      } else {
        this.$EventBus.$emit('aMsg', { city_b: val })
      }
    },
    handleMark(name, val) {
        this.$EventBus.$emit('remark', { remark: val })
    },
    // 获取vuex中方法
    ...mapMutations(['SETPAGEINFO']),
    /* 存储需要创建的专题模块数据 */
    saveData() {
      this.SETPAGEINFO(this.datas)
    },
    async creatChild() {
      // 创建子页面
      try {
        this.$parent.creatAttr = false
        let params = {
          ...this.$parent.pageSetup,
          ...this.$parent.pageComponentsToParams(),
        }
        await this.$api.reqAddPage(params)
        await this.$parent.getPageList() // 更新子页面列表
        this.$parent.ChildIndex = this.$parent.childrenPageList.length - 1
      } catch (e) {}
    },
  },
  watch: {
    'datas.category_one': {
      handler(newNode) {
        this.changeTypeList()
      },
    },
  },
}
</script>

<style scoped lang="less">
/* 页面设置 */
.decorate {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 20px 20px 16px;
  box-sizing: border-box;

  h2 {
    padding: 21px 16px 22px 0;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
  }

  .block {
    margin-bottom: 12px;
    padding: 17px 20px 24px;
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

    .notice {
      margin-top: 9px;
      font-size: 12px;
      color: #999;
      text-align: justify;
      line-height: 16px;
    }

    .el-radio {
      display: flex;
      margin-top: 16px;
      margin-right: 0;
      color: #333;
      line-height: 19px;

      span {
        color: #999;
        white-space: break-spaces;
      }
    }
  }

  #submit {
    margin: 10px auto 0;
    display: flow-root;
    width: 100px;
    height: 32px;
    border-radius: 5px;
    line-height: 32px;
    border: none;
    background-color: #6065ec;
    color: #fff;
    font-size: 14px;
  }
}
.condition {
  font-size: 14px;
  color: #606266;
  display: flex;
  align-items: center;
  margin-top: 20px;

  > span {
    margin-right: 9px;
  }
}
</style>
<style lang="less">
.decorate {
  .el-textarea__inner {
    height: 72px;
    color: #333;
  }

  .el-form-item__label {
    line-height: normal;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #333;
  }

  .el-select {
    width: 100%;
  }
}
</style>
