<template>
  <div class="api">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="menu">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
            <div v-for="(a, ai) in testData" :key="ai">
              <el-submenu :index="ai+''">
                <template slot="title">
                  <a @click="returnCom(a.title)">{{a.index}}.{{a.title}}</a>
                </template>
                <div v-for="(b, bi) in a.content" :key="bi">
                  <span style="padding-left:32px;">{{a.index}}.{{bi + 1}}.{{b.title}}</span>
                  <div v-for="(c, ci) in b.content" :key="ci">
                    <el-menu-item
                      style="height:28px;line-height: 28px;padding-left:48px;"
                      :index="c.title"
                    >
                      <a
                        @click="returnCom(c.title)"
                      >{{a.index}}.{{bi + 1}}.{{ ci + 1 }}.{{c.title}} - {{c.api}}</a>
                    </el-menu-item>
                    <!-- <el-submenu index="1-4">
                    <span slot="title">{{a.index}}.{{bi + 1}}.{{ ci + 1 }}.{{c.title}} - {{c.api}}</span>
                    </el-submenu>-->
                  </div>
                </div>
              </el-submenu>
            </div>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="content">
          <div v-for="(a, ai) in testData" :key="ai">
            <h1 :id="a.title">{{a.index+ '.' +a.title}}</h1>
            <div v-if="!a.content.length">-暂无API</div>
            <div v-if="a.content.length">
              <div v-for="(b, bi) in a.content" :key="bi" style="padding-left: 8px">
                <h2>{{a.index}}.{{bi + 1}}.{{b.title}}</h2>
                <ul style="padding-left: 16px;">
                  <li
                    v-for="(c, ci) in b.content"
                    :key="ci"
                  >{{a.index}}.{{bi + 1}}.{{ ci + 1 }}.{{c.title}} - {{c.api}}</li>
                </ul>
                <div v-for="(c, ci) in b.content" :key="ci" style="padding-left: 8px">
                  <h3 :id="c.title">{{a.index}}.{{bi + 1}}.{{ ci + 1 }}.{{c.title}}</h3>
                  <div style="padding: 6px 0;">api: {{c.api}}</div>
                  <div>-业务参数:</div>
                  <table border="1" cellpadding="0" cellspacing="0" width="600px">
                    <div v-if="c.business.length">
                      <tr>
                        <th>参数名称</th>
                        <th>参数类型</th>
                        <th>是否必须</th>
                        <th>参数描述</th>
                      </tr>
                      <tr v-for="(item,index) in c.business" :key="index">
                        <td>{{item.key}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.required ? '是' : '否'}}</td>
                        <td width="400px">{{item.description}}</td>
                      </tr>
                    </div>
                  </table>
                  <br />
                  <div>-返回参数:</div>
                  <div v-if="!c.return.length">无</div>
                  <div v-if="c.return.length">
                    <table border="1" cellpadding="0" cellspacing="0" width="600px">
                      <tr>
                        <th>参数名称</th>
                        <th>参数类型</th>
                        <th>是否必须</th>
                        <th>参数描述</th>
                      </tr>
                      <tr v-for="(item,index) in c.return" :key="index">
                        <td>{{item.key}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.required ? '是' : '否'}}</td>
                        <td width="400px">
                          {{item.description}}
                          <table v-if="item.explain" border="1" cellpadding="0" cellspacing="0">
                            <tr>
                              <th>参数名称</th>
                              <th>参数类型</th>
                              <th>参数描述</th>
                            </tr>
                            <tr v-for="(explain,index) in item.explain" :key="index">
                              <td>{{explain.key}}</td>
                              <td>{{explain.type}}</td>
                              <td>{{explain.description}}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <br />
                  <div v-if="c.explain.length">
                    <div>-list说明:</div>
                    <table border="1" cellpadding="0" cellspacing="0" width="600px">
                      <tr>
                        <th>参数名称</th>
                        <th>参数类型</th>
                        <th>参数描述</th>
                      </tr>
                      <tr v-for="(item,index) in c.explain" :key="index">
                        <td>{{item.key}}</td>
                        <td>{{item.type}}</td>
                        <td width="400px">
                          {{item.description}}
                          <table v-if="item.explain" border="1" cellpadding="0" cellspacing="0">
                            <tr>
                              <th>参数名称</th>
                              <th>参数类型</th>
                              <th>参数描述</th>
                            </tr>
                            <tr v-for="(explain,index) in item.explain" :key="index">
                              <td>{{explain.key}}</td>
                              <td>{{explain.type}}</td>
                              <td>{{explain.description}}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="test">
          <el-input v-model="API_input" placeholder="请输入API"></el-input>
          <el-input type="textarea" rows="10" placeholder="请输入要传的参数" v-model="API_textarea2"></el-input>
          <el-button
            style="margin-bottom: 10px;"
            size="small"
            type="primary"
            @click="API_test"
          >API测试</el-button>
          <el-input type="textarea" rows="22" placeholder="返回数据,默认显示所有园区树" v-model="API_textarea"></el-input>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { sibjc, baoxgl, tousgl, feiycj, kehgl, park, building, floor, room, feiyonglz, caiwusr, zidmkgl, zidgl, contract, enter, htmb, home, fangzfy, wuyfy, shuidfy, qitfy } from './model/api.js'
