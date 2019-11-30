<template>
<div class="park-menu">
  <div class="left-btn" @click="() => this.addShowBuild = true">
    <i class="el-icon-plus"></i> 添加楼宇
  </div>
  <div class="left-list">
    <div class="item" :class="{ active: item.domain_id === buildId}" :key="index + 'leftcard'" v-for="(item, index) in $store.state.form.buildList">
      <div class="inner" @click="handleBuildClick(index, item)">
        <img class="pic" :src="$urls.fileUrl + item.attached.upload[0].url">
        <div class="cont">
          <div class="title">{{item.name}}</div>
          <div class="value">{{item.area}}㎡</div>
        </div>
      </div>
      <i class="el-icon-delete" @click="handleRemovePark(item)"></i>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="less" scoped>
.park-menu{
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
      .el-icon-delete{
        position: absolute;
        right: 10px;
        top: 45%;
        display: none;
      }
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
</style>
