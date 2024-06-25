<template>
	<div class="detail-page">
		<div class="header">
			<img src="@/assets/images/left.png" alt="" @click="goBack()">
			<span class="title">{{ name }}</span>
		</div>
		<!-- 顶部搜索筛选 -->
		<div class="top-search">
			<!-- 根据模块不同，筛选条件不同 -->
			<div class="left">
				<span class="title">筛选条件：</span>
				<div class="condition">
					<span>城市</span>
					<el-input placeholder="请输入内容" v-model="keyWords.cityname" clearable class="search-input"
						@keyup.enter.native="searchData()" @clear="searchData()">
					</el-input>
				</div>
				<div class="condition" v-if="ModuleInfo.module_type_id != 27">
					<span>区县</span>
					<el-input placeholder="请输入内容" v-model="keyWords.county" clearable class="search-input"
						@keyup.enter.native="searchData()" @clear="searchData()">
					</el-input>
				</div>
				<div class="condition"  v-if="ModuleInfo.module_type_id == 21">
					<span>按钮名称</span>
					<el-input placeholder="请输入内容" v-model="keyWords.title" clearable class="search-input"
						@keyup.enter.native="searchData()" @clear="searchData()">
					</el-input>
				</div>
				<div class="condition" v-if="ModuleInfo.module_type_id == 8">
					<span>网点名称</span>
					<el-input placeholder="请输入内容" v-model="keyWords.title" clearable class="search-input"
						@keyup.enter.native="searchData()" @clear="searchData()">
					</el-input>
				</div>
				<div class="condition" v-for="(item,index) in tableHeaderData" v-if="item.type==11&&item.select_value" :key="index">
					<el-select v-model="item.sxvalue" :placeholder="item.name" @change="changesx(item)">
						<el-option v-for="(aitem, index) in item.select_value.split('^')" :key="index" :label="aitem"
							:value="aitem">
						</el-option>
					</el-select>
				</div>
				<!--  只有网店模块才具有筛选类型
                <div class="condition" v-if="ModuleInfo.module_type_id == 8 && ModuleInfo.other_condition.length">
                    <span>筛选类型</span>
                    <el-select v-model="keyWords.conditions" placeholder="请选择筛选条件">
                        <el-option v-for="(item, index) in other_conditions" :key="index" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </div> -->
        <button class="search" @click="searchData()">搜索</button>
        <button class="search" @click="clearsx()" style="width: 64px">
          清空筛选
        </button>
        <span class="tip">
          筛选到数据 <span>{{ total }}</span> 条
        </span>
      </div>
      <div class="right">
        <button class="addData" @click="addData()">
          <img class="icon" src="@/assets/images/addData.png" alt="" />
          添加数据
        </button>
        <button
          class="importData"
          @click="openImportDialog()"
          v-if="ModuleInfo.module_type_id != 18 && ModuleInfo.module_type_id != 27 "
        >
          <img class="icon" src="@/assets/images/import.png" alt="" />
          导入数据
        </button>
      </div>
    </div>
    <!-- 表格数据 -->
    <div class="container">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        max-height="500"
        :header-cell-style="{ background: '#FAFAFA', color: '#333' }"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="id" align="center" width="80">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <!-- 通过返回数据创建数据表头并渲染 -->
        <el-table-column
          :label="item.name"
          align="center"
          v-for="(item, index) of tableHeaderData"
          :key="index"
          show-overflow-tooltip
          :width="labelWidth(item)"
        >
          <div slot-scope="scope" v-if="item.key_id !== 0">
            <span class="nowrap">
              {{ showValue(scope.row, item, 0) }}
            </span>
            <br />
            <span class="nowrap">
              {{ showValue(scope.row, item, 1) }}
            </span>
            <p class="nowrap">
              {{ showValue(scope.row, item, 2) }}
            </p>
          </div>
          <div slot-scope="scope" v-else-if="item.code == 'sort'">
            {{ scope.row[item.code] }}
          </div>
             <div slot-scope="scope" v-else-if="item.name == '栏目'">
            {{ scope.row.classify_name }}
          </div>
          <div slot-scope="scope" v-else-if="item.code == 'cityname_a'">
            {{ showValueCity(scope.row) }}
          </div>
          <div slot-scope="scope" v-else-if="item.code == 'type'">
            {{ scope.row[item.code] == 1 ? '自由填写' : '选择分类' }}
          </div>
          <div slot-scope="scope" v-else-if="item.code == 'type'">
            {{ scope.row[item.code] == 1 ? '自由填写' : '选择分类' }}
          </div>
          <div slot-scope="scope" v-else-if="item.code == 'image'">
            <img :src="scope.row.image" alt="" width="20px" height="20px" />
          </div>
          <div slot-scope="scope" v-else>
            {{ scope.row[item.code] }}
          </div>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="theme-color edit-button"
              size="small"
              @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              class="theme-color delete-button"
              size="small"
              @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <footer>
      <div class="left flex-center">
        <button class="delData" @click="delData()">
          <img class="icon" src="@/assets/images/del.png" alt="" />
          删除
        </button>
        <button class="addData" @click="addData()">
          <img class="icon" src="@/assets/images/addData.png" alt="" />
          添加数据
        </button>
        <button
          class="importData"
          @click="openImportDialog()"
          v-if="ModuleInfo.module_type_id != 18 && ModuleInfo.module_type_id != 27"
        >
          <img class="icon" src="@/assets/images/import.png" alt="" />
          导入数据
        </button>
        <button
          class="exportData"
          @click="exportData()"
          v-if="ModuleInfo.module_type_id != 18 && ModuleInfo.module_type_id != 27"
        >
          <img class="icon" src="@/assets/images/export.png" alt="" />
          导出数据
        </button>
        <div
          @click="setJumpLink()"
          class="links"
          v-if="ModuleInfo.jump_type == 3"
        >
          跳转链接
        </div>
        <div @click="setName()" class="links" v-if="ModuleInfo.is_show == 1">
          模块名称
        </div>
      </div>
      <div class="right">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="page"
          :page-sizes="[10, 20, 50]"
          :page-size="page_num"
          layout="sizes, prev, pager, next, jumper"
          prev-text="上一页"
          next-text="下一页"
          :total="total"
        >
        </el-pagination>
      </div>
    </footer>

    <!-- 编辑与保存数据弹出框 -->
    <el-dialog
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="edit-box"
    >
      <template slot="title">
        <span class="edit-title">{{ title }}</span>
      </template>
      <el-form
        :model="item"
        v-for="(item, index) of form"
        label-position="top"
        :rules="rules"
        :key="index"
        :hide-required-asterisk="false"
        ref="item"
        style="position: relative"
      >
        <span
          v-if="item.code.includes('url') || item.code == 'image'"
          style="
            display: flex;
            color: #999999;
            fontsize: 12px;
            position: absolute;
            top: 18px;
            align-items: center;
          "
        >
          <template v-if="item.code != 'image'"> 若为图片， </template>可
          <el-upload
            :action="baseupload"
            :on-success="handleAvatarSuccess"
            :on-change="handleChange"
            name="image"
          >
            <span class="font-color" @click="ImageIndex = index">点击上传</span>
          </el-upload>
          
          获取图片链接

        </span>
        
        <span
          v-if="item.code=='xcx_link'"
          style="
            color: #999999;
            fontsize: 12px;
            position: absolute;
            top: 18px;
            align-items: center;
          "
        >
        与普通链接择一填写
        </span>
       
        <el-form-item
          v-if="
            item.key_id == 0 &&
            item.code != 'county_a' &&
            item.code != 'guide' &&
            item.code != 'title' &&
            item.type != 12
          "
          :label="item.name"
          :label-width="formLabelWidth"
          :prop="item.required == 1 ? item.code : ''"
        >
          <el-date-picker
            v-model="item[item.code]"
            type="datetime"
            :placeholder="`选择${item.name}`"
            v-if="item.type == 8"
          >
          </el-date-picker>
          <el-select
            v-model="item[item.code]"
            placeholder="请选择筛选条件"
            v-else-if="item.code == 'conditions'"
          >
            <el-option
              v-for="(item, index) in other_conditions_add"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-input
            v-model="item.sort"
            placeholder="选填，从大到小排列，默认为0"
            v-else-if="item.code == 'sort'"
            type="number"
            min="0"
          >
          </el-input>
          <template v-else-if="item.name == '政策要点'">
            <span
              style="
                display: flex;
                color: #999999;
                fontsize: 12px;
                position: absolute;
                top: -20px;
              "
              >每个要点简单几个字使用^分割</span
            >
            <el-input
              v-model="item[item.code]"
              :placeholder="`请输入${item.name}`"
              style="margin-top: 6px"
            >
            </el-input>
          </template>
          <template v-else-if="item.name == '填写方式'">
            <el-radio-group v-model="item[item.code]" @change="changeradio">
              <el-radio :label="0">选择分类</el-radio>
              <el-radio :label="1">自由填写</el-radio>
            </el-radio-group>
          </template>
          <!-- 导粉 -->
          <template v-else-if="item.name == '导粉内容'">
            <div style="border: 1px solid #ccc">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
                :mode="mode"
              />
              <Editor
                style="height: 500px; overflow-y: hidden"
                v-model="item[item.code]"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
              />
            </div>
          </template>

          <template v-else-if="item.name == '城市'">
            <el-input
              v-model="item[item.code]"
              placeholder="请输入城市名，无需填写“市”字。例如武汉"
              @blur="comfirClassify(item[item.code])"
            >
            </el-input>
          </template>
          <template v-else-if="item.name == '区县'">
            <el-input
              v-model="item[item.code]"
              placeholder="请输入区县名，例如江汉区"
            >
            </el-input>
          </template>
          <template
            v-else-if="item.name == '描述' && ModuleInfo.module_type_id == 10"
          >
            <el-input
              type="textarea"
              :rows="2"
              v-model="item[item.code]"
              :placeholder="`请输入${item.name}`"
            >
            </el-input> 
          </template>

          <template
            v-else-if="item.code.includes('url') || item.code == 'image'"
          >
            <el-input
              v-model="item[item.code]"
              placeholder="例如:http://www.baidu.com"
              @change="checkUrl(item)"
              style="margin-top: 6px"
            >
            </el-input>
            <div v-if="item.code == 'image'&&item.select_value" style="color:red; font-size:12px ; line-height:12px" >
            {{ item.select_value }}
          </div>
          </template>
          <template
            v-else-if="item.code=='xcx_link'"
          >
            <el-input
              v-model="item[item.code]"
              placeholder="例如:http://www.baidu.com"
              style="margin-top: 6px"
            >
            </el-input>
          </template>
          <template v-else-if="item.code == 'cityname_a'">
            <!-- <div class="cityAbox"> -->
            <!-- <div class="addcity">
								<el-button @click="openAddCity">新增城市+</el-button>
							</div>
							<span v-for="(item, index) in city_list" :key="index">
								{{item[1]+item[2]+'^'}}
							</span> -->
						<div class="selectwrap">
							<div class="block">
								<el-cascader v-model="citylist" :options="optionss" :props="props" collapse-tags
									clearable @change='getCityList'>
								</el-cascader>
							</div>
						</div>
						<!-- </div> -->
					</template>
					<template v-else-if="item.type == 11" >
							<el-select v-model="item.option_value" :placeholder="item.name" :prop="item.required == 1 ? item.code : ''">
								<el-option v-for="(aitem, index) in item.select_value.split('^')" :key="index"
									:label="aitem" :value="aitem">
								</el-option>
							</el-select>
					</template>
					<el-input v-model="item[item.code]" :placeholder="`请输入${item.name}`"
						v-else-if="item.code!='county_a'">
					</el-input>
				</el-form-item>
					<template v-else-if="item.type == 12 && item.name !='栏目'">
						<el-form-item :label-width="formLabelWidth" :label="item.name" :prop="item.required == 1 ? item.code : ''"   v-if="!showguide(item)">
							<div class="block">
								<el-cascader v-model="item.classList" :options="classify" :props="classProps" collapse-tags
							 	clearable @change='getClassifyValue(item)'>
								</el-cascader>
							</div>
						</el-form-item>
					</template>
        	<template v-else-if="item.name == '栏目'">
						<el-form-item :label-width="formLabelWidth" :label="item.name" :prop="item.required == 1 ? item.code : ''"   v-if="!showguide(item)">
							<div class="block">
								<el-cascader v-model="item.columnList" :options="columnClass" :props="columnProps" collapse-tags
							   @change='getColumnList(item)'>
								</el-cascader>
							</div>
						</el-form-item>
					</template>
       

					<!-- 富文本编辑 -->
					<template v-else-if="item.code == 'guide'">
						<el-form-item :label-width="formLabelWidth" :label="item.name" :prop="item.required == 1 ? item.code : ''"  v-if="showguide(item)">
							<div style="border: 1px solid #ccc;">
								<Toolbar style="border-bottom: 1px solid #ccc" :editor="editor"
									:defaultConfig="toolbarConfig" :mode="mode" v-if="dialogFormVisible"/>
								<Editor style="height: 500px; overflow-y: hidden;" v-model="item[item.code]"
									:defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" v-if="dialogFormVisible"/>
							</div>
						</el-form-item>
					</template>
					<!-- 富文本编辑 -->
					<template v-else-if="item.code == 'title'">
						<el-form-item :label-width="formLabelWidth" :label="item.name" :prop="item.required == 1 ? item.code : ''"  v-if="showguide(item)">
							<el-input v-model="item[item.code]" :placeholder="`请输入${item.name}`">
							</el-input>
						</el-form-item>
					</template>
				<el-form-item v-else>
					<template v-if="item.type == 5">
						<!-- <el-form-item :label-width="formLabelWidth" :label="item.name" >
                            <el-input :disabled="item.type == 5" placeholder="请输入按钮名称" v-model="item.value"
                                style="width: 100%;">
                            </el-input>
                        </el-form-item> -->

            <el-form-item
              :prop="item.required == 1 ? 'value1' : ''"
              :label="`${ModuleInfo.module_type_id == 1 ? '' : '指定按钮'}${
                item.name
              }的链接`"
              :label-width="formLabelWidth"
            >
              <span
                style="
                  display: flex;
                  color: #999999;
                  fontsize: 12px;
                  position: absolute;
                  top: -24px;
                  align-items: center;
                "
                >若为图片，可
                <el-upload
                  :action="baseupload"
                  :on-success="handleAvatarSuccess"
                  :on-change="handleChange"
                  name="image"
                >
                  <span class="font-color" @click="ImageIndex = index"
                    >点击上传</span
                  >
                </el-upload>
                获取图片链接
              </span>
              <el-input
                placeholder="例如:http://www.baidu.com"
                v-model="item.value1"
                style="width: 100%; margin-top: 6px"
                @change="checkAddUrl(item)"
              >
              </el-input>
            </el-form-item>
          </template>

          <template v-else-if="item.type == 6">
            <el-form-item
              :label-width="formLabelWidth"
              :label="`自定义按钮${item.name.split('^')[0]}的名称`"
              v-show="item.type == 6"
            >
              <el-input
                :disabled="item.type == 5"
                :placeholder="`请输入自定义按钮${
                  item.name.split('^')[0]
                }的名称`"
                v-model="item.value"
                style="width: 100%"
              >
              </el-input>
            </el-form-item>
            <span
              style="
                display: flex;
                color: #999999;
                fontsize: 12px;
                position: absolute;
                top: 114px;
                lign-items: center;
              "
              >若为图片，可
              <el-upload
                :action="baseupload"
                :on-success="handleAvatarSuccess"
                :on-change="handleChange"
                name="image"
              >
                <span class="font-color" @click="ImageIndex = index"
                  >点击上传</span
                >
              </el-upload>
              获取图片链接
            </span>
            <el-form-item
              :prop="item.required == 1 ? 'value1' : ''"
              :label="`自定义按钮${item.name.split('^')[0]}的链接`"
              :label-width="formLabelWidth"
            >
              <el-input
                placeholder="例如:http://www.baidu.com"
                v-model="item.value1"
                style="width: 100%; margin-top: 6px"
                @change="checkAddUrl(item)"
              >
              </el-input>
            </el-form-item>
          </template>

          <template v-else-if="item.type == 8">
            <el-form-item
              :prop="item.required == 1 ? 'value' : ''"
              :label="item.name"
              :label-width="formLabelWidth"
            >
              <el-date-picker
                v-model="item.value"
                type="datetime"
                placeholder="选择日期加时刻"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              :label="item.name + '_提示'"
              :label-width="formLabelWidth"
              v-show="item.is_remark == 1"
            >
              <el-input
                placeholder="请添加字段提示"
                v-model="item.value2"
                style="width: 100%"
              >
              </el-input>
            </el-form-item>
          </template>
          <template v-else-if="item.type == 9">
            <el-form-item
              :prop="item.required == 1 ? 'value' : ''"
              :label="`${item.name.split('^')[0]}(电话)`"
              :label-width="formLabelWidth"
            >
              <el-input
                :placeholder="`请输入${item.name.split('^')[0]}(电话)`"
                v-model="item.value"
                style="width: 100%"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              :label="`${item.name.split('^')[0]}备注`"
              :label-width="formLabelWidth"
            >
              <el-input
                :placeholder="`请输入${item.name.split('^')[0]}备注`"
                v-model="item.value1"
                style="width: 100%"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              :label="item.name + '_提示'"
              :label-width="formLabelWidth"
              v-show="item.is_remark == 1"
            >
              <el-input
                placeholder="请添加字段提示"
                v-model="item.value2"
                style="width: 100%"
              >
              </el-input>
            </el-form-item>
          </template>
          <template v-else-if="item.type == 10">
            <el-form-item
              :prop="item.required == 1 ? 'value' : ''"
              :label="`超链接${item.name.split('^')[0]}的文本`"
              :label-width="formLabelWidth"
            >
              <el-input
                :placeholder="`请输入超链接${item.name.split('^')[0]}的文本`"
                v-model="item.value"
                style="width: 100%"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              :label="`超链接${item.name.split('^')[0]}的链接`"
              :label-width="formLabelWidth"
            >
              <el-input
                placeholder="例如:http://www.baidu.com"
                v-model="item.value1"
                style="width: 100%"
                @change="checkAddUrl(item)"
              >
              </el-input>
            </el-form-item>
          </template>
          <template
            v-else-if="item.type == 11"
            :prop="item.required == 1 ? 'value' : ''"
          >
            <el-form-item :label="`${item.name}`" :label-width="formLabelWidth">
              <el-select
                v-model="item.value"
                :placeholder="item.name"
                @change="getaddsx(item)"
              >
                <el-option
                  v-for="(aitem, index) in item.select_value.split('^')"
                  :key="index"
                  :label="aitem"
                  :value="aitem"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item
              v-if="item.code != 'county_a'"
              :prop="item.required == 1 ? 'value' : ''"
              :label-width="formLabelWidth"
              :label="item.name"
            >
              <el-input
                type="textarea"
                :rows="2"
                v-model="item.value"
                autocomplete="off"
                :placeholder="`请输入${item.name}`"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              :label="item.name + '_提示'"
              :label-width="formLabelWidth"
              v-show="item.is_remark == 1"
            >
              <el-input
                placeholder="请添加字段提示"
                v-model="item.value2"
                style="width: 100%"
              >
              </el-input>
            </el-form-item>
          </template>
        </el-form-item>
        <div v-if="item.remark" style="color:red;margin-top:-20px;font-size:12px">
          {{ item.remark }}
          </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addModuleData()">保 存</el-button>
      </div>
    </el-dialog>

    <!-- 导入数据弹出框 -->
    <el-dialog
      title="导入数据"
      :visible.sync="importDialogVisible"
      center
      :before-close="handleClose"
      width="60%"
    >
      <div class="import-box">
        <div class="title">
          新增数据，请先下载Excel模板，按模板的格式填充数据在上传。<span
            @click="downloadTemplate()"
            >[点击下载Excel模板]</span
          >
        </div>
        <div class="warning">
          注意：如果是新增数据，ID为空或0；如果是修改数据，ID不可以修改；单元格如果有两组数据请用^分割。上传后，请先预览数据，确定数据正确再提交导入！
        </div>
        <div>
          <img
            src="@/assets/images/import-notice.jpg"
            alt=""
            style="width: 100%"
          />
        </div>
        <div class="upload">
          <span class="chosen">选择Excel文件：</span>
          <input
            type="file"
            name="file"
            @change="getExcel"
            ref="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
          <span class="tip">
            请把模板文件另存为Excel文件(*.xlsx) 后再上传
          </span>
          <a href="/static/images/demo.png" target="_blank" class="sample"
            >查看示例</a
          >
        </div>
        <div class="submit-box">
          <el-button class="submit" @click="importData()">提交</el-button>
        </div>
        <el-table
          tooltip-effect="dark"
          style="width: 100%"
          :data="exportTableData"
          :header-cell-style="{ background: '#FAFAFA', color: '#333' }"
          stripe
        >
          <el-table-column label="id">
            <template slot-scope="scope">
              {{ scope.row.ID ? scope.row.ID : 0 }}
            </template>
          </el-table-column>
          <el-table-column
            :label="item.name"
            align="center"
            :prop="item.name"
            v-for="(item, index) of tableHeaderData"
            :key="index"
            :width="labelWidth(item)"
          >
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog
      title="修改城市"
      :visible.sync="showChangeCity"
      width="30%"
      :before-close="handleClose"
    >
      <span>选择展示城市</span>
      <div class="dia-body"></div>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            showChangeCity = false
            linshiData = []
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="comfirCity()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
	import console from 'console'
	import * as XLSX from "xlsx";
	import utils from '../../../../utils';
	import {
		Editor,
		Toolbar
	} from '@wangeditor/editor-for-vue'
	import areaData from '@/utils/areaData.js'
	export default {
		inject: ['reload'],
		name: 'dataDetail',
		components: {
			Editor,
			Toolbar
		},
		data() {
			return {
				zt_id:'',
				classList: [],
        columnList:[],
				citylist: [],
				classify: [], //分类列表
				linshiData2: [],
				linshiData: [],
				point_city_json: [],
				optionss: [],
				props: {
					multiple: true,
					label: 'text', //匹配响应数据中的name
					value: 'text'
				},
				classProps: {
					label: 'label', //匹配响应数据中的name
					value: 'value'
				},
        columnClass:[],
        columnProps:{
          	label: 'label', //匹配响应数据中的name
					value: 'value'
        },
				showChangeCity: false,
				city_list: [],
				sxparams: [],
				sxvalue: '',
				name: '',
				id: null,
				total: 5,
				keyWords: {
					cityname: '',
					county: '',
					title: '',
				},
				editor: null,
				html: '',
				toolbarConfig: {
					excludeKeys: ["uploadVideo", "fullScreen", "emotion"]
				},
				editorConfig: {
					placeholder: '请输入内容...',
					MENU_CONF: {
						uploadImage: {
							server: '/api/phalapi/public/?s=App.Robot_Problem.UploadFile',
							fieldName: 'image',
							customInsert(res, insertFn) { // JS 语法
								// res 即服务端的返回结果
								// console.log(res)
								// 从 res 中找到 url alt href ，然后插入图片
								insertFn(res.data)
							},
						},
						insertImage: {
							onInsertedImage(imageNode) { // JS 语法
								if (imageNode == null) return

								const {
									src,
									alt,
									url,
									href
								} = imageNode
								// console.log('inserted image', src, alt, url, href)
							},
							// checkImage: customCheckImageFn, // 也支持 async 函数
							parseImageSrc: this.customParseImageSrc, // 也支持 async 函数
						}
					}
				},
				mode: 'default', // or 'simple'
				// city: '',
				// county: '',
				// filter_type: '',
				// jumpName: '',
				// jumpUrl: '',
				title: '',
				xuanxiangVale:'',
				page: 1,
				page_num: 10,
				dialogFormVisible: false, // 增加数据弹出框控制
				importDialogVisible: false, //导入数据弹出框控制
				jumpLinkDialog: false,
				tableHeaderData: [],
				tableData: [],
				exportTableData: [], // 导入数据
				edit_id: 0,
				form: [],
				file: {},
				ModuleInfo: {},
				formLabelWidth: '120px', // 
				ImageIndex: null, //上图图片的索引
				multipleSelection: [],
				userCity:'', //当前账号所在城市
				rules: {
					value: [{
						required: true,
						message: '输入框不能为空',
						trigger: 'blur'
					}],
					value1: [{
						required: true,
						message: '输入框不能为空',
						trigger: 'blur'
					}],
					classify: [{
						required: true,
						message: '输入框不能为空',
						trigger: 'blur'
					}],
					cityname: [{
						required: true,
						message: '城市不能为空',
						trigger: 'blur'
					}],
					cityname_a: [{
						required: true,
						message: '城市不能为空',
						trigger: 'blur'
					}],
					county: [{
						required: true,
						message: '区县不能为空',
						trigger: 'blur'
					}],
					street: [{
						required: true,
						message: '街道不能为空',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '详细地址不能为空',
						trigger: 'blur'
					}],
					conditions: [{
						required: true,
						message: '筛选条件不能为空',
						trigger: 'blur'
					}],
					title: [{
						required: true,
						message: '标题不能为空',
						trigger: 'blur'
					}],
					url: [{
						required: true,
						message: '链接不能为空',
						trigger: 'blur'
					}],
					describe: [{
						required: true,
						message: '描述不能为空',
						trigger: 'blur'
					}],
					describe_url: [{
						required: true,
						message: '描述链接不能为空',
						trigger: 'blur'
					}],
					option_value: [{
						required: true,
						message: '选项不能为空',
						trigger: 'blur'
					}],
					image: [{
						required: true,
						message: '图片链接不能为空',
						trigger: 'blur'
					}],
					guide: [{
						required: true,
						message: '富文本内容不能为空',
						trigger: 'blur'
					}],
					text: [{
						required: true,
						message: '政策要点不能为空',
						trigger: 'blur'
					}],
					sort: [{
						required: true,
						message: '排序不能为空',
						trigger: 'blur'
					}],
					publish_time: [{
						required: true,
						message: '发布时间不能为空',
						trigger: 'blur'
					}],

				}
			}
		},
		async mounted() {
			this.optionss = JSON.parse(JSON.stringify(areaData));

			function deleteAll(arr) {
				if (arr.length > 0) {
					arr.forEach((item, index) => {
						if (item.text == '全部') {
							arr.splice(index, 1)
						}
						if (item.children) {
							deleteAll(item.children)
						}
					})

				} else {
					return arr
				}
			}
			deleteAll(this.optionss)
			this.setData()
			this.getModuleInfo()
			await this.GetUserLoginInfo()
			await this.getTableHeaderData()
			await this.getModuleData()
			console.log(this.tableHeaderData)
			// this.tableHeaderData.unshift()
			// reqNewGetModuleKeyList
			// const res = await this.$api.reqNewGetModuleKeyList({ id: this.id })
			// console.log(res)

		},
		beforeDestroy() {
			const editor = this.editor
			if (editor == null) return
			editor.destroy() // 组件销毁时，及时销毁编辑器
		},
		computed: {

			// 筛选选项
			other_conditions() {
				let arr = []
				arr = this.ModuleInfo.other_condition?.split('^')
				arr.unshift('全部')
				return arr
			},
			other_conditions_add() {
				let arr = []
				arr = this.ModuleInfo.other_condition?.split('^')
				return arr
			},
			baseupload() {
				return `/api/phalapi/public/?s=App.Robot_Problem.UploadFile`
			}
		},
		methods: {

			changeradio() {
			},
      // 获取栏目列表
      getColumnList(val){
        	val.classify = val.columnList[val.columnList.length - 1]
				this.columnList = val.columnList

      },
			showguide() {
				let flag = true
				this.form.forEach((aitem) => {
							if (aitem.code == 'type') {
								console.log(aitem)
								if (aitem.type == 1) {
									flag =  true
								} else {
									flag = false
								}
							}else if(aitem.code == 'classify'){
                flag = false
              }
				})
				this.form.forEach((bitem) => {
					if(flag==false){
						if(bitem.type==12){
							bitem.required = 1
						}
						if(bitem.code=='guide'||bitem.code=='title'){
							bitem.required = 0
						}
					}else{
						if(bitem.code=='guide'||bitem.code=='title'){
							bitem.required = 1
						}
						if(bitem.type==12){
							bitem.required = 0
						}
					}
				})
				return flag


			},
			getClassifyValue(val, a) {
				val.classify = val.classList[2]
				this.classList = val.classList

			},
			async comfirClassify(val) {
				if (this.ModuleInfo.module_type_id == 18) {
					if (val == "") {
						this.$message({
							message: '请先填写城市',
							type: 'warning'
						});
					} else {
						this.classify = []
						let params = {
							cityname: val,
							cate_id: 0
						}
						const res = await this.$api.getClassify(params)
						this.classify = res.new_cate_list      
					}

				}else if(this.ModuleInfo.module_type_id == 27){

          if (val == "") {
						this.$message({
							message: '请先填写城市',
							type: 'warning'
						});
					} else {
            this.columnClass = [];
						let params = {
							cityname: val,
						}
						const res = await this.$api.getColumnList(params)
            let arr = this.changeColumnName(res);
            this.columnClass = arr;

					}
        }
			},
      // 递归改变变量名称
      changeColumnName(arr){
        arr.forEach((item)=>{
          if(item.id){
            item.value = parseInt(item.id);
            item.label = item.classname;
          }else{
            item.value = parseInt( item.site_id);
            item.label = item.sitename;
          }
          item.children = item.child
          if(item.children && item.children.length){
            this.changeColumnName(item.children)
          }
        })
        return arr;
      },
			showValueCity(row) {
				if (row.point_city_json) {
					let arr = JSON.parse(row.point_city_json)
					let str = ''
					arr.forEach((item) => {
						if (item[2]) {
							str += item[1] + item[2] + '^'
						} else {
							str += item[1] + '^'
						}
					})
					return str
				} else {
					return row.cityname_a
				}

			},
			comfirCity() {
				this.showChangeCity = false
			},
			getCityList(val) {
				let commitData = []
				val.forEach((item) => {
					let obj = {}
					obj[item[1]] = item[1]
					commitData.push(obj)
				})
				this.form.forEach((item) => {
					if (item.code == 'cityname_a') {
						item.cityname_a = JSON.stringify(commitData)
						item.point_city_json = JSON.stringify(val)
					}
				})
				// this.linshiData = []
				// this.linshiData2 = val
				// val.forEach((item,index)=>{
				// 	this.linshiData.push([item[1],item[2]])
				// })
			},
			openAddCity() {
				this.showChangeCity = true
			},
			getaddsx(item) {
				this.sxparams.push({
					key_id: item.key_id,
					value: this.sxvalue
				})
			},
			clearsx() {
				this.tableHeaderData.forEach((item) => {
					item.sxvalue = ''
				})
				this.keyWords.cityname = ''
				this.keyWords.county = ''
				this.keyWords.conditions = ''
				this.keyWords.title = ''
				this.sxparams = []
				this.xxparams = []
				this.sxvalue = []
				this.getModuleData()
			},
			changesx(item,aitem) {
				if(aitem){
					this.xxparams.push({
						value: this.xuanxiangVale
					})
				}else{
					this.sxparams.push({
						key_id: item.key_id,
						value: this.sxvalue
					})
				}
			},
			// 获取城市信息
			async GetUserLoginInfo() {
				try {
					const res = await this.$api.reqGetUserLoginInfo()
					let {
						cityname
					} = res.city_info
					this.keyWords.cityname = cityname
					this.userCity = cityname
				} catch (error) {
					this.$message.error(error)
				}

			},
			//富文本编辑器使用
			onCreated(editor) {
				this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
			},
			// 转换图片链接
			customParseImageSrc(src) { // JS 语法
				if (src.indexOf('http') !== 0) {
					return `http://${src}`
				}
				return src
			},
			// 合并列数据展示
			showValue(row, item, index) {
				let value = ''
				if (row.point_city_json) {
					let str = ''
					JSON.parse(row.point_city_json).forEach((aitem) => {
						if (aitem[2]) {
							str += aitem[1] + aitem[2] + '^'
						} else {
							str += aitem[1] + '^'
						}

					})
					row.cityname_a = str
				}
				if(row.name == '填写方式'){
				}
				if (index != 2) {
					row.key_value_list.forEach(content => {
						if (content.key_id === item.key_id) {
							!index ? value = content.value : value = content.value1
						}
					})
				} else {
					row.key_value_list.forEach(content => {
						if (content.key_id === item.key_id) {
					 	if (content.value2) {
								value = content.value2
							}
						}
					})
				}

				return value
			},
			// 检验跳转url是否合规
			checkUrl(item) {
				// console.log(item)
				let URL = /^(https?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
				if (!URL.test(item[item.code])) {
					// item[item.code] = ''
					this.$message({
						message: '请输入合法的跳转链接或图片地址',
						type: 'warning'
					});
				}
			},
			checkAddUrl(item) {
				let URL = /^(https?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
				if (!URL.test(item.value1)) {
					// item.value1 = ''
					this.$message({
						message: '请输入合法的跳转链接或图片地址',
						type: 'warning'
					});
				}
			},
			/*

			    @setData
			    @description:设置数据
			    */
    setData() {
      let { id, name } = this.$route.query
      this.id = id
      this.name = name
    },
    /*
			   @getModuleData
			   @description:获取模块编辑填写数据
			   */
    async getModuleData() {
      let key = {
        conditions: {},
      }
      Object.keys(this.keyWords).forEach((item) => {
        if (this.keyWords[item] !== '') {
          key[item] = this.keyWords[item]
        }
      })
      this.tableHeaderData.forEach((item) => {
        console.log(item.key_id, item.type)
        if (item.sxvalue && item.type == 11) {
          console.log(item)
          key.conditions[item.key_id] = item.sxvalue
        }
      })
      let params = {
        id: this.id,
        page: this.page,
        page_num: this.page_num,
        key: JSON.stringify(key),
      }
      const res = await this.$api.reqGetNewModuleData(params)
      this.tableData = [...res.data]
      this.total = res.data_count
    },

    /*
			   @getModuleInfo
			   @description:获取模块信息
			   */
    async getModuleInfo() {
      const res = await this.$api.reqGetModuleInfo({
        id: this.id,
      })
      this.zt_id = res.zt_id
      if (res.zhuanti_type == 1) {
        this.optionss.forEach((item) => {
          item.children.forEach((aitem) => {
            delete aitem.children
          })
        })
      }
      this.ModuleInfo = res
    },
    /*
			    @getTableHeaderData
			    @description:获取表头数据
			    */
			async getTableHeaderData() {
				const res = await this.$api.reqNewGetModuleKeyList({
					id: this.id
				})
				this.tableHeaderData = res
				this.form = [...this.tableHeaderData]
				this.tableHeaderData.forEach((item, index) => {
					if (item.key_id == 0) {
						this.$set(this.form[index], item.code, "")
					} else {
						this.$set(this.form[index], item.code, item.key_id)
						this.$set(this.form[index], 'value1', '')
						if (item.type == 5 || item.type == 6) {
							item.btn_name ? this.$set(this.form[index], 'value', item.btn_name) : this.$set(
								this.form[index], 'value', item.name.split('^')[0])
						} else {
							this.$set(this.form[index], 'value', '')
						}

					}
					if (item.is_remark == 1) {
						this.$set(this.form[index], 'value2', '')
					}
					if (item.code == 'sort') {
						this.form[index].sort = '0'
					}
					if (item.code == 'type') {
						this.form[index].type = 0
					}
					if (item.code == '"cityname_a"') {
						this.form[index].point_city_json = ''
					}
				})
			},
			/*表格选中状态更改 */
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 设置跳转链接
			setJumpLink() {
				// this.jumpLinkDialog = true;
				this.$router.push({
					name: 'jumpLink',
					query: {
						id: this.ModuleInfo.id
					}
				})
			},
			// 展示编辑填写
			setName() {
				// console.log("setName");
				this.$router.push({
					name: 'moduleName',
					query: {
						id: this.ModuleInfo.id
					}
				})
			},
			// 添加数据
			addData() {
				this.dialogFormVisible = true;
				// 重置表单验证
				this.classify = []
        this.columnClass = []
				this.city_list = []
				this.citylist = []
				this.title = ""
				this.edit_id = 0
				this.$nextTick(() => {
					if(this.$refs.item){
					this.$refs.item.forEach(content => {
						content.clearValidate()
					})	
					}
				})
				this.form = [...this.tableHeaderData]
				this.tableHeaderData.forEach((item, index) => {
					if (item.key_id == 0) {
						this.$set(this.form[index], item.code, "")
						if (this.form[index].name == '城市') {
							this.$set(this.form[index], item.code, this.userCity)
						}
					} else {
						this.$set(this.form[index], item.code, item.key_id)
						this.$set(this.form[index], 'value1', '')
						if (item.type == 5 || item.type == 6) {
							item.btn_name ? this.$set(this.form[index], 'value', item.btn_name) : this.$set(this
								.form[index], 'value', item.name.split('^')[0])
						} else {
							this.$set(this.form[index], 'value', '')
						}
					}
					if (item.code == 'sort') {
						this.form[index].sort = '0'
					}
					if (item.is_remark == 1) {
						this.$set(this.form[index], 'value2', '')
					}
					if (item.code == 'type') {
						this.form[index].type = 0
					}
				})
				this.form.forEach((item) => {
					if (item.id) {
						item.id = 0
					}
				})
        if(this.ModuleInfo.module_type_id == 27){
          this.comfirClassify(this.userCity);

         this.form[1].columnList = '';

        }
			},

			// 搜索回调
			searchData() {
				this.page = 1
				this.getModuleData()
			},
			//编辑出现模态框
			async handleEdit(row) {
        console.log(row)
				this.title = `id${row.id}`

				if (row.point_city_json) {
					this.city_list = JSON.parse(row.point_city_json)
					this.citylist = JSON.parse(row.point_city_json)
				} else if (row.cityname_a) {
					this.city_list = row.cityname_a
				}
				if (this.ModuleInfo.module_type_id == 18) {

					await this.comfirClassify(row.cityname)

				}
        if(this.ModuleInfo.module_type_id == 27){
          await this.comfirClassify(row.cityname)
        }
				this.edit_id = row.id
				// 重置表单验证
				this.$nextTick(() => {
					this.$refs.item.forEach(content => {
						content.clearValidate()
					})
				})
				this.form.forEach(item => {
					if (item.key_id == 0) {
						item[item.code] = row[item.code]
						if (row.classify) {
							item.classList = row.classify;
              item.columnList = row.classify;
						}
						if (item.code == 'cityname_a') {
							let arr = []
							if (row.point_city_json) {
								JSON.parse(row.point_city_json).forEach((aitem) => {
									let obj = {}
									obj[aitem[1]] = aitem[1]
									arr.push(obj)
								})
							}
							item.cityname_a = JSON.stringify(arr)
							item.point_city_json = row.point_city_json
						}
					} else {
						row.key_value_list.forEach(content => {
							if (content.key_id === item.key_id) {
								item.value = content.value
								item.value1 = content.value1
								item.value2 = content.value2
								item.id = content.id
							}


						})
					}
				})
				this.dialogFormVisible = true;


			},
			// 添加编辑数据
			async addModuleData() {
				// url验证
				let guideflag = true
				let URL = /^(https?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
				let flag = false;
				this.form.forEach(item => {
					if (item.code == 'type') {
					  console.log(item)
					  if (item.type == 0) {
					    guideflag = false
					  } else {
					    guideflag = true
					  }
					}
					if(item.code == 'guide'){
						console.log(item)
						if(item.guide!= "<p><br></p>"){
							 guideflag = false
						}else{
							guideflag = true
						}
					}
        if (item.required == 1) {
          if (item.key_id == 0) {
            if (item.code.includes('url') || item.code == 'image') {
              if (!(item[item.code].length > 0 && URL.test(item[item.code]))) {
                flag = true
              }
            }
          } else {
            if (item.type == 5 || item.type == 6 || item.type == 10) {
              if (!(item.value1 && URL.test(item.value1))) {
                flag = true
              }
            }
            if (item.type == 11) {
              delete item.value1
            }
          }
        }
      })
      if (flag) {
        this.$message({
          message: '请输入合法的跳转链接或图片地址',
          type: 'warning',
        })
        return
      }
      if (this.editor) {
        console.log(guideflag)
        if (this.editor.children[0].children[0].text == '' && guideflag) {
          this.$message({
            message: '富文本内容不能为空',
            type: 'warning',
          })
          return
        }
      }
      if (this.form.every((item) => !utils.objectValueHaveEmpty(item))) {
        try {
          let params = {
            value_id: this.edit_id,
            id: +this.id,
          }
          let content = {}
          let key_value = []
          this.form.forEach((item) => {
            if (item.key_id == 0) {
              if (item.point_city_json) {
                content['point_city_json'] = item.point_city_json
              }
              content[item.code] = item[item.code]
            } else {
              key_value.push({
                id: item.id ? item.id : 0,
                key_id: item.key_id,
                value:
                  item.type == 8 ? utils.formatDate(item.value) : item.value,
                value1: item.value1,
                value2: item.value2,
              })
            }
          })
          params.key_value = JSON.stringify(key_value)
          content.publish_time = utils.formatDate(content.publish_time)
          params = {
            ...params,
            ...content,
          }
          const res = await this.$api.reqAddNewModuleData(params)
          // // const res = await this.$api.reqAddModuleData(params)
          let { code } = res
          if (code === 200) {
            this.page = 1
            this.page_num = 10
            this.getModuleData()
            this.getTableHeaderData() //完成修改重置form
            this.dialogFormVisible = false
            this.edit_id = 0
            this.$message({
              message: '保存成功',
              type: 'success',
            })
          }
        } catch (e) {}
      } else {
        this.$message({
          message: '表单数据暂未完成',
          type: 'warning',
        })
      }
    },

    // 下载导入模板
    downloadTemplate() {
      window.location.href = `/api/phalapi/public/?s=App.Zhuanti_Module.DownloadNewTemplate&id=${this.id}`
    },
    // 获取分页器当前分页
    handleCurrentChange(val) {
      this.page = val
      this.getModuleData()
    },

    //获取分页器每页条数
    handleSizeChange(val) {
      this.page = 1
      this.page_num = val
      this.getModuleData()
    },
    //删除方法
    delete(params) {
      this.$confirm('确定删除所选数据吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
      })
        .then(async () => {
          try {
            const res = await this.$api.reqDeleteModuleData(params)
            if (res.msg === '删除成功') {
              this.page = 1
              this.page_num = 10
              await this.getModuleData()
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
            }
          } catch (error) {}
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 删除某条数据
    handleDel(row) {
      this.delete({
        id: row.id,
        zt_id: this.zt_id,
      })
    },
    // 删除多条数据
    delData() {
      let params = []
      this.multipleSelection.forEach((item) => {
        params.push(item.id)
      })
      if (params.length) {
        this.delete({
          id: params.join(','),
          zt_id: this.zt_id,
        })
      } else {
        this.$message('请选择需要删除的数据')
      }
    },
    // 控制导入数据弹出框
    openImportDialog() {
      this.importDialogVisible = true
    },
    // 导出数据
    exportData() {
      let key = {}
      Object.keys(this.keyWords).forEach((item) => {
        if (this.keyWords[item] !== '') {
          key[item] = this.keyWords[item]
          if (key.conditions == '全部') {
            key.conditions = ''
          }
        }
      })
      let condition = JSON.stringify(key)
      window.location.href = `/api/phalapi/public/?s=App.Zhuanti_Module.ExportNewData&id=${this.id}&condition=${condition}`
    },
    // 导入数据
    async importData() {
      let params = new FormData()
      params.append('id', this.id)
      params.append('file', this.file)
      const res = await this.$api.reqImportNewData(params)
      if (res.code == 200) {
        this.importDialogVisible = false
        this.page = 1
        this.page_num = 10
        this.getModuleData()
        this.file = {}
        this.$refs.file.value = ''
        this.exportTableData = []
      }
    },
    //防止误触关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
          this.file = {}
          this.exportTableData = []
          this.$refs.file.value = ''
        })
        .catch((_) => {})
    },
    /*设置表格宽度*/
    labelWidth(item) {
      let width = 0
      if (item.name.length < 10) {
        width = ''
      } else {
        width = item.name.length * 20
      }
      return width
    },

    /*
			@goBack
			@description:返回上一页
			*/
    goBack() {
      this.$router.go(-1)
    },
    // 获取解析Excel内容并填充表格
    getExcel() {
      const _this = this
      let file = this.$refs.file.files[0]
      this.readExcel(file).then((tabJson) => {
        if (tabJson && tabJson.length > 0) {
          //成功解析出数据
          let xlsxJson = tabJson
          // console.log(xlsxJson)
          // console.log(_this.tableHeaderData.length)
          // console.log(Object.keys(xlsxJson[0].sheet[0]).length)
          // console.log(xlsxJson[0].sheet)
          _this.file = file
          _this.exportTableData = xlsxJson[0].sheet
          // if ( Object.keys(xlsxJson[0].sheet[0]).length <= _this.tableHeaderData.length + 1) {
          //     _this.file = file
          //     _this.exportTableData = xlsxJson[0].sheet
          //     console.log(_this.file)
          // } else {
          //     _this.$message.error('该数据与当前模块数据列数不一样，请选择合适的excel数据')
          // }
          // console.log(Object.entries(_this.exportTableData))
          // this.$refs.file.value = ''
        }
      })
    },
    // 解析Excel内容
    readExcel(file) {
      // 解析Excel
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        reader.onload = function (e) {
          const data = e.target.result
          this.wb = XLSX.read(data, {
            type: 'binary',
          })
          const result = []
          this.wb.SheetNames.forEach((sheetName) => {
            // console.log(sheetName)
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName]),
            })
          })
          resolve(result)
        }
        // reader.readAsBinaryString(file.raw);
        reader.readAsBinaryString(file) // 传统input方法
      })
    },
    // 图片上传成功回调
    handleAvatarSuccess(res, file) {
      // 上传成功替换
      // console.log(this.form[this.ImageIndex])
      if (res.ret == 200) {
        if (this.form[this.ImageIndex].key_id == 0) {
          this.form[this.ImageIndex][this.form[this.ImageIndex].code] = res.data
        } else {
          this.form[this.ImageIndex].value1 = res.data
        }
      }
    },
    // 上传失败成功都会回调
    handleChange(file) {
      // 测试服测试使用
      if (file.status == 'fail') {
        this.$message.error('图片上传失败')
        // console.log(this.form[this.ImageIndex])
        // this.form[this.ImageIndex].value1 = 1
        // this.form[this.ImageIndex][this.form[this.ImageIndex].code] = '123'
      }
    },
    labelHead(h, { column, $index }) {
      let l = column.label.length
      let f = 16 //每个字大小，其实是每个字的比例值，大概会比字体大小差不多大一点，
      column.minWidth = f * l //字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度
      let _this = this
      return h('span', [h('table-head', column.label)])
    },
    htmlToString(htmlStr) {
      return htmlStr.replace(/<\/?.+?\/?>|\r|\n|\s*/g, '')
    },
  }
}
</script>
<style scoped lang="scss">
@import '@/assets/css/mixin.scss';
::v-deep.cell {
  white-space: pre-wrap !important;
}
.addcity {
  margin: 5px;
}

