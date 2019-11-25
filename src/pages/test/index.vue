<template>
<div class="test">
  <el-button type="primary" @click="drawer()">弹窗</el-button>
  <el-drawer
  title="房间详情"
  custom-class="drawer-r"
  :visible.sync="drawerState"
  size="1186px"
  direction="rtl">
    <HeaderCard :data="drawer_header"></HeaderCard>
    <HeaderInfo type=1 :data="drawer_info"></HeaderInfo>
    <div class="drawer-body" style="height:500px;">
      <BodyCard type=1 :data="drawer_body"></BodyCard>
      <BodyCard type=2 :data="drawer_body_table"></BodyCard>
      <BodyCard type=2 :data="drawer_body_table"></BodyCard>
    </div>
  </el-drawer>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="url"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-upload="handleBeforeUpload"
    :on-success="handleSuccess"
    :file-list="fileList"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
  <!-- <el-button type="primary" @click="showfile">文件</el-button> -->
</div>
</template>

<script>
import HeaderCard from '@/components/HeaderCard/index.vue'
import HeaderInfo from '@/components/HeaderInfo/index.vue'
import BodyCard from '@/components/BodyCard/index.vue'
export default {
  name: 'test',
  components: {
    HeaderCard, HeaderInfo, BodyCard
  },
  props: [''],
  data () {
    return {
      url: 'http://192.168.0.231:3000/upload',
      fileList: [],
      drawerState: false,
      drawer_header: {
        icon: '&#xe60c;',
        title: '西港发展中心  /  B栋 /  301、302',
        button: [
          { name: '按钮', icon: '&#xe62a;', function: 'click1' },
          { name: '按钮', icon: '&#xe62a;', function: 'click2' },
          { name: '按钮', icon: '&#xe64f;', function: 'click3' },
          { name: '按钮', icon: '&#xe607;', function: 'click4' },
          { name: '按钮', icon: '&#xe60c;', function: 'click3' },
          { name: '按钮', icon: '&#xe60c;', function: 'click4' }
        ]
      },
      drawer_info: {
        label: [
          { prop: 'date', label: '日期' },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' }
        ],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      },
      drawer_body: {
        title: '房间信息',
        info: [
          { name: '用户姓名', value: '付晓晓' },
          { name: '联系方式', value: '15648954632' },
          { name: '身份证', value: '300000000000000000' },
          { name: '地址', value: '浙江省杭州市西湖区黄姑山路工专路交叉路口' },
          { name: '用户姓名', value: '付晓晓', tag: 1 },
          { name: '用户姓名', value: '付晓晓' },
          { name: '用户姓名', value: '付晓晓' }

        ]
      },
      drawer_body_table: {
        title: '房间信息',
        info: {
          label: [
            { prop: 'date', label: '日期' },
            { prop: 'name', label: '姓名' },
            { prop: 'address', label: '地址' }
          ],
          tableData: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }
          ]
        }
      }
    }
  },
  mounted () {
    // console.log(this.url)
  },
  watch: {

  },
  methods: {
    showfile () {
      console.log(this.fileList)
    },
    drawer () {
      this.drawerState = true
    },
    submitUpload () {
      // this.$refs.upload.submit();
      this.$https.post('http://192.168.0.231:3000/upload', {}).then((res) => {
        // console.log(res)
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleBeforeUpload (file) {
      // console.log(file, 'handleBeforeUpload')
      return true
    },
    handleSuccess (response, file, fileList) {
      // console.log(response, file, fileList)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
</style>
