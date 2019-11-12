<template>
  <div>
    <el-form size="small" ref="form" :rules="rules" :model="form" label-width="80px">
      <div v-if="formList.length" >
        <el-card style="margin-bottom: 20px"  v-for="(card, index) in formList" :key="'formcard' + index">
          <div slot="header" class="clearfix">
            <span>{{card.title}}</span>
          </div>
          <el-form-item
            v-for="(item, index) in card.children"
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

            <!--          日期-->
            <el-date-picker v-if="item.type === 'date-picker'" :placeholder="placeholder" v-model="form[item.key]" style="width: 100%;"></el-date-picker>
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
            <el-select v-if="item.type === 'select'" v-model="form[item.key]" :placeholder="form[item.placeholder]">
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
              :options="item.options"
            ></el-cascader>
          </el-form-item>
        </el-card>
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
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'parkForm',
  props: ['formList', 'itemList'],
  data () {
    return {
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
    handleValidate (a) {
      console.log(a)
    },
    onSubmit () {
      console.log(this.form)
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

<style scoped>

</style>
