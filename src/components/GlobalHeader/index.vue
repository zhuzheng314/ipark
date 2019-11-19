<template>
  <div class="g-header">
    <div class="desk">
      <i class="iconfont" @click="$router.push({path:'/desk'})">&#xe60f;</i>
    </div>

    <div class="right">
      <div class="item">
        <el-badge style="margin-right: 10px" :value="2" class="item" type="error">
          <el-popover
            placement="bottom-end"
            width="200"
            trigger="click"
          >
            <div class="message">
              <div
                v-for="item in 3"
                :key="'msg' + item"
                class="message-item"
                style="border-bottom: 1px solid #cbcbcb; padding:  6px 0 6px; font-size: 12px">
                <span
                  style="margin: 0; font-size: 13px; line-height: 13px; display: inline-block; margin-bottom: 4px; color: #333"
                >
<!--                  <EllipsisText>{{item}}啊手动阀手动阀手动阀手动阀士大夫大师傅撒地方大师傅</EllipsisText>-->
                  您有新的待办事项
                </span>
                <br>
                <span style="color: #999;">2019-11-10</span>
              </div>

              <div style="text-align: right; margin-top: 5px">
                <el-link type="primary" style="font-size: 13px">查看更多</el-link>
              </div>
            </div>
            <i class="el-icon-bell g-handle" slot="reference"></i>
          </el-popover>

        </el-badge>

      </div>
      <div class="item">
        <el-dropdown style="height: 56px;">
          <i class="el-icon-user g-handle"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
<!--      <div class="item">-->
<!--        <el-dropdown style="height: 56px;">-->
<!--          <i class="el-icon-setting g-handle"></i>-->
<!--          <el-dropdown-menu slot="dropdown">-->
<!--            <el-dropdown-item>个人设置</el-dropdown-item>-->
<!--            <el-dropdown-item divided>退出登录</el-dropdown-item>-->
<!--          </el-dropdown-menu>-->
<!--        </el-dropdown>-->
<!--      </div>-->
      <div class="item">
        <i class="el-icon-full-screen g-handle"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator'
// import EllipsisText from 'vue-ellipsis-text'
export default {
  name: 'GlobalHeader',
  components: {
    // EllipsisText
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
.g-header{
  width: 100%;
  height: 56px;
  background-color: white;
  line-height: 56px;
  position: relative;
  z-index: 500;
  box-shadow:0px 3px 8px rgba(0,0,0,0.1);
  overflow-x: hidden;
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
  .right{
    /*position: absolute;*/
    /*right: 0;*/
    float: right;
    margin-right: 20px;
  }
  .item{
    float: left;
    width: 24px;
    height: 24px;
    line-height: 24px;
    margin-right: 24px;
  }
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
  /deep/ .el-dropdown{
    width: 24px;
    height: 24px;
    margin-right: 25px;
  }
  .el-dropdown {
    vertical-align: top;
  }
  /deep/ .el-badge__content.is-fixed{
    top: 15px;
  }
  /deep/ .message-item{
    color: green;
  }
  /*.message{*/
  /*  background-color: red;*/
  /*  padding: 0 12px;*/
  /*  .message-item{*/
  /*    width: 100%;*/
  /*    color: green;*/
  /*    padding: 12px 0;*/
  /*    border-bottom: 1px solid red;*/
  /*  }*/
  /*}*/
}
</style>
