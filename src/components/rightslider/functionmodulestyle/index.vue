<template>
  <div class="function_modulestyle" :style="clickStyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>
    <!-- 名称 -->
    <div class="card header" v-if="$route.query.type == 1">
      <el-form :model="datas" :rules="rules" label-position="top" ref="header">
        <el-radio v-model="datas.is_point" :label="1"
          >AB有关的点对点逻辑</el-radio
        >
        <el-radio v-model="datas.is_point" :label="2" style="margin-top: 12px"
          >只与A城市有关</el-radio
        >
        <el-radio v-model="datas.is_point" :label="0" style="margin-top: 12px"
          >只与B城市有关</el-radio
        >
      </el-form>
    </div>
    <div class="card header">
      <el-form :model="datas" :rules="rules" label-position="top" ref="header">
        <el-form-item label="模块名称" prop="name">
          <el-input
            type="text"
            v-model="datas.name"
            autocomplete="off"
            maxlength="14"
          ></el-input>
        </el-form-item>
        <el-radio v-model="datas.is_show" :label="2">创建人命名</el-radio>
        <el-radio
          v-model="datas.is_show"
          :label="1"
          v-if="routePath != '/moduleSubmit'"
          >编辑自由命名</el-radio
        >
        <el-radio v-model="datas.is_show" :label="0" style="margin-top: 12px"
          >不显示名称</el-radio
        >
      </el-form>

      <el-checkbox @change="changeAddress($event)" :checked="!!datas.is_address"
        >地址字段</el-checkbox
      >
      <div style="margin-top: 20px">
        <span>图片选项:</span>
        <el-select v-model="datas.is_image" placeholder="请选择字段名称">
          <el-option label="不插图片" value="0"></el-option>
          <el-option label="插入图片且图片必填" value="1"></el-option>
          <el-option label="插入图片且图片选填" value="2"></el-option>
        </el-select>
      </div>
      <div v-if="datas.is_image != '0'" style="margin-top: 20px">
        <span>图片填写备注：</span>
        <el-input v-model="datas.image_remark"></el-input>
      </div>
      <el-form :model="datas" label-position="top">
        <el-form-item
          label="地址字段"
          v-if="routePath == '/moduleSubmit' && datas.is_address"
          style="margin-top: 10px"
        >
          <el-select v-model="datas.address" placeholder="请选择字段名称">
            <el-option
              v-for="(item, index) in checkTextList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="card header" v-if="routePath == '/moduleSubmit'">
      <el-form :model="datas" :rules="rules" label-position="top" ref="header">
        <el-form-item label="网点名称字段" style="margin-top: 10px">
          <el-select v-model="datas.title" placeholder="请选择字段名称">
            <el-option
              v-for="(item, index) in checkTextList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 筛选条件 -->
    <div class="card screening" v-show="showCounty()">
      <el-form :model="datas" :rules="rules" label-position="top">
        <el-form-item label="筛选条件" prop="type">
          <el-checkbox
            name="type"
            @change="changeCounty($event)"
            :checked="!!datas.county_condition"
            >区县
          </el-checkbox>
          <el-checkbox
            name="type"
            v-model="checkStreet"
            @change="changeStreet($event)"
            :disabled="Boolean(!datas.is_address)"
            v-if="routePath != '/moduleSubmit'"
            >街道
          </el-checkbox>
          <span
            style="font-size: 12px; color: #999999"
            v-if="routePath != '/moduleSubmit'"
          >
            请先勾选地址字段
          </span>
        </el-form-item>
      </el-form>
      <!-- <el-checkbox name="type" v-model="others" @change="changeOthers()" style="margin-top: 10px;">其他，请填写
            </el-checkbox>
            <span class="tips" v-if="others" style="margin-left:0">
                类型之间用^隔开
            </span>
            <el-input v-if="others" type="textarea" v-model="datas.other_condition" size="mini">
                placeholder="例：24小时可做核算^6小时出结果^24小时可做核算且6小时出结果">
            </el-input> -->
    </div>
    <!-- <el-button @click="addsx()">添加筛选项+</el-button> -->

    <!-- <div class="card" v-show="sxList.length > 0" v-for="(item, index) of sxList" :key="index">
			<el-form :model="item" :rules="sxRules" label-position="top" ref="sxList">
				<el-form-item :label="`筛选项${index + 1}名称`" prop="name">
					<el-input type="text" v-model="item.name" autocomplete="off" @input="handleCheck(item)"
						maxlength="10" placeholder="例：性别">
					</el-input>
				</el-form-item>
				<el-form-item label="筛选类型(类型之间用^隔开) " prop="select_value">
					<el-input type="text" v-model="item.select_value" autocomplete="off" @input="handlesxtype(item)"
						placeholder="例：男^女" :disabled="routePath == '/moduleSubmit' ? true : false">
					</el-input>
				</el-form-item>

				<el-form-item label="选择字段" prop="column_name" v-if="routePath == '/moduleSubmit'">
					<el-select v-model="item.column_name" placeholder="请选择字段名称" @change="columnChange($event, item)">
						<el-option v-for="(item, index) in checkTextList" :key="index" :label="item.label"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span class="delete" @click="deletesx(index)">
				<i class="el-icon-close"></i>
			</span>
		</div>
		<button class="btn" @click="addsx()">
			<i class="el-icon-plus"></i>
			<span>添加筛选项</span>
		</button> -->
    <!-- 模块卡片 -->
    <div v-if="contentArr">
      <section class="networkList">
        <div class="content-box">
          <!-- 字段内容 -->
          <div class="field">
            <p>标签设置</p>
            <div
              class="card"
              v-for="(contentItem, index) of contentArr"
              :key="index"
            >
              <el-form
                :model="contentItem"
                :rules="contentRules"
                label-position="top"
                ref="contentItem"
              >
                <el-form-item :label="`字段${index + 1}名称`" prop="name">
                  <el-input
                    type="text"
                    v-model="contentItem.name"
                    autocomplete="off"
                    @input="handleCheck(contentItem)"
                    maxlength="10"
                  >
                  </el-input>
                </el-form-item>

                <el-form-item
                  label="数据类型"
                  prop="type"
                  v-if="routePath == '/moduleSubmit'"
                >
                  <el-select
                    v-model="contentItem.type"
                    placeholder="请选择数据类型"
                    disabled
                  >
                    <el-option label="文本" :value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="数据类型" prop="type" v-else>
                  <el-select
                    v-model="contentItem.type"
                    placeholder="请选择数据类型"
                  >
                    <!-- <el-option label="电话号码+备注" :value="9"></el-option> -->
                    <el-option label="日期+时刻" :value="8"></el-option>
                    <el-option label="文本" :value="0"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label="选择字段"
                  prop="column_name"
                  v-if="routePath == '/moduleSubmit'"
                >
                  <el-select
                    v-model="contentItem.column_name"
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
                <el-form-item label="字段备注" prop="remark" >
                <div style="margin-bottom: 12px;">
                <el-input
                    type="text"
                    v-model="contentItem.remark"
                    placeholder="请输入该字段的备注"
                  >
                  </el-input>
              </div>
                </el-form-item>
              </el-form>
              <div class="typeText" v-if="routePath != '/moduleSubmit'">
                <div class="text">
                  <el-radio v-model="contentItem.is_required" :label="0"
                    >选填
                  </el-radio>
                  <el-radio v-model="contentItem.is_required" :label="1"
                    >必填
                  </el-radio>
                </div>
              </div>
              <!-- <el-switch style="margin-top: 15px" v-model="contentItem.is_remark" inactive-color="#ff4949"
								active-text="提示" inactive-text="无提示" :active-value="1" :inactive-value="0"
								v-if="routePath != '/moduleSubmit'" @change="changeToast(index)">
							</el-switch> -->
              <span class="delete" @click="deleteContent(index)">
                <i class="el-icon-close"></i>
              </span>
            </div>
            <button class="btn" @click="addContent()">
              <i class="el-icon-plus"></i>
              <span>新增标签</span>
            </button>
          </div>
          <!-- 按钮内容 -->
          <div class="btn-group">
            <p>按钮设置</p>
            <div class="card" v-for="(btnItem, index) of btnArr" :key="index">
              <el-form
                :model="btnItem"
                :rules="btnRules"
                label-position="top"
                ref="btnItem"
              >
                <el-form-item :label="`按钮${index + 1}名称`" prop="name">
                  <el-input
                    type="text"
                    v-model="btnItem.name"
                    autocomplete="off"
                    @input="handleCheck(btnItem)"
                    maxlength="6"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="数据类型"
                  prop="type"
                  v-if="routePath == '/moduleSubmit'"
                >
                  <el-select
                    v-model="btnItem.type"
                    placeholder="请选择按钮类型"
                    @change="changeBtnName(btnItem, index)"
                    disabled
                  >
                    <el-option label="指定名称按钮" :value="5"></el-option>
                    <el-option label="自定义名称按钮" :value="6"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="数据类型" prop="type" v-else>
                  <el-select
                    v-model="btnItem.type"
                    placeholder="请选择按钮类型"
                    @change="changeBtnName(btnItem, index)"
                  >
                    <el-option label="自定义名称按钮" :value="6"></el-option>
                    <el-option label="指定名称按钮" :value="5"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label="选择字段"
                  prop="column_name"
                  v-if="routePath == '/moduleSubmit'"
                >
                  <el-select
                    v-model="btnItem.column_name"
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
                <el-form-item label="字段备注" prop="remark" >
                <div style="margin-bottom: 12px;">
                <el-input
                    type="text"
                    v-model="btnItem.remark"
                    placeholder="请输入该字段的备注"
                  >
                  </el-input>
              </div>
                </el-form-item>
                <!-- <el-form-item
                  label="链接"
                  v-if="routePath == '/moduleSubmit'"
                >
                  <el-select
                    v-model="btnItem.btn_url"
                    placeholder="请选择链接"
                  >
                    <el-option
                      v-for="(item, index) in checkTextList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item> -->
              </el-form>
              <div class="typeText" v-if="routePath != '/moduleSubmit'">
                <div class="text">
                  <el-radio v-model="btnItem.is_required" :label="0"
                    >选填
                  </el-radio>
                  <el-radio v-model="btnItem.is_required" :label="1"
                    >必填
                  </el-radio>
                </div>
              </div>
              <span class="delete" @click="deleteBtn(index)">
                <i class="el-icon-close"></i>
              </span>
            </div>
            <div class="btn-box">
              <button class="btn" @click="addBtn()">
                <i class="el-icon-plus"></i>
                <span>新增按钮</span>
              </button>
              <span> 最多可添加两个按钮 </span>
            </div>
          </div>
          <div class="others-moudle">
            <p>其他模块属性</p>
            <div class="card folding">
              <span style="margin-right: 8px"> 折叠/展开 > </span>
              <el-input
                placeholder="请选择折叠数"
                v-model="datas.fold"
                type="number"
                size="mini"
                min="0"
                max="9"
              >
              </el-input>
              <span style="margin-left: 8px"> 行折叠 </span>
              <span style="color: #999999; font-size: 12px; margin-left: 5px">
                默认为0，不折叠
              </span>
              <!-- <div class="card add-search">
								<div class="switch-box">
									<span> 内容折叠 </span>
									<div class="switch" :class="{ isOn: datas.is_fold }" @click="chosenSwitchThree">
										<span class="radius"></span>
									</div>
								</div>
							</div> -->
            </div>

            <div class="card add-search">
              <div class="switch-box" :class="{ padding: datas.is_search }">
                <span> 增加搜索功能 </span>
                <div
                  class="switch"
                  :class="{ isOn: datas.is_search }"
                  @click="chosenSwitch"
                >
                  <span class="radius"></span>
                </div>
                <span class="tips" style="transform: translateX(20px)">
                  若修改列信息，搜索功能需要重新填写
                </span>
              </div>
              <template v-if="datas.is_search">
                <div class="search-field">
                  <span> <span style="color: red">*</span> 搜索字段 </span>
                  <span class="tips"> 选填、按钮不可为搜索项 </span>
                </div>
                <div class="field-table">
                  <el-table
                    ref="multipleTable"
                    :data="fieldArr"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :header-cell-style="{
                      background: '#f8f8f8',
                      color: '#333333',
                      fontSize: '14px',
                      fontWeight: '400',
                    }"
                    :cell-style="{ background: '#f8f8f8' }"
                    header-align="center"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection"> </el-table-column>
                    <el-table-column
                      prop="name"
                      label="字段名称"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="字段类型"
                      align="center"
                    >
                      <template slot-scope="scope">
                        {{ optionsList[scope.row.type] }}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <el-form
                  :model="datas"
                  :rules="rules"
                  label-position="top"
                  ref="datas"
                >
                  <div class="guideWords" style="margin-top: 18px">
                    <el-form-item label="引导文字">
                      <!-- prop="guide_text" -->
                      <el-input
                        type="textarea"
                        v-model="datas.guide_text"
                        placeholder="例：搜索网点名称"
                        :rows="2"
                      >
                      </el-input>
                    </el-form-item>
                  </div>
                  <div class="emptyPrompt">
                    <el-form-item label="无结果提示" prop="no_tips">
                      <span class="tips" style="margin-left: 0"
                        >当没有查询到结果时的回复文字</span
                      >
                      <el-input
                        type="textarea"
                        v-model="datas.no_tips"
                        placeholder="例：暂无数据"
                      >
                      </el-input>
                    </el-form-item>
                  </div>
                </el-form>
              </template>
              <div class="card add-search">
                <div class="switch-box" :class="{ padding: datas.is_search }">
                  <span> 选项卡 </span>
                  <div
                    class="switch"
                    :class="{ isOn: datas.is_option }"
                    @click="chosenSwitchTwo"
                  >
                    <span class="radius"></span>
                  </div>
                </div>
              </div>

              <template v-if="datas.is_option == 1">
                <div
                  class="card"
                  v-show="xuanList.length > 0"
                  v-for="(item, index) of xuanList"
                  :key="index"
                >
                  <el-form
                    :model="item"
                    :rules="xuanRules"
                    label-position="top"
                    ref="xuanlist"
                  >
                    <el-form-item :label="`选项卡${index + 1}名称`" prop="name">
                      <el-input
                        type="text"
                        v-model="item.name"
                        autocomplete="off"
                        @input="handleCheck(item)"
                        maxlength="10"
                        placeholder=""
                      >
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
          </div>
        </div>
      </section>
    </div>

    <!-- <button id="save" @click="saveData">
            保存
        </button> -->

    <div style="height: 100px"></div>
    <div class="saveBtn flex">
      <span class="saveForm" @click="saveData">保存</span>

      <!-- <div style="height: 100px"></div>
      <div class="saveBtn flex">
        <span class="saveForm" @click="saveData">检查</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import utils from '../../../utils'
