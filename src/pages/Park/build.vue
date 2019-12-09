<template>
  <div class="parkNew">
    <div class="left">
      <el-button
        icon="el-icon-plus"
        @click="() => this.addShowBuild = true"
        style="width: 100%; height: 66px; margin-bottom: 10px">
        添加楼宇
      </el-button>
      <div class="left-list">
        <div v-if="$store.state.form.buildList.length">
          <div class="item"
               :class="{ active: item.domain_id === buildId}"
               :key="index + 'leftcard'"
               v-for="(item, index) in $store.state.form.buildList">
            <div class="inner" @click="handleBuildClick(index, item)">
              <img class="pic" :src="$urls.fileUrl + (item.attached && item.attached.upload && item.attached.upload[0] && item.attached.upload[0].url)">
              <div class="cont">
                <div class="title">{{item.name | StringStr(6) }}</div>
                <div class="value">{{item.area}}㎡</div>
              </div>
            </div>
            <i class="el-icon-edit" @click="handleEditBuildClick(item)"></i>
            <i class="el-icon-delete" @click="handleRemoveBuild(item)"></i>
          </div>
        </div>
        <div v-else>
          <None style="padding-top: 150px;"></None>
        </div>

      </div>
    </div>
    <div class="right">
      <Room :propBuildId="buildId"></Room>
    </div>
    <el-dialog
      title="添加楼宇"
      :visible.sync="addShowBuild"
      width="600px"
    >
      <div>
        <ParkForm
          ref="buildForm"
          @onSubmit="fetchAddBuild"
          :formList="$formsLabels.addBuildForm"
          :options="$store.getters.parkListOptions"
          :itemList="[]">
        </ParkForm>
      </div>
    </el-dialog>
    <el-dialog
      title="修改楼宇"
      :visible.sync="editShow"
      width="600px"
    >
      <div v-if="editShow">
        <ParkForm
          ref="buildForm"
          @onSubmit="fetchModify"
          :formList="$formsLabels.addBuildForm"
          :options="$store.getters.parkListOptions"
          :default-value="modifyDefaultValue"
          :itemList="[]">
        </ParkForm>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ElDivider from 'element-ui/packages/divider/src/main'
