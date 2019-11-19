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
  {{345324 | NumFormat}}
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
      drawerState: true,
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

  },
  watch: {

  },
  methods: {
    click1 () {
      alert('click1')
    },
    click2 () {
      alert('click2')
    },
    click3 () {
      alert('click3')
    },
    click4 () {
      alert('click4')
    },
    drawer () {
      this.drawerState = true
    }
    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //   .then(_ => {
    //     done();
    //   })
    //   .catch(_ => {});
    // }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
</style>
