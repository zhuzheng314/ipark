<template>
<div class="api">
  <el-card style="width: 800px">
    <div v-for="(a, ai) in testData" :key="ai">
      <h1>{{a.index+ '.' +a.title}}</h1>
      <div v-if="!a.content.length">-暂无API</div>
      <div v-if="a.content.length">
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
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'test',
  components: {
  },
  data () {
    return {
      testData: ''
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
          api: 'assets.d_repair.get_list',
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
          api: 'assets.d_complaint.get_list',
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
              key: 'park',
              type: 'json',
              required: true,
              description: `房间`
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
              key: 'create_ts',
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
          api: 'assets.d_payment.get_list',
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
              key: 'create_ts',
              type: 'timestamp',
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
              key: 'payment_code',
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
              type: 'string',
              required: false,
              description: '邮箱'
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
              type: '数组',
              required: true,
              description: 'json数组'
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
              required: false,
              description: '客户或企业名称'
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
              key: 'info_source',
              type: 'int',
              required: false,
              description: '客户信息来源'
            },
            {
              key: 'status',
              type: 'int',
              required: false,
              description: '行业性质'
            },
            {
              key: 'memo',
              type: 'string',
              required: false,
              description: '备注'
            },
            {
              key: 'create_ts',
              type: 'timestamp',
              required: false,
              description: '来访时间'
            },
            {
              key: 'receiver',
              type: 'string',
              required: false,
              description: '跟进人'
            },
            {
              key: 'email',
              type: 'string',
              required: false,
              description: '邮箱'
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
              description: '房源信息'
            },
            {
              key: 'customer_id',
              type: 'int',
              required: false,
              description: '客户id'
            },
            {
              key: 'state',
              type: 'int',
              required: false,
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
              required: false,
              description: '客户或企业名称'
            },
            {
              key: 'info_source',
              type: 'int',
              required: false,
              description: '客户信息来源'
            },
            {
              key: 'state',
              type: 'int',
              required: false,
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
              type: 'string',
              required: false,
              description: '邮箱'
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
              key: 'customer_id',
              type: 'int',
              required: true,
              description: '客户id'
            },
            {
              key: 'room',
              type: '数组',
              required: true,
              description: '房间id拼成的数组'
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
              required: true,
              description: '客户id'
            }
          ],
          return: [],
          explain: []
        }
      ]
    }
    // 园区统计信息
    let park = {
      title: '园区统计信息',
      content: [
        {
          title: '获取园区统计信息',
          api: 'assets.d_park.get_info',
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
        }
      ]
    }
    // 楼宇统计信息
    let building = {
      title: '楼宇统计信息',
      content: [
        {
          title: '获取楼宇统计信息',
          api: 'assets.d_building.get_info',
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
              key: 'id',
              type: 'int',
              required: true,
              description: '费用列支id'
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
              description: '客户或企业名称'
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
              description: '客户或企业名称'
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
              description: '客户或企业名称'
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
              description: '客户或企业名称'
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
              description: '客户id'
            }
          ],
          return: [],
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
              key: 'id',
              type: 'int',
              required: true,
              description: '财务收入id'
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
          title: '删除财务收入',
          api: 'assets.charge.remove',
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
          title: '获取财务收入列表',
          api: 'assets.charge.get_list',
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
          return: [],
          explain: []
        }
      ]
    }

    this.testData = [
      {
        index: 1,
        title: '资产管理模块',
        content: [park, building]
      },
      {
        index: 2,
        title: '招商管理模块',
        content: [kehgl]
      },
      {
        index: 3,
        title: '合同管理模块',
        content: []
      },
      {
        index: 4,
        title: '企业进退驻管理模块',
        content: []
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
      }
    ]
  },
  watch: {
  },
  methods: {
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
