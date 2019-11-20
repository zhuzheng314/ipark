<template>
  <div>
    <el-form
      size="small"
      ref="form"
      :rules="rules"
      :model="form"
      label-width="auto"
    >
      <div v-if="formList.length" type="flex" justify="left">
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
                        v-for="(subItem, subIndex) in item.options"
                        :key="subItem.label + subIndex"
                        :label="subItem.label"
                      >
                      </el-checkbox>
                    </el-checkbox-group>

                    <!-- select -->
                    <el-select style="width: 100%" v-if="item.type === 'select'" v-model="form[item.key]" :placeholder="form[item.placeholder]">
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
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                      :ref="item.key"
                      :before-upload="beforeUpload"
                      v-model="form[item.key]"
                      v-if="item.type === 'upload-img'"
                      multiple
                      :limit="3">
                      <i class="el-icon-plus"></i>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>

                    <el-upload
                      class="upload-demo"
                      action="https://jsonplaceholder.typicode.com/posts/"
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
            action="https://jsonplaceholder.typicode.com/posts/"
            v-if="item.type === 'upload'"
            multiple
            :limit="3">
            <el-button size="small">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>

        </el-form-item>
      </div>

      <slot name="footer"></slot>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ParkForm',
  props: ['formList', 'itemList'],
  data () {
    return {
      fileList: [],
      form: {
      },
      rules: {
      },
      formList1: [
        {
          type: 'input',
          label: 'input',
          key: 'i',
          placeholder: 'asdfsadf',
          rule: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }, {
          type: 'radio',
          label: 'radio',
          key: 'r',
          options: [
            {
              label: 'dd1',
              value: 'vdd1'
            }, {
              label: 'dd2',
              value: 'vdd2'
            }
          ]
        }, {
          type: 'checkbox',
          label: 'checkbox',
          key: 'c',
          options: [
            {
              label: '美食',
              value: 'vdd1'
            }, {
              label: '美食美食',
              value: 'vdd2'
            }
          ]
        }, {
          type: 'textarea',
          label: 'textarea',
          key: 'textarea',
          placeholder: 'textarea',
          rule: [
            { required: true, message: '请输入', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ]
        }, {
          type: 'select',
          label: 'select',
          key: 'select',
          rule: [
            { required: true, message: '请输入', trigger: 'change' }
          ],
          options: [
            {
              label: '美食',
              value: 's1'
            }, {
              label: '美食美食',
              value: 's2'
            }
          ]
        }, {
          type: 'switch',
          label: 'switch',
          key: 'switch'
        }
      ]
    }
  },
  methods: {
    beforeUpload (file) {
      console.log(file, this.$refs)
      this.form.u2 = 456456465
    },
    handleValidate () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs['form'].resetFields()
    },
    onSubmit () {
      this.$refs['form'].validate((valid, value) => {
        if (valid) {
          console.log(this.$refs['form'].model)
          console.log(this.$refs['u1'])
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
        if (item.type === 'switch ') { // switch c初始值是布尔
          formInitValue = false
        }
        form[item.key] = formInitValue // form初始化
      })
      this.rules = rules
      this.form = form
    },
    init () { // 将form 和rules根据传入的值初始化掉
      if (this.formList.length) { // 卡片式内容
        let itemList = []
        this.formList.forEach(item => {
          itemList.push(...item.children)
        })
        this.initItemList(itemList)
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
/*/deep/ .el-upload--picture-card{*/
/*    width: 90px;*/
/*    height: 90px;*/
/*    line-height: 90px;*/
/*  }*/
/*  /deep/ .el-upload-list__item-actions{*/
/*    width: 90px;*/
/*    height: 90px;*/
/*    line-height: 90px;*/
/*  }*/
</style>
