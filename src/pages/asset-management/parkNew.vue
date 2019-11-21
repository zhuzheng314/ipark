<template>
  <div class="parkNew">
    <div class="left">
      <div class="left-btn" @click="() => this.addBuildShow = true">
        <i class="el-icon-plus"></i> 添加楼宇
      </div>
      <div class="left-list">
        <div class="item" :class="{ active: buildIndex === index}" :key="index + 'leftcard'" v-for="(item, index) in fakerBuildList">
          <div class="inner" @click="handleBuildClick(index, item)">
            <img class="pic" :src="item.img">
            <div class="cont">
              <div class="title">{{item.name}}</div>
              <div class="value">{{item.value}}㎡</div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="right">
      <assetinfo></assetinfo>
    </div>
    <el-dialog
      title="添加楼宇"
      :visible.sync="addBuildShow"
      width="600px"
    >
      <div>
        <ParkForm
          ref="tt"
          :formList="addBuildFormList"
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
import ElDivider from 'element-ui/packages/divider/src/main'
import InfoBox from '@/components/InfoBox/index.vue'
import ElCard from 'element-ui/packages/card/src/main'
import assetinfo from './assetInfo.vue'
export default {
  name: 'assetInfo',
  components: {
    assetinfo
  },
  data () {
    return {
      showType: true,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      fakerList: [
      ],
      colorList: ['#57D1E2', '#46D2A8', '#F1A468', '#626C91', '#626C91'],
      infoBoxData: [
        {
          type: 0,
          title: {
            name: '管理面积',
            note: '测试文本'
          },
          value: {
            value: 20311400.3,
            unit: '㎡',
            chart: 0.24
          },
          subtitle: {
            name: '总房源数量',
            value: 22,
            unit: '间'
          }
        },
        {
          type: 'num',
          title: {
            name: '出租率',
            note: '测试文本'
          },
          value: {
            value: 55,
            unit: '%',
            chart: 0.24
          },
          subtitle: {
            name: '本月签约面积',
            value: 22,
            unit: '㎡'
          }
        },
        {
          type: 'num',
          title: {
            name: '在租实时均价',
            note: '测试文本'
          },
          value: {
            value: 2,
            unit: '元/㎡·天',
            chart: 0.24
          },
          subtitle: {
            name: '本月签约均价',
            value: 0,
            unit: '元/㎡·天'
          }
        },
        {
          type: 0,
          title: {
            name: '可招商面积',
            note: '测试文本'
          },
          value: {
            value: 20311400.3,
            unit: '㎡',
            chart: 0.24
          },
          subtitle: {
            name: '可招商房间',
            value: 22,
            unit: '间'
          }
        },
        {
          type: 'chart',
          title: {
            name: '当前计租率',
            note: '测试文本'
          },
          value: {
            value: 22.3,
            unit: '%',
            chart: 0.24
          },
          subtitle: {
            name: '预计全年计租率',
            value: 22,
            unit: '%'
          }
        }
      ],
      requirement: {
        area: {
          areaList: [
            {
              value: 1,
              label: '100m³以内'
            },
            {
              value: 2,
              label: '100-200m³'
            },
            {
              value: 3,
              label: '200-300m³'
            },
            {
              value: 4,
              label: '300m³以上'
            }
          ],
          value: ''
        },
        state: {
          stateList: [
            {
              value: 1,
              label: '已审核'
            },
            {
              value: 2,
              label: '审核中'
            },
            {
              value: 3,
              label: '未通过'
            }
          ],
          value: ''
        },
        timeLimit: {
          timeLimitList: [
            {
              value: 1,
              label: '半年以下'
            },
            {
              value: 2,
              label: '一年以内'
            },
            {
              value: 3,
              label: '三年以内'
            },
            {
              value: 4,
              label: '三年以上'
            }
          ],
          value: ''
        },
        industry: {
          industryList: [
            {
              value: 1,
              label: '金融'
            },
            {
              value: 2,
              label: '物流'
            },
            {
              value: 3,
              label: '电商'
            },
            {
              value: 4,
              label: '互联网'
            },
            {
              value: 0,
              label: '其他'
            }
          ],
          value: ''
        },
        source: {
          sourceList: [
            {
              value: 1,
              label: '中介'
            },
            {
              value: 2,
              label: '广告'
            },
            {
              value: 0,
              label: '其他'
            }
          ],
          value: ''
        },
        empty: {
          emptyList: [
            {
              value: 1,
              label: '占用'
            },
            {
              value: 2,
              label: '预定'
            },
            {
              value: 0,
              label: '待租'
            }
          ],
          value: ''
        }
      },
      roomInfoState: false, // 房间信息弹窗
      roomInfo_header: {
        title: '',
        button: [
          {
            name: '编辑',
            icon: '&#xe62a;',
            function: 'click1'
          },
          {
            name: '附件',
            icon: '&#xe655;',
            function: 'click1'
          },
          {
            name: '备注',
            icon: '&#xe7d1;',
            function: 'click1'
          },
          {
            name: '更多',
            icon: '&#xe86d;',
            function: 'click1'
          }
        ]
      },
      roomInfo_info: {
        label: [
          { prop: 'area', label: '面积(㎡)' },
          { prop: 'roomState', label: '房源状态' },
          { prop: 'state', label: '招商状态' },
          { prop: 'price', label: '预租单价(元/㎡·天)' },
          { prop: 'type', label: '房源类型' },
          { prop: 'decorate', label: '装修' },
          { prop: 'tag', label: '表签' }
        ],
        tableData: [{
          area: '360.00',
          roomState: '在租中',
          state: '不可招商',
          price: '3.00',
          type: '办公',
          decorate: '简装',
          tag: '自带办公家居，随时入住'
        }]
      },
      roomInfo_body: {
        title: '租赁合同信息',
        info: [
          { name: '租户', value: 'XXX有限公司' },
          { name: '计租日', value: '2019/11/21' },
          { name: '结束日', value: '2020/11/10' },
          { name: '状态', value: '未进驻' }

        ]
      },
      roomInfo_body_table1: {
        title: '物业合同信息',
        info: {
          label: [
            { prop: 'tenant', label: '租户' },
            { prop: 'start', label: '计租日' },
            { prop: 'end', label: '结束日' },
            { prop: 'price', label: '合同单价' },
            { prop: 'state', label: '状态' }
          ],
          tableData: [
            {
              tenant: '拓源科技',
              start: '2019/11/11',
              end: '2020/11/10',
              price: '3.00元/㎡·天',
              state: '新建待审核'
            }
          ]
        }
      },
      roomInfo_body_table2: {
        title: '招商信息',
        info: {
          label: [
            { prop: 'tenant', label: '租客' },
            { prop: 'state', label: '客户状态' },
            { prop: 'date', label: '跟进人员' },
            { prop: 'channel', label: '招商渠道' },
            { prop: 'remarks', label: '备注' }
          ],
          tableData: [
          ]
        }
      },
      fakerBuildList: [],
      addParkShow: false,
      addBuildShow: false,
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
      ],
      addBuildFormList: [
        {
          title: '楼宇信息',
          children: [
            {
              type: 'input',
              label: '楼宇名称',
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
              label: '可出租面积',
              key: 'i3',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入租客名称', trigger: 'blur' }
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'select',
              label: '所属园区',
              key: 'u2',
              placeholder: '请输入',
              options: [
                {
                  label: '西港新界',
                  value: 's1'
                },
                {
                  label: '海创园',
                  value: 's1'
                },
                {
                  label: '梦想小镇',
                  value: 's1'
                }
              ],
              rule: [
                { required: true, message: '请输入', trigger: 'blur' }
              ]
            },
            {
              type: 'textarea',
              label: '楼宇描述',
              key: 'i4',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入租客名称', trigger: 'blur' }
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'upload-img',
              label: '楼宇图片',
              key: 'u1',
              placeholder: '请输入'
              // rule: [
              //   { required: true, message: '请输入', trigger: 'blur' },
              //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              // ]
            }
          ]
        }
      ],

      buildIndex: 0
    }
  },
  methods: {
    getState (value) {
      this.state = value
    },
    random (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    roomInfo (id) {
      this.roomInfoState = true
      // console.log(id.index,id.subIndex);
      this.roomInfo_header.title = id.index + '楼00' + id.subIndex + '室'
    },
    open (i) {
      this.$message('这里是' + i)
    },
    goBack () {
      this.$router.go(-1) // 后退
    },
    handleAdd () {
      this.addBuildShow = true
    },
    handleBuildClick (index) {
      this.buildIndex = index
    }
  },
  mounted () {
    for (let i = 0; i < 10; i++) {
      this.fakerBuildList.push({ name: '协力大厦', img: require('@/assets/img/park/listhead.png'), value: 1000 })
    }

    this.$https.post(this.$urls.park.addParkList, {
      a: 100,
      b: 200
    }).then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/style/index.less';
  *{
    box-sizing: border-box;
  }
  .parkNew{
    display: flex;
    /*.left {*/
    /*  width: 200px;*/
    /*  margin-right: 10px;*/
    /*}*/
    .left{
      height: 100%;
      margin-right: 10px;
      width: 250px;
      /*padding: 0 10px;*/
      &-btn{
        width:100%;
        height:50px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(63,177,227,1);
        box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
        margin-bottom: 10px;
        line-height: 50px;
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
        height: calc(~"100% - 20px");
        border-radius: 6px;
        box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
        overflow-y: scroll;
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
