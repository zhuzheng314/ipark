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
            width="200"
            trigger="click"
          >
            <div class="message">
              <div class="noMsg" style="text-align: center;height: 180px;padding-top: 20px;">
                  <None type="message"></None>
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
      :modal-append-to-body="false"
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
      :modal-append-to-body="false"
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
        this.$store.commit('loginOut')
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
    axiosAll () {
      this.$store.dispatch('getParkList', {
        page_no: 1,
        page_size: 9999
      }).then(res => {
        this.$store.dispatch('getDictionaryTree')
        this.$store.dispatch('getParkTreeList')
        this.$store.dispatch('getContractList')
        this.$store.dispatch('getCustomerList')
        this.$store.dispatch('getContractTamplateList')
      })
    }
  },
  beforeCreate () {
    console.log(12313213123, '465465')
    if (this.$route.query && this.$route.query.id) {
      console.log(1)
      this.$utils.storageSet('_token', this.$route.query.id)
    }
    console.log(2)
    const _token = this.$utils.storageGet('_token')
    console.log(3)
    console.log(sessionStorage.getItem('_token'))
    console.log(_token, '465465')
    if (!_token) {
      this.$store.commit('loginOut')
    }
  },
  created () {
    const activePark = this.$utils.storageGet('activePark')
    if (activePark) {
      this.$store.commit('commitActivePark', activePark)
    }
    this.axiosAll()
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
.g-header{
  width: 100%;
  height: 56px;
  background-color: white;
  box-shadow:0px 3px 8px rgba(0,0,0,0.1);
  overflow: hidden;
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
