<template>
<div class="test">
<!--  eslint-disable-->
  <el-card style="width: 800px">
    <div v-for="(a, ai) in testData" :key="ai">
      <h1>{{a.index+ '.' +a.title}}</h1>
      <div v-for="(b, bi) in a.content" :key="bi" style="padding-left: 8px">
        <h2>{{a.index}}.{{bi + 1}}.{{b.title}}</h2>
        <ul style="padding-left: 16px;">
          <li v-for="(c, ci) in b.content" :key="ci">
            {{a.index}}.{{bi + 1}}.{{ ci + 1 }}.{{c.title}} - {{c.api}}
          </li>
        </ul>
        <div v-for="(c, ci) in b.content" :key="ci" style="padding-left: 8px">
          <h3>{{a.index}}.{{bi + 1}}.{{ ci + 1 }}.{{c.title}}</h3>
          <div style="padding: 6px 0;">api: {{c.api}}</div>
          <div>-业务参数:</div>
          <table border="1" cellpadding="0" cellspacing="0" width="600px">
            <div v-if="c.business.length">
              <tr><th>参数名称</th><th>参数类型</th><th>是否必须</th><th>参数描述</th></tr>
              <tr v-for="(item,index) in c.business" :key="index" >
                <td>{{item.key}}</td>
                <td>{{item.type}}</td>
                <td>{{item.required}}</td>
                <td width="400px">{{item.description}}</td>
              </tr>
            </div>
          </table>
          <br/>
          <div>-返回参数:</div>
          <div v-if="!c.return.length">无</div>
          <div v-if="c.return.length">
            <table border="1" cellpadding="0" cellspacing="0" width="600px">
              <tr><th>参数名称</th><th>参数类型</th><th>是否必须</th><th>参数描述</th></tr>
              <tr v-for="(item,index) in c.return" :key="index" >
                <td>{{item.key}}</td>
                <td>{{item.type}}</td>
                <td>{{item.required}}</td>
                <td width="400px">{{item.description}}</td>
              </tr>
            </table>
          </div>
          <br/>
          <div v-if="c.explain.length">
            <div>-list说明:</div>
              <table border="1" cellpadding="0" cellspacing="0" width="600px">
                <tr><th>参数名称</th><th>参数类型</th><th>是否必须</th><th>参数描述</th></tr>
                <tr v-for="(item,index) in c.explain" :key="index">
                  <td>{{item.key}}</td>
                  <td>{{item.type}}</td>
                  <td>{{item.required}}</td>
                  <td width="400px">{{item.description}}</td>
                </tr>
              </table>
            </div>
          <br>
        </div>
      </div>
    </div>
  </el-card>
  <el-divider></el-divider>

  <el-button type="primary" @click="drawer()">弹窗</el-button>
  <el-drawer
  title="房间详情"
  custom-class="drawer-r"
  :visible.sync="drawerState"
  size="1186px"
  direction="rtl">
    <HeaderCard :data="drawer_header"></HeaderCard>
    <HeaderInfo type=1 :data="drawer_info"></HeaderInfo>
    <div class="drawer-body" style="height:500px;">
      <BodyCard type=1 :data="drawer_body"></BodyCard>
      <BodyCard type=2 :data="drawer_body_table"></BodyCard>
      <BodyCard type=2 :data="drawer_body_table"></BodyCard>
    </div>
  </el-drawer>
  <el-divider></el-divider>

  <el-upload
    class="upload-demo"
    ref="upload"
    :action="url"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-upload="handleBeforeUpload"
    :on-success="handleSuccess"
    :file-list="fileList"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
  <el-divider></el-divider>

  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="API_input" placeholder="请输入API"></el-input>
        <el-input type="textarea"  rows="10" placeholder="请输入要传的参数" v-model="API_textarea2"></el-input>
        <el-button style="margin-bottom: 10px;" size="small"
        type="primary" @click="API_test">API测试</el-button>
      </el-col>
      <el-col :span="6">
        <el-input type="textarea" rows="15" placeholder="返回数据" v-model="API_textarea"></el-input>
      </el-col>
    </el-row>
  </el-card>
  <el-divider></el-divider>

</div>
</template>

