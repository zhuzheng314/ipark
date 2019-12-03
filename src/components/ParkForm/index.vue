<template>
  <div>
    <el-form
      size="small"
      ref="form"
      :rules="rules"
      :model="form"
      label-width="auto"
    >
      <div v-if="formList.length">
        <el-row>
          <el-col v-for="(card, index) in formList" :key="'formcard' + index" :span="card.span || 24">
            <el-card style="margin: 10px;" :style="{minHeight: card.minHeight + 'px'}"  >
              <div slot="header" class="clearfix">
                <span>{{card.title}}</span>
              </div>
              <el-row>
                <el-col
                  :span="card.itemSpan || 24"
                  v-for="(item, index) in card.children"
                  :key="item.key + index">
                  <el-form-item
                    :label="item.label"
                    :prop="item.key"
                  >
                    <!-- input -->
                    <el-input
                      v-if="item.type === 'input'"
                      v-model="form[item.key]"
                      :placeholder="item.placeholder"
                    >
                    </el-input>

                    <!-- input-num -->
                    <el-input-number
                      v-if="item.type === 'input-num'"
                      v-model="form[item.key]"
                      style="width: 100%"
                      controls-position="right"
                    >
                    </el-input-number>

                    <!-- textarea -->
                    <el-input
                      v-if="item.type === 'textarea'"
                      type="textarea"
                      v-model="form[item.key]"
                      :placeholder="item.placeholder"
                    >
                    </el-input>

                    <!-- radio -->
                    <el-radio-group v-if="item.type === 'radio'" v-model="form[item.key]">
                      <el-radio
                        v-for="(subItem, subIndex) in options && options[item.key] && options[item.key].length ? options && options[item.key] && options[item.key] : item.options"
                        :key="subItem.label + subIndex"
                        :label="subItem.label"
                      >
                      </el-radio>
                    </el-radio-group>

                    <!--          日期-->
                    <el-date-picker v-if="item.type === 'date-picker'" :placeholder="placeholder" v-model="form[item.key]" style="width: 100%;"></el-date-picker>

                    <el-date-picker
                      v-if="item.type === 'date-picker-range'"
                      v-model="form[item.key]"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>

                    <!-- checkbox -->
                    <el-checkbox-group v-if="item.type === 'checkbox'" v-model="form[item.key]">
                      <el-checkbox
                        v-for="(subItem, subIndex) in options && options[item.key] && options[item.key].length ? options && options[item.key] && options[item.key] : item.options"
                        :key="subItem.label + subIndex"
                        :label="subItem.label"
                      >
                      </el-checkbox>
                    </el-checkbox-group>

                    <!-- select -->
                    <el-select style="width: 100%" v-if="item.type === 'select'" v-model="form[item.key]" :placeholder="form[item.placeholder]">
                      <el-option
                        v-for="(subItem) in options && options[item.key] && options[item.key].length ? options && options[item.key] && options[item.key] : item.options"
                        :label="subItem.label"
                        :value="subItem.value"
                        :key="subItem.value"
                      >
                      </el-option>
                    </el-select>

                    <!-- switch -->
                    <el-switch v-if="item.type === 'switch'" v-model="form[item.key]"></el-switch>

                    <!--          cascader-->
                    <el-cascader
                      v-model="form[item.key]"
                      v-if="item.type === 'cascader'"
                      :props="{ multiple: true }"
                      collapse-tags
                      :options="item.options"
                    ></el-cascader>

                    <!--            upload-->
                    <el-upload
                      :action="$urls.upload"
                      list-type="picture-card"
                      ref="picture-card"
                      :before-upload="handleBeforeUpload"
                      :on-success="handleUploadImgSuccess"
                      :on-remove="handleUploadImgRemove"
                      :fileList="imgFileList"
                      v-if="item.type === 'upload-img'"
                      multiple
                      :limit="3">
                      <i class="el-icon-plus"></i>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>

                    <el-upload
                      class="upload-demo"
                      :action="$urls.upload"
                      :fileList="fileList"
                      :on-success="handleUploadFileSuccess"
                      :on-remove="handleUploadFileRemove"
                      v-if="item.type === 'upload-file'"
                      multiple>
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>

                    <div v-if="item.type === 'addGroup'">
                      <el-input
                        style="width: 25%"
                        type="input"
                      >
                      </el-input>
                      <el-input
                        style="width: 25%"
                        type="input"
                      >
                      </el-input>
                      <el-input
                        style="width: 25%"
                        type="input"
                      >
                      </el-input>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div v-if="itemList.length">
        <el-form-item
          v-for="(item, index) in itemList"
          :key="'form' + index"
          :label="item.label"
          :prop="item.key"
        >
          <!-- input -->
          <el-input
            v-if="item.type === 'input'"
            v-model="form[item.key]"
            :placeholder="item.placeholder"
          >
          </el-input>

          <!-- textarea -->
          <el-input
            v-if="item.type === 'textarea'"
            type="textarea"
            v-model="form[item.key]"
            :placeholder="item.placeholder"
          >
          </el-input>

          <!-- radio -->
          <el-radio-group v-if="item.type === 'radio'" v-model="form[item.key]">
            <el-radio
              v-for="(subItem, subIndex) in item.options"
              :key="subItem.label + subIndex"
              :label="subItem.label"
            >
            </el-radio>
          </el-radio-group>

          <!-- checkbox -->
          <el-checkbox-group v-if="item.type === 'checkbox'" v-model="form[item.key]">
            <el-checkbox
              v-for="(subItem, subIndex) in item.options"
              :key="subItem.label + subIndex"
              :label="subItem.label"
            >
            </el-checkbox>
          </el-checkbox-group>

          <!-- select -->
          <el-select v-if="item.type === 'select'" v-model="form[item.key]" placeholder="请选择活动区域">
            <el-option
              v-for="(subItem) in item.options"
              :label="subItem.label"
              :value="subItem.value"
              :key="subItem.label"
            >
            </el-option>
          </el-select>

          <!-- switch -->
          <el-switch v-if="item.type === 'switch'" v-model="form[item.key]"></el-switch>

          <!-- upload-->
          <el-upload
            :action="$urls.upload"
            v-if="item.type === 'upload'"
            multiple
            :limit="3">
            <el-button size="small">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>

        </el-form-item>
      </div>

      <slot name="footer"></slot>
      <div style="text-align: right; margin-top: 10px; margin-right: 10px">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ParkForm',
  // props: ['formList', 'itemList', 'options'],
  props: {
    formList: [String, Number, Array, Object],
    itemList: [String, Number, Array, Object],
    options: [String, Number, Array, Object],
    defaultValue: [String, Number, Array, Object]
  },
  computed: {
  },
  watch: {
  },
  data () {
    return {
      imgFileList: [],
      fileList: [],
      form: {
      },
      rules: {
      },
      formList1: [
      ],
      uploadImgKey: '',
      uploadFileKey: '',
      uploadUrls: []
    }
  },
  methods: {
    handleBeforeUpload (file) {
    },
    handleUploadImgSuccess (response, file, fileList) {
      this.imgFileList = this.filterFormFileList(this._.cloneDeep(fileList))
      this.form[this.uploadImgKey] = {
        upload: this.filterFinFileList(this._.cloneDeep(fileList))
      }
    },
    handleUploadImgRemove (file, fileList) {
      this.imgFileList = this.filterFormFileList(this._.cloneDeep(fileList))
      this.form[this.uploadImgKey] = {
        upload: this.filterFinFileList(this._.cloneDeep(fileList))
      }
    },
    handleUploadFileSuccess (response, file, fileList) {
      this.form[this.uploadFileKey] = {
        upload: this.filterFinFileList(fileList)
      }
    },
    handleUploadFileRemove (file, fileList) {
      this.form[this.uploadFileKey] = {
        upload: this.filterFinFileList(fileList)
      }
    },
    filterFinFileList (fileList) { // 最终要提交的fileList
      let arr = []
      fileList && fileList.forEach(item => {
        if (item.response && item.response.code === 1000) {
          arr.push(item.response.urls[0])
        } else {
          let path = this.$urls.fileUrl
          // item.url = item.url.replace(path, '')
          arr.push(item)
        }
      })
      return arr
    },
    filterFormFileList (fileList) { // 挂载到form上的fileList
      let arr = []
      fileList && fileList.forEach(item => {
        if (!item.response && !item.url.includes('http')) {
          item.url = this.$urls.fileUrl + item.url
          arr.push(item)
        } else {
          arr.push(item)
        }
      })
      return arr
    },
    handleValidate () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$refs['form'].resetFields()
      this.imgFileList = []
      this.fileList = []
      this.$emit('resetForm')
    },
    onSubmit () {
      this.$refs['form'].validate((valid, value) => {
        if (valid) {
          this.$emit('onSubmit', this.$refs['form'].model)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSubmit () {
      this.onSubmit()
    },
    initItemList (itemList) {
      let rules = {}
      let form = {}
      itemList.forEach(item => {
        rules[item.key] = item.rule // rules 初始化
        let formInitValue = ''
        if (item.type === 'checkbox') { // checkbox 初始值为空数组
          formInitValue = []
        }
        if (item.type === 'switch') { // switch c初始值是布尔
          formInitValue = false
        }
        if (item.type === 'upload-img') { // 如果是图片，要拿到他的key TODO
          this.uploadImgKey = item.key
        }
        if (item.type === 'upload-file') { // 如果是文件，要拿到他的key TODO
          this.uploadFileKey = item.key
        }
        form[item.key] = formInitValue // form初始化
      })
      this.rules = rules
      this.form = this._.cloneDeep(form)
    },
    setDefaultValue () { // 设置默认值
      Object.keys(this.defaultValue).forEach(x => {
        Object.keys(this.form).forEach(y => {
          if (x === y) {
            this.form[x] = this.defaultValue[x]
          }
          if (this.uploadImgKey === y) {
            this.imgFileList = this.filterFormFileList(this.defaultValue[y].upload)
          }
          if (this.uploadFileKey === y) {
            this.fileList = this.filterFormFileList(this.defaultValue[y].upload)
          }
        })
      })
    },
    init () { // 将form 和rules根据传入的值初始化掉
      if (this.formList.length) { // 卡片式内容初始化为空
        let itemList = []
        this.formList.forEach(item => {
          itemList.push(...item.children)
        })
        this.initItemList(itemList)

        if (this.defaultValue) { // 如果有默认值再次赋予默认值
          this.setDefaultValue()
        }
      }
      if (this.itemList.length) { // 没有卡片
        this.initItemList(this.itemList)
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
  /deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
  }
  /deep/ .el-upload--picture-card{
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
</style>
