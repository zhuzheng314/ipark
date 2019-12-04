<template>
  <div class="g-header">
    <div class="left">
      <div class="desk">
        <i class="iconfont" @click="$router.push({path:'/home'})">&#xe60f;</i>
      </div>
      <div class="park-dropdown">
        <el-dropdown  @command="handleSelectPark">
          <span class="el-dropdown-link" style="font-size: 16px">
            {{$store.state.form.activePark && $store.state.form.activePark.name || ''}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :key="item.name + index"
              v-for="(item, index) in $store.state.form.parkList"
              :command="item">
              {{item.name}}
            </el-dropdown-item>
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
        <el-dropdown  @command="handleCommand" style="height: 56px;width: 25px">
          <i class="el-icon-user g-handle"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
            <!-- <el-button type="text" @click="pwd">点击打开 Message Box</el-button> -->
            <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
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
          :formList="$formsLabels.addParkForm"
          @onSubmit="handleAddPark"
          :itemList="[]">
        </ParkForm>
      </div>
    </el-dialog>

    <el-dialog
      title="修改密码"
      :visible.sync="setPassWordVisible"
      width="500px"
    >
      <div>
        <el-form :model="form">
          <el-form-item label="当前密码" label-width="80px">
            <el-input v-model="passwordForm.password1" show-password type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" label-width="80px">
            <el-input v-model="passwordForm.password2" show-password type="password"></el-input>
          </el-form-item>
          <el-form-item label="确定密码" label-width="80px">
            <el-input v-model="passwordForm.password3" show-password type="password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setPassWordVisible = false">取消</el-button>
        <el-button type="primary" @click="setPassWord">确定</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator'
// import EllipsisText from 'vue-ellipsis-text'
import md5 from 'md5'
export default {
  name: 'GlobalHeader',
  components: {
    // EllipsisText
  },
  data () {
    return {
      form: '',
      passwordForm: {
        password1: '',
        password2: '',
        password3: ''
      },
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
      setPassWordVisible: false
    }
  },
  methods: {
    handleSelectPark (item) {
      if (item === 'add') {
        this.addParkShow = true
      } else {
        this.$store.commit('commitActivePark', item)
        window.location.reload()
      }
    },
    handleAddPark (data) {
      this.$https.post(this.$urls.park.add, {
        ...data
      }).then(res => {
        if (res.code === 1000) {
          this.$store.dispatch('getParkList', { page_no: 1,
            page_size: 20 }).then(res => {
          })
          this.$message.success('新增园区成功')
          this.addShow = false
        }
      })
    },
    handleCommand (command) {
      if (command === 'pwd') {
        this.setPassWordVisible = true
      }
      if (command === 'loginOut') {
        this.$store.commit('clearSession')
      }
    },
    setPassWord () {
      if (!this.passwordForm.password1) {
        this.$message('请输入当前密码')
        return
      }
      if (this.passwordForm.password2 !== this.passwordForm.password3) {
        this.$message('请输入相同的密码')
      }
      if (!this.passwordForm.password2 && !this.passwordForm.password3) {
        this.$message('新密码不能为空')
      }
      if (this.passwordForm.password1 && this.passwordForm.password2 && this.passwordForm.password3 && this.passwordForm.password2 === this.passwordForm.password3) {
        let params = {
          user_id: 'business_admin',
          old_pass: md5(this.passwordForm.password1),
          pass: md5(this.passwordForm.password2)
        }
        this.$https.post(this.$urls.reste_password, params).then((res) => {
          // this.$message(res.code)
          this.setPassWordVisible = false
          let msg = res.code
          this.$message(`${msg}`)
        })
      }
    },
    fakerLogin () {
      let pass = md5('123456')
      this.$https.post('/login', {
        user: 'business_admin',
        pass
      }).then(res => {
        if (res.code === 1000) {
          this.$utils.storageSet('_token', res.access_token)
          this.$store.dispatch('getParkList', {
            page_no: 1,
            page_size: 9999
          }).then(res => {
            const activePark = this.$utils.storageGet('activePark')
            if (activePark) {
              this.$store.commit('commitActivePark', activePark)
            } else {
              this.$store.commit('commitActivePark', res.list[0])
            }
          })
        }
      })
    }
  },
  created () {
    const activePark = this.$utils.storageGet('activePark')
    if (activePark) {
      this.$store.commit('commitActivePark', activePark)
    }
    this.fakerLogin()
    // this.$store.dispatch('getParkList', {
    //   page_no: 1,
    //   page_size: 9999
    // }).then(res => {
    //   const activePark = this.$utils.storageGet('activePark')
    //   if (activePark) {
    //     this.$store.commit('commitActivePark', activePark)
    //   } else {
    //     this.$store.commit('commitActivePark', res.list[0])
    //   }
    // })
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
