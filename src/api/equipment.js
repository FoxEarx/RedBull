import request from '@/utils/request'
/**
 * 设备搜索
 * @param {*} index
 * @returns
 */
export function equipmentSearch(index, id) {
  return request({
    url: '/vm-service/vm/search',
    params: {
      pageIndex: index,
      innerCode: id,
    },
  })
}
/**
 * 新增售货机类型获取
 * @returns promise
 */
export function addEquipmentType(pageIndex, pageSize, name) {
  return request({
    url: '/vm-service/vmType/search',
    params: {
      pageIndex,
      pageSize,
      name,
    },
  })
}

export function addEquipmentModel(data) {
  return request({
    url: '/vm-service/vmType',
    method: 'POST',
    data,
  })
}
/**
 * 新增售货机点位搜索
 * @returns promise
 */
export function addEquipmentNode() {
  return request({
    url: '/vm-service/node/search',
    params: {
      pageIndex: 1,
      pageSize: 1000000,
    },
  })
}

/**
 * 新增售货机
 * @param {Object} data
 * @returns promise
 */
export function addEquipment(data) {
  return request({
    url: '/vm-service/vm',
    method: 'POST',
    data,
  })
}

/**
 *改变售货机点位
 * @param {Number} id
 * @param {Number} nodeId
 * @returns
 */
export function changeEquipmentPoint(id, nodeId) {
  return request({
    url: `/vm-service/vm/${id}/${nodeId}`,
    method: 'PUT',
  })
}

/**
 * 商品策略查询
 * @param {Number} id
 * @returns
 */
export function discountListApi(id) {
  return request({
    url: `/vm-service/policy/vmPolicy/${id}`,
  })
}

/**
 * 取消策略
 * @param {Number} innerCode
 * @param {Number} policyId
 * @returns
 */
export function cancleStrategy(innerCode, policyId) {
  return request({
    url: `vm-service/vm/cancelPolicy/${innerCode}/${policyId}`,
    method: 'PUT',
  })
}

/**
 * 所以策略
 * @returns promise
 */
export function AllStrategy() {
  return request({
    url: `/vm-service/policy`,
  })
}

/**
 * 应用策略
 * @returns promise
 */
export function applicationStrategy(innerCodeLists, policyId) {
  return request({
    url: `/vm-service/vm/applyPolicy`,
    method: 'PUT',
    data: {
      innerCodeList: [...innerCodeLists],
      policyId,
    },
  })
}

/**
 * 售货详情
 * @param {*} partnerId
 * @param {*} start
 * @param {*} end
 * @returns promise
 */
export function SalesDetailsNum(params) {
  return request({
    url: `/order-service/report/orderCount`,
    params,
  })
}

/**
 * 销售金额
 * @param {*} params
 * @returns
 */
export function SalesDetailsMoney(params) {
  return request({
    url: `/order-service/report/orderAmount`,
    params,
  })
}

/**
 * 补货次数
 * @param {*} params
 * @returns
 */
export function replenishmentNum(innerCode, start, end) {
  return request({
    url: `/task-service/task/supplyCount/${innerCode}/${start}/${end}`,
  })
}

/**
 * 维修次数
 * @param {*} innerCode
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function maintenanceNum(innerCode, start, end) {
  return request({
    url: `/task-service/task/repairCount/${innerCode}/${start}/${end}`,
  })
}
/**
 * 商品销量
 * @param {*} innerCode
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function CommoditSales(innerCode, start, end) {
  return request({
    url: `/order-service/report/skuCollect/${innerCode}/${start}/${end}`,
  })
}
