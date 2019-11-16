<template>
  <div class="park">
    <div class="left">
      <div class="left-btn">
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
          <div v-for="(item, index) in cardImgList" :key="index + 'imgcard'" class="imgCard" :style="{backgroundImage: `url(${item.imgUrl})`}">
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
  </div>
</template>

<script>
export default {
  name: 'park',
  components: {
  },
  data () {
    return {
      fakerList: [],
      tableData: [],
      detail: [
        { name: '经营公司', value: '科创中心' },
        { name: '账务账套', value: '杭州账套' },
        { name: '介绍', value: '发展中心发展中心发展中心发展中心发展中心发展中心' }
      ],
      cardImgList: [
        { name: '体量 ㎡', value: '11111', imgUrl: require('@/assets/img/park/area.png') },
        { name: '使用率 %', value: '50', imgUrl: require('@/assets/img/park/area2.png') },
        { name: '出租率 %', value: '50', imgUrl: require('@/assets/img/park/area3.png') },
        { name: '实际租赁面积 ㎡', value: '12456', imgUrl: require('@/assets/img/park/area4.png') }
      ]
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
  },
  watch: {

  },
  methods: {
    handleRowClick (row, column, event) {
      console.log(row, column, event)
      this.$router.push('/asset-management/assetInfo')
    }
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
      opacity:1;
    }
    &-list{
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
    width: calc(~"100%-260px");
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
      .name{
        color: white;
        font-size: 18px;
      }
      .value{
        color: white;
        font-size: 32px;
      }
    }
  }
}

</style>