<script>
import HeaderCard from '@/components/HeaderCard/index.vue'
import HeaderInfo from '@/components/HeaderInfo/index.vue'
import BodyCard from '@/components/BodyCard/index.vue'
export default {
  name: 'test',
  components: {
    HeaderCard, HeaderInfo, BodyCard
  },
  props: [''],
  data () {
    return {
      API_input: '',
      API_textarea: '',
      API_textarea2: '',
      url: 'http://192.168.0.231:3000/upload',
      fileList: [],
      drawerState: false,
      drawer_header: {
        icon: '&#xe60c;',
        title: '西港发展中心  /  B栋 /  301、302',
        button: [
          { name: '按钮', icon: '&#xe62a;', function: 'click1' },
          { name: '按钮', icon: '&#xe62a;', function: 'click2' },
          { name: '按钮', icon: '&#xe64f;', function: 'click3' },
          { name: '按钮', icon: '&#xe607;', function: 'click4' },
          { name: '按钮', icon: '&#xe60c;', function: 'click3' },
          { name: '按钮', icon: '&#xe60c;', function: 'click4' }
        ]
      },
      drawer_info: {
        label: [
          { prop: 'date', label: '日期' },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' }
        ],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      },
      drawer_body: {
        title: '房间信息',
        info: [
          { name: '用户姓名', value: '付晓晓' },
          { name: '联系方式', value: '15648954632' },
          { name: '身份证', value: '300000000000000000' },
          { name: '地址', value: '浙江省杭州市西湖区黄姑山路工专路交叉路口' },
          { name: '用户姓名', value: '付晓晓', tag: 1 },
          { name: '用户姓名', value: '付晓晓' },
          { name: '用户姓名', value: '付晓晓' }

        ]
      },
      drawer_body_table: {
        title: '房间信息',
        info: {
          label: [
            { prop: 'date', label: '日期' },
            { prop: 'name', label: '姓名' },
            { prop: 'address', label: '地址' }
          ],
          tableData: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }
          ]
        }
      },
      tableData: [{
        name: '2016-05-02',
        key: '王小虎',
        detail: '上海市普陀区金沙江路 1518 弄',
        type: 'int',
        require: false
      }],
      testData: []
    }
  },
  mounted () {
    // 四表集抄
    let sibjc = {
      title: '四表集抄模块',
      content: [
        {
          title: '获取四表集抄模块统计信息',
          api: 'assets.d_equip.get_list',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '园区id'
            }
          ],
          return: [
            {
              key: 'electric',
              type: 'decimal',
              required: true,
              description: `总电费`
            },
            {
              key: 'electric_rate',
              type: 'decimal',
              required: true,
              description: `总电费对比`
            },
            {
              key: 'water',
              type: 'decimal',
              required: true,
              description: `总水费`
            },
            {
              key: 'water_rate',
              type: 'decimal',
              required: true,
              description: `总水费对比`
            },
            {
              key: 'gas',
              type: 'decimal',
              required: true,
              description: `总燃气费`
            },
            {
              key: 'gas_rate',
              type: 'decimal',
              required: true,
              description: `总燃气费对比`
            },
            {
              key: 'heat',
              type: 'decimal',
              required: true,
              description: `总空调暖通费`
            },
            {
              key: 'heat_rate',
              type: 'decimal',
              required: true,
              description: `总空调暖通费对比`
            }
          ],
          explain: []
        },
        {
          title: '获取设备列表',
          api: 'assets.equip.get_list',
          business: [
            {
              key: 'page_no',
              type: 'int',
              required: true,
              description: '页码'
            },
            {
              key: 'page_size',
              type: 'int',
              required: true,
              description: '页面显示行数'
            },
            {
              key: 'building_name',
              type: 'string',
              required: false,
              description: `楼宇名称`
            },
            {
              key: 'order_num',
              type: 'int',
              required: false,
              description: `序号`
            },
            {
              key: 'contract_code',
              type: 'string',
              required: false,
              description: `合同编号`
            },
            {
              key: 'contract_type',
              type: 'int',
              required: false,
              description: `合同类型`
            },
            {
              key: 'customer',
              type: 'string',
              required: false,
              description: `客户`
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: false,
              description: `抄录时间`
            }
          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '四表集抄列表'
            }
          ],
          explain: [
            {
              key: 'building_name',
              type: 'string',
              required: true,
              description: `楼宇名称`
            },
            {
              key: 'order_num',
              type: 'int',
              required: true,
              description: `序号`
            },
            {
              key: 'contract_code',
              type: 'string',
              required: true,
              description: `合同编号`
            },
            {
              key: 'contract_type',
              type: 'int',
              required: true,
              description: `合同类型`
            },
            {
              key: 'customer',
              type: 'string',
              required: true,
              description: `客户`
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: `抄录时间`
            }
          ]
        },
        {
          title: '获取设备信息',
          api: 'assets.equip.get_info',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: false,
              description: '序号id'
            }
          ],
          return: [
            {
              key: 'order_num',
              type: 'int',
              required: true,
              description: `序号`
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: `设备名称`
            },
            {
              key: 'type',
              type: 'int',
              required: true,
              description: `设备类型`
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: `设备状态`
            },
            {
              key: 'unit_price',
              type: 'decimal',
              required: true,
              description: `设备单价`
            },
            {
              key: 'unit_type',
              type: 'int',
              required: true,
              description: `单位`
            },
            {
              key: 'building_name',
              type: 'string',
              required: true,
              description: `楼宇名称`
            },
            {
              key: 'floor_name',
              type: 'string',
              required: true,
              description: `楼层名称`
            },
            {
              key: 'room_name',
              type: 'string',
              required: true,
              description: `房间名称`
            },
            {
              key: 'current_val',
              type: 'decimal',
              required: true,
              description: `本期读数`
            },
            {
              key: 'current_create_ts',
              type: 'timestamp',
              required: true,
              description: `本期录入时间`
            },
            {
              key: 'privious_val',
              type: 'decimal',
              required: true,
              description: `上期读数`
            },
            {
              key: 'privious_create_ts',
              type: 'timestamp',
              required: true,
              description: `上期录入时间`
            }
          ],
          explain: []
        }
      ]
    }
    // 报修管理
    let baoxgl = {
      title: '报修管理模块',
      content: [
        {
          title: '获取报修管理模块统计信息',
          api: 'assets.repair.get_statistics',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: false,
              description: '园区id'
            }
          ],
          return: [
            {
              key: 'resolved',
              type: 'int',
              required: true,
              description: `已解决`
            },
            {
              key: 'resolved_contrast',
              type: 'int',
              required: true,
              description: `已解决对比`
            },
            {
              key: 'unsolved',
              type: 'int',
              required: true,
              description: `待解决`
            },
            {
              key: 'unsolved_contrast',
              type: 'int',
              required: true,
              description: `待解决对比`
            },
            {
              key: 'completion_rate',
              type: 'int',
              required: true,
              description: `完成率`
            },
            {
              key: 'completion_rate_contrast',
              type: 'int',
              required: true,
              description: `完成率对比`
            },
            {
              key: 'satisfaction',
              type: 'int',
              required: true,
              description: `满意度`
            },
            {
              key: 'satisfaction_contrast',
              type: 'int',
              required: true,
              description: `满意度对比`
            }
          ],
          explain: []
        },
        {
          title: '添加报修工单',
          api: 'assets.repair.add',
          business: [
            {
              key: 'tenant',
              type: 'string',
              required: true,
              description: '租客名称'
            },
            {
              key: 'originator',
              type: 'int',
              required: true,
              description: '发起人'
            },
            {
              key: 'tel',
              type: 'string',
              required: true,
              description: '联系电话'
            },
            {
              key: 'date',
              type: 'timestamp',
              required: true,
              description: '预约服务时间'
            },
            {
              key: 'describe',
              type: 'string',
              required: true,
              description: '描述'
            },
            {
              key: 'attached',
              type: 'multipart-file',
              required: true,
              description: '图片'
            },
            {
              key: 'building_name',
              type: 'string',
              required: true,
              description: `楼宇名称`
            },
            {
              key: 'floor_name',
              type: 'string',
              required: true,
              description: `楼层名称`
            },
            {
              key: 'room_name',
              type: 'string',
              required: true,
              description: `房间名称`
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改报修工单',
          api: 'assets.repair.modify',
          business: [
            {
              key: 'index',
              type: 'int',
              required: false,
              description: '工单号'
            },
            {
              key: 'tenant',
              type: 'string',
              required: true,
              description: '租客名称'
            },
            {
              key: 'originator',
              type: 'int',
              required: true,
              description: '发起人'
            },
            {
              key: 'tel',
              type: 'string',
              required: true,
              description: '联系电话'
            },
            {
              key: 'date',
              type: 'timestamp',
              required: true,
              description: '预约服务时间'
            },
            {
              key: 'describe',
              type: 'string',
              required: true,
              description: '描述'
            },
            {
              key: 'attached',
              type: 'multipart-file',
              required: true,
              description: '图片'
            },
            {
              key: 'building_name',
              type: 'string',
              required: true,
              description: `楼宇名称`
            },
            {
              key: 'floor_name',
              type: 'string',
              required: true,
              description: `楼层名称`
            },
            {
              key: 'room_name',
              type: 'string',
              required: true,
              description: `房间名称`
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '删除报修工单',
          api: 'assets.repair.remove',
          business: [
            {
              key: 'index',
              type: 'string',
              required: false,
              description: '工单号'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '获取报修列表',
          api: 'assets.repair.get_list',
          business: [
            {
              key: 'page_no',
              type: 'int',
              required: true,
              description: '页码'
            },
            {
              key: 'page_size',
              type: 'int',
              required: true,
              description: '页面显示行数'
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: '工单状态'
            },
            {
              key: 'index',
              type: 'int',
              required: false,
              description: '工单号'
            }
          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '报修工单列表'
            }
          ],
          explain: [
            {
              key: 'index',
              type: 'int',
              required: true,
              description: '工单号'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '工单状态'
            },
            {
              key: 'tenant',
              type: 'int',
              required: true,
              description: '租客名称'
            },
            {
              key: 'originator',
              type: 'int',
              required: true,
              description: '发起人'
            },
            {
              key: 'tel',
              type: 'int',
              required: true,
              description: '联系电话'
            },
            {
              key: 'date',
              type: 'timestamp',
              required: true,
              description: '发起时间'
            },
            {
              key: 'address',
              type: 'int',
              required: true,
              description: '地址'
            },
            {
              key: 'describe',
              type: 'int',
              required: true,
              description: '描述'
            }
          ]
        },
        {
          title: '获取报修工单信息',
          api: 'assets.repair.get_info',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: false,
              description: '序号id'
            }
          ],
          return: [
            {
              key: 'type',
              type: 'int',
              required: true,
              description: '工单类型'
            },
            {
              key: 'originator',
              type: 'int',
              required: true,
              description: '发起人'
            },
            {
              key: 'index',
              type: 'int',
              required: true,
              description: '工单号'
            },
            {
              key: 'abstract',
              type: 'int',
              required: true,
              description: '工单摘要'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '工单状态'
            },
            {
              key: 'date',
              type: 'timestamp',
              required: true,
              description: '预约时间'
            },
            {
              key: 'building_name',
              type: 'string',
              required: true,
              description: `楼宇名称`
            },
            {
              key: 'floor_name',
              type: 'string',
              required: true,
              description: `楼层名称`
            },
            {
              key: 'room_name',
              type: 'string',
              required: true,
              description: `房间名称`
            },
            {
              key: 'evaluate',
              type: 'string',
              required: true,
              description: `工单评价`
            }

          ],
          explain: []
        }
      ]
    }
    // 投诉管理
    let tousgl = {
      title: '投诉管理模块',
      content: [
        {
          title: '获取投诉管理模块统计信息',
          api: 'assets.complaint.get_statistics',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: false,
              description: '园区id'
            }
          ],
          return: [
            {
              key: 'resolved',
              type: 'int',
              required: true,
              description: `已解决`
            },
            {
              key: 'resolved_contrast',
              type: 'int',
              required: true,
              description: `已解决对比`
            },
            {
              key: 'unsolved',
              type: 'int',
              required: true,
              description: `待解决`
            },
            {
              key: 'unsolved_contrast',
              type: 'int',
              required: true,
              description: `待解决对比`
            },
            {
              key: 'completion_rate',
              type: 'int',
              required: true,
              description: `完成率`
            },
            {
              key: 'completion_rate_contrast',
              type: 'int',
              required: true,
              description: `完成率对比`
            },
            {
              key: 'satisfaction',
              type: 'int',
              required: true,
              description: `满意度`
            },
            {
              key: 'satisfaction_contrast',
              type: 'int',
              required: true,
              description: `满意度对比`
            }
          ],
          explain: []
        },
        {
          title: '添加投诉工单',
          api: 'assets.complaint.add',
          business: [
            {
              key: 'tenant',
              type: 'string',
              required: true,
              description: '租客名称'
            },
            {
              key: 'originator',
              type: 'int',
              required: true,
              description: '发起人'
            },
            {
              key: 'tel',
              type: 'string',
              required: true,
              description: '联系电话'
            },
            {
              key: 'date',
              type: 'timestamp',
              required: true,
              description: '预约服务时间'
            },
            {
              key: 'describe',
              type: 'string',
              required: true,
              description: '描述'
            },
            {
              key: 'attached',
              type: 'multipart-file',
              required: true,
              description: '图片'
            },
            {
              key: 'building_name',
              type: 'string',
              required: true,
              description: `楼宇名称`
            },
            {
              key: 'floor_name',
              type: 'string',
              required: true,
              description: `楼层名称`
            },
            {
              key: 'room_name',
              type: 'string',
              required: true,
              description: `房间名称`
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改投诉工单',
          api: 'assets.complaint.modify',
          business: [
            {
              key: 'index',
              type: 'int',
              required: false,
              description: '工单号'
            },
            {
              key: 'tenant',
              type: 'string',
              required: true,
              description: '租客名称'
            },
            {
              key: 'originator',
              type: 'int',
              required: true,
              description: '发起人'
            },
            {
              key: 'tel',
              type: 'string',
              required: true,
              description: '联系电话'
            },
            {
              key: 'date',
              type: 'timestamp',
              required: true,
              description: '预约服务时间'
            },
            {
              key: 'describe',
              type: 'string',
              required: true,
              description: '描述'
            },
            {
              key: 'attached',
              type: 'multipart-file',
              required: true,
              description: '图片'
            },
            {
              key: 'building_name',
              type: 'string',
              required: true,
              description: `楼宇名称`
            },
            {
              key: 'floor_name',
              type: 'string',
              required: true,
              description: `楼层名称`
            },
            {
              key: 'room_name',
              type: 'string',
              required: true,
              description: `房间名称`
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '删除投诉工单',
          api: 'assets.complaint.remove',
          business: [
            {
              key: 'index',
              type: 'string',
              required: false,
              description: '工单号'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '获取投诉列表',
          api: 'assets.complaint.get_list',
          business: [
            {
              key: 'page_no',
              type: 'int',
              required: true,
              description: '页码'
            },
            {
              key: 'page_size',
              type: 'int',
              required: true,
              description: '页面显示行数'
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: '工单状态'
            },
            {
              key: 'index',
              type: 'int',
              required: false,
              description: '工单号'
            }
          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '报修工单列表'
            }
          ],
          explain: [
            {
              key: 'index',
              type: 'int',
              required: true,
              description: '工单号'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '工单状态'
            },
            {
              key: 'tenant',
              type: 'int',
              required: true,
              description: '租客名称'
            },
            {
              key: 'originator',
              type: 'int',
              required: true,
              description: '发起人'
            },
            {
              key: 'tel',
              type: 'int',
              required: true,
              description: '联系电话'
            },
            {
              key: 'date',
              type: 'timestamp',
              required: true,
              description: '发起时间'
            },
            {
              key: 'address',
              type: 'int',
              required: true,
              description: '地址'
            },
            {
              key: 'describe',
              type: 'int',
              required: true,
              description: '描述'
            }
          ]
        },
        {
          title: '获取投诉工单信息',
          api: 'assets.complaint.get_info',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: false,
              description: '序号id'
            }
          ],
          return: [
            {
              key: 'type',
              type: 'int',
              required: true,
              description: '工单类型'
            },
            {
              key: 'originator',
              type: 'int',
              required: true,
              description: '发起人'
            },
            {
              key: 'index',
              type: 'int',
              required: true,
              description: '工单号'
            },
            {
              key: 'abstract',
              type: 'int',
              required: true,
              description: '工单摘要'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '工单状态'
            },
            {
              key: 'date',
              type: 'timestamp',
              required: true,
              description: '预约时间'
            },
            {
              key: 'building_name',
              type: 'string',
              required: true,
              description: `楼宇名称`
            },
            {
              key: 'floor_name',
              type: 'string',
              required: true,
              description: `楼层名称`
            },
            {
              key: 'room_name',
              type: 'string',
              required: true,
              description: `房间名称`
            },
            {
              key: 'evaluate',
              type: 'string',
              required: true,
              description: `工单评价`
            }

          ],
          explain: []
        }
      ]
    }
    // 费用催缴
    let feiycj = {
      title: '费用催缴模块',
      content: [
        {
          title: '获取费用催缴模块统计信息',
          api: 'assets.payment.get_statistics',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: false,
              description: '园区id'
            }
          ],
          return: [
            {
              key: 'receivable',
              type: 'int',
              required: true,
              description: `应收`
            },
            {
              key: 'receivable_contrast',
              type: 'int',
              required: true,
              description: `应收对比`
            },
            {
              key: 'paid',
              type: 'int',
              required: true,
              description: `已收`
            },
            {
              key: 'paid_contrast',
              type: 'int',
              required: true,
              description: `已收对比`
            },
            {
              key: 'unpaid',
              type: 'int',
              required: true,
              description: `未缴`
            },
            {
              key: 'unpaid_contrast',
              type: 'int',
              required: true,
              description: `未缴对比`
            },
            {
              key: 'rent',
              type: 'int',
              required: true,
              description: `租金`
            },
            {
              key: 'rent_contrast',
              type: 'int',
              required: true,
              description: `租金对比`
            },
            {
              key: 'property_fee',
              type: 'int',
              required: true,
              description: `物业费`
            },
            {
              key: 'property_fee_contrast',
              type: 'int',
              required: true,
              description: `物业费对比`
            },
            {
              key: 'energy',
              type: 'int',
              required: true,
              description: `四表费用`
            },
            {
              key: 'energy_contrast',
              type: 'int',
              required: true,
              description: `四表费用对比`
            },
            {
              key: 'other',
              type: 'int',
              required: true,
              description: `其他`
            },
            {
              key: 'other_contrast',
              type: 'int',
              required: true,
              description: `其他对比`
            }
          ],
          explain: []
        },
        {
          title: '添加催缴',
          api: 'assets.payment.add',
          business: [
            {
              key: 'contract',
              type: 'string',
              required: true,
              description: '关联合同'
            },
            {
              key: 'payer',
              type: 'int',
              required: true,
              description: '付款方'
            },
            {
              key: 'contacts',
              type: 'string',
              required: true,
              description: '联系人'
            },
            {
              key: 'type',
              type: 'string',
              required: true,
              description: '费用类型'
            },
            {
              key: 'currency',
              type: 'string',
              required: true,
              description: '币种'
            },
            {
              key: 'cycle',
              type: 'string',
              required: true,
              description: '计费周期'
            },
            {
              key: 'memo',
              type: 'string',
              required: true,
              description: '备注'
            },
            {
              key: 'building_name',
              type: 'string',
              required: true,
              description: `楼宇名称`
            },
            {
              key: 'floor_name',
              type: 'string',
              required: true,
              description: `楼层名称`
            },
            {
              key: 'room_name',
              type: 'string',
              required: true,
              description: `房间名称`
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '删除催缴',
          api: 'assets.payment.remove',
          business: [
            {
              key: 'index',
              type: 'string',
              required: false,
              description: '工单号'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '获取投诉列表',
          api: 'assets.payment.get_list',
          business: [
            {
              key: 'page_no',
              type: 'int',
              required: true,
              description: '页码'
            },
            {
              key: 'page_size',
              type: 'int',
              required: true,
              description: '页面显示行数'
            },
            {
              key: 'type',
              type: 'int',
              required: false,
              description: '费用类型'
            }
          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '报修工单列表'
            }
          ],
          explain: [
            {
              key: 'building_name',
              type: 'string',
              required: true,
              description: `楼宇名称`
            },
            {
              key: 'floor_name',
              type: 'string',
              required: true,
              description: `楼层名称`
            },
            {
              key: 'room_name',
              type: 'string',
              required: true,
              description: `房间名称`
            },
            {
              key: 'customer',
              type: 'string',
              required: true,
              description: `客户名称`
            },
            {
              key: 'type',
              type: 'string',
              required: true,
              description: `费用类型`
            },
            {
              key: 'money',
              type: 'string',
              required: true,
              description: `催缴金额`
            },
            {
              key: 'day',
              type: 'string',
              required: true,
              description: `逾期天数`
            },
            {
              key: 'follow_up',
              type: 'string',
              required: true,
              description: `跟进人`
            },
            {
              key: 'date',
              type: 'string',
              required: true,
              description: `最近一次催缴时间`
            }
          ]
        },
        {
          title: '获取投诉工单信息',
          api: 'assets.payment.get_info',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: false,
              description: '序号id'
            }
          ],
          return: [],
          explain: []
        }
      ]
    }
    // 客户管理
    let kehgl = {
      title: '客户管理模块',
      content: [
        {
          title: '获取客户管理统计信息',
          api: 'assets.d_customer.get_info',
          business: [
            {
              key: 'customer_id',
              type: 'int',
              required: true,
              description: '园区id'
            }
          ],
          return: [
            {
              key: 'meet',
              type: 'int',
              required: true,
              description: `接触客户`
            },
            {
              key: 'meet_rate',
              type: 'int',
              required: true,
              description: `接触客户变化率`
            },
            {
              key: 'sign',
              type: 'int',
              required: true,
              description: `成交客户`
            },
            {
              key: 'sign_rate',
              type: 'int',
              required: true,
              description: `成交客户变化率`
            },
            {
              key: 'loss',
              type: 'int',
              required: true,
              description: `流失客户`
            },
            {
              key: 'loss_rate',
              type: 'int',
              required: true,
              description: `流失客户变化率`
            }
          ],
          explain: []
        },
        {
          title: '添加客户',
          api: 'assets.customer.add',
          business: [
            {
              key: 'name',
              type: 'string',
              required: true,
              description: '客户或企业名称'
            },
            {
              key: 'contacter',
              type: 'int',
              required: true,
              description: '联系人'
            },
            {
              key: 'contact',
              type: 'string',
              required: true,
              description: '联系方式'
            },
            {
              key: 'info_source',
              type: 'int',
              required: true,
              description: '客户信息来源'
            },
            {
              key: 'status',
              type: 'int',
              required: true,
              description: '行业性质'
            },
            {
              key: 'memo',
              type: 'string',
              required: true,
              description: '备注'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: '来访时间'
            },
            {
              key: 'receiver',
              type: 'string',
              required: true,
              description: '跟进人'
            },
            {
              key: 'email',
              type: 'int',
              required: false,
              description: '邮箱'
            },
            {
              key: 'demand_area',
              type: 'int',
              required: true,
              description: '需求面积'
            },
            {
              key: 'work_station',
              type: 'int',
              required: true,
              description: '需求工位'
            },
            {
              key: 'demand_ts',
              type: 'timestamp',
              required: true,
              description: '预计签约时间'
            },
            {
              key: 'domain',
              type: 'int',
              required: true,
              description: '房源信息'
            },
            {
              key: 'customer_id',
              type: 'int',
              required: true,
              description: '客户id'
            },
            {
              key: 'room',
              type: 'string',
              required: true,
              description: '房间id:用字符串存储,逗号分隔,示例:"1,2,3"'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '进度阶段'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改客户',
          api: 'assets.customer.modify ',
          business: [
            {
              key: 'id',
              type: 'int',
              required: true,
              description: '主键'
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: '客户或企业名称'
            },
            {
              key: 'contacter',
              type: 'int',
              required: true,
              description: '联系人'
            },
            {
              key: 'contact',
              type: 'string',
              required: true,
              description: '联系方式'
            },
            {
              key: 'info_source',
              type: 'int',
              required: true,
              description: '客户信息来源'
            },
            {
              key: 'status',
              type: 'int',
              required: true,
              description: '行业性质'
            },
            {
              key: 'memo',
              type: 'string',
              required: true,
              description: '备注'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: '来访时间'
            },
            {
              key: 'receiver',
              type: 'string',
              required: true,
              description: '跟进人'
            },
            {
              key: 'email',
              type: 'int',
              required: false,
              description: '邮箱'
            },
            {
              key: 'demand_area',
              type: 'int',
              required: true,
              description: '需求面积'
            },
            {
              key: 'work_station',
              type: 'int',
              required: true,
              description: '需求工位'
            },
            {
              key: 'demand_ts',
              type: 'timestamp',
              required: true,
              description: '预计签约时间'
            },
            {
              key: 'domain',
              type: 'int',
              required: true,
              description: '房源信息'
            },
            {
              key: 'customer_id',
              type: 'int',
              required: true,
              description: '客户id'
            },
            {
              key: 'room',
              type: 'string',
              required: true,
              description: '房间id:用字符串存储,逗号分隔,示例:"1,2,3"'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '进度阶段'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '删除客户',
          api: 'assets.customer.remove',
          business: [
            {
              key: 'id',
              type: 'int',
              required: true,
              description: '主键'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '获取客户列表',
          api: 'assets.customer.get_list',
          business: [
            {
              key: 'page_no',
              type: 'int',
              required: true,
              description: '页码'
            },
            {
              key: 'page_size',
              type: 'int',
              required: true,
              description: '页面显示行数'
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: '客户或企业名称'
            },
            {
              key: 'info_source',
              type: 'int',
              required: true,
              description: '客户信息来源'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '进度阶段'
            }

          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '客户列表'
            }
          ],
          explain: [
            {
              key: 'name',
              type: 'string',
              required: true,
              description: '客户或企业名称'
            },
            {
              key: 'contacter',
              type: 'int',
              required: true,
              description: '联系人'
            },
            {
              key: 'contact',
              type: 'string',
              required: true,
              description: '联系方式'
            },
            {
              key: 'info_source',
              type: 'int',
              required: true,
              description: '客户信息来源'
            },
            {
              key: 'status',
              type: 'int',
              required: true,
              description: '行业性质'
            },
            {
              key: 'memo',
              type: 'string',
              required: true,
              description: '备注'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: '来访时间'
            },
            {
              key: 'receiver',
              type: 'string',
              required: true,
              description: '跟进人'
            },
            {
              key: 'email',
              type: 'int',
              required: false,
              description: '邮箱'
            },
            {
              key: 'demand_area',
              type: 'int',
              required: true,
              description: '需求面积'
            },
            {
              key: 'work_station',
              type: 'int',
              required: true,
              description: '需求工位'
            },
            {
              key: 'demand_ts',
              type: 'timestamp',
              required: true,
              description: '预计签约时间'
            },
            {
              key: 'domain',
              type: 'int',
              required: true,
              description: '房源信息'
            },
            {
              key: 'customer_id',
              type: 'int',
              required: true,
              description: '客户id'
            },
            {
              key: 'room',
              type: 'string',
              required: true,
              description: '房间id:用字符串存储,逗号分隔,示例:"1,2,3"'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '进度阶段'
            }
          ]
        },
        {
          title: '获取客户信息',
          api: 'assets.customer.get_info',
          business: [
            {
              key: 'id',
              type: 'int',
              required: false,
              description: '客户id'
            }
          ],
          return: [],
          explain: []
        }
      ]
    }

    this.testData = [
      {
        index: 3,
        title: '物业服务模块',
        content: [sibjc, baoxgl, tousgl, feiycj, kehgl]
      }
    ]
  },
  watch: {
  },
  methods: {
    // API接口测试
    API_test () {
      let api = this.$urls.park.add
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
      let params = {
        page_size: 999,
        page_no: 1
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

      if (this.API_input) {
        api = this.API_input
      }
      if (this.API_textarea2) {
        params = JSON.parse(this.API_textarea2)
      }

      this.$https.post(api, params2).then((res) => {
        this.$message(res.msg)
        this.API_textarea = JSON.stringify(res, null, 2)
        if (res.code !== 1000) {
          this.API_textarea = JSON.stringify({
            err: res.err,
            msg: res.msg,
            track: res.track
          })
        }
        // console.log(this.API_textarea)
      })
    },
    showfile () {
      console.log(this.fileList)
    },
    drawer () {
      this.drawerState = true
    },
    submitUpload () {
      // this.$refs.upload.submit();
      this.$https.post('http://192.168.0.231:3000/upload', {}).then((res) => {
        // console.log(res)
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleBeforeUpload (file) {
      // console.log(file, 'handleBeforeUpload')
      return true
    },
    handleSuccess (response, file, fileList) {
      // console.log(response, file, fileList)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  h1{
    font-size: 40px;
    line-height: 60px;
  }
  h2{
    font-size: 30px;
    line-height: 40px;
  }
  h3{
    font-size: 20px;
    line-height: 30px;
  }
</style>
