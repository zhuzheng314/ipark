<template>
  <div class="assetInfo">
    <!-- <el-card style="margin-bottom: 10px;d"> -->
      <!-- <CardList v-for="item in 5"  :key="item + 'cardl'" style="width: 18%; margin: 0 10px 0 0; float: left"></CardList>
      <div class="clear"></div> -->
    <!-- </el-card> -->
    <el-card style="margin-bottom:10px">
      <InfoBox style="with:250px;margin:0 15px 0 10px;float: left" v-for="item in 5" :type='item % 4' :key="'info' + item" :data="infoBoxData"></InfoBox>
      <div style="clear:both"></div>
    </el-card>

    <el-card>
      <div>
        <el-select v-for="item in 5" :key="item + 'sel'" class="select" size="small" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-divider></el-divider>

<!--      状态-->
      <div>
        <div v-for="item in 4" :key="'t' + item" class="typeWrap">
          <div class="status" :style="{background: colorList[item - 1]}"></div>
          <div class="text">2019({{item}})</div>
        </div>

        <div style="float: right">
          <el-button size="mini" @click="() => this.showType = !this.showType">切换</el-button>
        </div>
      </div>

<!--      楼宇列表-->

      <div class="list" :key="'list-' + index" v-for="(item, index) in fakerList">
        <div class="list-header">{{index}}</div>
        <div class="list-wrap">
          <div v-for="(subItem, subIndex) in item" :key="'listItem' + subIndex" >
            <div
              v-if="!showType"
              class="list-item"
              @click="roomInfo({index,subIndex})"
              :style="{ width: 'calc(' + 100 / item.length + '% - 5px)' , background: subItem.bgColor }">
              <div class="text">阿里巴巴</div>
              <div class="sub-text" style="margin-bottom: 8px">{{subItem.area}}㎡</div>
              <div class="sub-text">2019-11-11到期</div>
              <div class="status">占用</div>
            </div>
            <div
              v-if="showType"
              class="list-item"
              @click="roomInfo({index,subIndex})"
              :style="{ width: 'calc(' + subItem.area * 100 / item[item.length - 1].allArea + '% - 5px)' , background: subItem.bgColor }">
              <div class="text">阿里巴巴</div>
              <div class="sub-text" style="margin-bottom: 8px">{{subItem.area}}㎡</div>
              <div class="sub-text">2019-11-11到期</div>
              <div class="status">占用</div>
            </div>
          </div>

        </div>
        <div class="clear"></div>
      </div>

<!--      房间信息-->
       <el-drawer
      title="房间详情"
      custom-class="drawer-r"
      :visible.sync="roomInfoState"
      size="1186px"
      direction="rtl">
        <HeaderCard :data="roomInfo_header"></HeaderCard>
        <HeaderInfo type=1 :data="roomInfo_info"></HeaderInfo>
        <div class="drawer-body" style="height: 720px;">
          <BodyCard type=1 :data="roomInfo_body"></BodyCard>
          <BodyCard type=2 :data="roomInfo_body_table1"></BodyCard>
          <BodyCard type=2 :data="roomInfo_body_table2"></BodyCard>
          <!-- <BodyCard type=2 :data="drawer_body_table"></BodyCard> -->
        </div>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
import ElDivider from 'element-ui/packages/divider/src/main'
import InfoBox from '@/components/InfoBox/index.vue'
export default {
  name: 'assetInfo',
  components: {
    ElDivider,
    InfoBox
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
      colorList: ['#57D1E2', '#46D2A8', '#F1A468', '#626C91'],
      infoBoxData: {
        title: {
          name: '可招商面积',
          note: '可招商面积'
        },
        value: {
          value: 203400,
          unit: '㎡',
          chart: 0.42
        },
        subtitle: {
          name: '可招商房间',
          value: 22,
          unit: '间'
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
            icon: '&#xe62a;',
            function: 'click1'
          },
          {
            name: '备注',
            icon: '&#xe62a;',
            function: 'click1'
          },
          {
            name: '更多',
            icon: '&#xe62a;',
            function: 'click1'
          }
        ]
      },
      roomInfo_info: {
        label: [
          { prop: 'area', label: '面积(㎡)' },
          { prop: 'state', label: '招商状态' },
          { prop: 'price', label: '预租单价(元/㎡·天)' },
          { prop: 'decorate', label: '装修' },
          { prop: 'tag', label: '表签' }
        ],
        tableData: [{
          area: '360.00',
          state: '可招商',
          price: '3.00',
          decorate: '简装',
          tag: '自带办公家居，随时入住'
        }]
      },
      roomInfo_body: {
        title: '租赁效益',
        info: [
          { name: '计租率(%)', value: '-' },
          { name: '计租天数', value: '-' },
          { name: '空置天数', value: '316' },
          { name: '实时单价', value: '-' }

        ]
      },
      roomInfo_body_table1: {
        title: '合同',
        info: {
          label: [
            { prop: 'tenant', label: '租客' },
            { prop: 'total', label: '租赁数' },
            { prop: 'start', label: '计租日' },
            { prop: 'end', label: '结束日' },
            { prop: 'price', label: '合同单价' },
            { prop: 'state', label: '状态' }
          ],
          tableData: [
            {
              tenant: '拓源科技',
              total: '360',
              start: '2019/11/11',
              end: '2020/11/10',
              price: '3.00元/㎡·天',
              state: '新建待审核'
            }
          ]
        }
      },
      roomInfo_body_table2: {
        title: '客户',
        info: {
          label: [
            { prop: 'tenant', label: '租客' },
            { prop: 'state', label: '客户状态' },
            { prop: 'date', label: '来访时间' },
            { prop: 'channel', label: '渠道' },
            { prop: 'area', label: '需求面积' }
          ],
          tableData: [
          ]
        }
      }
    }
  },
  mounted () {
    let fakerList = []
    for (let i = 0; i < 6; i++) {
      let arr = []
      let allArea = 0
      let randomLength = this.random(3, 8)
      for (let j = 0; j < randomLength; j++) {
        let area = this.random(150, 300)
        allArea += area
        arr.push({
          area,
          allArea,
          bgColor: this.colorList[this.random(0, 4) % 4]
        })
      }
      fakerList.push(arr)
    }
    this.fakerList = fakerList
    console.log(this.fakerList)
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
    click1 () {
      alert('ok')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  *{
    box-sizing: border-box;
  }
  .assetInfo{
    width: 100%;
    height: 100%;
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
  .clear{
    clear: both;
  }
</style>
