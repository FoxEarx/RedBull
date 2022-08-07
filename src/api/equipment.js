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
export function addEquipmentType() {
  return request({
    url: '/vm-service/vmType/search',
    params: {
      pageIndex: 1,
      pageSize: 1000000,
    },
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
