<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item
        v-for="(item, index) in formList"
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'parkForm',
  data () {
    return {
      form: {
      },
      rules: {
      },
      formList: [
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
    init (formList) { // 将form 和rules根据传入的值初始化掉
      let rules = {}
      let form = {}
      formList.forEach(item => {
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
    }
  },
  created () {
    this.init(this.formList)
  }
}
</script>

<style scoped>

</style>
