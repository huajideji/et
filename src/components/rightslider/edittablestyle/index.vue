<template>
    <div class="edittablestyle" :style="clickStyle">
        <!-- 标题 -->
        <h2>{{ datas.text }}</h2>

        <div class="desc">
            暂无描述
        </div>

        <div class="card header">
            <el-form :model="datas" :rules="rules" label-position="top" ref="header">
                <el-form-item label="模块名称" prop="name">
                    <el-input type="text" v-model="datas.name" autocomplete="off" maxlength="14"></el-input>
                </el-form-item>
                <el-radio v-model="datas.is_show" :label="2">创建人命名</el-radio>
                <el-radio v-model="datas.is_show" :label="1" v-if="routePath != '/moduleSubmit'">编辑自由命名</el-radio>
                <el-radio v-model="datas.is_show" :label="0" style="margin-top:12px">不显示名称</el-radio>
            </el-form>
        </div>
        <div class="card screening">
            <el-form :model="datas" :rules="rules" label-position="top">
                <el-form-item label="展示字段" prop="type">
                    <el-tooltip class="item" effect="light" content="仅当前端需要展示该字段时勾选" placement="bottom">
                        <el-checkbox name="type" @change="changeCity($event)" :checked="!!datas.is_city">城市
                        </el-checkbox>
                    </el-tooltip>
                    <el-tooltip class="item" effect="light" content="仅当前端需要展示该字段时勾选" placement="bottom">
                        <el-checkbox name="type" @change="changeCounty($event)" :checked="!!datas.is_county" v-show="showCounty()">区县
                        </el-checkbox>
                    </el-tooltip>


                </el-form-item>
            </el-form>
        </div>
        <!-- 表格编辑内容 -->
        <div class="card" v-for="(columnItem, index) of columnArr" :key="index">
            <el-form :model="columnItem" :rules="headerRules" label-position="top" ref="columnItem">
                <el-form-item :label="`第${index + 1 + defNum}列列名`" prop="name">
                    <el-input type="text" v-model="columnItem.name" autocomplete="off" @input="handleCheck(columnItem)"
                        maxlength='6'>
                    </el-input>
                </el-form-item>
                  <el-form-item label="数据类型" prop="type" v-if="routePath == '/moduleSubmit'">
                    <el-select v-model="columnItem.type" placeholder="请选择数据类型" @change="chosenType(index)" disabled>
                        <el-option v-for="(item, index) of optionsList" :label="item.text" :value="item.type"
                            :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据类型" prop="type" v-else>
                    <el-select v-model="columnItem.type" placeholder="请选择数据类型" @change="chosenType(index)">
                        <el-option v-for="(item, index) of optionsList" :label="item.text" :value="item.type"
                            :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="指定名称按钮" prop="btn_name" v-if="columnItem.type == 5">
                    <el-input type="text" v-model="columnItem.btn_name" autocomplete="off" maxlength='4'>
                    </el-input>
                </el-form-item>
                <el-form-item label="自定义名称按钮" prop="btn_name" v-else-if="columnItem.type == 6">
                    <el-input type="text" v-model="columnItem.btn_name" autocomplete="off" maxlength='4'>
                    </el-input>
                </el-form-item>

                  <el-form-item
                  label="选择字段"
                  prop="column_name"
                  v-if="routePath == '/moduleSubmit'"
                >
                  <el-select
                    v-model="columnItem.column_name"
                    placeholder="请选择字段名称"
                  >
                    <el-option
                      v-for="(item, index) in checkTextList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
            </el-form>
            <div class="typeText" v-if="routePath != '/moduleSubmit'">
                <div class="text">
                    <el-radio v-model="columnItem.is_required" :label="0">选填</el-radio>
                    <el-radio v-model="columnItem.is_required" :label="1">必填</el-radio>
                </div>
            </div>
            <span class="delete" @click="deleteHeader(index)">
                <i class="el-icon-close"></i>
            </span>
        </div>
        <button class="btn" @click="addColumn()">
            <i class="el-icon-plus"></i>
            <span>列</span>
        </button>
        <div class="others-moudle">
            <p>其他模块属性</p>
            <div class="card folding">
                <span style="margin-right:8px">
                    折叠/展开 >
                </span>
                <el-input placeholder="请选择折叠数" v-model="datas.fold" type="number" size="mini" min="0" max="9">
                </el-input>
                <span style="margin-left:8px">
                    行折叠
                </span>
                <span style="color:#999999; font-size:12px; margin-left:5px">
                    默认为0，不折叠
                </span>
            </div>
            <div class="card">
                <div class="title">
                    跳转其他页面
                </div>
                <div class="redirect-type">
                    <div class="redirect-top">
                        <el-radio-group v-model="datas.jump_type" @change="chosenRedirect">
                            <el-radio :label="0">无</el-radio>
                            <el-radio :label="1">旧专题标识</el-radio>
                            <el-radio :label="2">新专题标识</el-radio>
                            <br/>
                            <el-radio :label="3" style="margin-top:16px" v-if="routePath != '/moduleSubmit'">链接 </el-radio>
                            <span class="tips" style="margin-top:16px" v-if="routePath != '/moduleSubmit'">由各站点编辑自行填写</span>
                            <span v-if="routePath != '/moduleSubmit'"> 
                             <el-radio :label="4" style="margin-top:16px" v-if="!$parent.pageSetup.is_child">子页面入口
                            </el-radio>
                            </span>
                          
                        </el-radio-group>
                    </div>
                    <el-form :model="datas" :rules="rules" label-position="top" ref="jump">
                        <div class="redirect-bottom" v-show="datas.jump_type == 1 || datas.jump_type == 2">
                            <el-form-item label="跳转专题标识" prop="jump_code">
                                <el-input v-model="datas.jump_code" placeholder="请输入跳转专题标识">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="redirect-bottom" v-show="datas.jump_type == 4">
                            <el-form-item label="子页面标识" prop="jump_code">
                                <el-select v-model="datas.jump_code" placeholder="请选择子页面">
                                    <el-option v-for="item in $parent.childrenPageList" :key="item.id"
                                        :label="item.code" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>

                        <div class="jump-type" v-show="datas.jump_type != 0">
                            <el-form-item label=" 入口位置" prop="jump_place"></el-form-item>
                            <div class="type">
                                <div class="type-box">
                                    <div>
                                        <span class="top-right">查看更多
                                            <i class="el-icon-arrow-right"></i>
                                        </span>
                                    </div>
                                    <el-radio v-model="datas.jump_place" :label="0">右上角</el-radio>
                                </div>

                                <div class="type-box">
                                    <div>
                                        <span class="bottom-right">查看更多
                                            <i class="el-icon-arrow-right"></i>
                                        </span>
                                    </div>
                                    <el-radio v-model="datas.jump_place" :label="1">右下角</el-radio>
                                </div>
                                <div class="type-box">
                                    <div>
                                        <span class="under">查看更多
                                            <i class="el-icon-arrow-right"></i>
                                        </span>
                                    </div>
                                    <el-radio v-model="datas.jump_place" :label="2" :disabled="!!(+datas.fold)">正下方
                                    </el-radio>
                                </div>
                                <div class="type-box">
                                    <div class="">
                                    </div>
                                    <el-radio v-model="datas.jump_place" :label="3" disabled>整个模块</el-radio>
                                </div>
                            </div>
                        </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="card add-search">
                <div class="switch-box" :class="{ padding: datas.is_search }">
                    <span>
                        增加搜索功能
                    </span>
                    <div class="switch" :class="{ 'isOn': datas.is_search }" @click="chosenSwitch">
                        <span class="radius"></span>
                    </div>
                    <span class="tips" style="transform: translateX(20px);">
                        若修改列信息，搜索功能需要重新填写
                    </span>
                </div>
                <template v-if="datas.is_search">
                    <div class="search-field">
                        <span>
                          <span style="color:red">*</span>
                            搜索字段
                        </span>
                        <span class="tips">
                            选填、按钮不可为搜索项
                        </span>
                    </div>
                    <div class="field-table">
                        <el-table ref="multipleTable" :data="fieldArr" tooltip-effect="dark" style="width: 100%"
                            :header-cell-style="{ background: '#f8f8f8', color: '#333333', fontSize: '14px', fontWeight: '400', }"
                            :cell-style="{ background: '#f8f8f8' }" header-align="center"
                            @selection-change="handleSelectionChange">
                            <el-table-column type="selection">
                            </el-table-column>
                            <el-table-column prop="name" label="字段名称" align="center">
                            </el-table-column>
                            <el-table-column prop="type" label="字段类型" align="center">
                                <template slot-scope="scope">
                                    {{ optionsData[scope.row.type] }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-form :model="datas" :rules="rules" label-position="top" ref="datas">
                        <div class="guideWords">
                            <el-form-item label="引导文字" style="margin-top:18px">
                                <!-- prop="guide_text" -->
                                <el-input type="textarea" v-model="datas.guide_text" placeholder="例：搜索网点名称" :rows="2">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="emptyPrompt">
                            <el-form-item label="无结果提示" prop="no_tips">
                                <span class="tips" style="margin-left:0">当没有查询到结果时的回复文字</span>
                                <el-input type="textarea" v-model="datas.no_tips" placeholder="例：暂无数据">
                                </el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </template>
            </div>
			<div class="card add-search">
				<div class="switch-box" :class="{ padding: datas.is_search }">
					<span> 选项卡 </span>
					<div class="switch" :class="{ isOn: datas.is_option }" @click="chosenSwitchTwo">
						<span class="radius"></span>
					</div>
				</div>
			</div>
			
			<template v-if="datas.is_option==1">
				<div class="card" v-show="xuanList.length > 0" v-for="(item, index) of xuanList"
					:key="index">
					<el-form :model="item" :rules="xuanRules" label-position="top" ref="xuanlist">
						<el-form-item :label="`选项卡${index + 1}名称`" prop="name">
							<el-input type="text" v-model="item.name" autocomplete="off"
								@input="handleCheck(item)" maxlength="10" placeholder="">
							</el-input>
						</el-form-item>
					</el-form>
					<span class="delete" @click="deletexuan(index)">
						<i class="el-icon-close"></i>
					</span>
				</div>
				<button class="btn" @click="addxuan()">
					<i class="el-icon-plus"></i>
					<span>选项卡+</span>
				</button>
			</template>
        </div>

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
import { mapMutations } from 'vuex'
import utils from '../../../utils'
export default {
  name: 'edittablestyle',
  props: {
    datas: Object,
  },
  data() {
    return {
		xuanList: [],
      routePath: '',
      columnArr: [
        // {
        //     name: "电话1",	//字段名称
        //     type: 9,	//字段类型
        //     is_required: 0,//是否必填 0 不必填 1必填
        //     is_select: 0,	//是否运用筛选条件选择框
        //     default: 0 //是否默认字段
        // },
      ],
      defaultArr: ['城市', '区县', '排序', '发布时间'],
      // multipleSelection: [],
      optionsData: [
        '文本',
        '数值',
        '区县',
        '地址(区县+街道选填+具体地址选填)',
        '城市',
        '指定名称按钮',
        '自定义名称按钮',
        '调用数据(本版本不支持)',
        '日期+时刻',
        '电话+备注',
        '超链接文本',
      ],
      optionsList: [
        {
          text: '文本',
          type: 0,
        },
        {
          text: '数值',
          type: 1,
        },
        //    {
        //     text: '区县',
        //     type: 2,
        //    },
        {
          text: '地址(区县+街道选填+具体地址选填)',
          type: 3,
        },
        // {
        //     text: '城市',
        //     type: 4,
        // },
        {
          text: '指定名称按钮',
          type: 5,
        },
        {
          text: '自定义名称按钮',
          type: 6,
        },
        //    {
        //     text: '调用数据(本版本不支持)',
        //     type: 7,
        //    },
        {
          text: '日期+时刻',
          type: 8,
        },
        {
          text: '电话+备注',
          type: 9,
        },
        {
          text: '超链接文本',
          type: 10,
        },
      ],
      // 字段选择下拉框数据
      checkTextList: [],
      rules: {
        name: [{ required: true, message: '请输入该列名称', trigger: 'blur' }],
        no_tips: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        jump_code: [
          { required: true, message: '标识不能为空', trigger: 'change' },
        ],
        jump_place: [
          { required: true, message: '请选择入口位置', trigger: 'change' },
        ],
        guide_text: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
      }, // 模块名称校验
      headerRules: {
        name: [{ required: true, message: '请输入该列名称', trigger: 'blur' }],
        type: [
          { required: true, message: '请选择模块类型', trigger: 'change' },
        ],
        btn_name: [
          { required: true, message: '请输入按钮名称', trigger: 'blur' },
        ],
        column_name: [
          { required: true, message: '请选择字段名称', trigger: 'blur' },
        ],
      }, // 表头校验

      clickStyle: 'pointer-events:auto',
    }
  },
  watch: {
	  xuanList: {
	  	handler(newVal) {
	  		if (this.xuanList.length > 0) {
	  			let newStr = []
	  			this.xuanList.forEach((aitem) => {
	  				newStr.push(aitem.name)
	  			})
	  			this.datas.option_data = newStr.join("^")
	  			console.log(this.datas.option_data)
	  		}
	  	},
	  	// 开启深度监听
	  	deep: true,
	  },
    columnArr: {
      handler(newVal) {
        // this.chosenSwitch()
        this.datas.value_list = [...newVal]
      },
      // 开启深度监听
      deep: true,
    },
  },
  computed: {
    fieldArr() {
      let arr = []
      this.columnArr.forEach((item) => {
        if (item.type !== 5 && item.type !== 6 && item.is_required == 1) {
          arr.push({
            type: item.type,
            name: item.name,
          })
        }
      })
      if (this.datas.is_city) {
        arr.push({
          type: 0,
          name: '城市',
        })
      }
      if (this.datas.is_county) {
        arr.push({
          type: 0,
          name: '区县',
        })
      }
      return arr
    },
    defNum() {
      let number = 0
      if (this.datas.is_city) number += 1
      if (this.datas.is_county) number += 1
      return number
    },
    showFold() {
      if (this.datas.jump_place == 2) {
        this.datas.fold = 0
        this.isFolding = '0'
        return true
      }
      return false
    },
  },
  mounted() {
    this.routePath = this.$route.path

    let arr = JSON.parse(sessionStorage.getItem('screenList'))
    if (arr) {
      arr.forEach((item) => {
        let obj = {
          value: item,
          label: item,
        }
        this.checkTextList.push(obj)
      })
    }
    // 如果是表格关联模块生成的，则不可编辑
    if (this.datas.is_table == 1) {
      this.clickStyle = 'pointer-events:none'
    } else {
      this.clickStyle = 'pointer-events:auto'
    }

    // console.log(this.$parent.childrenPageList)

    this.columnArr = this.datas.value_list.filter((item) => item.default == 0)
    // 勾选默认筛选字段
    if (this.datas.search_field.length) {
      const rows = JSON.parse(this.datas.search_field)
      this.toggleSelection(rows)
    }
  },

  methods: {
    ...mapMutations('table', ['SETTABLE']),
	chosenSwitchTwo() {
		this.datas.is_option == 0 ?
			(this.datas.is_option = 1) :
			(this.datas.is_option = 0)
	},
	inset() {
		if (this.datas.is_option == 1 && this.xuanList == []) {
	
			this.datas.option_data.forEach((item) => {
				this.xuanList.push({
					name: item
				})
			})
		}
	},
    changeCity(e) {
      if (e) {
        this.datas.is_city = 1
      } else {
        this.datas.is_city = 0
      }
    },
    showCounty() {
      if (this.routePath != '/moduleSubmit') {
        return true
      } else {
        if (sessionStorage.getItem('screenList')) {
          let arr = JSON.parse(sessionStorage.getItem('screenList'))
          let flag = 0
          arr.forEach((item) => {
            if (item == '区县') {
              flag = 1
            }
          })
          if (flag == 1) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      }
    },
    changeCounty(e) {
      if (e) {
        this.datas.is_county = 1
      } else {
        this.datas.is_county = 0
      }
    },
    handleCheck(item) {
      if (this.routePath != '/moduleSubmit') {
        if (this.defaultArr.includes(item.name)) {
          this.$message.error('名字与默认表头冲突')
          item.name = ''
        }
      }
    },
    // 删除表头某列
    deleteHeader(index) {
      this.columnArr.splice(index, 1)
    },
    // 数据类型变换清空按钮值
    chosenType(index) {
      this.columnArr[index].btn_name = ''
    },
    // 添加表头列
    addColumn() {
      // 列数不超过6
      if (this.columnArr.length + this.defNum < 6) {
        if (this.routePath == '/moduleSubmit') {
          this.columnArr.push({
            id: 0,
            name: '', //字段名称
            type: 0, //字段类型
            is_required: 1, //是否必填 0 不必填 1必填
            is_select: 0, //是否运用筛选条件选择框
            default: 0, //是否默认字段
            btn_name: '', // 数据类型为按钮添加
          })
        } else {
          this.columnArr.push({
            id: 0,
            name: '', //字段名称
            type: 0, //字段类型
            is_required: 0, //是否必填 0 不必填 1必填
            is_select: 0, //是否运用筛选条件选择框
            default: 0, //是否默认字段
            btn_name: '', // 数据类型为按钮添加
          })
        }
      } else {
        // this.$notify({
        //     message: '表格列数不能超过6',
        //     type: 'warning',
        //     showClose: false,
        //     duration: 1000,
        // });
        this.$message.error('表格列数不能超过6')
      }
    },
    // 表格选中回调
    handleSelectionChange(val) {
      this.datas.search_field = JSON.stringify(val)
      if (this.datas.search_field == '[]') {
        this.datas.guide_text = ''
        this.datas.no_tips = '暂无数据'
      }
    },
    // 更改选择跳转类型，入口位置置空
    chosenRedirect() {
      this.$refs.jump.resetFields()
      this.datas.jump_place = 0
      this.datas.jump_code = ''
      this.datas.jump_type == 0
        ? (this.datas.jump_place = 4)
        : (this.datas.jump_place = 0)
    },
    // 搜索功能回调
    chosenSwitch() {
      this.datas.is_search == 0
        ? (this.datas.is_search = 1)
        : (this.datas.is_search = 0)
      if (!this.datas.is_search) {
        this.datas.search_field = ''
        this.datas.guide_text = ''
        this.datas.no_tips = '暂无数据'
      }
    },
	deletexuan(contentIndex) {
		// 删除模块下字段
		this.xuanList.splice(contentIndex, 1)
	},
	
	addxuan() {
		this.xuanList.push({
			name: '', //选项名称
		})
	},
    // 更改下拉框选中
    toggleSelection(rows) {
      if (rows) {
        this.$nextTick(() => {
          rows.forEach((row, index) => {
            this.fieldArr.forEach((item) => {
              if (row.name == item.name) {
                this.$refs.multipleTable.toggleRowSelection(item, true)
              }
            })
          })
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    /* 存储需要创建的专题模块数据 */
    saveData() {
      let value = true
      if (!this.datas.name.length) {
        value = false
        this.$refs.header.validate((valid) => {
          if (!valid) {
            return false
          }
        })
      }
      this.columnArr.map((item, index) => {
        if (utils.fieldObjectValueHaveEmpty(item)) {
          this.$refs.columnItem[index].validate((valid) => {
            if (!valid) {
              value = false
              return false
            }
          })
        }
      })
	  if (this.datas.is_option == 1) {
	  	this.xuanList.map((item, index) => {
	  		if (utils.fieldObjectValueHaveEmpty(item)) {
	  			this.$refs.xuanlist[index].validate((valid) => {
	  				if (!valid) {
	  					value = false
	  					return false
	  				}
	  			})
	  		}
	  	})
	  }
	  if (!value) return
      if (this.datas.jump_type && this.datas.jump_type != 3) {
        if (this.datas.jump_code.length == 0 || this.datas.jump_place == 4) {
          value = false
          this.$refs.jump.validate((valid) => {
            if (!valid) {
              return false
            }
          })
        }
      }
      if (this.datas.is_search) {
        if (
          this.datas.no_tips == '' ||
          this.datas.search_field == '[]' ||
          this.datas.search_field.length == 0
        ) {
          value = false
          this.$refs.datas.validate((valid) => {
            if (!valid) {
              return false
            }
          })
        }
      }
      if (!value) {
        // this.$notify({
        //     message: '请完成必填项',
        //     type: 'warning',
        //     showClose: false,
        //     duration: 1000,
        // });
        this.$message.error('请完成必填项')
        return
      }
      // this.$notify({
      //     message: '保存成功',
      //     type: 'success',
      //     showClose: false,
      //     duration: 1000,
      // });
      this.$message.success('当前模块填写完整')
    },
  },
}
</script>

<style scoped lang="less">
.edittablestyle {
  > h2 {
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

  .tips {
    font-size: 12px;
    color: #666666;
    margin-left: -18px;
    margin-right: 20px;
  }

  .card {
    background: #f8f8f8;
    border-radius: 4px;
    padding: 18px 10px;
    margin: 12px 0;
    position: relative;

    &.header {
      margin: 25px 0;
    }

    .detail {
      margin-right: 15px;
    }

    .delete {
      position: absolute;
      top: 14px;
      right: 20px;
      font-size: 18px;
      font-weight: bolder;
      cursor: pointer;
    }
  }

  .screening {
    padding-bottom: 10px;
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

          > div {
            width: 158px;
            height: 87px;
            border-radius: 2px;
            border: 1px solid rgba(217, 217, 217, 1);
            background-color: #fff;
            margin-bottom: 8px;
            position: relative;

            > span {
              color: #6065ec;
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

  // 添加搜索样式
  .add-search {
    font-size: 14px;
    color: #333;
    font-weight: 400;
    padding-bottom: 8px;

    .switch-box {
      display: flex;
      align-items: center;

      &.padding {
        padding-bottom: 18px;
      }

      > span {
        margin-right: 12px;
      }

      > img {
        width: 48px;
        height: 24px;
      }

      .switch {
        width: 48px;
        height: 24px;
        background-color: #d9d9d9;
        position: relative;
        border-radius: 12px;
        transition: all 0.2s linear;

        .radius {
          display: block;
          width: 20px;
          height: 20px;
          border-radius: 10px;
          margin-top: 2px;
          background-color: #fff;
          position: absolute;
          left: 3px;
        }

        &.isOn {
          background-color: #6065ec;

          .radius {
            left: 25px;
          }
        }
      }
    }

    .search-field {
      .tips {
        margin-left: 8px;
        color: #999999;
        font-size: 12px;
      }
    }

    .guideWords {
      > span {
        display: block;
        margin-bottom: 12px;
      }
    }

    .emptyPrompt {
      margin-top: 12px;

      .tips {
        color: #666666;
      }
    }
  }

  .typeText {
    display: flex;

    .text {
      width: 250px;
    }
  }

  .btn {
    width: 90px;
    height: 32px;
    border-radius: 4px;
    background-color: #6065ec;
    color: #fff;
    border: none;
    margin-bottom: 20px;
    margin-top: 8px;
    font-size: 12px;
  }

  .title {
    font-size: 14px;
    color: #333333;
    margin-bottom: 18px;
  }
}
</style>
<style lang="less">
.edittablestyle {
  .el-form-item {
    margin-bottom: 16px;
  }

  .card {
    .el-select {
      width: 100%;
    }
  }

  .others-moudle {
    .folding {
      .el-input {
        width: 60px;
      }

      .foldingNum {
        margin-right: 10px;
        margin-left: 20px;
      }
    }

    .type-box {
      .el-radio {
        display: flex;
        justify-content: center;
      }
    }
  }

  .redirect-bottom {
    .el-input {
      height: 32px;

      .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: none;
  }

  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: #f8f8f8;
  }

  .el-table tr {
    background-color: #f8f8f8;
  }

  .el-textarea__inner {
    min-height: 72px !important;
  }

  .el-form-item__content {
    line-height: 24px;
  }
}
</style>