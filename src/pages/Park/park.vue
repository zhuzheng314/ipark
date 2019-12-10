<template>
  <div class="park">
    <div class="left">
      <el-button
        icon="el-icon-plus"
        @click="() => this.addShow = true"
        style="width: 100%; height: 66px; margin-bottom: 10px">
        添加园区
      </el-button>
      <div class="left-list">
        <div v-if="$store.state.form.parkList.length">
          <div class="item"
               :class="{ active: item.domain_id === $store.state.form.activePark.domain_id}"
               :key="index + 'leftcard'" v-for="(item, index) in $store.state.form.parkList">
            <div class="inner" @click="handleParkClick(index, item)">
              <img class="pic" :src="$urls.fileUrl + (item.attached && item.attached.upload && item.attached.upload[0] && item.attached.upload[0].url)">
              <div class="cont">
                <div class="title">{{item.name | StringStr(6) }}</div>
                <div class="value">{{item.cover_area || '-'}}㎡</div>
              </div>
            </div>
            <i class="el-icon-edit" @click="handleEditParkClick(item)"></i>
            <i class="el-icon-delete" @click="handleRemovePark(item)"></i>
          </div>
        </div>
        <div v-else>
          <None style="padding-top: 100px"></None>
        </div>
      </div>
    </div>
    <div class="right">
      <div v-if="$store.state.form.parkList.length">
        <el-card v-loading="$store.state.loading" style="margin-bottom: 10px">
          <div style="color: #666; font-size: 16px;" slot="header">{{$store.state.form.activePark.name}}</div>
          <div class="top-card-wrap">
            <InfoBox
              style="float: left; margin:0 30px 10px 0px"
              v-for="(item, index) in infoBoxData" :type='item.type'
              :key="'info' + index"
              :data="item"
            ></InfoBox>
            <div style="clear: both"></div>
          </div>
          <el-divider></el-divider>
          <div style="margin-top: -10px">
            <el-row>
              <el-col style="height: 28px" :span="12"  :key="'detail' + index" v-for="(item, index) in parkInfo" >
                <div class="detail">
                  <div class="item">
                    <div class="title">
                      {{item.name}}:
                    </div>
                    <div class="value">
                      {{item.value + item.unit}}
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>

        </el-card>
        <el-card>
          <div slot="header">
            <el-input
              size="small"
              placeholder="搜索楼宇"
              style="width: 180px; margin-right: 15px"
              prefix-icon="el-icon-search"
              clearable
              @change="fetchBuildList"
              v-model="inputValue">
            </el-input>

            <el-button
              style="float: right;"
              size="small"
              type="primary"
              icon="el-icon-plus"
              @click="handleAddBuild"
            >新增楼宇</el-button>
            <div class="clearfix"></div>
          </div>
          <el-table
            ref="filterTable"
            :data="$store.state.form.buildList"
            style="width: 100%">
            <el-table-column
              prop="name"
              width="300"
              label="楼宇名称">
              <template  slot-scope="scope">
                <div class="tablecard">
                  <img class="img" :src="$urls.fileUrl + (scope.row.attached && scope.row.attached.upload && scope.row.attached.upload[0] && scope.row.attached.upload[0].url)">
                  <div class="right">
                    <div class="name">{{scope.row.name }}</div>
                    <div class="value">建筑面积：{{scope.row.area}}㎡</div>
                  </div>
                </div>

              </template>
            </el-table-column>
            <el-table-column
              prop="rent_area"
              label="可招租面积">
              <template  slot-scope="scope">
              <span>
                {{scope.row.rent_area}}㎡
              </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="avg_unit_price"
              label="在租均价">
              <template  slot-scope="scope">
              <span>
                {{scope.row.avg_unit_price}}元/㎡·天
              </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="rent_rate"
              width="200"
              label="出租率">
              <template slot-scope="scope">
                <el-progress :percentage="(scope.row.rent_rate * 100).toFixed(1) * 1"></el-progress>
              </template>
            </el-table-column>
            <el-table-column
              prop="total_rooms"
              label="总房源数量">
            </el-table-column>
            <el-table-column
              prop="rent_rooms"
              label="可招租房源数量">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleRowClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="fetchRemoveBuild(scope.row)"  type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="text-align: right;margin-top: 20px"
            layout="prev, pager, next"
            :current-page="page.page_no"
            :page-size="10"
            @prev-click="handlePageClick"
            @next-click="handlePageClick"
            @current-change="handlePageClick"
            :total="page.total">
          </el-pagination>
        </el-card>
      </div>
      <el-card v-else>
        <None style="height: 500px; padding-top: 120px"></None>
      </el-card>
    </div>
    <el-dialog
      destroy-on-close
      title="添加园区"
      :visible.sync="addShow"
      width="600px"
    >
      <div>
        <ParkForm
          @onCancel="() => {this.addShow = false}"
          ref="parkForm"
          v-if="addShow"
          @onSubmit="handleAddPark"
          :options="$store.getters.addParkOptions"
          :formList="$formsLabels.addParkForm"
          :itemList="[]">
        </ParkForm>
      </div>

    </el-dialog>
    <el-dialog
      :destroy-on-close="true"
      title="修改园区信息"
      :visible.sync="editParkShow"
      width="600px"
    >
      <ParkForm
        ref="parkForm"
        @onCancel="() => {this.editParkShow = false}"
        v-if="editParkShow"
        @onSubmit="handleEditPark"
        :formList="$formsLabels.addParkForm"
        :options="$store.getters.modifyParkOptions"
        :default-value="modifyParkDefaultValue"
        :itemList="[]">
      </ParkForm>

    </el-dialog>
    <el-dialog
      :destroy-on-close="true"
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

  </div>
