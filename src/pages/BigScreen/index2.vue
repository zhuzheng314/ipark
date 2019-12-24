<template>
  <div class="bg">
    <div class="left">
      <div>
        <el-color-picker v-model="color1" show-alpha></el-color-picker>
        <div>{{color1}}</div>
        <el-color-picker v-model="color2" show-alpha></el-color-picker>
        <div>{{color2}}</div>
        <el-color-picker v-model="color3" show-alpha></el-color-picker>
        <div>{{color3}}</div>
      </div>
    </div>
    <div class="right">
      <div class="father">
        <div class="child">
          <div id="screen" class="cont">
          </div>
        </div>

        <div class="child">
          <div id="screen1" class="cont">
            <div class="inner">
              <dv-border-box-1 :dur="5" :color="colors" class="item">
              </dv-border-box-1>
              <dv-border-box-4 :color="colors" class="item">

              </dv-border-box-4>
              <dv-border-box-8 class="item" :color="colors">dv-border-box-8</dv-border-box-8>
              <dv-border-box-11 class="item" :color="colors" title="dv-border-box-11">dv-border-box-11</dv-border-box-11>
              <dv-border-box-12 class="item" :color="colors">dv-border-box-12</dv-border-box-12>
              <dv-border-box-10 class="item" :color="colors">dv-border-box-10</dv-border-box-10>
              <div class="item">
                <dv-water-level-pond
                  style="width: 150px; height: 150px; float: left; margin: 5px"
                  :config="{
            data: [66, 45],
            shape: 'roundRect',
            colors: colors
          }"/>
                <dv-water-level-pond
                  style="width: 150px; height: 150px; float: left; margin: 5px"
                  :config="{
            data: [66],
            shape: 'round',
            colors: colors
          }"/>
              </div>
              <div class="item">
                <dv-decoration-9 style="width: 200px; height: 200px" :color="colors" ></dv-decoration-9>
              </div>
              <dv-scroll-ranking-board class="item" :config="config" :color="color1" />
              <dv-scroll-board class="item" :config="tableConfig"  />
              <dv-scroll-board class="item" :config="tableConfig1"  />
              <dv-scroll-board class="item" :config="tableConfig2"  />
            </div>
          </div>
        </div>
        <div class="child">
          <div id="screen2" class="cont">
            <div class="inner">
              <dv-border-box-1 :dur="5" :color="colors" class="item">
              </dv-border-box-1>
              <dv-border-box-4 :color="colors" class="item">

              </dv-border-box-4>
              <dv-border-box-8 class="item" :color="colors">dv-border-box-8</dv-border-box-8>
              <dv-border-box-11 class="item" :color="colors" title="dv-border-box-11">dv-border-box-11</dv-border-box-11>
              <dv-border-box-12 class="item" :color="colors">dv-border-box-12</dv-border-box-12>
              <dv-border-box-10 class="item" :color="colors">dv-border-box-10</dv-border-box-10>
              <div class="item">
                <dv-water-level-pond
                  style="width: 150px; height: 150px; float: left; margin: 5px"
                  :config="{
            data: [66, 45],
            shape: 'roundRect',
            colors: colors
          }"/>
                <dv-water-level-pond
                  style="width: 150px; height: 150px; float: left; margin: 5px"
                  :config="{
            data: [66],
            shape: 'round',
            colors: colors
          }"/>
              </div>
              <div class="item">
                <dv-decoration-9 style="width: 200px; height: 200px" :color="colors" ></dv-decoration-9>
              </div>
              <dv-scroll-ranking-board class="item" :config="config" :color="color1" />
              <dv-scroll-board class="item" :config="tableConfig"  />
              <dv-scroll-board class="item" :config="tableConfig1"  />
              <dv-scroll-board class="item" :config="tableConfig2"  />
            </div>
          </div>
        </div>
        <div class="child">
          <div id="screen3" class="cont">
            <div class="inner">
              <dv-border-box-1 :dur="5" :color="colors" class="item">
              </dv-border-box-1>
              <dv-border-box-4 :color="colors" class="item">

              </dv-border-box-4>
              <dv-border-box-8 class="item" :color="colors">dv-border-box-8</dv-border-box-8>
              <dv-border-box-11 class="item" :color="colors" title="dv-border-box-11">dv-border-box-11</dv-border-box-11>
              <dv-border-box-12 class="item" :color="colors">dv-border-box-12</dv-border-box-12>
              <dv-border-box-10 class="item" :color="colors">dv-border-box-10</dv-border-box-10>
              <div class="item">
                <dv-water-level-pond
                  style="width: 150px; height: 150px; float: left; margin: 5px"
                  :config="{
            data: [66, 45],
            shape: 'roundRect',
            colors: colors
          }"/>
                <dv-water-level-pond
                  style="width: 150px; height: 150px; float: left; margin: 5px"
                  :config="{
            data: [66],
            shape: 'round',
            colors: colors
          }"/>
              </div>
              <div class="item">
                <dv-decoration-9 style="width: 200px; height: 200px" :color="colors" ></dv-decoration-9>
              </div>
              <dv-scroll-ranking-board class="item" :config="config" :color="color1" />
              <dv-scroll-board class="item" :config="tableConfig"  />
              <dv-scroll-board class="item" :config="tableConfig1"  />
              <dv-scroll-board class="item" :config="tableConfig2"  />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import initScreen from '@/utils/bigScreen'

