<template>
  <div class="g-header">
    <div class="left">
      <div class="desk">
        <i class="iconfont" @click="$router.push({path:'/home'})">&#xe60f;</i>
      </div>
      <div class="park-dropdown">
        <el-dropdown  @command="handleSelectPark">
          <span class="el-dropdown-link" style="font-size: 16px">
            {{parkName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="西港发展中心">西港发展中心</el-dropdown-item>
            <el-dropdown-item command="梦想小镇">梦想小镇</el-dropdown-item>
            <el-dropdown-item command="人工智能小镇">人工智能小镇</el-dropdown-item>
            <el-dropdown-item divided command="add">+ 新增园区</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="right">
      <div class="item">
        <el-badge style="margin-right: 10px" :value="2" class="item">
          <el-popover
            placement="bottom-end"
            width="150"
            trigger="click"
          >
            <div class="message">
              <!-- <div
                v-for="item in 3"
                :key="'msg' + item"
                class="message-item"
                style="border-bottom: 1px solid #cbcbcb; padding:  6px 0 6px; font-size: 12px">
                <span
                  style="margin: 0; font-size: 13px; line-height: 13px; display: inline-block; margin-bottom: 4px; color: #333"
                >
                  您有新的待办事项
                </span>
                <br>
                <span style="color: #999;">2019-11-10</span>
              </div>

              <div style="text-align: right; margin-top: 5px">
                <el-link type="primary" style="font-size: 13px">查看更多</el-link>
              </div> -->

              <div class="noMsg" style="text-align: center;height: 100px;padding-top: 20px;">
                <i class="iconfont" style="font-size: 36px;color: #ccc;">&#xe642;</i>
                <p style="margin: 0px 0 0 0;font-size: 12px;">暂无消息</p>
              </div>
            </div>
            <i class="el-icon-bell g-handle" slot="reference"></i>
          </el-popover>

        </el-badge>

      </div>
      <div class="item">
        <el-dropdown style="height: 56px;width: 25px">
          <i class="el-icon-user g-handle"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="item">
        <i class="el-icon-full-screen g-handle"></i>
      </div>
    </div>

    <el-dialog
      title="添加园区"
      :visible.sync="addParkShow"
      width="600px"
    >
      <div>
        <ParkForm
          ref="tt"
          :formList="addParkFormList"
          :itemList="[]">
        </ParkForm>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="test(222)">确定</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator'
// import EllipsisText from 'vue-ellipsis-text'
export default {
  name: 'GlobalHeader',
  components: {
    // EllipsisText
  },
  data () {
    return {
      options: [
        {
          value: '选项1',
          label: '梦想小镇'
        },
        {
          value: '选项1',
          label: '西港发展中心'
        },
        {
          value: '选项1',
          label: '海创园'
        },
        {
          value: '选项1',
          label: '人工智能小镇'
        }
      ],
      value: '',
      parkName: '请选择园区',
      addParkShow: false,
      addParkFormList: [
        {
          title: '园区信息',
          children: [
            {
              type: 'input',
              label: '园区名称',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '建筑面积',
              key: 'i2',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' }
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '总投资',
              key: 'i3',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入租客名称', trigger: 'blur' }
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '所属物业',
              key: 'i4',
              placeholder: '请输入租客名称',
              rule: [
                { required: true, message: '请输入租客名称', trigger: 'blur' }
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '园区联系人',
              key: 'i4',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入租客名称', trigger: 'blur' }
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '园区联系电话',
              key: 'i4',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入租客名称', trigger: 'blur' }
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'select',
              label: '园区状态',
              key: 'u2',
              placeholder: '请输入',
              options: [
                {
                  label: '在建',
                  value: 's1'
                },
                {
                  label: '招商',
                  value: 's1'
                },
                {
                  label: '运营',
                  value: 's1'
                },
                {
                  label: '其他',
                  value: 's1'
                }
              ],
              rule: [
                { required: true, message: '请输入', trigger: 'blur' }
              ]
            },
            {
              type: 'textarea',
              label: '园区描述',
              key: 'i5',
              placeholder: '请输入',
              rule: [
                // { required: true, message: '请输入', trigger: 'blur' },
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'upload-img',
              label: '园区图片',
              key: 'u1',
              placeholder: '请输入'
              // rule: [
              //   { required: true, message: '请输入', trigger: 'blur' },
              //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              // ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleSelectPark (commad) {
      if (commad === 'add') {
        this.addParkShow = true
      } else {
        this.parkName = a
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
.g-header{
  width: 100%;
  height: 56px;
  background-color: white;
  /*position: relative;*/
  /*z-index: 2000;*/
  box-shadow:0px 3px 8px rgba(0,0,0,0.1);
  overflow-x: hidden;
  .left{
    float: left;
    height: 100%;
    width: 500px;
    line-height: 56px;
    .desk{
      width: 32px;
      height: 100%;
      float: left;
      margin-left: 20px;
      i{
        font-size: 24px;
        cursor: pointer;
      }
      i:hover{
        color: @light-blue;
      }
      i:active{
        color: @blue;
      }
    }
    .park-dropdown{
      margin-left: 15px;
      height: 56px;
      float: left;
    }
  }
  .right{
    float: right;
    margin-right: 20px;
    height: 100%;
    overflow: hidden;
    .park-dropdown{
      margin-right: 24px;
      height: 56px;
      float: left;
    }
    .item{
      float: left;
      width: 24px;
      height: 24px;
      line-height: 24px;
      margin-right: 24px;
      .g-handle{
        line-height: 56px;
        font-size: 22px;
        font-weight: 500;
        /*text-align: center;*/
        color: rgba(0, 0, 0, 0.65);
        /*height: 56px;*/
      }
      .g-handle:hover{
        color: #3FB1E3;
        cursor: pointer;
      }
      .g-handle:last-child{
        margin-right: 65px;
      }
    }
  }
  /*/deep/ .el-dropdown{*/
  /*  width: 24px;*/
  /*  height: 24px;*/
  /*  margin-right: 25px;*/
  /*}*/
  /*.el-dropdown {*/
  /*  vertical-align: top;*/
  /*}*/
  /deep/ .el-badge__content.is-fixed{
    top: 15px;
  }
}
</style>