</template>

<script>
export default {
  name: 'park',
  components: {
  },
  data () {
    return {
      addShow: false,
      addShowBuild: false,
      fakerList: [],
      tableData: [],
      infoBoxData: [],
      parkInfo: [
      ],
      cardImgList: [
        { name: '体量 ㎡', value: '11111', imgUrl: require('@/assets/img/park/area.png'), icon: require('@/assets/img/park/icon1.png'), background: '#838CC7' },
        { name: '使用率 %', value: '50', imgUrl: require('@/assets/img/park/area2.png'), icon: require('@/assets/img/park/icon2.png'), background: '#55B9B7' },
        { name: '出租率 %', value: '50', imgUrl: require('@/assets/img/park/area3.png'), icon: require('@/assets/img/park/icon3.png'), background: '#37ABCC' },
        { name: '实际租赁面积 ㎡', value: '12456', imgUrl: require('@/assets/img/park/area4.png'), icon: require('@/assets/img/park/icon4.png'), background: '#B76FB9' }
      ],
      value: '',
      inputValue: '',
      options: [
        {
          value: '选项1',
          label: '0-30%'
        }, {
          value: '选项2',
          label: '30-60%'
        }, {
          value: '选项3',
          label: '60%-90%'
        }, {
          value: '选项4',
          label: '90%以上'
        }
      ],
      buildIndex: 0,
      parkList: [],
      buildingList: [],
      activePark: '',
      page: {
        page_no: 1,
        total: 0,
        page_size: 10
      },
      editParkShow: false,
      modifyParkDefaultValue: {}
    }
  },
  watch: {
    '$store.state.form.activePark' (newData) {
      this.fetchParkInfo(newData)
      this.fetchBuildList()
    }
  },
  methods: {
    handleRowClick (row) {
      this.$router.push(`/park/build?buildId=${row.domain_id}`)
    },
    handleAdd () {
      this.addShow = true
    },
    handleParkClick (index, park) {
      this.buildIndex = index
      this.$store.commit('commitActivePark', park)
      this.fetchParkInfo(park)
      this.fetchBuildList(park)
    },
    handleEditParkClick (park) {
      this.modifyParkDefaultValue = {}
      this.$https.post(this.$urls.park.get_info, {
        domain_id: park.domain_id
      }).then(res => {
        if (res.code === 1000) {
          this.modifyParkDefaultValue = res
          this.editParkShow = true
        }
      })
    },
    handleEditPark (data) {
      this.$https.post(this.$urls.park.modify, {
        ...data,
        domain_id: this.modifyParkDefaultValue.domain_id
      }).then(res => {
        if (res.code === 1000) {
          this.$store.dispatch('getParkList', { page_no: 1,
            page_size: 999 }).then(res => {
          })
          this.$message.success('修改园区成功')
          this.editParkShow = false
        }
      })
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
    handleRemovePark (park) {
      this.$confirm('此操作将永久删除该园区, 是否继续?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$https.post(this.$urls.park.remove, {
            domain_id: park.domain_id
          }).then(res => {
            if (res.code === 1000) {
              this.$message.success('删除成功')
              this.$store.dispatch('getParkList', { page_no: 1,
                page_size: 20 }).then(res => {
              })
            } else {
              this.$message.warning('删除失败，code:' + res.code)
            }
          })
        })
    },
    handleAddBuild () {
      this.addShowBuild = true
    },
    fetchAddBuild (data) {
      this.$store.dispatch('addBuild', data).then(res => {
        if (res.code === 1000) {
          this.addShowBuild = false
          this.$message.success('新增成功')
          this.fetchBuildList()
          this.$refs.buildForm.resetForm()
        }
      })
      this.$store.dispatch('getBuildList', {
        pid: this.$store.state.form.activePark.domain_id,
        page_no: 1,
        page_size: 99
      }).then(res => {
      })
    },
    fetchParkList (data) {
      this.$store.dispatch('getParkList', {
        page_no: 1,
        page_size: 99
      }).then(res => {
      })
    },
    fetchParkInfo (park) {
      this.$https.post(this.$urls.park.get_d_info, {
        park_id: park.domain_id
      }).then(res => {
        if (res && res.code === 1000) {
          this.activePark = res
          let data = res
          this.infoBoxData = [
            {
              type: 0,
              title: { name: '管理面积', note: '测试文本' },
              value: { value: data.total_area, unit: '㎡', chart: null },
              subtitle: { name: '总房源数量', value: data.total_rooms, unit: '间' }
            },
            {
              type: 'num',
              title: { name: '出租率', note: '测试文本' },
              value: { value: data.rent_rate, unit: '%', chart: data.rent_change_rate },
              subtitle: { name: '本月签约面积', value: data.month_area, unit: '㎡' }
            },
            {
              type: 'num',
              title: { name: '在租实时均价', note: '测试文本' },
              value: { value: data.avg_unit_price, unit: '元/㎡·天', chart: data.avg_unit_price_rate },
              subtitle: { name: '本月签约均价', value: data.month_area_avg_price, unit: '元/㎡·天' }
            },
            {
              type: 0,
              title: { name: '可招商面积', note: '测试文本' },
              value: { value: data.rent_area, unit: '㎡', chart: null },
              subtitle: { name: '可招商房间', value: data.rent_rooms, unit: '间' }
            },
            {
              type: 'chart',
              title: { name: '当前计租率', note: '测试文本' },
              value: { value: data.pay_rate, unit: '%', chart: Number(data.pay_rate) },
              subtitle: { name: '预计全年计租率', value: Number(data.year_pay_rate).toFixed(2) * 100, unit: '%' }
            }
          ]
          this.parkInfo = [
            { name: '产权', value: res.capital, key: 'capital', unit: '' },
            { name: '地理位置', value: res.address, key: 'address', unit: '' },
            { name: '联系电话', value: res.contact, key: 'contact', unit: '' },
            { name: '占地面积', value: res.cover_area, key: 'cover_area', unit: '㎡' },
            { name: '建筑面积', value: res.built_area, key: 'built_area', unit: '㎡' },
            { name: '总投资额', value: res.total_invest, key: 'total_invest', unit: 'w' },
            { name: '实际投资', value: res.actual_invest, key: 'actual_invest', unit: 'w' },
            { name: '园区定位', value: this.$store.getters.getDicById(res.usage), key: 'usage', unit: '' }
          ]
        }
      })
    },
    fetchBuildList () {
      let params = {
        pid: this.$store.state.form.activePark.domain_id,
        ...this.page
      }
      if (this.inputValue) params.name = this.inputValue

      this.$store.dispatch('getBuildList', params).then(res => {
        if (res === 1000) {
          this.page = {
            ...this.page,
            page_no: res.page_no,
            total: res.total
          }
        }
      })
    },
    handlePageClick (num) {
      this.page.page_no = num
      this.fetchBuildList()
    },
    fetchTreeList () {
      this.$https.post(this.$urls.park.get_tree_list, {
        page_no: 1,
        page_size: 20
      }).then(res => {
        if (res.code === 1000) {
        }
      })
    },
    fetchRemovePark (park) {
      this.$https.post(this.$urls.park.remove, {
        domain_id: park.domain_id
      }).then(res => {
        if (res.code === 1000) {
        }
      })
    },
    fetchRemoveBuild (build) {
      // console.log(build)
      this.$https.post(this.$urls.building.remove, {
        domain_id: build.domain_id
      }).then(res => {
        if (res.code === 1000) {
          this.$message.success('删除成功')
          this.fetchBuildList()
        }
      })
    }
  },
  mounted () {
    this.fetchParkList()
    this.fetchBuildList()
    this.fetchTreeList()
    this.fetchParkInfo(this.$store.state.form.activePark)
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
.park{
  /*display: flex;*/
  width: 100%;
  height: 100%;
  * {
    box-sizing: border-box;
  }
  .left{
    float:left;
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
    // width: calc(~"100%-260px");
    flex: 1;
    .top-card-wrap{
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
    }
    .tablecard{
      .img{
        width: 96px;
        height: 62px;
        float: left;
        margin-right: 10px;
        border: 1px solid #dcdcdc;
      }
      .right{
        .name{
          font-size: 16px;
          padding: 9px 0 14px;
          line-height: 16px;
          color: #666;
        }
        .value{
          font-size: 14px;
          line-height: 14px;
          color: #8D8D8D;
        }
      }
    }
    .detail{
      margin-top: 10px;
      padding-left: 10px;
      .item{
        height: 16px;
        line-height: 16px;
        margin-bottom: 12px;
        .title{
          display: inline-block;
          font-size: 16px;
          color: #000;
          width: 100px;
        }
        .value{
          display: inline-block;
          font-size: 14px;
          line-height: 14px;
          color: #666;
        }
      }
    }
    .imgCard{
      width: 250px;
      height: 130px;
      margin-right: 25px;
      background-size:250px 130px;
      float: left;
      padding-left: 100px;
      padding-top: 36px;
      position: relative;
      border-radius: 4px;
      box-shadow: 0px 3px 8px rgba(0,0,0,0.16);
      .name{
        color: white;
        font-size: 18px;
      }
      .value{
        color: white;
        font-size: 32px;
      }
      .imgCard-icon{
        position: absolute;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: rgba(255,255,255,0.5);
        left: 18px;
        top: 38px;
        img{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
    }
  }
}

</style>