import axios from 'axios'
export default {
  name: 'function_modulestyle',
  props: {
    datas: Object,
  },
  data() {
    return {
      routePath: '',
      Toastvalue: '',
      sxList: [],
      xuanList: [],
      dragOptions: {
        //拖拽配置
        animation: 200,
      },
      checkStreet: false,
      checked: true,
      others: false,
      contentArr: [],
      btnArr: [],
      defaultArr: ['城市', '区县', '排序', '发布时间'],
      optionsList: [
        '文本',
        '数值',
        '区县',
        '地址(区县+街道选填+具体地址选填)',
        '序号',
        '指定名称按钮',
        '自定义名称按钮',
        '调用数据(本版本不支持)',
        '日期+时刻',
        '电话+备注',
        '超链接文本',
      ],
      // 字段选择下拉框数据
      checkTextList: [],
      rules: {
        name: [
          {
            required: true,
            message: '请输入模块名称',
            trigger: 'blur',
          },
        ],
        title: [
          {
            required: true,
            message: '请选择字段',
            trigger: 'change',
          },
        ],
        no_tips: [
          {
            required: true,
            message: '请输入内容',
            trigger: 'blur',
          },
        ],
        guide_text: [
          {
            required: true,
            message: '请输入内容',
            trigger: 'blur',
          },
        ],
      }, // 模块验证列表
      xuanRules: {
        name: [
          {
            required: true,
            message: '请输入选项名称',
            trigger: 'blur',
          },
        ],
      },
      contentRules: {
        name: [
          {
            required: true,
            message: '请输入字段名称',
            trigger: 'blur',
          },
        ],
        type: [
          {
            required: true,
            message: '请选择模块类型',
            trigger: 'change',
          },
        ],
        column_name: [
          {
            required: true,
            message: '请选择字段名称',
            trigger: 'change',
          },
        ],
      }, // 内容验证
      sxRules: {
        name: [
          {
            required: true,
            message: '请输入筛选名称',
            trigger: 'blur',
          },
        ],
        select_value: [
          {
            required: true,
            message: '请选择筛选类型',
            trigger: 'change',
          },
        ],
        column_name: [
          {
            required: true,
            message: '请选择字段名称',
            trigger: 'change',
          },
        ],
      }, // 内容验证
      btnRules: {
        name: [
          {
            required: true,
            message: '请输入按钮名称',
            trigger: 'change',
          },
        ],
        type: [
          {
            required: true,
            message: '请选择模块类型',
            trigger: 'change',
          },
        ],
        column_name: [
          {
            required: true,
            message: '请选择字段名称',
            trigger: 'change',
          },
        ],
      }, // 按钮验证

      clickStyle: 'pointer-events:auto',
    }
  },
  watch: {
    // 切换其他选中状态，筛选条件置空
    // others() {
    //     this.datas.other_condition = ''
    // },
    // 动态更改datas
    contentArr: {
      handler(newVal) {
        this.datas.value_list = [...newVal, ...this.btnArr, ...this.sxList]
      },
      // 开启深度监听
      deep: true,
    },
    btnArr: {
      handler(newVal) {
        this.datas.value_list = [...this.contentArr, ...newVal, ...this.sxList]
      },
      // 开启深度监听
      deep: true,
    },
    sxList: {
      handler(newVal) {
        this.datas.value_list = [...this.contentArr, ...newVal, ...this.btnArr]
      },
      // 开启深度监听
      deep: true,
    },
    xuanList: {
      handler(newVal) {
        if (this.xuanList.length > 0) {
          let newStr = []
          this.xuanList.forEach((aitem) => {
            newStr.push(aitem.name)
          })
          this.datas.option_data = newStr.join('^')
          console.log(this.datas.option_data)
        }
      },
      // 开启深度监听
      deep: true,
    },
  },
  computed: {
    fieldArr() {
      let arr = []
      this.contentArr.forEach((item) => {
        if (item.is_required != 0) {
          arr.push({
            type: item.type,
            name: item.name,
          })
        }
      })

      arr.unshift({
        type: 0,
        name: '网点名称',
      })

      return arr
    },
  },
  created() {},
  mounted() {
    if (this.datas.is_option == 1 && this.xuanList.length == 0) {
      this.datas.option_data.split('^').forEach((item) => {
        this.xuanList.push({
          name: item,
        })
      })
    }
	this.datas.is_image = this.datas.is_image.toString()
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
    if (this.datas.is_table == 1 && this.$route.query.id) {
      this.clickStyle = 'pointer-events:none'
    } else {
      this.clickStyle = 'pointer-events:auto'
    }

    if (this.datas.street_condition == 1) {
      this.checkStreet = true
    }
    if (this.datas.other_condition.length) {
      this.others = true
    }
    this.btnArr = this.datas.value_list.filter(
      (item) => item.type == 5 || item.type == 6
    )
    this.btnArr.forEach((item) => {
      if (item.hasOwnProperty('btn_name')) {
        item.btn_name = '-'
      }
    })
    this.contentArr = this.datas.value_list.filter(
      (item) => item.type == 0 || item.type == 8 || item.type == 9
    )
    this.sxList = this.datas.value_list.filter((item) => item.type == 11)
    this.contentArr.forEach((item) => {
      if (item.hasOwnProperty('btn_name')) {
        item.btn_name = '-'
      }
    })
    // 勾选默认筛选字段
    if (this.datas.search_field.length) {
      const rows = JSON.parse(this.datas.search_field)
      this.toggleSelection(rows)
    }
  },

  methods: {
    inset() {
      if (this.datas.is_option == 1 && this.xuanList == []) {
        this.datas.option_data.forEach((item) => {
          this.xuanList.push({
            name: item,
          })
        })
      }
    },
    // 筛选项字段变更
    async columnChange(e, item) {
      let params = {
        id: this.$route.query.table_id,
        column_name: e,
      }
      const res = await this.$api.getSelectValue(params)
      item.select_value = res
    },
    changeToast(val) {},
    handlesxtype(val) {
      item.select_value = val
    },
    addsx() {
      this.sxList.push({
        id: 0,
        name: '', //字段名称
        type: 11, //字段类型
        is_required: 1, //是否必填 0 不必填 1必填
        is_select: 1, //是否运用筛选条件选择框
        default: 0, //是否默认字段
        select_value: '',
      })
    },
    // 获取vuex中方法
    ...mapMutations('function_module', ['SETFUNCTIONMODULE']),
    handleCheck(item) {
      if (this.routePath != '/moduleSubmit') {
        if (this.defaultArr.includes(item.name)) {
          this.$message.error('名字与默认表头冲突')
          item.name = ''
        }
      }
    },
    changeOthers() {
      this.defaultArr.push('筛选条件')
      this.datas.other_condition = ''
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
        this.datas.county_condition = 1
        this.defaultArr = [this.defaultArr, '详细地址', '街道']
      } else {
        this.datas.county_condition = 0
      }
    },
    changeAddress(e) {
      if (e) {
        this.datas.is_address = 1
      } else {
        this.datas.is_address = 0
        this.datas.street_condition = 0
        this.checkStreet = false
      }
    },
    changeImage(e) {
      if (e) {
        this.datas.is_image = 1
      } else {
        this.datas.is_image = 0
      }
    },
    changeStreet(e) {
      if (e) {
        this.datas.street_condition = 1
      } else {
        this.datas.street_condition = 0
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
      this.contentArr.map((item, index) => {
        if (utils.fieldObjectValueHaveEmpty(item)) {
          this.$refs.contentItem[index].validate((valid) => {
            if (!valid) {
              value = false
              return false
            }
          })
        }
      })
      if (!value) return
      this.btnArr.map((item, index) => {
        if (utils.fieldObjectValueHaveEmpty(item)) {
          this.$refs.btnItem[index].validate((valid) => {
            if (!valid) {
              value = false
              return false
            }
          })
        }
      })
      if (!value) return
      this.sxList.map((item, index) => {
        if (utils.fieldObjectValueHaveEmpty(item)) {
          this.$refs.sxList[index].validate((valid) => {
            if (!valid) {
              value = false
              return false
            }
          })
        }
      })
      if (!value) return
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
        this.$message.error('请完成必填项')
        return
      }
      this.$message.success('当前模块填写完整')
    },

    /* 更改按钮类型,btn名字清空 */
    changeBtnName(item, index) {
      item.name = ''
      setTimeout(() => {
        this.$refs.btnItem[index].clearValidate('name')
      }, 0)
    },
    /* 删除字段内容 */
    deletesx(contentIndex) {
      // 删除模块下字段
      this.sxList.splice(contentIndex, 1)
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
    /* 删除字段内容 */
    deleteContent(contentIndex) {
      // 删除模块下字段
      this.contentArr.splice(contentIndex, 1)
    },
    /* 增加字段内容 */
    addContent() {
      // 增加模块下字段
      if (this.contentArr.length < 3) {
        if (this.routePath == '/moduleSubmit') {
          this.contentArr.push({
            id: 0,
            name: '', //字段名称
            type: 0, //字段类型
            is_required: 1, //是否必填 0 不必填 1必填
            is_select: 0, //是否运用筛选条件选择框
            default: 0, //是否默认字段
            is_remark: 0,
          })
        } else {
          this.contentArr.push({
            id: 0,
            name: '', //字段名称
            type: 0, //字段类型
            is_required: 0, //是否必填 0 不必填 1必填
            is_select: 0, //是否运用筛选条件选择框
            default: 0, //是否默认字段
            is_remark: 0,
          })
        }
      } else {
        this.$message.error('标签不能超过3个')
      }
    },

    /* 删除按钮 */
    deleteBtn(btnIndex) {
      this.btnArr.splice(btnIndex, 1)
    },
    addBtn() {
      if (this.btnArr.length < 2) {
        if (this.routePath == '/moduleSubmit') {
          this.btnArr.push({
            id: 0,
            name: '', //字段名称
            type: 5, //字段类型
            is_required: 1, //是否必填 0 不必填 1必填
            is_select: 0, //是否运用筛选条件选择框
            default: 0, //是否默认字段
          })
        } else {
          this.btnArr.push({
            id: 0,
            name: '', //字段名称
            type: 6, //字段类型
            is_required: 0, //是否必填 0 不必填 1必填
            is_select: 0, //是否运用筛选条件选择框
            default: 0, //是否默认字段
          })
        }
      } else {
        this.$message.error('最多可添加两个按钮')
      }
    },
    // 表格选中回调
    handleSelectionChange(val) {
      // console.log(val)
      this.datas.search_field = JSON.stringify(val)
      // console.log(this.datas)
      if (this.datas.search_field == '[]') {
        this.datas.guide_text = ''
        this.datas.no_tips = '暂无数据'
      }
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
    chosenSwitchTwo() {
      this.datas.is_option == 0
        ? (this.datas.is_option = 1)
        : (this.datas.is_option = 0)
    },
    chosenSwitchThree() {
      console.log(this.datas.is_fold)
      this.datas.is_fold == 0
        ? (this.datas.is_fold = 1)
        : (this.datas.is_fold = 0)
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
  },
}
</script>

<style scoped lang="less">
.function_modulestyle {
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

  p {
    font-size: 14px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 20px;
  }

  /* 商品列表 */
  .networkList {
    /* 删除图标 */
    .el-icon-circle-close {
      position: absolute;
      right: -10px;
      top: -10px;
      cursor: pointer;
      font-size: 19px;
    }

    .content-box {
      flex-grow: 1;

      .content-row {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        > div {
          width: 50%;
          box-sizing: border-box;

          &.pos {
            width: 100%;
          }
        }
      }

      .typeText {
        display: flex;

        .text {
          width: 250px;
        }

        .delete {
          display: flex;
          align-items: end;
          margin-left: 45px;
        }
      }
    }
  }

  .card {
    background: #f8f8f8;
    border-radius: 5px;
    padding: 18px 10px;
    margin: 12px 0;
    position: relative;

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
    position: relative;

    .tips {
      position: absolute;
      left: 130px;
      top: 81px;
      font-size: 12px;
      color: #999999;
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
        font-size: 10px;
      }
    }
  }

  .tips {
    font-size: 12px;
    color: #666666;
    margin-left: -18px;
    margin-right: 20px;
  }

  .btn-box {
    > span {
      color: #666666;
      font-size: 12px;
      margin-left: 20px;
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

  .addNetorkList {
    width: 345px;
    height: 40px;
  }
}
</style>
<style lang="less">
.function_modulestyle {
  .el-form-item {
    margin-bottom: 16px;
  }

  .card {
    .el-select {
      width: 100%;
    }
  }

  .el-textarea {
    margin-top: 10px;
  }

  .header {
    .el-checkbox {
      margin-top: 16px;
    }
  }

  .screening {
    .el-checkbox {
      line-height: 20px;
    }

    .el-form-item {
      margin-bottom: 0;
      width: 90%;
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