import InfoBox from '@/components/InfoBox/index.vue'
import ElCard from 'element-ui/packages/card/src/main'
import Room from './room.vue'
export default {
  name: 'assetInfo',
  components: {
    Room
  },
  watch: {
  },
  data () {
    return {
      addShowBuild: false,
      buildId: null,
      showType: true,
      addParkShow: false,
      addBuildShow: false,
      buildIndex: 0,
      modifyDefaultValue: {},
      editShow: false

    }
  },
  methods: {
    goBack () {
      this.$router.go(-1) // 后退
    },
    handleAdd () {
      this.addBuildShow = true
    },
    handleEditBuildClick (park) {
      this.modifyDefaultValue = {}
      this.$https.post(this.$urls.building.get_info, {
        domain_id: park.domain_id
      }).then(res => {
        if (res.code === 1000) {
          this.modifyDefaultValue = res
          this.editShow = true
        }
      })
    },
    fetchModify (data) {
      this.$https.post(this.$urls.building.modify, {
        domain_id: this.modifyDefaultValue.domain_id,
        ...data
      }).then(res => {
        if (res.code === 1000) {
          this.$message.success('修改成功')
          this.editShow = false
          this.fetchBuildList()
        } else {
          this.$message.warning('修改失败' + res.code)
        }
      })
    },
    handleBuildClick (index, item) {
      this.buildIndex = index
      this.buildId = item.domain_id
      // this.$router.push(`/park/build?buildId=${item.domain_id}`)
    },
    fetchBuildList () {
      this.$store.dispatch('getBuildList', {
        pid: this.$store.state.form.activePark.domain_id,
        page_no: 1,
        page_size: 20
      })
    },
    fetchAddBuild (data) {
      this.$store.dispatch('addBuild', data).then(res => {
        if (res.code === 1000) {
          this.addShowBuild = false
          this.$message.success('新增成功')
          this.$refs.buildForm.resetForm()
        }
      })
      this.$store.dispatch('getBuildList', {
        pid: this.$store.state.form.activePark.domain_id,
        page_no: 1,
        page_size: 20
      }).then(res => {
      })
    },
    getBuildId () {
      console.log('getBuildId')
      this.$store.dispatch('getBuildList', {
        pid: this.$store.state.form.activePark.domain_id,
        page_no: 1,
        page_size: 20
      }).then(res => {
        if (res.code === 1000) {
          this.buildId = res.list && res.list[0].domain_id
        }
      })
    },
    handleRemoveBuild (build) {
      this.$confirm('此操作将永久删除该楼宇, 是否继续?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$https.post(this.$urls.building.remove, {
            domain_id: build.domain_id
          }).then(res => {
            if (res.code === 1000) {
              this.$message.success('删除成功')
              this.$store.dispatch('getBuildList', { page_no: 1,
                page_size: 20 }).then(res => {
              })
            }
          })
        })
    }
  },
  created () {
    this.getBuildId()
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/style/index.less';
  *{
    box-sizing: border-box;
  }
  .parkNew{
    width: 100%;
    height: 100%;
    display: flex;
    .left{
      height: 800px;
      margin-right: 10px;
      width: 250px;

      &-list{
        cursor: pointer;
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 6px;
        box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
        .item{
          position: relative;
          height:80px;
          width: 100%;
          background:rgba(255,255,255,1);
          .inner{
            margin: 0 auto;
            padding-top: 16px;
            width: calc(~"100% - 40px");
            height: 80px;
            border-bottom: 1px solid #d0d0d0;
            overflow: hidden;
            .pic{
              width: 80px;
              height: 52px;
              float: left;
              margin-right: 10px;
            }
            .cont{
              float: left;
              .title{
                font-size: 16px;
                color: #666;
                margin-bottom: 15px;
                line-height: 16px;
              }
              .value{
                font-size: 14px;
                line-height: 14px;
                color: #999;
              }
            }
          }
          .el-icon-delete{
            position: absolute;
            right: 10px;
            bottom: 20px;
            display: none;
          }
          .el-icon-edit{
            position: absolute;
            right: 30px;
            bottom: 20px;
            display: none;
          }
        }
        .item:hover{
          background-color:  rgba(63,177,227,.5);
          .inner{
            border: none;
          }
          .cont{
            .title, .value{
              color: white;
            }
          }
          .el-icon-delete, .el-icon-edit{
            color: white;
            display: block;
          }
        }
        .active.item{
          background-color: rgba(63,177,227,1);
          .inner{
            border: none;
          }
          .cont{
            .title, .value{
              color: white !important;
            }
          }
        }
        .item:last-child{
          .inner{
            /*border: none;*/
          }
        }
      }
    }
    .right{
      flex: 1;
      width: 100%;
      height: 100%;
      position: relative;
      .box-card-title {
        position: relative;
        .back .el-icon-arrow-left{
          font-size: 32px;
          color: @blue;
          font-weight: 800;
          cursor: pointer;
        }
        .parkName{
          width: 230px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 80px;
          i{
            font-size: 32px;
            color: @green;
            position: absolute;
            top: 25px;
          }
          p{
            width: ~"calc(100% - 50px)";
            position: absolute;
            right: 0;
            text-align: center;
          }
          .park-building{
            top: 10px;
            font-size: 18px;
          }
          .details{
            top: 50px;
            cursor: pointer;
            color: @blue;
          }
        }
      }

      .park,.building,.room{
        width: 100%;
        height: 100%;
      }
      .select{
        margin-right: 10px;
      }
      .typeWrap{
        display: inline-block;
        margin-bottom: 15px;
        .status{
          width: 16px;
          height: 16px;
          border-radius: 2px;
          vertical-align: middle;
          display: inline-block;
        }
        .text{
          margin: 0 40px 0 8px;
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.65);
        }
      }
      .list{
        width: 100%;
        margin-bottom: 8px;
        &-header{
          width: 80px;
          background-color: white;
          height: 80px;
          float: left;
          border-bottom: 1px solid #c6c6c8;
        }
        &-wrap{
          width: calc(~"100% - 80px");
          float: left;
          height: 80px;
          /*background-color: green;*/
          .list-item{
            float: left;
            width: 25%;
            height: 80px;
            padding: 13px 9px;
            color: white;
            position: relative;
            margin-right: 5px;
            .text{
              font-size: 14px;
              height: 14px;
              line-height: 14px;
              margin-bottom: 8px;
            }
            .text:last-child{
              margin-bottom: 0;
            }
            .sub-text{
              font-size: 12px;
              height: 12px;
              line-height: 12px;
            }
            .status{
              position: absolute;
              right: 0;
              top: 0;
              width: 42px;
              height: 24px;
              background:rgba(255,255,255,0.45);
              color: #5E5E5E;
              line-height: 24px;
              text-align: center;
              font-size: 12px;
            }
          }
        }
      }
    }

  }
  .clear{
    clear: both;
  }
</style>