export default {
  name: 'index',
  data () {
    return {
      color1: 'rgba(0, 140, 255, 1)',
      color2: 'rgba(0, 255, 238, 1)',
      color3: 'rgb(255,25,25,1)',
      // colors: ['#1B9CFC', '#25CCF7']
      config: {
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          }
        ],
        unit: '单位'
      },
      tableConfig: {
        header: ['列1', '列2', '列3'],
        data: [
          ['<span style="color:#37a2da;">行1列1</span>', '行1列2', '行1列3'],
          ['行2列1', '<span style="color:#32c5e9;">行2列2</span>', '行2列3'],
          ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
          ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
          ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
          ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
          ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
          ['行8列1', '<span style="color:#e062ae;">行8列2</span>', '行8列3'],
          ['<span style="color:#e690d1;">行9列1</span>', '行9列2', '行9列3'],
          ['行10列1', '<span style="color:#e7bcf3;">行10列2</span>', '行10列3']
        ],
        index: true,
        columnWidth: [50],
        align: ['center']
      },
      tableConfig1: {
        data: [
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3'],
          ['行7列1', '行7列2', '行7列3'],
          ['行8列1', '行8列2', '行8列3'],
          ['行9列1', '行9列2', '行9列3'],
          ['行10列1', '行10列2', '行10列3']
        ]
      },
      tableConfig2: {
        header: ['列1', '列2', '列3'],
        data: [
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3'],
          ['行7列1', '行7列2', '行7列3'],
          ['行8列1', '行8列2', '行8列3'],
          ['行9列1', '行9列2', '行9列3'],
          ['行10列1', '行10列2', '行10列3']
        ],
        carousel: 'page',
        index: true
      }
    }
  },
  computed: {
    colors () {
      return [ this.color1, this.color2, this.color3 ]
    }
  },
  mounted () {
    initScreen(1920, 1080, 'screen')
    initScreen(1920, 1080, 'screen1')
    initScreen(1920, 1080, 'screen2')
    initScreen(1920, 1080, 'screen3')
  }
}
</script>

<style lang="less" scoped>
  .bg{
    width: 100%;
    height: 100%;
    /*display: flex;*/
    /*justify-content: space-between;*/
    position: relative;
    .left{
      width: 20%;
      position: fixed;
      top: 0;
      left: 0;
    }
    .right{
      float: right;
      height: 100%;
      .father{
        height: 100%;
        .child{
          width: 1200px;
          height: 1200px / 1.77;
          position: relative;
          .cont{
            .inner{
              width: 100%;
              height: 100%;
              background-color: #282c34;
              overflow: hidden;
              /*display: flex;*/
              .item{
                float: left;
                width: 350px;
                height: 220px;
                margin: 10px;
              }
              /deep/ .inside-column{
                /*background-color: red;*/
              }
            }
          }
        }
      }
    }

  }

</style>