import { dic } from './model/dic.js'
export default {
  name: 'test',
  components: {},
  data () {
    return {
      testData: '',
      isCollapse: false,
      API_input: '',
      API_textarea: '',
      API_textarea2: ''
    }
  },
  mounted () {
    this.testData = [
      {
        index: 1,
        title: '资产管理模块',
        content: [park, building, floor, room]
      },
      {
        index: 2,
        title: '招商管理模块',
        content: [kehgl]
      },
      {
        index: 3,
        title: '合同管理模块',
        content: [contract, htmb]
      },
      {
        index: 4,
        title: '企业进退驻管理模块',
        content: [enter]
      },
      {
        index: 5,
        title: '物业服务模块',
        content: [sibjc, baoxgl, tousgl, feiycj]
      },
      {
        index: 6,
        title: '财务管理模块',
        content: [feiyonglz, caiwusr, fangzfy, wuyfy, shuidfy, qitfy]
      },
      {
        index: 7,
        title: '字典模块管理',
        content: [zidmkgl, zidgl]
      },
      {
        index: 8,
        title: '工作台模块',
        content: [home]
      }
    ]

    // 字典
    const arr = dic

    // for (let i = 0; i < arr.length; i++) {
    //   this.dictypeAdd(arr[i]).then(res => {
    //     this.dicinfoAdd(res);
    //   });
    // }
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    returnCom (id) {
      const returnEle = document.getElementById(id)
      if (returnEle) {
        returnEle.scrollIntoView(true)
      }
    },
    // API接口测试
    API_test () {
      let api = this.$urls.park.get_tree_list
      let params1 = {
        page_size: 999,
        page_no: 1
      }
      let params2 = {
        // domain_id: 317,
        address: '协力大厦',
        estate_property: '1',
        usage: '1',
        complete_ts: '2019-11-07T04:55:20.176Z',
        acquire_way: 1,
        capital: 1,
        detail: '1',
        attached: {},
        memo: '1',
        name: '西岗2',
        built_area: 10000,
        total_invest: 8000,
        property: '',
        contacter: '',
        contact: '',
        state: 1,
        cover_area: 12000,
        actual_invest: 9000
      }
      let params3 = {
        domain_id: 464
      }
      let params4 = {
        pid: 454,
        name: '测试房间1',
        info: {},
        code: 111,
        domain_memo: '',
        room_property: 1,
        is_rentable: false,
        state: 1,
        room_usage: 0,
        decoration_standard: 0,
        area: 300,
        direction: 2,
        estate_property: '1',
        usage: '1',
        acquire_way: '1',
        acquire_ts: '2019-11-07T04:55:20.176Z',
        is_flue: false,
        floor_height: 10,
        bearing: 10000,
        attached: {},
        memo: ''
      }

      let params = params1
      if (this.API_input) {
        api = '/' + this.API_input
      }
      if (this.API_textarea2) {
        params = JSON.parse(this.API_textarea2)
      }

      this.$https.post(api, params).then(res => {
        if (res.code !== 1000) {
          this.$message.error(res.msg)
          this.API_textarea = JSON.stringify(res, null, 2)
        } else {
          this.$message.success(res.msg)
          this.API_textarea = JSON.stringify(res, null, 2)
        }
        // console.log(this.API_textarea)
      })
    },
    // 添加字典类型，返回id
    dictypeAdd (obj) {
      return new Promise((resolve, reject) => {
        let params = {
          type_code: obj.type_code,
          type_name: obj.type_name
        }
        this.$https
          .post('/model.dictype.get_list', {
            type_code: obj.type_code,
            page_size: 999,
            page_no: 1
          })
          .then(res => {
            if (res.code === 1000) {
              if (!res.list.length) {
                this.$https.post('/model.dictype.add', params).then(res => {
                  this.$https
                    .post('/model.dictype.get_list', {
                      type_code: obj.type_code,
                      page_size: 999,
                      page_no: 1
                    })
                    .then(res => {
                      obj.id = res.list[0].type_id
                      resolve(obj)
                    })
                })
              } else {
                this.$message.error(`已存在${obj.type_code}`)
                console.log(`已存在字典类型${obj.type_code}`)
              }
            } else {
              console.log(res)
            }
          })
      })
    },
    // 添加字典信息
    dicinfoAdd (obj) {
      for (let i = 0; i < obj.data.length; i++) {
        let params = {
          type_id: obj.id,
          dic_code: obj.data[i].dic_code,
          dic_info: obj.data[i].dic_info,
          order_num: i
        }
        this.$https
          .post('/model.dicinfo.get_list', {
            type_id: obj.id,
            dic_code: obj.data[i].dic_code,
            page_size: 999,
            page_no: 1
          })
          .then(res => {
            if (res.code === 1000) {
              if (!res.list.length) {
                this.$https.post('/model.dicinfo.add', params)
              } else {
                this.$message.error(`已存在${obj.data[i].dic_code}`)
                console.log(`已存在字典${obj.data[i].dic_code}`)
              }
            } else {
              console.log(res)
            }
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/index.less";
h1 {
  font-size: 40px;
  line-height: 60px;
}
h2 {
  font-size: 30px;
  line-height: 40px;
}
h3 {
  font-size: 20px;
  line-height: 30px;
}
a {
  color: #333;
}
.menu,
.content,
.test {
  height: 88vh;
  overflow: auto;
}
</style>
