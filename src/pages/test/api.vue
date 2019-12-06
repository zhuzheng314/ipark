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
    // 四表集抄
    let sibjc = {
      title: '四表集抄模块',
      content: [
        {
          title: '获取四表集抄模块统计信息',
          api: 'assets.d_equip.get_info',
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
              key: 'room',
              type: 'string',
              required: true,
              description: `房号`
            },
            {
              key: 'order_num',
              type: 'int',
              required: true,
              description: `序号`
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: `状态`
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
              key: 'equip_type',
              type: 'int',
              required: true,
              description: `设备类型`
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
              key: 'equip_id',
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
              key: 'park',
              type: '数组',
              required: true,
              description: `园区到房间的数组`
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
          api: 'assets.d_repair.get_info',
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
              key: 'resolved',
              type: 'int',
              required: true,
              description: `已解决`
            },
            {
              key: 'resolved_rate',
              type: 'decimal',
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
              key: 'unsolved_rate',
              type: 'decimal',
              required: true,
              description: `待解决对比`
            },
            {
              key: 'complet',
              type: 'decimal',
              required: true,
              description: `完成率`
            },
            {
              key: 'complet_rate',
              type: 'decimal',
              required: true,
              description: `完成率对比`
            },
            {
              key: 'satisfies',
              type: 'decimal',
              required: true,
              description: `满意度`
            },
            {
              key: 'satisfies_rate',
              type: 'decimal',
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
              key: 'customer',
              type: 'string',
              required: true,
              description: '租客名称'
            },
            {
              key: 'originator',
              type: 'string',
              required: true,
              description: '发起人'
            },
            {
              key: 'contact',
              type: 'string',
              required: true,
              description: '联系电话'
            },
            {
              key: 'reserve_ts',
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
              type: 'jsonb',
              required: true,
              description: '图片'
            },
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '房间id'
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
              key: 'repair_code',
              type: 'string',
              required: true,
              description: '工单号'
            },
            {
              key: 'customer',
              type: 'string',
              required: true,
              description: '租客名称'
            },
            {
              key: 'originator',
              type: 'string',
              required: true,
              description: '发起人'
            },
            {
              key: 'contact',
              type: 'string',
              required: true,
              description: '联系电话'
            },
            {
              key: 'reserve_ts',
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
              type: 'jsonb',
              required: true,
              description: '图片'
            },
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '房间id'
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
              key: 'repair_code',
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
              key: 'park_id',
              type: 'int',
              required: true,
              description: '园区id'
            },
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
              key: 'repair_code',
              type: 'string',
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
              key: 'repair_code',
              type: 'string',
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
              key: 'customer',
              type: 'string',
              required: true,
              description: '租客名称'
            },
            {
              key: 'originator',
              type: 'string',
              required: true,
              description: '发起人'
            },
            {
              key: 'contact',
              type: 'string',
              required: true,
              description: '联系电话'
            },
            {
              key: 'reserve_ts',
              type: 'timestamp',
              required: true,
              description: '发起时间'
            },
            {
              key: 'address',
              type: 'string',
              required: true,
              description: '地址'
            },
            {
              key: 'describe',
              type: 'string',
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
              key: 'repair_code',
              type: 'string',
              required: true,
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
              key: 'repair_code',
              type: 'string',
              required: true,
              description: '工单号'
            },
            {
              key: 'describe',
              type: 'string',
              required: true,
              description: '工单描述'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '工单状态'
            },
            {
              key: 'reserve_ts',
              type: 'timestamp',
              required: true,
              description: '预约时间'
            },
            {
              key: 'park',
              type: 'json',
              required: true,
              description: '房间id'
            },
            {
              key: 'evaluate',
              type: 'int',
              required: true,
              description: `工单评价`
            },
            {
              key: 'address',
              type: 'string',
              required: true,
              description: '地址'
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
          api: 'assets.d_complaint.get_info',
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
              key: 'resolved_rate',
              type: 'decimal',
              required: true,
              description: `已解决对比`
            },
            {
              key: 'unsolved',
              type: 'decimal',
              required: true,
              description: `待解决`
            },
            {
              key: 'unsolved_rate',
              type: 'decimal',
              required: true,
              description: `待解决对比`
            },
            {
              key: 'complet_rate',
              type: 'decimal',
              required: true,
              description: `完成率`
            },
            {
              key: 'complet_rate',
              type: 'decimal',
              required: true,
              description: `完成率对比`
            },
            {
              key: 'satisfies',
              type: 'int',
              required: true,
              description: `满意度`
            },
            {
              key: 'satisfies_rate',
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
              key: 'customer',
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
              key: 'contact',
              type: 'string',
              required: true,
              description: '联系电话'
            },
            {
              key: 'reserve_ts',
              type: 'timestamp',
              required: true,
              description: '预约服务时间'
            },
            {
              key: 'subject',
              type: 'string',
              required: true,
              description: '摘要'
            },
            {
              key: 'describe',
              type: 'string',
              required: true,
              description: '描述'
            },
            {
              key: 'evaluate',
              type: 'string',
              required: true,
              description: '评价'
            },
            {
              key: 'attached',
              type: 'jsonb',
              required: true,
              description: '图片'
            },
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '房间id'
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
              key: 'complaint_code',
              type: 'string',
              required: false,
              description: '工单号'
            },
            {
              key: 'customer',
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
              key: 'contact',
              type: 'string',
              required: true,
              description: '联系电话'
            },
            {
              key: 'reserve_ts',
              type: 'timestamp',
              required: true,
              description: '预约服务时间'
            },
            {
              key: 'subject',
              type: 'string',
              required: true,
              description: '摘要'
            },
            {
              key: 'describe',
              type: 'string',
              required: true,
              description: '描述'
            },
            {
              key: 'evaluate',
              type: 'string',
              required: true,
              description: '评价'
            },
            {
              key: 'attached',
              type: 'jsonb',
              required: true,
              description: '图片'
            },
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '房间id'
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
              key: 'complaint_code',
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
              key: 'park_id',
              type: 'int',
              required: true,
              description: '园区id'
            },
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
              key: 'complaint_code',
              type: 'string',
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
              key: 'complaint_code',
              type: 'string',
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
              key: 'customer',
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
              key: 'contact',
              type: 'string',
              required: true,
              description: '联系电话'
            },
            {
              key: 'address',
              type: 'string',
              required: true,
              description: '地址'
            },
            {
              key: 'reserve_ts',
              type: 'timestamp',
              required: true,
              description: '发起时间'
            },
            {
              key: 'subject',
              type: 'string',
              required: true,
              description: '摘要'
            },
            {
              key: 'describe',
              type: 'string',
              required: true,
              description: '描述'
            },
            {
              key: 'evaluate',
              type: 'string',
              required: true,
              description: '评价'
            },
            {
              key: 'attached',
              type: 'jsonb',
              required: true,
              description: '图片'
            },
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '房间id'
            }
          ]
        },
        {
          title: '获取投诉工单信息',
          api: 'assets.complaint.get_info',
          business: [
            {
              key: 'complaint_code',
              type: 'string',
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
              type: 'string',
              required: true,
              description: '发起人'
            },
            {
              key: 'complaint_code',
              type: 'string',
              required: true,
              description: '工单号'
            },
            {
              key: 'describe',
              type: 'int',
              required: true,
              description: '工单描述'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '工单状态'
            },
            {
              key: 'reserve_ts',
              type: 'timestamp',
              required: true,
              description: '预约时间'
            },
            {
              key: 'address',
              type: 'string',
              required: true,
              description: '地址'
            },
            {
              key: 'park',
              type: 'json',
              required: true,
              description: `房间名称`
            },
            {
              key: 'evaluate',
              type: 'int',
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
          api: 'assets.d_payment.get_info',
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
              key: 'need_receive',
              type: 'int',
              required: true,
              description: `应收`
            },
            {
              key: 'need_receive_rate',
              type: 'decimal',
              required: true,
              description: `应收对比`
            },
            {
              key: 'receive',
              type: 'int',
              required: true,
              description: `已收`
            },
            {
              key: 'receive_rate',
              type: 'decimal',
              required: true,
              description: `已收对比`
            },
            {
              key: 'un_receive',
              type: 'int',
              required: true,
              description: `未缴`
            },
            {
              key: 'un_receive_rate',
              type: 'decimal',
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
              key: 'rent_rate',
              type: 'decimal',
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
              key: 'property_rate',
              type: 'decimal',
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
              key: 'energy_rate',
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
              key: 'other_rate',
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
              key: 'contract_code',
              type: 'string',
              required: true,
              description: '关联合同'
            },
            {
              key: 'payer',
              type: 'string',
              required: true,
              description: '付款方'
            },
            {
              key: 'contacter',
              type: 'string',
              required: true,
              description: '联系人'
            },
            {
              key: 'type',
              type: 'int',
              required: true,
              description: '费用类型'
            },
            {
              key: 'currency',
              type: 'int',
              required: true,
              description: '币种'
            },
            {
              key: 'money',
              type: 'decimal',
              required: true,
              description: `催缴金额`
            },
            {
              key: 'overdue_ts',
              type: 'timestamp',
              required: true,
              description: `逾期天数`
            },
            {
              key: 'start_ts',
              type: 'timestamp',
              required: true,
              description: '计费周期开始'
            },
            {
              key: 'end_ts',
              type: 'timestamp',
              required: true,
              description: '计费周期结束'
            },
            {
              key: 'memo',
              type: 'string',
              required: true,
              description: '备注'
            },
            {
              key: 'receiver',
              type: 'string',
              required: true,
              description: '跟进人'
            },
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '房间id'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改催缴',
          api: 'assets.payment.modify',
          business: [
            {
              key: 'contract_code',
              type: 'string',
              required: true,
              description: '关联合同'
            },
            {
              key: 'payer',
              type: 'string',
              required: false,
              description: '付款方'
            },
            {
              key: 'contacter',
              type: 'string',
              required: false,
              description: '联系人'
            },
            {
              key: 'type',
              type: 'int',
              required: false,
              description: '费用类型'
            },
            {
              key: 'currency',
              type: 'int',
              required: false,
              description: '币种'
            },
            {
              key: 'money',
              type: 'decimal',
              required: false,
              description: `催缴金额`
            },
            {
              key: 'overdue_ts',
              type: 'timestamp',
              required: false,
              description: `逾期天数`
            },
            {
              key: 'start_ts',
              type: 'timestamp',
              required: false,
              description: '计费周期开始'
            },
            {
              key: 'end_ts',
              type: 'timestamp',
              required: false,
              description: '计费周期结束'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注'
            },
            {
              key: 'receiver',
              type: 'string',
              required: false,
              description: '跟进人'
            },
            {
              key: 'domain_id',
              type: 'int',
              required: false,
              description: '房间id'
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
              key: 'payment_code',
              type: 'string',
              required: false,
              description: '工单号'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '获取催缴列表',
          api: 'assets.payment.get_list',
          business: [
            {
              key: 'park_id',
              type: 'int',
              required: true,
              description: '园区id'
            },
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
              key: 'park',
              type: 'json',
              required: true,
              description: `房间`
            },
            {
              key: 'customer',
              type: 'string',
              required: true,
              description: `客户名称`
            },
            {
              key: 'type',
              type: 'int',
              required: true,
              description: `费用类型`
            },
            {
              key: 'money',
              type: 'decimal',
              required: true,
              description: `催缴金额`
            },
            {
              key: 'overdue_ts',
              type: 'timestamp',
              required: true,
              description: `逾期天数`
            },
            {
              key: 'receiver',
              type: 'string',
              required: true,
              description: `跟进人`
            },
            {
              key: 'address',
              type: 'string',
              required: true,
              description: `地址`
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: `最近一次催缴时间`
            }
          ]
        },
        {
          title: '获取催缴信息',
          api: 'assets.payment.get_info',
          business: [
            {
              key: 'id',
              type: 'int',
              required: true,
              description: '缴费id'
            }
          ],
          return: [
            {
              key: 'park',
              type: 'json',
              required: true,
              description: `房间`
            },
            {
              key: 'customer',
              type: 'string',
              required: true,
              description: `客户名称`
            },
            {
              key: 'type',
              type: 'int',
              required: true,
              description: `费用类型`
            },
            {
              key: 'money',
              type: 'decimal',
              required: true,
              description: `催缴金额`
            },
            {
              key: 'overdue_ts',
              type: 'timestamp',
              required: true,
              description: `逾期天数`
            },
            {
              key: 'receiver',
              type: 'string',
              required: true,
              description: `跟进人`
            },
            {
              key: 'address',
              type: 'string',
              required: true,
              description: `地址`
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: `最近一次催缴时间`
            }
          ],
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
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '园区id'
            }
          ],
          return: [
            {
              key: 'meet',
              type: 'decimal',
              required: true,
              description: `接触客户`
            },
            {
              key: 'meet_rate',
              type: 'decimal',
              required: true,
              description: `接触客户变化率`
            },
            {
              key: 'sign',
              type: 'decimal',
              required: true,
              description: `成交客户`
            },
            {
              key: 'sign_rate',
              type: 'decimal',
              required: true,
              description: `成交客户变化率`
            },
            {
              key: 'loss',
              type: 'decimal',
              required: true,
              description: `流失客户`
            },
            {
              key: 'loss_rate',
              type: 'decimal',
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
              type: 'string',
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
              key: 'receiver',
              type: 'string',
              required: true,
              description: '跟进人'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '进度阶段'
            },
            {
              key: 'status',
              type: 'int',
              required: true,
              description: '行业性质'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: '来访时间'
            },
            {
              key: 'info_source',
              type: 'int',
              required: true,
              description: '客户来源'
            },
            {
              key: 'memo',
              type: 'string',
              required: true,
              description: '备注'
            },
            {
              key: 'demand_area',
              type: 'decimal',
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
              key: 'room',
              type: '数组',
              required: true,
              description: 'json数组'
            },
            {
              key: 'email',
              type: 'string',
              required: false,
              description: '邮箱'
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
              description: '客户或者企业的id'
            },
            {
              key: 'name',
              type: 'string',
              required: false,
              description: '客户或企业名称'
            },
            {
              key: 'contacter',
              type: 'int',
              required: false,
              description: '联系人'
            },
            {
              key: 'contact',
              type: 'string',
              required: false,
              description: '联系方式'
            },
            {
              key: 'receiver',
              type: 'string',
              required: false,
              description: '跟进人'
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: '进度阶段'
            },
            {
              key: 'status',
              type: 'int',
              required: false,
              description: '行业性质'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: false,
              description: '来访时间'
            },
            {
              key: 'info_source',
              type: 'int',
              required: false,
              description: '客户来源'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注'
            },
            {
              key: 'demand_area',
              type: 'decimal',
              required: false,
              description: '需求面积'
            },
            {
              key: 'work_station',
              type: 'int',
              required: false,
              description: '需求工位'
            },
            {
              key: 'demand_ts',
              type: 'timestamp',
              required: false,
              description: '预计签约时间'
            },
            {
              key: 'room',
              type: '数组',
              required: false,
              description: 'json数组'
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
              description: '客户或者企业的id'
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
              key: 'park_id',
              type: 'int',
              required: true,
              description: '园区的domain_id'
            },
            {
              key: 'id',
              type: 'int',
              required: true,
              description: '客户或者企业的id'
            },
            {
              key: 'name',
              type: 'string',
              required: false,
              description: '客户或企业名称'
            },
            {
              key: 'contacter',
              type: 'int',
              required: false,
              description: '联系人'
            },
            {
              key: 'contact',
              type: 'string',
              required: false,
              description: '联系方式'
            },
            {
              key: 'receiver',
              type: 'string',
              required: false,
              description: '跟进人'
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: '进度阶段'
            },
            {
              key: 'status',
              type: 'int',
              required: false,
              description: '行业性质'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: false,
              description: '来访时间'
            },
            {
              key: 'info_source',
              type: 'int',
              required: false,
              description: '客户来源'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注'
            },
            {
              key: 'demand_area',
              type: 'decimal',
              required: false,
              description: '需求面积'
            },
            {
              key: 'work_station',
              type: 'int',
              required: false,
              description: '需求工位'
            },
            {
              key: 'demand_ts',
              type: 'timestamp',
              required: false,
              description: '预计签约时间'
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
              key: 'id',
              type: 'int',
              required: true,
              description: '客户或者企业的id'
            },
            {
              key: 'name',
              type: 'string',
              required: false,
              description: '客户或企业名称'
            },
            {
              key: 'contacter',
              type: 'int',
              required: false,
              description: '联系人'
            },
            {
              key: 'contact',
              type: 'string',
              required: false,
              description: '联系方式'
            },
            {
              key: 'receiver',
              type: 'string',
              required: false,
              description: '跟进人'
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: '进度阶段'
            },
            {
              key: 'status',
              type: 'int',
              required: false,
              description: '行业性质'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: false,
              description: '来访时间'
            },
            {
              key: 'info_source',
              type: 'int',
              required: false,
              description: '客户来源'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注'
            },
            {
              key: 'demand_area',
              type: 'decimal',
              required: false,
              description: '需求面积'
            },
            {
              key: 'work_station',
              type: 'int',
              required: false,
              description: '需求工位'
            },
            {
              key: 'demand_ts',
              type: 'timestamp',
              required: false,
              description: '预计签约时间'
            },
            {
              key: 'room',
              type: '数组',
              required: false,
              description: 'json数组'
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
              required: true,
              description: '客户id'
            }
          ],
          return: [],
          explain: []
        }
      ]
    }
    // 园区管理模块
    let park = {
      title: '园区管理模块',
      content: [
        {
          title: '获取园区统计信息',
          api: 'assets.d_park.get_list',
          business: [
            {
              key: 'park_id',
              type: 'int',
              required: true,
              description: '园区id'
            }
          ],
          return: [
            {
              key: 'rent_area',
              type: 'int',
              required: true,
              description: `可招商面积`
            },
            {
              key: 'total_area',
              type: 'int',
              required: true,
              description: `管理面积`
            },
            {
              key: 'avg_unit_price',
              type: 'int',
              required: true,
              description: `在租实时均价`
            },
            {
              key: 'unit_type',
              type: 'int',
              required: true,
              description: `单位`
            },
            {
              key: 'rent_rate',
              type: 'int',
              required: true,
              description: `出租率`
            },
            {
              key: 'pay_rate',
              type: 'int',
              required: true,
              description: `支付租金的比率`
            }
          ],
          explain: []
        },
        {
          title: '添加园区模块',
          api: 'assets.park.add',
          business: [
            {
              key: 'complete_ts',
              type: 'timestamp',
              required: false,
              description: '竣工或购置时间，预留字段-可以不用'
            },
            {
              key: 'acquire_way',
              type: 'int',
              required: false,
              description: '取得方式，预留字段-可以不用'
            },
            {
              key: 'address',
              type: 'string',
              required: true,
              description: '园区地址'
            },
            {
              key: 'estate_property',
              type: 'string',
              required: true,
              description: '房产性质，预留字段-可以不用'
            },
            {
              key: 'usage',
              type: 'string',
              required: true,
              description: '园区定位'
            },
            {
              key: 'capital',
              type: 'string',
              required: true,
              description: '产权单位，资产方'
            },
            {
              key: 'detail',
              type: 'string',
              required: false,
              description: '园区描述'
            },
            {
              key: 'attached',
              type: 'multipart-file',
              required: false,
              description: '园区图片，或者文件，可以多文件'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注，预留字段暂时不用'
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: '园区名称'
            },
            {
              key: 'built_area',
              type: 'decimal',
              required: false,
              description: '建筑面积:单位平方米'
            },
            {
              key: 'total_invest',
              type: 'decimal',
              required: false,
              description: '总投资:万元'
            },
            {
              key: 'property',
              type: 'string',
              required: false,
              description: '所属物业'
            },
            {
              key: 'contacter',
              type: 'string',
              required: false,
              description: '联系人'
            },
            {
              key: 'contact',
              type: 'string',
              required: false,
              description: '联系方式'
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: '园区状态'
            },
            {
              key: 'cover_area',
              type: 'numeric',
              required: false,
              description: '占地面积:单位平方米'
            },
            {
              key: 'actual_invest',
              type: 'numeric',
              required: false,
              description: '实际投资:万元'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改园区模块',
          api: 'assets.park.modify',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description:
                '域关联ID，是一个和地域关联的主键，园区信息的唯一标识，修改和删除的接口必须要有的参数，资产模块的园区、楼宇、楼层、房间都有这个作为主键'
            },
            {
              key: 'complete_ts',
              type: 'timestamp',
              required: false,
              description: '竣工或购置时间，预留字段-可以不用'
            },
            {
              key: 'acquire_way',
              type: 'int',
              required: false,
              description: '取得方式，预留字段-可以不用'
            },
            {
              key: 'address',
              type: 'string',
              required: true,
              description: '园区地址'
            },
            {
              key: 'estate_property',
              type: 'string',
              required: true,
              description: '房产性质，预留字段-可以不用'
            },
            {
              key: 'usage',
              type: 'string',
              required: true,
              description: '园区定位'
            },
            {
              key: 'capital',
              type: 'string',
              required: true,
              description: '产权单位，资产方'
            },
            {
              key: 'detail',
              type: 'string',
              required: false,
              description: '园区描述'
            },
            {
              key: 'attached',
              type: 'multipart-file',
              required: false,
              description: '园区图片，或者文件，可以多文件'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注，预留字段暂时不用'
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: '园区名称'
            },
            {
              key: 'built_area',
              type: 'decimal',
              required: false,
              description: '建筑面积:单位平方米'
            },
            {
              key: 'total_invest',
              type: 'decimal',
              required: false,
              description: '总投资:万元'
            },
            {
              key: 'property',
              type: 'string',
              required: false,
              description: '所属物业'
            },
            {
              key: 'contacter',
              type: 'string',
              required: false,
              description: '联系人'
            },
            {
              key: 'contact',
              type: 'string',
              required: false,
              description: '联系方式'
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: '园区状态'
            },
            {
              key: 'cover_area',
              type: 'numeric',
              required: false,
              description: '占地面积:单位平方米'
            },
            {
              key: 'actual_invest',
              type: 'numeric',
              required: false,
              description: '实际投资:万元'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '删除园区模块',
          api: 'assets.park.remove',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '域关联ID，主键id'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '获取园区模块列表',
          api: 'assets.park.get_info',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: false,
              description: '域关联ID'
            }
          ],
          return: [
            {
              key: 'domain_id',
              type: 'int',
              description: '域关联ID'
            },
            {
              key: 'complete_ts',
              type: 'timestamp',
              description: '竣工或购置时间'
            },
            {
              key: 'acquire_way',
              type: 'int',
              description: '取得方式：0-其他、1-自建、2-购置、3-划拨'
            },
            {
              key: 'address',
              type: 'string',
              description: '园区地址'
            },
            {
              key: 'estate_property',
              type: 'string',
              description: '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅'
            },
            {
              key: 'usage',
              type: 'string',
              description:
                '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置'
            },
            {
              key: 'capital',
              type: 'string',
              description: '产权单位，资产方'
            },
            {
              key: 'detail',
              type: 'string',
              description: '介绍'
            },
            {
              key: 'attached',
              type: 'multipart-file',
              description: '附件-文件上传尚未开发'
            },
            {
              key: 'memo',
              type: 'string',
              description: '备注'
            },
            {
              key: 'name',
              type: 'string',
              description: '园区名称'
            },
            {
              key: 'built_area',
              type: 'decimal',
              description: '建筑面积:单位平方米'
            },
            {
              key: 'total_invest',
              type: 'decimal',
              description: '总投资:万元'
            },
            {
              key: 'property',
              type: 'string',
              description: '所属物业'
            },
            {
              key: 'contacter',
              type: 'string',
              description: '联系人'
            },
            {
              key: 'contact',
              type: 'string',
              description: '联系方式'
            },
            {
              key: 'state',
              type: 'int',
              description: '园区状态'
            },
            {
              key: 'cover_area',
              type: 'numeric',
              description: '占地面积:单位平方米'
            },
            {
              key: 'actual_invest',
              type: 'numeric',
              description: '实际投资:万元'
            }
          ],
          explain: []
        },
        {
          title: '获取园区模块列表',
          api: 'assets.park.get_list',
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
              key: 'domain_id',
              type: 'int',
              required: false,
              description:
                '域关联ID，是一个和地域关联的主键，园区信息的唯一标识，修改和删除的接口必须要有的参数，资产模块的园区、楼宇、楼层、房间都有这个作为主键'
            },
            {
              key: 'complete_ts',
              type: 'timestamp',
              required: false,
              description: '竣工或购置时间，预留字段-可以不用'
            },
            {
              key: 'acquire_way',
              type: 'int',
              required: false,
              description: '取得方式，预留字段-可以不用'
            },
            {
              key: 'address',
              type: 'string',
              required: false,
              description: '园区地址'
            },
            {
              key: 'estate_property',
              type: 'string',
              required: false,
              description: '房产性质，预留字段-可以不用'
            },
            {
              key: 'usage',
              type: 'string',
              required: false,
              description: '园区定位'
            },
            {
              key: 'capital',
              type: 'string',
              required: false,
              description: '产权单位，资产方'
            },
            {
              key: 'detail',
              type: 'string',
              required: false,
              description: '园区描述'
            },
            {
              key: 'attached',
              type: 'multipart-file',
              required: false,
              description: '园区图片，或者文件，可以多文件'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注，预留字段暂时不用'
            },
            {
              key: 'name',
              type: 'string',
              required: false,
              description: '园区名称'
            },
            {
              key: 'built_area',
              type: 'decimal',
              required: false,
              description: '建筑面积:单位平方米'
            },
            {
              key: 'total_invest',
              type: 'decimal',
              required: false,
              description: '总投资:万元'
            },
            {
              key: 'property',
              type: 'string',
              required: false,
              description: '所属物业'
            },
            {
              key: 'contacter',
              type: 'string',
              required: false,
              description: '联系人'
            },
            {
              key: 'contact',
              type: 'string',
              required: false,
              description: '联系方式'
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: '园区状态'
            },
            {
              key: 'cover_area',
              type: 'numeric',
              required: false,
              description: '占地面积:单位平方米'
            },
            {
              key: 'actual_invest',
              type: 'numeric',
              required: false,
              description: '实际投资:万元'
            }
          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '园区模块列表'
            }
          ],
          explain: [
            {
              key: 'domain_id',
              type: 'int',
              description: '域关联ID'
            },
            {
              key: 'complete_ts',
              type: 'timestamp',
              description: '竣工或购置时间'
            },
            {
              key: 'acquire_way',
              type: 'int',
              description: '取得方式：0-其他、1-自建、2-购置、3-划拨'
            },
            {
              key: 'address',
              type: 'string',
              description: '园区地址'
            },
            {
              key: 'estate_property',
              type: 'string',
              description: '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅'
            },
            {
              key: 'usage',
              type: 'string',
              description:
                '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置'
            },
            {
              key: 'capital',
              type: 'string',
              description: '产权单位，资产方'
            },
            {
              key: 'detail',
              type: 'string',
              description: '介绍'
            },
            {
              key: 'attached',
              type: 'multipart-file',
              description: '附件-文件上传尚未开发'
            },
            {
              key: 'memo',
              type: 'string',
              description: '备注'
            },
            {
              key: 'name',
              type: 'string',
              description: '园区名称'
            },
            {
              key: 'built_area',
              type: 'decimal',
              description: '建筑面积:单位平方米'
            },
            {
              key: 'total_invest',
              type: 'decimal',
              description: '总投资:万元'
            },
            {
              key: 'property',
              type: 'string',
              description: '所属物业'
            },
            {
              key: 'contacter',
              type: 'string',
              description: '联系人'
            },
            {
              key: 'contact',
              type: 'string',
              description: '联系方式'
            },
            {
              key: 'state',
              type: 'int',
              description: '园区状态'
            },
            {
              key: 'cover_area',
              type: 'numeric',
              description: '占地面积:单位平方米'
            },
            {
              key: 'actual_invest',
              type: 'numeric',
              description: '实际投资:万元'
            }
          ]
        }
      ]
    }
    // 楼宇模块管理
    let building = {
      title: '楼宇模块管理',
      content: [
        {
          title: '获取楼宇统计信息',
          api: 'assets.d_building.get_list',
          business: [
            {
              key: 'building_id',
              type: 'int',
              required: true,
              description: '园区id'
            }
          ],
          return: [
            {
              key: 'rent_area',
              type: 'int',
              required: true,
              description: `可招商面积`
            },
            {
              key: 'total_area',
              type: 'int',
              required: true,
              description: `管理面积`
            },
            {
              key: 'avg_unit_price',
              type: 'int',
              required: true,
              description: `在租实时均价`
            },
            {
              key: 'unit_type',
              type: 'int',
              required: true,
              description: `单位`
            },
            {
              key: 'rent_rate',
              type: 'int',
              required: true,
              description: `出租率`
            },
            {
              key: 'pay_rate',
              type: 'int',
              required: true,
              description: `支付租金的比率`
            },
            {
              key: 'total_rooms',
              type: 'int',
              required: true,
              description: `总房源数量`
            },
            {
              key: 'rent_rooms',
              type: 'int',
              required: true,
              description: `可招租房源数量`
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: `创建时间`
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: `楼宇名称`
            },
            {
              key: 'built_area',
              type: 'int',
              required: true,
              description: `建筑面积:单位平方米`
            }
          ],
          explain: []
        },
        {
          title: '添加楼宇',
          api: 'assets.building.add',
          business: [
            {
              key: 'pid',
              type: 'int',
              required: true,
              description: '父域id,就是所属园区的domain_id'
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: `名称,可修改`
            },
            {
              key: 'info',
              type: 'json',
              required: false,
              description: `域扩展信息，备用字段-可以忽略`
            },
            {
              key: 'code',
              type: 'string',
              required: false,
              description: `编码,比如行政区号，备用字段-可以忽略`
            },
            {
              key: 'domain_memo',
              type: 'string',
              required: false,
              description: `域备注，备用字段-可以忽略`
            },
            {
              key: 'property_unit',
              type: 'string',
              required: true,
              description: `产权单位，备用字段-可以忽略`
            },
            {
              key: 'property_certificate',
              type: 'string',
              required: true,
              description: `产权证，备用字段-可以忽略`
            },
            {
              key: 'complete_ts',
              type: 'timestamp',
              required: true,
              description: `竣工或购置时间，备用字段-可以忽略`
            },
            {
              key: 'area',
              type: 'decimal',
              required: true,
              description: `建筑面积`
            },
            {
              key: 'rent_area',
              type: 'decimal',
              required: true,
              description: `出租面积`
            },
            {
              key: 'attached',
              type: 'json',
              required: false,
              description: `附件或者图片`
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: `楼宇描述`
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改楼宇',
          api: 'assets.building.modify',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '域关联ID'
            },
            {
              key: 'name',
              type: 'string',
              required: false,
              description: '名称'
            },
            {
              key: 'property_unit',
              type: 'string',
              required: false,
              description: '产权单位'
            },
            {
              key: 'property_certificate',
              type: 'string',
              required: false,
              description: '产权证'
            },
            {
              key: 'complete_ts',
              type: 'timestamp',
              required: false,
              description: '竣工或购置时间'
            },
            {
              key: 'area',
              type: 'decimal',
              required: false,
              description: '建筑面积'
            },
            {
              key: 'attached',
              type: 'multipart-file',
              required: false,
              description: '附件-文件上传尚未开发'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注'
            },
            {
              key: 'rent_area',
              type: 'numeric',
              required: false,
              description: '出租面积'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: ' 删除楼宇',
          api: 'assets.building.remove',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '域ID，主键id,唯一标识符'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '获取楼宇列表',
          api: 'assets.building.get_list',
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
              key: 'domain_id',
              type: 'int',
              required: false,
              description: '域关联ID'
            },
            {
              key: 'name',
              type: 'string',
              required: false,
              description: '名称'
            },
            {
              key: 'property_unit',
              type: 'string',
              required: false,
              description: '产权单位，备用字段-可以忽略'
            },
            {
              key: 'property_certificate',
              type: 'string',
              required: false,
              description: '产权证，备用字段-可以忽略'
            },
            {
              key: 'complete_ts',
              type: 'timestamp',
              required: false,
              description: '竣工或购置时间，备用字段-可以忽略'
            },
            {
              key: 'area',
              type: 'decimal',
              required: false,
              description: '建筑面积'
            },
            {
              key: 'rent_area',
              type: 'decimal',
              required: false,
              description: '出租面积'
            },
            {
              key: 'attached',
              type: 'json',
              required: false,
              description: '附件或者图片'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '楼宇描述'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: false,
              description: '备注'
            },
            {
              key: 'rent_area',
              type: 'numeric',
              required: false,
              description: '备注'
            }
          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '楼宇列表'
            }
          ],
          explain: []
        },
        {
          title: '获取楼宇信息',
          api: 'assets.building.get_list',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '域关联ID，主键id'
            }
          ],
          return: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '域关联ID'
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: '名称'
            },
            {
              key: 'property_unit',
              type: 'string',
              required: true,
              description: '产权单位'
            },
            {
              key: 'property_certificate',
              type: 'string',
              required: true,
              description: '产权证'
            },
            {
              key: 'complete_ts',
              type: 'timestamp',
              required: true,
              description: '竣工或购置时间'
            },
            {
              key: 'area',
              type: 'decimal',
              required: true,
              description: '建筑面积'
            },
            {
              key: 'attached',
              type: 'multipart-file',
              required: false,
              description: '附件-文件上传尚未开发'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '楼宇描述'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: false,
              description: '记录的生成时间'
            },
            {
              key: 'rent_area',
              type: 'numeric',
              required: false,
              description: '出租面积'
            }
          ],
          explain: []
        }
      ]
    }
    // 楼层模块管理
    let floor = {
      title: '楼层模块管理:::目前楼层的概念已经被干掉了',
      content: [
        {
          title: '添加楼层 ，楼层这一块的添加可以先不管',
          api: 'assets.floor.add',
          business: [
            {
              key: 'pid',
              type: 'int',
              required: true,
              description: '父域id,就是楼宇的domain_id'
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: '名称,可修改'
            },
            {
              key: 'info',
              type: 'json',
              required: false,
              description: '域扩展信息,预留字段-可以忽略'
            },
            {
              key: 'code',
              type: 'string',
              required: false,
              description: '编码,比如行政区号-预留字段-可以忽略'
            },
            {
              key: 'domain_memo',
              type: 'string',
              required: false,
              description: '域备注-预留字段-可以忽略'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改楼层',
          api: 'assets.floor.modify',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '域关联ID，主键id'
            },
            {
              key: 'name',
              type: 'string',
              required: false,
              description: '楼层名称'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '删除楼层',
          api: 'assets.floor.remove',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '主键ID，唯一标识符'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '获取楼层列表',
          api: 'assets.floor.get_list',
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
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '主键ID，唯一标识符'
            },
            {
              key: 'name',
              type: 'string',
              required: false,
              description: '名称'
            }
          ],
          return: [],
          explain: []
        }
      ]
    }
    // 房间模块管理
    let room = {
      title: '房间模块管理',
      content: [
        {
          title: '添加房间',
          api: 'assets.room.add',
          business: [
            {
              key: 'pid',
              type: 'int',
              required: true,
              description:
                '父域id,就是楼宇的domain_id；因为目前的父域id,就是楼层的domain_id'
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: '房间号，名称'
            },
            {
              key: 'area',
              type: 'decimal',
              required: true,
              description: '建筑面积 单位：平方米'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '房间状态'
            },
            {
              key: 'contacter',
              type: 'sting',
              required: false,
              description: '联系人'
            },
            {
              key: 'contact',
              type: 'string',
              required: false,
              description: '联系方式'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '房间描述'
            },
            {
              key: 'attached',
              type: 'jsonb',
              required: false,
              description: '附件或者图片'
            },
            {
              key: 'info',
              type: 'json',
              required: false,
              description: '域扩展信息，预留字段-可以忽略'
            },
            {
              key: 'code',
              type: 'string',
              required: false,
              description: '编码,比如行政区号，预留字段-可以忽略'
            },
            {
              key: 'domain_memo',
              type: 'string',
              required: false,
              description: '域备注，预留字段-可以忽略'
            },
            {
              key: 'room_property',
              type: 'int',
              required: true,
              description:
                '房间性质：0-出租、1-出售、2-自用、3-公用，预留字段-可以忽略'
            },
            {
              key: 'is_rentable',
              type: 'boolean',
              required: true,
              description:
                '是否可租： true 可租 、 false 不可租，预留字段-可以忽略'
            },
            {
              key: 'room_usage',
              type: 'int',
              required: true,
              description:
                '房间用途：0-其他、1-办公、2-厂房、3-公寓，预留字段-可以忽略'
            },
            {
              key: 'decoration_standard',
              type: 'int',
              required: true,
              description: '装修标准：0-毛坯、1-简装、2-精装，预留字段-可以忽略'
            },
            {
              key: 'direction',
              type: 'int',
              required: false,
              description: '朝向：0-东、1-南、2-西、3-北，预留字段-可以忽略'
            },
            {
              key: 'estate_property',
              type: 'string',
              required: true,
              description:
                '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅，预留字段-可以忽略'
            },
            {
              key: 'usage',
              type: 'string',
              required: true,
              description:
                '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置，预留字段-可以忽略'
            },
            {
              key: 'acquire_way',
              type: 'int',
              required: true,
              description:
                '取得方式：0-其他、1-自建、2-购置、3-划拨，预留字段-可以忽略'
            },
            {
              key: 'acquire_ts',
              type: 'timestamp',
              required: true,
              description: '取得时间，预留字段-可以忽略'
            },
            {
              key: 'is_flue',
              type: 'bool',
              required: false,
              description: '烟道：true 有、false 无，预留字段-可以忽略'
            },
            {
              key: 'floor_height',
              type: 'decimal',
              required: false,
              description: '层高： 米，预留字段-可以忽略'
            },
            {
              key: 'floor',
              type: 'int',
              required: false,
              description: '楼层号'
            },
            {
              key: 'bearing',
              type: 'decimal',
              required: false,
              description: '承重： 千克，预留字段-可以忽略'
            },
            {
              key: 'address',
              type: 'string',
              required: false,
              description: '房间详细地址'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改房间',
          api: 'assets.room.modify',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '域关联ID，房间的主键id'
            },
            {
              key: 'name',
              type: 'string',
              required: false,
              description: '房间名称'
            },
            {
              key: 'room_property',
              type: 'int',
              required: false,
              description: '房间性质：0-出租、1-出售、2-自用、3-公用'
            },
            {
              key: 'is_rentable',
              type: 'boolean',
              required: false,
              description: '是否可租： true 可租 、 false 不可租'
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: '房间状态：0-空闲、1-预定、2-占用'
            },
            {
              key: 'room_usage',
              type: 'int',
              required: false,
              description: '房间用途：0-其他、1-办公、2-厂房、3-公寓'
            },
            {
              key: 'decoration_standard',
              type: 'int',
              required: false,
              description: '装修标准：0-毛坯、1-简装、2-精装'
            },
            {
              key: 'area',
              type: 'decimal',
              required: false,
              description: '建筑面积 单位：平方米'
            },
            {
              key: 'direction',
              type: 'int',
              required: false,
              description: '朝向：0-东、1-南、2-西、3-北'
            },
            {
              key: 'estate_property',
              type: 'string',
              required: false,
              description: '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅'
            },
            {
              key: 'usage',
              type: 'string',
              required: false,
              description:
                '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置'
            },
            {
              key: 'acquire_way',
              type: 'int',
              required: false,
              description: '取得方式：0-其他、1-自建、2-购置、3-划拨'
            },
            {
              key: 'acquire_ts',
              type: 'timestamp',
              required: false,
              description: '取得时间'
            },
            {
              key: 'is_flue',
              type: 'bool',
              required: false,
              description: '烟道：true 有、false 无'
            },
            {
              key: 'floor_height',
              type: 'decimal',
              required: false,
              description: '层高： 米'
            },
            {
              key: 'bearing',
              type: 'decimal',
              required: false,
              description: '承重： 千克'
            },
            {
              key: 'attached',
              type: 'jsonb',
              required: false,
              description: '附件'
            },
            {
              key: 'floor',
              type: 'int',
              required: false,
              description: '楼层号'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注'
            },
            {
              key: 'address',
              type: 'string',
              required: false,
              description: '房间详细地址'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '删除房间',
          api: 'assets.room.remove',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '主键ID'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '获取房间列表',
          api: 'assets.room.get_list',
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
              key: 'domain_id',
              type: 'int',
              required: false,
              description: '域关联ID'
            },
            {
              key: 'name',
              type: 'string',
              required: false,
              description: '房间名称'
            },
            {
              key: 'room_property',
              type: 'int',
              required: false,
              description: '房间性质：0-出租、1-出售、2-自用、3-公用'
            },
            {
              key: 'is_rentable',
              type: 'boolean',
              required: false,
              description: '是否可租： true 可租 、 false 不可租'
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: '房间状态：0-空闲、1-预定、2-占用'
            },
            {
              key: 'room_usage',
              type: 'int',
              required: false,
              description: '房间用途：0-其他、1-办公、2-厂房、3-公寓'
            },
            {
              key: 'decoration_standard',
              type: 'int',
              required: false,
              description: '装修标准：0-毛坯、1-简装、2-精装'
            },
            {
              key: 'area',
              type: 'decimal',
              required: false,
              description: '建筑面积 单位：平方米'
            },
            {
              key: 'direction',
              type: 'int',
              required: false,
              description: '朝向：0-东、1-南、2-西、3-北'
            },
            {
              key: 'estate_property',
              type: 'string',
              required: false,
              description: '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅'
            },
            {
              key: 'usage',
              type: 'string',
              required: false,
              description:
                '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置'
            },
            {
              key: 'acquire_way',
              type: 'int',
              required: false,
              description: '取得方式：0-其他、1-自建、2-购置、3-划拨'
            },
            {
              key: 'acquire_ts',
              type: 'timestamp',
              required: false,
              description: '取得时间'
            },
            {
              key: 'is_flue',
              type: 'bool',
              required: false,
              description: '烟道：true 有、false 无'
            },
            {
              key: 'floor_height',
              type: 'decimal',
              required: false,
              description: '层高： 米'
            },
            {
              key: 'bearing',
              type: 'decimal',
              required: false,
              description: '承重： 千克'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注'
            },
            {
              key: 'address',
              type: 'string',
              required: false,
              description: '房间详细地址'
            }
          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '楼宇列表'
            }
          ],
          explain: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '域关联ID'
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: '房间名称'
            },
            {
              key: 'room_property',
              type: 'int',
              required: true,
              description: '房间性质：0-出租、1-出售、2-自用、3-公用'
            },
            {
              key: 'is_rentable',
              type: 'boolean',
              required: true,
              description: '是否可租： true 可租 、 false 不可租'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '房间状态：0-空闲、1-预定、2-占用'
            },
            {
              key: 'room_usage',
              type: 'int',
              required: true,
              description: '房间用途：0-其他、1-办公、2-厂房、3-公寓'
            },
            {
              key: 'decoration_standard',
              type: 'int',
              required: true,
              description: '装修标准：0-毛坯、1-简装、2-精装'
            },
            {
              key: 'area',
              type: 'decimal',
              required: true,
              description: '建筑面积 单位：平方米'
            },
            {
              key: 'direction',
              type: 'int',
              required: false,
              description: '朝向：0-东、1-南、2-西、3-北'
            },
            {
              key: 'estate_property',
              type: 'string',
              required: true,
              description: '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅'
            },
            {
              key: 'usage',
              type: 'string',
              required: true,
              description:
                '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置'
            },
            {
              key: 'acquire_way',
              type: 'int',
              required: true,
              description: '取得方式：0-其他、1-自建、2-购置、3-划拨'
            },
            {
              key: 'acquire_ts',
              type: 'timestamp',
              required: true,
              description: '取得时间'
            },
            {
              key: 'is_flue',
              type: 'bool',
              required: false,
              description: '烟道：true 有、false 无'
            },
            {
              key: 'floor_height',
              type: 'decimal',
              required: false,
              description: '层高： 米'
            },
            {
              key: 'bearing',
              type: 'decimal',
              required: false,
              description: '承重： 千克'
            },
            {
              key: 'attached',
              type: 'jsonb',
              required: false,
              description: '附件'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注'
            },
            {
              key: 'address',
              type: 'string',
              required: false,
              description: '房间详细地址'
            }
          ]
        },
        {
          title: '获取房间信息',
          api: 'assets.room.get_info',
          business: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '域关联ID'
            }
          ],
          return: [
            {
              key: 'domain_id',
              type: 'int',
              required: true,
              description: '域关联ID'
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: '房间名称'
            },
            {
              key: 'room_property',
              type: 'int',
              required: true,
              description: '房间性质：0-出租、1-出售、2-自用、3-公用'
            },
            {
              key: 'is_rentable',
              type: 'boolean',
              required: true,
              description: '是否可租： true 可租 、 false 不可租'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '房间状态：0-空闲、1-预定、2-占用'
            },
            {
              key: 'room_usage',
              type: 'int',
              required: true,
              description: '房间用途：0-其他、1-办公、2-厂房、3-公寓'
            },
            {
              key: 'decoration_standard',
              type: 'int',
              required: true,
              description: '装修标准：0-毛坯、1-简装、2-精装'
            },
            {
              key: 'area',
              type: 'decimal',
              required: true,
              description: '建筑面积 单位：平方米'
            },
            {
              key: 'direction',
              type: 'int',
              required: false,
              description: '朝向：0-东、1-南、2-西、3-北'
            },
            {
              key: 'estate_property',
              type: 'string',
              required: true,
              description: '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅'
            },
            {
              key: 'usage',
              type: 'string',
              required: true,
              description:
                '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置'
            },
            {
              key: 'acquire_way',
              type: 'int',
              required: true,
              description: '取得方式：0-其他、1-自建、2-购置、3-划拨'
            },
            {
              key: 'acquire_ts',
              type: 'timestamp',
              required: true,
              description: '取得时间'
            },
            {
              key: 'is_flue',
              type: 'bool',
              required: false,
              description: '烟道：true 有、false 无'
            },
            {
              key: 'floor_height',
              type: 'decimal',
              required: false,
              description: '层高： 米'
            },
            {
              key: 'bearing',
              type: 'decimal',
              required: false,
              description: '承重： 千克'
            },
            {
              key: 'attached',
              type: 'jsonb',
              required: false,
              description: '附件'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: false,
              description: '创建时间'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注'
            },
            {
              key: 'address',
              type: 'string',
              required: false,
              description: '房间详细地址'
            }
          ],
          explain: []
        }
      ]
    }
    // 费用列支
    let feiyonglz = {
      title: '费用列支模块',
      content: [
        {
          title: '获取费用列支统计信息',
          api: 'assets.d_cost.get_info',
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
              key: 'need_receive',
              type: 'int',
              required: true,
              description: `应收`
            },
            {
              key: 'need_receive_rate',
              type: 'decimal',
              required: true,
              description: `应收对比`
            },
            {
              key: 'receive',
              type: 'int',
              required: true,
              description: `已收`
            },
            {
              key: 'receive_rate',
              type: 'decimal',
              required: true,
              description: `已收对比`
            },
            {
              key: 'un_receive',
              type: 'int',
              required: true,
              description: `未缴`
            },
            {
              key: 'un_receive_rate',
              type: 'decimal',
              required: true,
              description: `未缴对比`
            }
          ],
          explain: []
        },
        {
          title: '添加费用列支',
          api: 'assets.cost.add',
          business: [
            {
              key: 'log_type',
              type: 'int',
              required: true,
              description: '列支方向'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '状态'
            },
            {
              key: 'contract_code',
              type: 'string',
              required: true,
              description: '合同编号'
            },
            {
              key: 'payer',
              type: 'string',
              required: true,
              description: '付款方'
            },
            {
              key: 'contacter',
              type: 'string',
              required: true,
              description: '联系人'
            },
            {
              key: 'receiver',
              type: 'string',
              required: true,
              description: '跟进人'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: '来访时间'
            },
            {
              key: 'customer_id',
              type: 'int',
              required: true,
              description: '客户id'
            },
            {
              key: 'cost',
              type: 'decimal',
              required: false,
              description: '费用金额'
            },
            {
              key: 'cost_type',
              type: 'int',
              required: true,
              description: '费用类型'
            },
            {
              key: 'start_ts',
              type: 'timestamp',
              required: true,
              description: '周期开始时间'
            },
            {
              key: 'end_ts',
              type: 'timestamp',
              required: true,
              description: '周期结束时间'
            },
            {
              key: 'memo',
              type: 'string',
              required: true,
              description: '备注'
            },
            {
              key: 'customer',
              type: 'string',
              required: true,
              description: '客户名字'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改费用列支',
          api: 'assets.cost.modify ',
          business: [
            {
              key: 'id',
              type: 'int',
              required: true,
              description: '主键'
            },
            {
              key: 'log_type',
              type: 'int',
              required: true,
              description: '列支方向'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '状态'
            },
            {
              key: 'contract_code',
              type: 'string',
              required: true,
              description: '合同编号'
            },
            {
              key: 'payer',
              type: 'string',
              required: true,
              description: '付款方'
            },
            {
              key: 'contacter',
              type: 'string',
              required: true,
              description: '联系人'
            },
            {
              key: 'receiver',
              type: 'string',
              required: true,
              description: '跟进人'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: '来访时间'
            },
            {
              key: 'customer_id',
              type: 'int',
              required: true,
              description: '客户id'
            },
            {
              key: 'cost',
              type: 'decimal',
              required: false,
              description: '费用金额'
            },
            {
              key: 'cost_type',
              type: 'int',
              required: true,
              description: '费用类型'
            },
            {
              key: 'start_ts',
              type: 'timestamp',
              required: true,
              description: '周期开始时间'
            },
            {
              key: 'end_ts',
              type: 'timestamp',
              required: true,
              description: '周期结束时间'
            },
            {
              key: 'memo',
              type: 'string',
              required: true,
              description: '备注'
            },
            {
              key: 'customer',
              type: 'string',
              required: true,
              description: '客户名字'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '删除费用列支',
          api: 'assets.cost.remove',
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
          title: '获取费用列支列表',
          api: 'assets.cost.get_list',
          business: [
            {
              key: 'park_id',
              type: 'int',
              required: true,
              description: '园区id'
            },
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
              key: 'log_type',
              type: 'int',
              required: true,
              description: '列支方向'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '状态'
            },
            {
              key: 'like',
              type: 'string',
              required: true,
              description: '模糊搜索：联系人、跟进人、客户'
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
              key: 'log_type',
              type: 'int',
              required: true,
              description: '列支方向'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '状态'
            },
            {
              key: 'contract_code',
              type: 'string',
              required: true,
              description: '合同编号'
            },
            {
              key: 'payer',
              type: 'string',
              required: true,
              description: '付款方'
            },
            {
              key: 'contacter',
              type: 'string',
              required: true,
              description: '联系人'
            },
            {
              key: 'receiver',
              type: 'string',
              required: true,
              description: '跟进人'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: '来访时间'
            },
            {
              key: 'customer_id',
              type: 'int',
              required: true,
              description: '客户id'
            },
            {
              key: 'cost',
              type: 'decimal',
              required: false,
              description: '费用金额'
            },
            {
              key: 'cost_type',
              type: 'int',
              required: true,
              description: '费用类型'
            },
            {
              key: 'start_ts',
              type: 'timestamp',
              required: true,
              description: '周期开始时间'
            },
            {
              key: 'end_ts',
              type: 'timestamp',
              required: true,
              description: '周期结束时间'
            },
            {
              key: 'memo',
              type: 'string',
              required: true,
              description: '备注'
            },
            {
              key: 'customer',
              type: 'string',
              required: true,
              description: '客户名字'
            }
          ]
        },
        {
          title: '获取费用列支信息',
          api: 'assets.cost.get_info',
          business: [
            {
              key: 'id',
              type: 'int',
              required: true,
              description: '费用列支id'
            }
          ],
          return: [
            {
              key: 'log_type',
              type: 'int',
              required: true,
              description: '列支方向'
            },
            {
              key: 'state',
              type: 'int',
              required: true,
              description: '状态'
            },
            {
              key: 'contract_code',
              type: 'string',
              required: true,
              description: '合同编号'
            },
            {
              key: 'payer',
              type: 'string',
              required: true,
              description: '付款方'
            },
            {
              key: 'contacter',
              type: 'string',
              required: true,
              description: '联系人'
            },
            {
              key: 'receiver',
              type: 'string',
              required: true,
              description: '跟进人'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: '来访时间'
            },
            {
              key: 'customer_id',
              type: 'int',
              required: true,
              description: '客户id'
            },
            {
              key: 'cost',
              type: 'decimal',
              required: false,
              description: '费用金额'
            },
            {
              key: 'cost_type',
              type: 'int',
              required: true,
              description: '费用类型'
            },
            {
              key: 'start_ts',
              type: 'timestamp',
              required: true,
              description: '周期开始时间'
            },
            {
              key: 'end_ts',
              type: 'timestamp',
              required: true,
              description: '周期结束时间'
            },
            {
              key: 'memo',
              type: 'string',
              required: true,
              description: '备注'
            },
            {
              key: 'customer',
              type: 'string',
              required: true,
              description: '客户名字'
            }
          ],
          explain: []
        }
      ]
    }
    // 财务收入
    let caiwusr = {
      title: '财务收入模块',
      content: [
        {
          title: '获取财务收入统计信息',
          api: 'assets.d_charge.get_info',
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
              key: 'rent',
              type: 'decimal',
              required: true,
              description: `租金`
            },
            {
              key: 'property_fee',
              type: 'decimal',
              required: true,
              description: `物业费`
            },
            {
              key: 'water_fee',
              type: 'decimal',
              required: true,
              description: `水费`
            },
            {
              key: 'gas_fee',
              type: 'decimal',
              required: true,
              description: `燃气费`
            },
            {
              key: 'electric_fee',
              type: 'decimal',
              required: true,
              description: `电费`
            },
            {
              key: 'heat_fee',
              type: 'decimal',
              required: true,
              description: `暖通费用`
            },
            {
              key: 'other_fee',
              type: 'decimal',
              required: true,
              description: `其他费用`
            },
            {
              key: 'rent_rate',
              type: 'decimal',
              required: true,
              description: `租金变化率`
            },
            {
              key: 'property_rate',
              type: 'decimal',
              required: true,
              description: `物业费变化率`
            },
            {
              key: 'water_rate',
              type: 'decimal',
              required: true,
              description: `水费变化率`
            },
            {
              key: 'gas_rate',
              type: 'decimal',
              required: true,
              description: `燃气费变化率`
            },
            {
              key: 'electric_rate',
              type: 'decimal',
              required: true,
              description: `电费变化率`
            },
            {
              key: 'heat_rate',
              type: 'decimal',
              required: true,
              description: `暖通费用变化率`
            },
            {
              key: 'other_rate',
              type: 'decimal',
              required: true,
              description: `其他费用变化率`
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: `创建时间`
            }
          ],
          explain: []
        },
        {
          title: '添加财务收入',
          api: 'assets.charge.add',
          business: [
            {
              key: 'contract_code',
              type: 'string',
              required: false,
              description: `合同编号`
            },
            {
              key: 'payer',
              type: 'string',
              required: false,
              description: `付款方`
            },
            {
              key: 'customer',
              type: 'string',
              required: false,
              description: `客户`
            },
            {
              key: 'customer_id',
              type: 'string',
              required: false,
              description: `客户id`
            },
            {
              key: 'contacter',
              type: 'string',
              required: false,
              description: `联系人`
            },
            {
              key: 'charge',
              type: 'decimal',
              required: false,
              description: `费用金额`
            },
            {
              key: 'charge_type',
              type: 'int',
              required: false,
              description: `费用类型`
            },
            {
              key: 'rent',
              type: 'decimal',
              required: false,
              description: `租金`
            },
            {
              key: 'property_fee',
              type: 'decimal',
              required: false,
              description: `物业费`
            },
            {
              key: 'water_fee',
              type: 'decimal',
              required: false,
              description: `水费`
            },
            {
              key: 'electric_fee',
              type: 'decimal',
              required: false,
              description: `电费`
            },
            {
              key: 'heat_fee',
              type: 'decimal',
              required: false,
              description: `暖通费用`
            },
            {
              key: 'currency',
              type: 'int',
              required: false,
              description: `币种类型`
            },
            {
              key: 'start_ts',
              type: 'timestamp',
              required: false,
              description: `计费周期开始`
            },
            {
              key: 'end_ts',
              type: 'timestamp',
              required: false,
              description: `计费周期结束`
            },
            {
              key: 'rooms',
              type: 'string',
              required: false,
              description: `房间用逗号分隔`
            },
            {
              key: 'receiver',
              type: 'string',
              required: false,
              description: `跟进人`
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: `缴费状态`
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: `备注`
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: false,
              description: `创建时间`
            },
            {
              key: 'gas_fee',
              type: 'decimal',
              required: false,
              description: `燃气费用`
            },
            {
              key: 'other_fee',
              type: 'decimal',
              required: false,
              description: `其他费用`
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改财务收入',
          api: 'assets.charge.modify ',
          business: [
            {
              key: 'id',
              type: 'int',
              required: true,
              description: '主键'
            },
            {
              key: 'contract_code',
              type: 'string',
              required: false,
              description: `合同编号`
            },
            {
              key: 'payer',
              type: 'string',
              required: false,
              description: `付款方`
            },
            {
              key: 'customer',
              type: 'string',
              required: false,
              description: `客户`
            },
            {
              key: 'customer_id',
              type: 'string',
              required: false,
              description: `客户id`
            },
            {
              key: 'contacter',
              type: 'string',
              required: false,
              description: `联系人`
            },
            {
              key: 'charge',
              type: 'decimal',
              required: false,
              description: `费用金额`
            },
            {
              key: 'charge_type',
              type: 'int',
              required: false,
              description: `费用类型`
            },
            {
              key: 'rent',
              type: 'decimal',
              required: false,
              description: `租金`
            },
            {
              key: 'property_fee',
              type: 'decimal',
              required: false,
              description: `物业费`
            },
            {
              key: 'water_fee',
              type: 'decimal',
              required: false,
              description: `水费`
            },
            {
              key: 'electric_fee',
              type: 'decimal',
              required: false,
              description: `电费`
            },
            {
              key: 'heat_fee',
              type: 'decimal',
              required: false,
              description: `暖通费用`
            },
            {
              key: 'currency',
              type: 'int',
              required: false,
              description: `币种类型`
            },
            {
              key: 'start_ts',
              type: 'timestamp',
              required: false,
              description: `计费周期开始`
            },
            {
              key: 'end_ts',
              type: 'timestamp',
              required: false,
              description: `计费周期结束`
            },
            {
              key: 'rooms',
              type: 'string',
              required: false,
              description: `房间用逗号分隔`
            },
            {
              key: 'receiver',
              type: 'string',
              required: false,
              description: `跟进人`
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: `缴费状态`
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: `备注`
            },
            {
              key: 'gas_fee',
              type: 'decimal',
              required: false,
              description: `燃气费用`
            },
            {
              key: 'other_fee',
              type: 'decimal',
              required: false,
              description: `其他费用`
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '删除财务收入',
          api: 'assets.charge.remove',
          business: [
            {
              key: 'id',
              type: 'int',
              required: true,
              description: '财务收入id'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '获取财务收入列表',
          api: 'assets.charge.get_list',
          business: [
            {
              key: 'park_id',
              type: 'int',
              required: true,
              description: '园区id'
            },
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
              key: 'customer',
              type: 'string',
              required: false,
              description: `客户`
            },
            {
              key: 'start_ts',
              type: 'timestamp',
              required: false,
              description: `计费周期开始`
            },
            {
              key: 'end_ts',
              type: 'timestamp',
              required: false,
              description: `计费周期结束`
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: `缴费状态`
            }
          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '财务收入列表'
            }
          ],
          explain: [
            {
              key: 'contract_code',
              type: 'string',
              required: false,
              description: `合同编号`
            },
            {
              key: 'payer',
              type: 'string',
              required: false,
              description: `付款方`
            },
            {
              key: 'customer',
              type: 'string',
              required: false,
              description: `客户`
            },
            {
              key: 'customer_id',
              type: 'string',
              required: false,
              description: `客户id`
            },
            {
              key: 'contacter',
              type: 'string',
              required: false,
              description: `联系人`
            },
            {
              key: 'charge',
              type: 'decimal',
              required: false,
              description: `费用金额`
            },
            {
              key: 'charge_type',
              type: 'int',
              required: false,
              description: `费用类型`
            },
            {
              key: 'rent',
              type: 'decimal',
              required: false,
              description: `租金`
            },
            {
              key: 'property_fee',
              type: 'decimal',
              required: false,
              description: `物业费`
            },
            {
              key: 'water_fee',
              type: 'decimal',
              required: false,
              description: `水费`
            },
            {
              key: 'electric_fee',
              type: 'decimal',
              required: false,
              description: `电费`
            },
            {
              key: 'heat_fee',
              type: 'decimal',
              required: false,
              description: `暖通费用`
            },
            {
              key: 'currency',
              type: 'int',
              required: false,
              description: `币种类型`
            },
            {
              key: 'start_ts',
              type: 'timestamp',
              required: false,
              description: `计费周期开始`
            },
            {
              key: 'end_ts',
              type: 'timestamp',
              required: false,
              description: `计费周期结束`
            },
            {
              key: 'rooms',
              type: 'string',
              required: false,
              description: `房间用逗号分隔`
            },
            {
              key: 'receiver',
              type: 'string',
              required: false,
              description: `跟进人`
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: `缴费状态`
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: `备注`
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: false,
              description: `创建时间`
            },
            {
              key: 'gas_fee',
              type: 'decimal',
              required: false,
              description: `燃气费用`
            },
            {
              key: 'other_fee',
              type: 'decimal',
              required: false,
              description: `其他费用`
            }
          ]
        },
        {
          title: '获取财务收入信息',
          api: 'assets.charge.get_info',
          business: [
            {
              key: 'id',
              type: 'int',
              required: true,
              description: '客户id'
            }
          ],
          return: [
            {
              key: 'contract_code',
              type: 'string',
              required: false,
              description: `合同编号`
            },
            {
              key: 'payer',
              type: 'string',
              required: false,
              description: `付款方`
            },
            {
              key: 'customer',
              type: 'string',
              required: false,
              description: `客户`
            },
            {
              key: 'customer_id',
              type: 'string',
              required: false,
              description: `客户id`
            },
            {
              key: 'contacter',
              type: 'string',
              required: false,
              description: `联系人`
            },
            {
              key: 'charge',
              type: 'decimal',
              required: false,
              description: `费用金额`
            },
            {
              key: 'charge_type',
              type: 'int',
              required: false,
              description: `费用类型`
            },
            {
              key: 'rent',
              type: 'decimal',
              required: false,
              description: `租金`
            },
            {
              key: 'property_fee',
              type: 'decimal',
              required: false,
              description: `物业费`
            },
            {
              key: 'water_fee',
              type: 'decimal',
              required: false,
              description: `水费`
            },
            {
              key: 'electric_fee',
              type: 'decimal',
              required: false,
              description: `电费`
            },
            {
              key: 'heat_fee',
              type: 'decimal',
              required: false,
              description: `暖通费用`
            },
            {
              key: 'currency',
              type: 'int',
              required: false,
              description: `币种类型`
            },
            {
              key: 'start_ts',
              type: 'timestamp',
              required: false,
              description: `计费周期开始`
            },
            {
              key: 'end_ts',
              type: 'timestamp',
              required: false,
              description: `计费周期结束`
            },
            {
              key: 'rooms',
              type: 'string',
              required: false,
              description: `房间用逗号分隔`
            },
            {
              key: 'receiver',
              type: 'string',
              required: false,
              description: `跟进人`
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: `缴费状态`
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: `备注`
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: false,
              description: `创建时间`
            },
            {
              key: 'gas_fee',
              type: 'decimal',
              required: false,
              description: `燃气费用`
            },
            {
              key: 'other_fee',
              type: 'decimal',
              required: false,
              description: `其他费用`
            }
          ],
          explain: []
        }
      ]
    }
    // 字典模块管理
    let zidmkgl = {
      title: '字典类型模块',
      content: [
        {
          title: '添加字典类型模块',
          api: 'model.dictype.add',
          business: [
            {
              key: 'type_code',
              type: 'string',
              required: true,
              description: '字典类型编码'
            },
            {
              key: 'type_name',
              type: 'string',
              required: true,
              description: '字典类型名称'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改字典类型模块',
          api: 'model.dictype.modify',
          business: [
            {
              key: 'type_id',
              type: 'int',
              required: true,
              description: '字典类型id'
            },
            {
              key: 'type_code',
              type: 'string',
              required: false,
              description: '字典类型编码'
            },
            {
              key: 'type_name',
              type: 'string',
              required: false,
              description: '字典类型名称'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '删除字典类型模块',
          api: 'model.dictype.remove',
          business: [
            {
              key: 'type_id',
              type: 'int',
              required: true,
              description: '字典类型id'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '获取字典类型列表',
          api: 'model.dictype.get_list',
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
              key: 'type_id',
              type: 'int',
              required: true,
              description: '字典类型id'
            },
            {
              key: 'type_code',
              type: 'string',
              required: false,
              description: '字典类型编码'
            },
            {
              key: 'type_name',
              type: 'string',
              required: false,
              description: '字典类型名称'
            }
          ],
          return: [
            {
              key: 'list',
              type: 'int',
              required: false,
              description: '字典类型列表'
            }
          ],
          explain: [
            {
              key: 'type_id',
              type: 'int',
              required: true,
              description: '字典类型id'
            },
            {
              key: 'type_code',
              type: 'string',
              required: false,
              description: '字典类型编码'
            },
            {
              key: 'type_name',
              type: 'string',
              required: false,
              description: '字典类型名称'
            }
          ]
        },
        {
          title: '获取字典类型信息',
          api: 'model.dictype.get_list',
          business: [
            {
              key: 'type_id',
              type: 'int',
              required: true,
              description: '字典类型id'
            }
          ],
          return: [
            {
              key: 'type_id',
              type: 'int',
              required: true,
              description: '字典类型id'
            },
            {
              key: 'type_code',
              type: 'string',
              required: false,
              description: '字典类型编码'
            },
            {
              key: 'type_name',
              type: 'string',
              required: false,
              description: '字典类型名称'
            }
          ],
          explain: []
        },
        {
          title: '获取字典树',
          api: 'model.dictype.get_tree_list',
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
              key: 'type_id',
              type: 'int',
              required: true,
              description: '字典类型id'
            },
            {
              key: 'type_code',
              type: 'string',
              required: false,
              description: '字典类型编码'
            },
            {
              key: 'type_name',
              type: 'string',
              required: false,
              description: '字典类型名称'
            }
          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '字典类型列表'
            }
          ],
          explain: []
        }
      ]
    }
    // 字典管理
    let zidgl = {
      title: '字典模块',
      content: [
        {
          title: '添加字典模块',
          api: 'model.dicinfo.add',
          business: [
            {
              key: '参数名称',
              type: '参数类型',
              required: false,
              description: '参数描述'
            },
            {
              key: 'type_id',
              type: 'int',
              required: true,
              description: '字典类型id'
            },
            {
              key: 'dic_code',
              type: 'string',
              required: true,
              description: '业务编码'
            },
            {
              key: 'dic_info',
              type: 'string',
              required: false,
              description: '业务详情'
            },
            {
              key: 'order_num',
              type: 'int',
              required: true,
              description: '排序使用'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改字典模块',
          api: 'model.dicinfo.modify',
          business: [
            { key: 'id', type: 'int', required: true, description: '字典id' },
            {
              key: 'type_id',
              type: 'int',
              required: false,
              description: '字典类型id'
            },
            {
              key: 'dic_code',
              type: 'string',
              required: false,
              description: '业务编码'
            },
            {
              key: 'dic_info',
              type: 'string',
              required: false,
              description: '业务详情'
            },
            {
              key: 'order_num',
              type: 'int',
              required: false,
              description: '排序使用'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '删除字典模块',
          api: 'model.dicinfo.remove',
          business: [
            {
              key: 'id',
              type: 'int',
              required: true,
              description: '字典id'
            }
          ],
          return: [],
          explain: []
        },
        {
          title: '获取字典列表',
          api: 'model.dicinfo.get_list',
          business: [
            { key: 'pageno', type: 'int', required: true, description: '页码' },
            {
              key: 'pagesize',
              type: 'int',
              required: true,
              description: '页面显示行数'
            },
            { key: 'id', type: 'int', required: false, description: '字典id' },
            {
              key: 'typeid',
              type: 'int',
              required: false,
              description: '字典类型id'
            },
            {
              key: 'diccode',
              type: 'string',
              required: false,
              description: '业务编码'
            },
            {
              key: 'dicinfo',
              type: 'string',
              required: false,
              description: '业务详情'
            },
            {
              key: 'ordernum',
              type: 'int',
              required: false,
              description: '排序使用'
            }
          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '字典id'
            }
          ],
          explain: [
            {
              key: 'type_id',
              type: 'int',
              required: false,
              description: '字典类型id'
            },
            {
              key: 'dic_code',
              type: 'string',
              required: false,
              description: '业务编码'
            },
            {
              key: 'dic_info',
              type: 'string',
              required: false,
              description: '业务详情'
            },
            {
              key: 'order_num',
              type: 'int',
              required: false,
              description: '排序使用'
            }
          ]
        },
        {
          title: '获取字典信息',
          api: 'model.dicinfo.get_info',
          business: [
            { key: 'id', type: 'int', required: true, description: '字典ID' }
          ],
          return: [
            {
              key: 'type_id',
              type: 'int',
              required: false,
              description: '字典类型id'
            },
            {
              key: 'dic_code',
              type: 'string',
              required: false,
              description: '业务编码'
            },
            {
              key: 'dic_info',
              type: 'string',
              required: false,
              description: '业务详情'
            },
            {
              key: 'order_num',
              type: 'int',
              required: false,
              description: '排序使用'
            }
          ],
          explain: []
        }
      ]
    }
    // 合同管理
    let contract = {
      title: '合同模块管理',
      content: [
        {
          title: '获取合同统计信息(暂无)',
          api: 'assets.d_contract.get_list',
          business: [
            {
              key: 'building_id',
              type: 'int',
              required: true,
              description: '园区id'
            }
          ],
          return: [
            {
              key: 'rent_area',
              type: 'int',
              required: true,
              description: `可招商面积`
            },
            {
              key: 'total_area',
              type: 'int',
              required: true,
              description: `管理面积`
            },
            {
              key: 'avg_unit_price',
              type: 'int',
              required: true,
              description: `在租实时均价`
            },
            {
              key: 'unit_type',
              type: 'int',
              required: true,
              description: `单位`
            },
            {
              key: 'rent_rate',
              type: 'int',
              required: true,
              description: `出租率`
            },
            {
              key: 'pay_rate',
              type: 'int',
              required: true,
              description: `支付租金的比率`
            },
            {
              key: 'total_rooms',
              type: 'int',
              required: true,
              description: `总房源数量`
            },
            {
              key: 'rent_rooms',
              type: 'int',
              required: true,
              description: `可招租房源数量`
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: `创建时间`
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: `楼宇名称`
            },
            {
              key: 'built_area',
              type: 'int',
              required: true,
              description: `建筑面积:单位平方米`
            }
          ],
          explain: []
        },
        {
          title: '添加合同',
          api: 'assets.contract.add',
          business: [
            { key: 'customer_id', type: 'int', description: '用户id' },
            {
              key: 'organiz_code',
              type: 'string',
              description: '组织机构代码'
            },
            { key: 'company_type', type: 'int', description: '公司类别' },
            { key: 'company_name', type: 'string', description: '公司名称' },
            { key: 'customer_id', type: 'int', description: '来访客户id' },
            { key: 'scope', type: 'int', description: '经营范围' },
            {
              key: 'social_credit_code',
              type: 'string',
              description: '统一社会信用代码'
            },
            {
              key: 'taxpayer_code',
              type: 'string',
              description: '纳税人识别号'
            },
            { key: 'regist_code', type: 'string', description: '注册号' },
            { key: 'representative', type: 'string', description: '法人代表' },
            { key: 'nationality', type: 'string', description: '国籍' },
            {
              key: 'regist_fund',
              type: 'int',
              description: '注册资金:单位(万)'
            },
            { key: 'operate_state', type: 'int', description: '经营状态' },
            { key: 'establish_ts', type: 'timestamp', description: '成立日期' },
            { key: 'staff_size', type: 'int', description: '人员规模' },
            { key: 'operate_term', type: 'timestamp', description: '营业期限' },
            { key: 'issuance', type: 'string', description: '登记机关' },
            { key: 'authentic_ts', type: 'timestamp', description: '核准日期' },
            { key: 'en_name', type: 'string', description: '英文名' },
            { key: 'region', type: 'string', description: '所属地区' },
            { key: 'trade', type: 'string', description: '所属行业' },
            { key: 'address', type: 'string', description: '注册地址' },
            { key: 'brand', type: 'string', description: '商标品牌' },
            {
              key: 'taxpayer_code',
              type: 'string',
              description: '纳税人识别号'
            },
            { key: 'contacter', type: 'string', description: '联系人' },
            { key: 'contact', type: 'string', description: '电话' },
            { key: 'email', type: 'string', description: '邮箱' },
            { key: 'scope', type: 'int', description: '经营范围' },
            { key: 'bank', type: 'string', description: '银行' },
            { key: 'bank_code', type: 'string', description: '银行账号' },
            { key: 'invoice_address', type: 'string', description: '开票地址' },
            { key: 'business_format', type: 'int', description: '客户业态' },
            { key: 'follow_business', type: 'string', description: '跟进商务' },
            { key: 'contract_type', type: 'int', description: '合同类型' },
            { key: 'rent_area', type: 'int', description: '租聘面积' },
            { key: 'tenancy_divide', type: 'int', description: '租期划分' },
            { key: 'charge_type', type: 'int', description: '计费类型' },
            { key: 'state', type: 'int', description: '合同状态' },
            { key: 'sign_ts', type: 'timestamp', description: '签订时间' },
            { key: 'start_ts', type: 'timestamp', description: '合同开始日期' },
            { key: 'end_ts', type: 'timestamp', description: '合同截至日期' },
            {
              key: 'fee_start_ts',
              type: 'timestamp',
              description: '计费开始日期'
            },
            {
              key: 'fee_end_ts',
              type: 'timestamp',
              description: '计费截至日期'
            },
            { key: 'pay_cycle', type: 'int', description: '付款周期:单位是月' },
            {
              key: 'pay_date',
              type: 'int',
              description: '付款日期:每月的第几天'
            },
            {
              key: 'prepaid',
              type: 'int',
              description: '预付月份:预付几个月的月租'
            },
            { key: 'unit_price', type: 'int', description: '合同单价' },
            { key: 'unit_value', type: 'int', description: '合同单价的单位' },
            { key: 'year_rent', type: 'int', description: '年租金' },
            { key: 'month_rent', type: 'int', description: '月租金' },
            { key: 'deposit', type: 'int', description: '押金' },
            { key: 'manage_area', type: 'numeric', description: '管理面积' },
            { key: 'room', type: 'josn数组', description: '房间domain_id' },
            {
              key: 'property_sign_ts',
              type: 'timestamp',
              description: '签订时间'
            },
            {
              key: 'property_start_ts',
              type: 'timestamp',
              description: '合同开始日期'
            },
            {
              key: 'property_end_ts',
              type: 'timestamp',
              description: '合同截至日期'
            },
            {
              key: 'property_fee_start_ts',
              type: 'timestamp',
              description: '费用开始时间'
            },
            {
              key: 'property_fee_end_ts',
              type: 'timestamp',
              description: '费用结束时间'
            },
            {
              key: 'property_pay_cycle',
              type: 'int',
              description: '付款周期:单位是月'
            },

            {
              key: 'property_pay_date',
              type: 'int',
              description: '付款日期:每月的第几天'
            },
            {
              key: 'property_prepaid',
              type: 'int',
              description: '预付月份:预付几个月的月租'
            },
            {
              key: 'property_unit_price',
              type: 'int',
              description: '合同单价'
            },
            {
              key: 'property_unit_value',
              type: 'int',
              description: '合同单价的单位'
            },
            { key: 'property_year_rent', type: 'int', description: '年物业费' },
            {
              key: 'property_month_rent',
              type: 'int',
              description: '月物业费'
            },
            { key: 'property_deposit', type: 'int', description: '押金' },
            { key: 'customer_id', type: 'int', description: '年租金' },
            { key: 'room', type: 'json数组', description: '租聘房间' }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改合同',
          api: 'assets.contract.modify',
          business: [
            { key: 'customer_code', type: '合同编码', description: 'string' },
            { key: 'customer_id', type: '用户id', description: 'int' },
            {
              key: 'organiz_code',
              type: 'string',
              description: '组织机构代码'
            },
            { key: 'company_type', type: 'int', description: '公司类别' },
            { key: 'company_name', type: 'string', description: '公司名称' },
            { key: 'customer_id', type: 'int', description: '来访客户id' },
            { key: 'scope', type: 'int', description: '经营范围' },
            {
              key: 'social_credit_code',
              type: 'string',
              description: '统一社会信用代码'
            },
            {
              key: 'taxpayer_code',
              type: 'string',
              description: '纳税人识别号'
            },
            { key: 'regist_code', type: 'string', description: '注册号' },
            { key: 'representative', type: 'string', description: '法人代表' },
            { key: 'nationality', type: 'string', description: '国籍' },
            {
              key: 'regist_fund',
              type: 'int',
              description: '注册资金:单位(万)'
            },
            { key: 'operate_state', type: 'int', description: '经营状态' },
            { key: 'establish_ts', type: 'timestamp', description: '成立日期' },
            { key: 'staff_size', type: 'int', description: '人员规模' },
            { key: 'operate_term', type: 'timestamp', description: '营业期限' },
            { key: 'issuance', type: 'string', description: '登记机关' },
            { key: 'authentic_ts', type: 'timestamp', description: '认证日期' },
            { key: 'en_name', type: 'string', description: '英文名' },
            { key: 'region', type: 'string', description: '所属地区' },
            { key: 'trade', type: 'string', description: '所属行业' },
            { key: 'address', type: 'string', description: '地址' },
            { key: 'brand', type: 'string', description: '商标品牌' },
            { key: 'contacter', type: 'string', description: '联系人' },
            { key: 'contact', type: 'string', description: '联系方式' },
            { key: 'email', type: 'string', description: '邮箱' },
            { key: 'scope', type: 'int', description: '经营范围' },
            { key: 'bank', type: 'string', description: '银行' },
            { key: 'bank_code', type: 'string', description: '银行账号' },
            { key: 'invoice_address', type: 'string', description: '开票地址' },
            { key: 'business_format', type: 'int', description: '客户业态' },
            { key: 'follow_business', type: 'string', description: '跟进商务' },
            { key: 'contract_type', type: 'int', description: '合同类型' },
            { key: 'rent_area', type: 'int', description: '租聘面积' },
            { key: 'tenancy_divide', type: 'int', description: '租期划分' },
            { key: 'charge_type', type: 'int', description: '计费类型' },
            { key: 'state', type: 'int', description: '合同状态' },
            { key: 'sign_ts', type: 'timestamp', description: '签订时间' },
            { key: 'start_ts', type: 'timestamp', description: '合同开始日期' },
            { key: 'end_ts', type: 'timestamp', description: '合同截至日期' },
            {
              key: 'fee_start_ts',
              type: 'timestamp',
              description: '计费开始日期'
            },
            {
              key: 'fee_end_ts',
              type: 'timestamp',
              description: '计费截至日期'
            },
            { key: 'pay_cycle', type: 'int', description: '付款周期:单位是月' },
            {
              key: 'pay_date',
              type: 'int',
              description: '付款日期:每月的第几天'
            },
            {
              key: 'prepaid',
              type: 'int',
              description: '预付月份:预付几个月的月租'
            },
            { key: 'unit_price', type: 'int', description: '合同单价' },
            { key: 'unit_value', type: 'int', description: '合同单价的单位' },
            { key: 'year_rent', type: 'int', description: '年租金' },
            { key: 'month_rent', type: 'int', description: '月租金' },
            { key: 'deposit', type: 'int', description: '押金' },
            { key: 'manage_area', type: 'numeric', description: '管理面积' },
            { key: 'room', type: 'josn数组', description: '房间domain_id' },
            {
              key: 'property_sign_ts',
              type: 'timestamp',
              description: '签订时间'
            },
            {
              key: 'property_start_ts',
              type: 'timestamp',
              description: '合同开始日期'
            },
            {
              key: 'property_end_ts',
              type: 'timestamp',
              description: '合同截至日期'
            },
            {
              key: 'property_fee_start_ts',
              type: 'timestamp',
              description: '费用开始时间'
            },
            {
              key: 'property_fee_end_ts',
              type: 'timestamp',
              description: '费用结束时间'
            },
            {
              key: 'property_pay_cycle',
              type: 'int',
              description: '付款周期:单位是月'
            },
            {
              key: 'property_pay_date',
              type: 'int',
              description: '付款日期:每月的第几天'
            },
            {
              key: 'property_prepaid',
              type: 'int',
              description: '预付月份:预付几个月的月租'
            },
            {
              key: 'property_unit_price',
              type: 'int',
              description: '合同单价'
            },
            {
              key: 'property_unit_value',
              type: 'int',
              description: '合同单价的单位'
            },
            { key: 'property_year_rent', type: 'int', description: '年租金' },
            { key: 'property_month_rent', type: 'int', description: '月租金' },
            { key: 'property_deposit', type: 'int', description: '押金' },
            { key: 'customer_id', type: 'int', description: '年租金' },
            { key: 'room', type: 'json数组', description: '租聘房间' }
          ],
          return: [],
          explain: []
        },
        {
          title: ' 删除合同',
          api: 'assets.contract.remove',
          business: [
            { key: 'customer_code', type: 'string', description: '合同编码' }
          ],
          return: [],
          explain: []
        },
        {
          title: '通过园区id获取园区下的获取合同列表',
          api: 'assets.contract.get_list',
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
              key: 'park_id',
              type: 'int',
              required: true,
              description: '园区的domain_id'
            },
            { key: 'state', type: 'int', required: false, description: '状态' },
            {
              key: 'customer_name',
              type: 'string',
              required: false,
              description: '客户名'
            },
            {
              key: 'customer_id',
              type: 'int',
              required: false,
              description: '客户id'
            }
          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '楼宇列表'
            }
          ],
          explain: [
            // 这里是企业的相关字段   工商信息
            {
              key: 'organiz_code',
              type: '组织机构代码',
              description: 'string'
            }, // 组织机构代码  工商信息
            { key: 'company_type', type: '公司类别', description: 'int' },
            { key: 'company_name', type: '公司名称', description: 'string' },
            { key: 'customer_id', type: '来访客户id', description: 'int' },
            { key: 'scope', type: '经营范围', description: 'int' },
            {
              key: 'social_credit_code',
              type: '统一社会信用代码',
              description: 'string'
            }, // 统一社会信用代码  工商信息
            {
              key: 'taxpayer_code',
              type: '纳税人识别号',
              description: 'string'
            }, // 纳税人识别号    工商信息
            { key: 'regist_code', type: '注册号', description: 'string' }, // 注册号     工商信息
            { key: 'representative', type: '法人代表', description: 'string' }, // 法定代表人    工商信息
            { key: 'nationality', type: '国籍', description: 'string' }, // 国籍   工商信息
            {
              key: 'regist_fund',
              type: '注册资金:单位(万)',
              description: 'int'
            }, // 注册资本/万  工商信息
            { key: 'operate_state', type: '经营状态', description: 'int' }, // 经营状态    工商信息
            { key: 'establish_ts', type: '成立日期', description: 'timestamp' }, // 成立日期      工商信息
            { key: 'staff_size', type: '人员规模', description: 'int' }, // 人员规模     工商信息
            { key: 'operate_term', type: '营业期限', description: 'timestamp' }, // 营业期限      工商信息
            { key: 'issuance', type: '登记机关', description: 'string' }, // 登记机关      工商信息
            { key: 'authentic_ts', type: '核准日期', description: 'timestamp' }, // 核准日期    工商信息
            { key: 'en_name', type: '英文名', description: 'string' }, // 英文名      工商信息
            { key: 'region', type: '所属地区', description: 'string' }, // 所属地区     工商信息
            { key: 'trade', type: '所属行业', description: 'string' }, // 所属行业      工商信息
            { key: 'address', type: '注册地址', description: 'string' }, // 注册地址        工商信息

            // 企业的      开票信息
            { key: 'brand', type: '商标品牌', description: 'string' },
            {
              key: 'taxpayer_code',
              type: '纳税人识别号',
              description: 'string'
            },
            { key: 'contacter', type: '联系人', description: 'string' },
            { key: 'contact', type: '电话', description: 'string' }, // 联系方式    开票信息
            { key: 'email', type: '邮箱', description: 'string' },
            { key: 'scope', type: '经营范围', description: 'int' },
            { key: 'bank', type: '银行', description: 'string' }, // 开户银行     开票信息
            { key: 'bank_code', type: '银行账号', description: 'string' }, // 账号    开票信息
            { key: 'invoice_address', type: '开票地址', description: 'string' }, // 开票地址     开票信息

            // 这里是合同信息
            { key: 'contract_code', type: '合同编号', description: 'string' },
            { key: 'business_format', type: '客户业态', description: 'int' }, // 客户业态    基础信息
            { key: 'follow_business', type: '跟进商务', description: 'string' }, // 跟进商务    基础信息
            { key: 'contract_type', type: '合同类型', description: 'int' }, // 合同类型    基础信息
            { key: 'rent_area', type: '租聘面积', description: 'int' }, // 租赁面积    基础条款
            { key: 'tenancy_divide', type: '租期划分', description: 'int' }, // 租期划分    基础条款
            { key: 'charge_type', type: '计费类型', description: 'int' }, // 计费类型    基础条款
            { key: 'state', type: '合同状态', description: 'int' },

            { key: 'sign_ts', type: '签订时间', description: 'timestamp' }, // 签订时间     基础条款
            { key: 'start_ts', type: '合同开始日期', description: 'timestamp' }, // 开始时间      房源租期条款
            { key: 'end_ts', type: '合同截至日期', description: 'timestamp' }, // 结束时间        房源租期条款
            {
              key: 'fee_start_ts',
              type: '计费开始日期',
              description: 'timestamp'
            }, // 计租时间      基础条款
            {
              key: 'fee_end_ts',
              type: '计费截至日期',
              description: 'timestamp'
            }, // 结束时间        基础条款
            { key: 'pay_cycle', type: '付款周期:单位是月', description: 'int' }, // 付款周期（月）  基础条款
            {
              key: 'pay_date',
              type: '付款日期:每月的第几天',
              description: 'int'
            }, // 收款日      基础条款
            {
              key: 'prepaid',
              type: '预付月份:预付几个月的月租',
              description: 'int'
            }, // 提取收租（月） 基础条款
            { key: 'unit_price', type: '合同单价', description: 'int' }, // 合同单价            房源租期条款
            { key: 'unit_value', type: '合同单价的单位', description: 'int' }, // (元/㎡·天)     房源租期条款
            { key: 'year_rent', type: '年租金', description: 'int' }, // 年租金                 房源租期条款
            { key: 'month_rent', type: '月租金', description: 'int' }, // 月租金                房源租期条款
            { key: 'deposit', type: '押金', description: 'int' }, // 押金设置（元）    基础条款

            // 物业合同相关信息   物业基础条款   物业条款
            { key: 'manage_area', type: '管理面积', description: 'numeric' }, // 管理面积
            { key: 'room', type: '房间domain_id', description: 'josn数组' },

            {
              key: 'property_sign_ts',
              type: '签订时间',
              description: 'timestamp'
            }, // 签订时间               物业费基础条款
            {
              key: 'property_start_ts',
              type: '合同开始日期',
              description: 'timestamp'
            }, // 开始时间          物业费条款
            {
              key: 'property_end_ts',
              type: '合同截至日期',
              description: 'timestamp'
            }, // 结束时间            物业费条款
            {
              key: 'property_fee_start_ts',
              type: '费用开始时间',
              description: 'timestamp'
            }, // 计费时间     物业费基础条款
            {
              key: 'property_fee_end_ts',
              type: '费用结束时间',
              description: 'timestamp'
            }, // 结束时间        物业费条款
            {
              key: 'property_pay_cycle',
              type: '付款周期:单位是月',
              description: 'int'
            }, // 付款周期（月）     物业费基础条款
            // { key: 'property_pay_date', type: '收款日', description: 'int' },//收款日           物业费基础条款
            {
              key: 'property_prepaid',
              type: '预付月份:预付几个月的月租',
              description: 'int'
            }, // 提前收费（月）物业费基础条款
            {
              key: 'property_unit_price',
              type: '合同单价',
              description: 'int'
            }, // 合同单价     物业费条款
            {
              key: 'property_unit_value',
              type: '合同单价的单位',
              description: 'int'
            }, // (元/㎡·天)  物业费条款
            { key: 'property_year_rent', type: '年物业费', description: 'int' }, // 年物业费   物业费条款
            {
              key: 'property_month_rent',
              type: '月物业费',
              description: 'int'
            }, // 月物业费  物业费条款
            { key: 'property_deposit', type: '押金', description: 'int' }, // 押金（元）    物业费基础条款

            {
              key: 'room',
              type: '数组',
              description: '房间详细信息的数组',
              explain: [
                {
                  key: 'name',
                  type: 'string',
                  required: true,
                  description: '房间号，名称'
                },
                {
                  key: 'park_name',
                  type: 'string',
                  required: true,
                  description: '园区名称'
                },
                {
                  key: 'building_name',
                  type: 'string',
                  required: true,
                  description: '楼宇名称'
                }
              ]
            },
            // 租户
            // 租客信息
            { key: 'company_name', type: 'string', description: '租客' },
            { key: 'trade', type: 'string', description: '行业' },
            { key: 'representative', type: 'string', description: '法人' },
            {
              key: 'customer_name',
              type: 'string',
              description: '租客信息的签订人和租客信息的联系人'
            }
          ]
        },
        {
          title: '通过房间id获取合同列表',
          api: 'assets.contract.get_list_by_room',
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
              key: 'room_id',
              type: 'int',
              required: true,
              description: '园区的domain_id'
            }
          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '楼宇列表'
            }
          ],
          explain: [
            {
              key: 'organiz_code',
              type: 'string',
              description: '组织机构代码'
            },
            { key: 'company_type', type: 'int', description: '公司类别' },
            { key: 'company_name', type: 'string', description: '公司名称' },
            { key: 'customer_id', type: 'int', description: '来访客户id' },
            { key: 'scope', type: 'int', description: '经营范围' },
            {
              key: 'social_credit_code',
              type: 'string',
              description: '统一社会信用代码'
            },
            {
              key: 'taxpayer_code',
              type: 'string',
              description: '纳税人识别号'
            },
            { key: 'regist_code', type: 'string', description: '注册号' },
            { key: 'representative', type: 'string', description: '法人代表' },
            { key: 'nationality', type: 'string', description: '国籍' },
            {
              key: 'regist_fund',
              type: 'int',
              description: '注册资金:单位(万)'
            },
            { key: 'operate_state', type: 'int', description: '经营状态' },
            { key: 'establish_ts', type: 'timestamp', description: '成立日期' },
            { key: 'staff_size', type: 'int', description: '人员规模' },
            { key: 'operate_term', type: 'timestamp', description: '营业期限' },
            { key: 'issuance', type: 'string', description: '登记机关' },
            { key: 'authentic_ts', type: 'timestamp', description: '核准日期' },
            { key: 'en_name', type: 'string', description: '英文名' },
            { key: 'region', type: 'string', description: '所属地区' },
            { key: 'trade', type: 'string', description: '所属行业' },
            { key: 'address', type: 'string', description: '注册地址' },
            { key: 'brand', type: 'string', description: '商标品牌' },
            {
              key: 'taxpayer_code',
              type: 'string',
              description: '纳税人识别号'
            },
            { key: 'contacter', type: 'string', description: '联系人' },
            { key: 'contact', type: 'string', description: '电话' },
            { key: 'email', type: 'string', description: '邮箱' },
            { key: 'scope', type: 'int', description: '经营范围' },
            { key: 'bank', type: 'string', description: '银行' },
            { key: 'bank_code', type: 'string', description: '银行账号' },
            { key: 'invoice_address', type: 'string', description: '开票地址' },
            { key: 'business_format', type: 'int', description: '客户业态' },
            { key: 'follow_business', type: 'string', description: '跟进商务' },
            { key: 'contract_type', type: 'int', description: '合同类型' },
            { key: 'rent_area', type: 'int', description: '租聘面积' },
            { key: 'tenancy_divide', type: 'int', description: '租期划分' },
            { key: 'charge_type', type: 'int', description: '计费类型' },
            { key: 'state', type: 'int', description: '合同状态' },
            { key: 'sign_ts', type: 'timestamp', description: '签订时间' },
            { key: 'start_ts', type: 'timestamp', description: '合同开始日期' },
            { key: 'end_ts', type: 'timestamp', description: '合同截至日期' },
            {
              key: 'fee_start_ts',
              type: 'timestamp',
              description: '计费开始日期'
            },
            {
              key: 'fee_end_ts',
              type: 'timestamp',
              description: '计费截至日期'
            },
            { key: 'pay_cycle', type: 'int', description: '付款周期:单位是月' },
            {
              key: 'pay_date',
              type: 'int',
              description: '付款日期:每月的第几天'
            },
            {
              key: 'prepaid',
              type: 'int',
              description: '预付月份:预付几个月的月租'
            },
            { key: 'unit_price', type: 'int', description: '合同单价' },
            { key: 'unit_value', type: 'int', description: '合同单价的单位' },
            { key: 'year_rent', type: 'int', description: '年租金' },
            { key: 'month_rent', type: 'int', description: '月租金' },
            { key: 'deposit', type: 'int', description: '押金' },
            { key: 'manage_area', type: 'numeric', description: '管理面积' },
            { key: 'room', type: 'josn数组', description: '房间domain_id' },
            {
              key: 'property_sign_ts',
              type: 'timestamp',
              description: '签订时间'
            },
            {
              key: 'property_start_ts',
              type: 'timestamp',
              description: '合同开始日期'
            },
            {
              key: 'property_end_ts',
              type: 'timestamp',
              description: '合同截至日期'
            },
            {
              key: 'property_fee_start_ts',
              type: 'timestamp',
              description: '费用开始时间'
            },
            {
              key: 'property_fee_end_ts',
              type: 'timestamp',
              description: '费用结束时间'
            },
            {
              key: 'property_pay_cycle',
              type: 'int',
              description: '付款周期:单位是月'
            },
            {
              key: 'property_prepaid',
              type: 'int',
              description: '预付月份:预付几个月的月租'
            },
            {
              key: 'property_unit_price',
              type: 'int',
              description: '合同单价'
            },
            {
              key: 'property_unit_value',
              type: 'int',
              description: '合同单价的单位'
            },
            { key: 'property_year_rent', type: 'int', description: '年物业费' },
            {
              key: 'property_month_rent',
              type: 'int',
              description: '月物业费'
            },
            { key: 'property_deposit', type: 'int', description: '押金' },

            {
              key: 'room',
              type: '数组',
              description: '房间详细信息的数组',
              explain: [
                {
                  key: 'name',
                  type: 'string',
                  required: true,
                  description: '房间号，名称'
                },
                {
                  key: 'park_name',
                  type: 'string',
                  required: true,
                  description: '园区名称'
                },
                {
                  key: 'building_name',
                  type: 'string',
                  required: true,
                  description: '楼宇名称'
                }
              ]
            },
            // 租户
            // 租客信息
            { key: 'company_name', type: 'string', description: '租客' },
            { key: 'trade', type: 'string', description: '行业' },
            { key: 'representative', type: 'string', description: '法人' },
            {
              key: 'customer_name',
              type: 'string',
              description: '租客信息的签订人和租客信息的联系人'
            }
          ]
        },
        {
          title: '获取合同信息',
          api: 'assets.contract.get_info',
          business: [
            {
              key: 'contract_code',
              type: 'string',
              required: true,
              description: '合同编号'
            }
          ],
          return: [
            // 这里是合同信息
            // { key: 'contract_code', type: '合同编号', description: 'string' },
            /*                   合同详情内容                       */

            // 合同信息
            { key: 'contract_code', type: 'string', description: '合同编号' }, // XXX公司1
            { key: 'receiver', type: 'string', description: '跟进人' }, // -
            { key: 'manage_area', type: 'numeric', description: '合同租赁数' }, // 100㎡
            { key: 'sign_ts', type: 'timestamp', description: '合同签订日' }, // 2015-10-10
            { key: 'start_ts', type: 'timestamp', description: '合同起租日' }, // 2016-01-01
            { key: 'end_ts', type: 'timestamp', description: '合同失效日' }, // 2017-01-01
            { key: '暂无', type: '', description: '单位保留小数' }, // 2
            { key: '暂无', type: '', description: '计算精度' }, // 精确计算结果保留两位小数
            { key: '暂无', type: '', description: '原合同失效日' }, // -
            { key: '暂无', type: '', description: '合同标签' }, // -

            // 房源信息
            {
              key: 'room',
              type: '数组',
              description: '房间详细信息的数组',
              explain: [
                {
                  key: 'name',
                  type: 'string',
                  required: true,
                  description: '房间号，名称'
                },
                {
                  key: 'park_name',
                  type: 'string',
                  required: true,
                  description: '园区名称'
                },
                {
                  key: 'building_name',
                  type: 'string',
                  required: true,
                  description: '楼宇名称'
                }
              ]
            },
            // 租客信息
            // 租户
            // 租客信息
            { key: 'company_name', type: 'string', description: '租客' },
            { key: 'trade', type: 'string', description: '行业' },
            { key: 'representative', type: 'string', description: '法人' },
            {
              key: 'customer_name',
              type: 'string',
              description: '租客信息的签订人和租客信息的联系人'
            }, // - //其他关键信息  无 //基本条款
            /* { key: '', type: '', description: '签订人' }, */ {
              key: '暂无',
              type: '',
              description: '房源信息'
            }, // 9001
            { key: '暂无', type: '', description: '租赁数' }, // 360

            // 保证金条款
            //
            { key: '保证金目前只有租金', type: '', description: '保证金类型' }, // 租金保证金
            { key: 'deposit', type: 'numeric', description: '保证金类型' }, // 租金保证金

            // 租期条款
            { key: 'fee_start_ts', type: 'timestamp', description: '开始时间' }, // 2019-11-11
            { key: 'fee_end_ts', type: 'timestamp', description: '结束时间' }, // 2022-11-10
            { key: 'pay_date', type: 'int', description: '付款时间' }, // (工作日)15天
            { key: 'unit_price', type: 'numeric', description: '基础单价' }, // 3元/㎡·天
            { key: 'charge_type', type: 'int', description: '计费类型' }, // 按月计费
            { key: 'tenancy_divide', type: 'int', description: '租期划分方式' }, // 按起始日划分
            { key: '暂无', type: '', description: '天单价换算规则' }, // -
            { key: '暂无', type: '', description: '年天数' }, // 365天
            { key: '暂无', type: '', description: '支付类型' } // 3月一付
          ],
          explain: []
        }
      ]
    }
    // 进驻模块管理
    let enter = {
      title: '进驻模块管理',
      content: [
        {
          title: '获取进驻统计信息',
          api: 'assets.d_enter.get_list',
          business: [
            {
              key: 'building_id',
              type: 'int',
              required: true,
              description: '园区id'
            }
          ],
          return: [
            {
              key: 'rent_area',
              type: 'int',
              required: true,
              description: `可招商面积`
            },
            {
              key: 'total_area',
              type: 'int',
              required: true,
              description: `管理面积`
            },
            {
              key: 'avg_unit_price',
              type: 'int',
              required: true,
              description: `在租实时均价`
            },
            {
              key: 'unit_type',
              type: 'int',
              required: true,
              description: `单位`
            },
            {
              key: 'rent_rate',
              type: 'int',
              required: true,
              description: `出租率`
            },
            {
              key: 'pay_rate',
              type: 'int',
              required: true,
              description: `支付租金的比率`
            },
            {
              key: 'total_rooms',
              type: 'int',
              required: true,
              description: `总房源数量`
            },
            {
              key: 'rent_rooms',
              type: 'int',
              required: true,
              description: `可招租房源数量`
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: true,
              description: `创建时间`
            },
            {
              key: 'name',
              type: 'string',
              required: true,
              description: `楼宇名称`
            },
            {
              key: 'built_area',
              type: 'int',
              required: true,
              description: `建筑面积:单位平方米`
            }
          ],
          explain: []
        },
        {
          title: '添加进驻',
          api: 'assets.enter.add',
          business: [
            { key: 'company_id', type: 'int', description: '企业id' },
            { key: 'start_ts', type: 'timestamp', description: '开始时间' },
            { key: 'end_ts', type: 'timestamp', description: '结束时间' },
            { key: 'state', type: 'int', description: '进驻状态' },
            { key: 'memo', type: 'string', description: '备注' }
          ],
          return: [],
          explain: []
        },
        {
          title: '修改进驻',
          api: 'assets.enter.modify',
          business: [
            { key: 'company_id', type: 'int', description: '企业id' },
            { key: 'start_ts', type: 'timestamp', description: '开始时间' },
            { key: 'end_ts', type: 'timestamp', description: '结束时间' },
            { key: 'state', type: 'int', description: '进驻状态' },
            { key: 'memo', type: 'string', description: '备注' }
          ],
          return: [],
          explain: []
        },
        {
          title: ' 删除进驻企业',
          api: 'assets.building.remove',
          business: [{ key: 'company_id', type: 'int', description: '企业id' }],
          return: [],
          explain: []
        },
        {
          title: '获取进驻企业列表',
          api: 'assets.building.get_list',
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
              key: 'park_id',
              type: 'int',
              required: false,
              description: '园区id'
            },
            {
              key: 'state',
              type: 'int',
              required: false,
              description: '审批状态'
            },
            {
              key: 'start_ts',
              type: 'timestamp',
              required: false,
              description: '入驻开始时间'
            },
            {
              key: 'end_ts',
              type: 'timestamp',
              required: false,
              description: '入驻结束时间'
            },
            {
              key: 'company_name',
              type: 'string',
              required: false,
              description: '企业名称'
            }
          ],
          return: [
            {
              key: 'list',
              type: 'json array',
              required: true,
              description: '进驻企业列表'
            }
          ],
          explain: [
            { key: 'park_name', type: 'string', description: '所属园区' },
            {
              key: 'company_id',
              type: 'int',
              description: '企业的id,用于获取企业详情的时候使用'
            },
            { key: 'company_name', type: 'string', description: '企业名称' },
            { key: 'company_type', type: 'int', description: '企业类型' },
            { key: 'regist_fund', type: 'numeric', description: '注册资金' },
            { key: 'status', type: 'int', description: '入驻性质' }, // 这里先用企业性质
            { key: 'area', type: 'numeric', description: '入驻面积' }, // 合同的管理面积
            { key: 'room_name', type: 'json数组', description: '房间号数组' },
            { key: 'start_ts', type: 'timestamp', description: '开始时间' },
            { key: 'end_ts', type: 'timestamp', description: '结束时间' },
            { key: 'receiver', type: 'string', description: '跟进人' }, // 客户的跟进人
            { key: 'state', type: 'int', description: '审批状态' }
          ]
        },
        {
          title: '获取进驻企业信息',
          api: 'assets.building.get_info',
          business: [
            {
              key: 'company_id',
              type: 'int',
              required: true,
              description: '企业id,从列表查询中获取'
            }
          ],
          return: [
            // 企业信息
            { key: 'company_name', type: 'string', description: '公司名称' },
            { key: 'start_ts', type: 'timestamp', description: '入驻时间' }, // 入驻表
            { key: 'representative', type: 'string', description: '法人代表' },
            { key: 'establish_ts', type: 'timestamp', description: '成立日期' },
            { key: 'company_type', type: 'int', description: '公司类别' },
            { key: 'contacter', type: 'string', description: '联系人' }, // 开票信息的联系人
            {
              key: 'organiz_code',
              type: 'string',
              description: '组织机构代码'
            },
            { key: 'regist_fund', type: 'numeric', description: '注册资金' },
            { key: 'address', type: 'string', description: '注册地址' },
            { key: 'scope', type: 'int', description: '经营范围' },
            { key: 'memo', type: 'string', description: '备注' },
            // 抬头发票
            {
              key: 'taxpayer_code',
              type: '纳税人识别号',
              description: 'string'
            },
            { key: 'bank', type: '银行', description: 'string' }, // 开户银行     开票信息
            { key: 'bank_code', type: '银行账号', description: 'string' }, // 账号    开票信息
            { key: 'contact', type: '电话', description: 'string' }, // 联系方式    开票信息
            { key: 'invoice_address', type: '开票地址', description: 'string' }, // 开票地址     开票信息
            // 合同数组
            { key: 'contract_code', type: 'string', description: '合同编号' },
            { key: 'company_name', type: 'string', description: '公司名称' },
            {
              key: 'contract_start_ts',
              type: 'timestamp',
              description: '合同开始日期'
            },
            {
              key: 'contract_end_ts',
              type: 'timestamp',
              description: '合同截至日期'
            },
            { key: 'unit_price', type: 'int', description: '合同单价' },
            { key: 'unit_value', type: 'int', description: '合同单价的单位' },
            { key: 'state', type: 'int', description: '合同状态' },
            {
              key: 'room',
              type: '数组',
              description: '房间数组',
              explain: [
                { key: 'name', type: 'string', description: '房间名' },
                { key: 'area', type: 'numeric', description: '房间面积' }
              ]
            }
            /* {key: 'contract', type: '数组', description: '合同数组',explain:
                        [

                        ]
                } */
          ],
          explain: []
        }
      ]
    }

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
        content: [contract]
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
        content: [feiyonglz, caiwusr]
      },
      {
        index: 7,
        title: '字典模块管理',
        content: [zidmkgl, zidgl]
      }
    ]

    // 字典
    const arr = [
      // 应该是从这里开始的
      // ----------------------------------------------------财务收入

      {
        type_code: 'charge_state',
        type_name: '缴费状态',
        data: [
          { dic_code: 'charge_state_0', dic_info: '已缴费', order_num: 0 },
          { dic_code: 'charge_state_1', dic_info: '未缴费', order_num: 1 }
        ]
      },
      {
        type_code: 'charge_type',
        type_name: '费用类型',
        data: [
          { dic_code: 'charge_type_0', dic_info: '物业费', order_num: 0 },
          { dic_code: 'charge_type_1', dic_info: '水费', order_num: 1 },
          { dic_code: 'charge_type_2', dic_info: '电费', order_num: 2 },
          { dic_code: 'charge_type_3', dic_info: '燃气费', order_num: 3 }
        ]
      },
      // ----------------------------------------------------费用列支
      {
        type_code: 'cost_log_type',
        type_name: '列支方向',
        data: [
          { dic_code: 'log_type_0', dic_info: '收款', order_num: 0 },
          { dic_code: 'log_type_1', dic_info: '付款', order_num: 1 }
        ]
      },
      {
        type_code: 'cost_state',
        type_name: '费用状态', // 列支状态
        data: [
          { dic_code: 'cost_state_0', dic_info: '已缴', order_num: 0 },
          { dic_code: 'cost_state_1', dic_info: '未缴', order_num: 1 }
        ]
      },
      // ----------------------------------------------------费用催缴
      {
        type_code: 'payment_type',
        type_name: '费用类型',
        data: [
          { dic_code: 'payment_type_0', dic_info: '租金', order_num: 0 },
          { dic_code: 'payment_type_1', dic_info: '物业费用', order_num: 1 }
        ]
      },
      // ----------------------------------------------------投诉管理  //报修管理
      {
        type_code: 'work_state',
        type_name: '工单状态',
        data: [
          { dic_code: 'work_state_0', dic_info: '已解决', order_num: 0 },
          { dic_code: 'work_state_1', dic_info: '未解决', order_num: 1 }
        ]
      },
      // ----------------------------------------------------四表集抄
      {
        type_code: 'equip_type',
        type_name: '设备类型',
        data: [
          { dic_code: 'equip_type_0', dic_info: '水表', order_num: 0 },
          { dic_code: 'equip_type_1', dic_info: '电表', order_num: 1 },
          { dic_code: 'equip_type_1', dic_info: '煤气', order_num: 2 },
          { dic_code: 'equip_type_1', dic_info: '暖通空调', order_num: 3 }
        ]
      },
      // ----------------------------------------------------退驻管理 //退驻管理
      {
        type_code: 'approval_type',
        type_name: '审批状态',
        data: [
          { dic_code: 'approval_type_0', dic_info: '未审批', order_num: 0 },
          { dic_code: 'approval_type_1', dic_info: '审批中', order_num: 1 },
          { dic_code: 'approval_type_2', dic_info: '已通过', order_num: 2 },
          { dic_code: 'approval_type_3', dic_info: '未通过', order_num: 3 }
        ]
      },
      // ----------------------------------------------------模板管理
      {
        type_code: 'template_type',
        type_name: '合同模板类型',
        data: [
          { dic_code: 'template_type_0', dic_info: '其他', order_num: 0 },
          { dic_code: 'template_type_1', dic_info: '房屋租赁', order_num: 1 },
          { dic_code: 'template_type_2', dic_info: '物业保洁', order_num: 2 },
          { dic_code: 'template_type_3', dic_info: '花木租赁', order_num: 3 },
          { dic_code: 'template_type_4', dic_info: '场地租赁', order_num: 4 },
          { dic_code: 'template_type_5', dic_info: '场地租赁', order_num: 5 }
        ]
      },
      // ----------------------------------------------------合同管理
      {
        type_code: 'contract_state',
        type_name: '合同状态',
        data: [
          { dic_code: 'contract_state_0', dic_info: '签订', order_num: 0 },
          { dic_code: 'contract_state_1', dic_info: '执行', order_num: 1 },
          { dic_code: 'contract_state_2', dic_info: '到期', order_num: 2 },
          { dic_code: 'contract_state_3', dic_info: '到期未处理', order_num: 3 }
        ]
      },
      {
        type_code: 'contract_type',
        type_name: '合同类型',
        data: [
          {
            dic_code: 'contract_type_0',
            dic_info: '租房合同模板',
            order_num: 0
          },
          {
            dic_code: 'contract_type_1',
            dic_info: '车位合同模板',
            order_num: 1
          }
        ]
      },
      {
        type_code: 'company_scope',
        type_name: '经营范围',
        data: [
          { dic_code: 'company_scope_0', dic_info: '互联网', order_num: 0 },
          { dic_code: 'company_scope_1', dic_info: '金融', order_num: 1 }
        ]
      },
      /// /不确定下拉框内容
      {
        type_code: 'contract_divide',
        type_name: '租期划分',
        data: [
          {
            dic_code: 'contract_divide_0',
            dic_info: '按起始日划分',
            order_num: 0
          },
          { dic_code: 'contract_divide_1', dic_info: '商业', order_num: 1 }
        ]
      },
      // ----------------------------------------------------客户管理  ----------------------表名未确认
      {
        type_code: 'customer_state',
        type_name: '进度阶段',
        data: [
          { dic_code: 'customer_state_0', dic_info: '初次来访', order_num: 0 },
          { dic_code: 'customer_state_1', dic_info: '意向客户', order_num: 1 },
          { dic_code: 'customer_state_2', dic_info: '成交客户', order_num: 2 },
          { dic_code: 'customer_state_3', dic_info: '休眠客户', order_num: 3 }
        ]
      },
      {
        type_code: 'customer_info_source',
        type_name: '来源渠道',
        data: [
          {
            dic_code: 'customer_info_source_0',
            dic_info: '广告媒体',
            order_num: 0
          },
          {
            dic_code: 'customer_info_source_1',
            dic_info: '中介',
            order_num: 1
          },
          {
            dic_code: 'customer_info_source_2',
            dic_info: '客户自访',
            order_num: 2
          },
          { dic_code: 'customer_info_source_3', dic_info: '其他', order_num: 3 }
        ]
      },
      {
        type_code: 'customer_status',
        type_name: '行业',
        data: [
          { dic_code: 'customer_status_0', dic_info: '互联网', order_num: 0 },
          { dic_code: 'customer_status_1', dic_info: '电商', order_num: 1 }
        ]
      },
      {
        type_code: 'customer_access',
        type_name: '客户来源',
        data: [
          { dic_code: 'customer_access_0', dic_info: '上门', order_num: 0 },
          { dic_code: 'customer_access_1', dic_info: '官网', order_num: 1 }
        ]
      },
      {
        type_code: 'demand_area',
        type_name: '需求面积',
        data: [
          { dic_code: 'demand_area_0', dic_info: '100㎡以内', order_num: 0 },
          { dic_code: 'demand_area_1', dic_info: '100-200㎡', order_num: 1 },
          { dic_code: 'demand_area_2', dic_info: '200-300㎡', order_num: 2 },
          { dic_code: 'demand_area_3', dic_info: '300㎡以上', order_num: 3 }
        ]
      },
      {
        type_code: 'work_station',
        type_name: '需求工位',
        data: [
          { dic_code: 'work_station_0', dic_info: '1-20个', order_num: 0 },
          { dic_code: 'work_station_1', dic_info: '21-50个', order_num: 1 },
          { dic_code: 'work_station_2', dic_info: '51-100个', order_num: 2 },
          { dic_code: 'work_station_3', dic_info: '100个以上', order_num: 3 }
        ]
      },
      // ----------------------------------------------------园区  ----------------------表名未确认
      {
        type_code: 'park_usage',
        type_name: '园区定位',
        data: [
          { dic_code: 'park_usage_0', dic_info: '互联网', order_num: 0 },
          { dic_code: 'park_usage_1', dic_info: '招商', order_num: 1 },
          { dic_code: 'park_usage_2', dic_info: '运营', order_num: 2 },
          { dic_code: 'park_usage_3', dic_info: '其他', order_num: 3 }
        ]
      },
      {
        type_code: 'park_state',
        type_name: '园区状态',
        data: [
          { dic_code: 'park_state_0', dic_info: '在建', order_num: 0 },
          { dic_code: 'park_state_1', dic_info: '招商', order_num: 1 },
          { dic_code: 'park_state_2', dic_info: '运营', order_num: 2 },
          { dic_code: 'park_state_3', dic_info: '其他', order_num: 3 }
        ]
      },
      // ----------------------------------------------------楼宇  ----------------------表名未确认
      /* {
    type_code: 'area_selection',
    type_name: '面积选择',
    data: [
      { dic_code: 'area_selection_0', dic_info: '100m³以内', order_num: 0 },
      { dic_code: 'area_selection_1', dic_info: '100-200m³', order_num: 1 },
      { dic_code: 'area_selection_2', dic_info: '200-300m³', order_num: 2 },
      { dic_code: 'area_selection_3', dic_info: '300m³以上', order_num: 3 },
    ]
  }, */
      {
        type_code: 'contract_term', // 暂时不能筛选
        type_name: '合同期限',
        data: [
          { dic_code: 'contract_term_0', dic_info: '半年以下', order_num: 0 },
          { dic_code: 'contract_term_1', dic_info: '一年以内', order_num: 1 },
          { dic_code: 'contract_term_2', dic_info: '三年以内', order_num: 2 },
          { dic_code: 'contract_term_3', dic_info: '三年以上', order_num: 3 }
        ]
      },
      {
        type_code: 'investment_category', // 暂时不能筛选
        type_name: '房间招商类别',
        data: [
          { dic_code: 'investment_category_0', dic_info: '中介', order_num: 0 },
          { dic_code: 'investment_category_1', dic_info: '广告', order_num: 1 },
          { dic_code: 'investment_category_2', dic_info: '其他', order_num: 2 }
        ]
      },
      {
        type_code: 'room_state', // 暂时不能筛选
        type_name: '房间空置状态',
        data: [
          { dic_code: 'room_state_0', dic_info: '占用', order_num: 0 },
          { dic_code: 'room_state_1', dic_info: '预定', order_num: 1 },
          { dic_code: 'room_state_2', dic_info: '待租', order_num: 2 }
        ]
      }, /* {      type_code: 'Premises',
      type_name: '所属楼宇',
      data: [
        // { dic_code: 'Premises_0', dic_info: '占用', order_num: 0 },
      ]
    }, */
      {
        type_code: 'room_property',
        type_name: '房间性质',
        data: [
          { dic_code: 'room_property_0', dic_info: '在租', order_num: 0 },
          { dic_code: 'room_property_1', dic_info: '待招商', order_num: 1 },
          { dic_code: 'room_property_2', dic_info: '自用', order_num: 2 },
          { dic_code: 'room_property_2', dic_info: '未分配', order_num: 2 },
          { dic_code: 'room_property_2', dic_info: '锁定', order_num: 2 }
        ]
      },
      // 通用模块
      {
        type_code: 'unit_value',
        type_name: '单位',
        data: [
          { dic_code: 'unit_value_0', dic_info: '元/㎡·天', order_num: 0 },
          { dic_code: 'unit_value_1', dic_info: '待招商', order_num: 1 },
          { dic_code: 'unit_value_2', dic_info: '自用', order_num: 2 },
          { dic_code: 'unit_value_2', dic_info: '未分配', order_num: 2 },
          { dic_code: 'unit_value_2', dic_info: '锁定', order_num: 2 }
        ]
      }
    ]

    // for (let i = 0; i < arr.length; i++) {
    //   this.dictypeAdd(arr[i]).then(res => {
    //     this.dicinfoAdd(res)
    //   })
    // }
  },
  watch: {},
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