.cityAbox {
  width: 100%;
  height: 200px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  overflow: scroll;
}

.detail-page {
  width: 100%;

  .header {
    display: flex;
    align-items: center;

    > img {
      width: 10px;
      height: 17px;
    }

    .title {
      margin-left: 14px;
      color: #333;
      font-size: 16px;
    }
  }

  .top-search {
    display: flex;
    // align-items: center;
    justify-content: space-between;
    margin: 24px 0;

    .left {
      display: flex;
      white-space: nowrap;
      // align-items: center;
      flex-wrap: wrap;

      .title {
        color: #666666;
        font-size: 14px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }

      .condition {
        font-size: 14px;
        color: #333;
        margin-right: 17px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        > span {
          margin-right: 9px;
        }
      }

      .search {
        height: 32px;
        width: 48px;
        border: none;
        color: #fff;
        border-radius: 2px;
        // background-color: #6065EC;
        @include background_color;
        margin-right: 17px;
        font-size: 12px;
      }

      .tip {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        > span {
          // color: #6065EC;
          @include font_color;
          font-size: 16px;
        }
      }
    }

    .right {
      display: flex;
      justify-content: end;

      .addData {
        width: 90px;
        height: 32px;
        box-sizing: border-box;
        border-radius: 4px;
        // background-color: #6065EC;
        @include background_color;
        color: #fff;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 18px;

        > img {
          margin-right: 6px;
        }
      }

      .importData {
        width: 90px;
        height: 32px;
        box-sizing: border-box;
        border-radius: 4px;
        // color: #6065EC;
        @include font_color;
        background-color: #fff;
        // border: 1px solid #6065EC;
        @include border_color;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 18px;

        > img {
          margin-right: 6px;
        }
      }
    }
  }

  .container {
    .edit-button {
      // color: #6065ec;
      @include font_color;
    }

    .delete-button {
      color: #f33f3f;
    }

    .nowrap {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;

      .delData {
        background-color: #fff;
        margin-right: 6px;
        width: 67px;
        height: 32px;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #d9d9d9;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 18px;

        > img {
          margin-right: 6px;
        }

        &:hover {
          // background-color: #6065ec;
          // color: #6065ec;
        }
      }

      .addData {
        width: 90px;
        height: 32px;
        box-sizing: border-box;
        border-radius: 4px;
        // background-color: #6065EC;
        @include background_color;
        color: #fff;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 18px;

        > img {
          margin-right: 6px;
        }
      }

      .importData,
      .exportData {
        width: 90px;
        height: 32px;
        box-sizing: border-box;
        border-radius: 4px;
        // color: #6065EC;
        @include font_color;
        background-color: #fff;
        border: 1px solid #6065ec;
        @include border_color;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 18px;

        > img {
          margin-right: 6px;
        }
      }

      .links {
        margin-right: 18px;
        // color: #6065EC;
        @include font_color;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  .edit-title {
    font-size: 18px;
    color: #333;
    font-weight: 500;
  }

  .import-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    // color: #135294;
    @include font_color1;

    .title {
      font-weight: 700;
      margin-bottom: 4px;

      span {
        color: red;
        cursor: pointer;
        margin-left: 4px;
      }
    }

    .warning {
      font-weight: 700;
      margin-bottom: 4px;
      text-align: center;
    }

    .upload {
      .chosen {
        color: #666666;
        margin-right: 8px;
      }

      > input {
        position: relative;
        display: inline-block;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
        border: 1px solid #e5e5ea;
      }

      .tip {
        color: rgb(255, 0, 0);
        margin-left: 6px;
      }

      > a {
        // color: #6065EC;
        @include font_color;
        text-decoration: underline;
      }
    }

    .submit-box {
      margin-top: 12px;
      margin-bottom: 12px;

      .submit {
        width: 200px;
        height: 50px;
        font-size: 24px;
      }
    }
  }

  // 跳转链接弹窗
  .jump-box {
    .jump-title {
      span {
        margin-left: 12px;
        font-size: 12px;
        color: #999;
      }
    }

    ::v-deep.el-form-item__content {
      line-height: 32px;
    }
  }

  .icon {
    width: 12px;
    height: 12px;
  }
}
</style>
<style lang="scss">
@import '@/assets/css/mixin.scss';
.detail-page {
  .search-input {
    width: 170px;
    height: 32px;
  }

  .el-select__caret {
    line-height: 32px;
  }

  .el-date-editor {
    width: 100%;
  }

  .top-search {
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }

  .el-table__fixed-right-patch {
    background: #fafafa;
  }

  .el-dialog {
    width: 463px;

    .el-dialog__body {
      padding: 0 20px;
    }

    .el-form-item {
      margin-bottom: 12px;
      .el-form-item {
        margin-bottom: 12px;
      }
      .el-input {
        height: 40px;
        line-height: 40px;
      }
    }
  }

  .edit-box {
    .el-select {
      width: 100%;
    }
  }

  .el-cascader {
    display: block !important;
  }

  .el-pagination {
    .btn-prev,
    .btn-next {
      border: 1px solid #d8d8d8;
      color: #999;
      border-radius: 2px;

      > span {
        font-weight: 400;
      }

      &:hover {
        // border-color: #2932FC;
        @include border_color1;
        // color: #2932FC;
        @include font_color1;
      }
    }

    .el-pagination__sizes .el-input .el-input__inner:hover {
      border-color: #2932fc;
    }

    .el-pager li {
      border: 1px solid #d8d8d8;
      color: #d8d8d8;
      border-radius: 2px;
      margin: 0 5px;

      &:hover {
        // border-color: #2932FC;
        @include border_color1;
        // color: #2932FC;
        @include font_color1;
      }

      &:first-child {
        margin-left: 10px;
      }

      &:last-child {
        margin-right: 10px;
      }

      &.active {
        // background-color: #2932FC;
        @include background_color1;
        color: #fff;
      }
    }
  }

  .dialog-footer {
    .el-button {
      // background-color: #6065ec;
      @include background_color;
    }
  }

  button {
    // display:flex;
    // align-items: center;
  }

  .el-upload-list {
    display: none;
  }

  .el-upload--text {
    font-size: 12px;
  }
}

.theme-color {
  font-size: 14px;
}
</style>
<style lang="scss" scoped>
::v-deep .el-form-item__label{
  margin-top:4px !important;
}
</style>