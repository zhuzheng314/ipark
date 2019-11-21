<template>
  <div class="park">
    <div class="left">
      <div class="left-btn" @click="handleAdd">
        <i class="el-icon-plus"></i> 添加园区
      </div>
      <div class="left-list">
        <div class="item" :key="index + 'leftcard'" v-for="(item, index) in fakerList">
          <img class="pic" :src="item.img">
          <div class="cont">
            <div class="title">{{item.name}}</div>
            <div class="value">{{item.value}}㎡</div>
          </div>
          <div class="devide"></div>
        </div>
      </div>
    </div>
    <div class="right">
      <el-card style="margin-bottom: 10px">
        <div style="color: #666; font-size: 16px; margin-bottom: 20px">西港发展中心</div>
        <div>
          <div v-for="(item, index) in cardImgList" :key="index + 'imgcard'" class="imgCard" :style="{background: item.background}">
            <div class="imgCard-icon">
              <img :src="item.icon" alt="">
            </div>
            <div class="value">{{item.value}}</div>
            <div class="name">{{item.name}}</div>
          </div>
          <div style="clear: both"></div>
        </div>
        <el-row>
          <el-col :span="12">
            <div class="detail">
              <div :key="'detail' + index" v-for="(item, index) in detail" class="item">
                <div class="title">
                  {{item.name}}
                </div>
                <div class="value">
                  {{item.value}}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="detail">
              <div :key="'itemi'+index" v-for="(item,index) in detail" class="item">
                <div class="title">
                  {{item.name}}
                </div>
                <div class="value">
                  {{item.value}}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

      </el-card>

      <el-card style="margin-bottom: 10px">

        <el-input
          placeholder="搜索楼宇"
          style="width: 180px; margin-right: 15px"
          prefix-icon="el-icon-search"
          v-model="value">
        </el-input>

        <el-select
            multiple
            style="width: 180px; margin-right: 15px"
            v-model="value"
            placeholder="出租率">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-button
          style="float: right;"
          type="primary"
          icon="el-icon-plus"
          @click="handleAdd"
        >新增楼宇</el-button>
        <div class="clearfix"></div>
      </el-card>

      <el-card>
        <el-table
          ref="filterTable"
          :data="tableData"
          @row-click="handleRowClick"
          style="width: 100%">
          <el-table-column
            prop="name"
            width="300"
            label="名称">
            <template  slot-scope="scope">
              <div class="tablecard">
                <img class="img" :src="scope.row.img">
                <div class="right">
                  <div class="name">{{scope.row.name}}</div>
                  <div class="value">{{scope.row.area}}</div>
                </div>
              </div>

            </template>
          </el-table-column>
          <el-table-column
            prop="can"
            label="可招租面积">
          </el-table-column>
          <el-table-column
            prop="price"
            label="在租均价">
          </el-table-column>
          <el-table-column
            prop="name"
            width="200"
            label="出租率">
            <template >
              <el-progress :percentage="50"></el-progress>
            </template>
          </el-table-column>
          <el-table-column
            prop="num"
            label="总房源数量">
          </el-table-column>
          <el-table-column
            prop="num"
            label="可招租房源数量">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog
      title="添加园区"
      :visible.sync="addShow"
      width="600px"
    >
      <div>
        <ParkForm
          ref="tt"
          :formList="addContractFormList"
          :itemList="[]">
        </ParkForm>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">ccc</el-button>
        <el-button type="primary" @click="test(222)">222</el-button>
      </span>

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
      fakerList: [],
      tableData: [],
      detail: [
        { name: '经营公司', value: '科创中心' },
        { name: '账务账套', value: '杭州账套' },
        { name: '介绍', value: '发展中心发展中心发展中心发展中心发展中心发展中心' }
      ],
      cardImgList: [
        { name: '体量 ㎡', value: '11111', imgUrl: require('@/assets/img/park/area.png'), icon: require('@/assets/img/park/icon1.png'), background: '#838CC7' },
        { name: '使用率 %', value: '50', imgUrl: require('@/assets/img/park/area2.png'), icon: require('@/assets/img/park/icon2.png'), background: '#55B9B7' },
        { name: '出租率 %', value: '50', imgUrl: require('@/assets/img/park/area3.png'), icon: require('@/assets/img/park/icon3.png'), background: '#37ABCC' },
        { name: '实际租赁面积 ㎡', value: '12456', imgUrl: require('@/assets/img/park/area4.png'), icon: require('@/assets/img/park/icon4.png'), background: '#B76FB9' }
      ],
      value: '',
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
      addContractFormList: [
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
    handleRowClick (row, column, event) {
      console.log(row, column, event)
      this.$router.push('/asset-management/assetInfo')
    },
    handleAdd () {
      this.addShow = true
    },
    test (a) {
      console.log(this.$refs.tt)
      // this.$refs.tt.handleValidate()
      this.$refs.tt.onSubmit()
    }
  },
  mounted () {
    [1, 1, 1, 1, 1].forEach((a, i) => {
      this.tableData.push({
        img: require('@/assets/img/park/build.png'),
        date: '2016-05-02',
        name: '协力大厦' + i,
        can: '10000 ㎡',
        price: '2.22元/㎡·天',
        percent: '10%',
        area: '建筑面积：12344 ㎡',
        num: 10,
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      })
    })
    for (let i = 0; i < 10; i++) {
      this.fakerList.push({ name: '新港.新界', img: require('@/assets/img/park/listhead.png'), value: 1000 })
    }
    this.$https.post('https://service.iot1234.com:2443/api/assets.park.get_list', {}).then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
.park{
  display: flex;
  width: 100%;
  height: 100%;
  * {
    box-sizing: border-box;
  }
  .left{
    height: 100%;
    margin-right: 10px;
    width: 250px;
    /*padding: 0 10px;*/
    &-btn{
      width:250px;
      height:66px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(63,177,227,1);
      box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
      margin-bottom: 10px;
      line-height: 66px;
      color: rgba(63,177,227,1);
      text-align: center;
      font-size: 16px;
      opacity:1;
    }
    &-btn:hover{
      cursor: pointer;
    }
    &-list{
      cursor: pointer;
      width: 100%;
      background-color: white;
      height: calc(~"100% - 20px");
      border-radius: 4px;
      box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
      overflow-y: scroll;
      .item{
        position: relative;
        height:86px;
        width: 100%;
        background:rgba(255,255,255,1);
        padding: 20px 16px;
        .pic{
          width: 80px;
          height: 52px;
          float: left;
          margin-right: 10px;
        }
        .cont{
          float: left;
          .title{
            font-size: 18px;
            color: #666;
            margin-bottom: 18px;
            line-height: 18px;
          }
          .value{
            font-size: 14px;
            line-height: 14px;
            color: #999;
          }
        }
        .devide{
          position: absolute;
          left: 10px;
          bottom: 0;
          height: 1px;
          /*background-color: #c6cad9;*/
          border-bottom: 1px solid #c6cad9;
          width: 230px;
        }
      }
    }
  }
  .right{
    // width: calc(~"100%-260px");
    flex: 1;
    .tablecard{
      .img{
        width: 96px;
        height: 62px;
        float: left;
        margin-right: 10px;
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
      margin-top: 20px;
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
