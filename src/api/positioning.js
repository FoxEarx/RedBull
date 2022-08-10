import request from '@/utils/request.js'

/**
 * 获取点位管理列表
 * @param {String} pageIndex 请求页数
 * @returns promise
 */
export const getPositionList = (params) => {
  return request({
    method: 'GET',
    url: '/vm-service/node/search',
    params,
  })
}

/**
 * 获取点位详情
 * @param {String} id 点位详情id
 * @returns promise
 */
export const getPositionInfo = (id) => {
  return request({
    method: 'GET',
    url: `/vm-service/node/vmList/${id}`,
  })
}

/**
 * 获取商圈列表
 * @returns promise
 */
export const getBusinessList = () => {
  return request({
    method: 'GET',
    url: '/vm-service/businessType',
  })
}

/**
 * 获取合作商信息
 * @param {String} pageSize 需要获取的条数
 * @returns promise
 */
export const getOwnerList = (pageSize) => {
  return request({
    method: 'GET',
    url: '/user-service/partner/search',
    params: {
      pageSize,
    },
  })
}

/**
 * 修改点位信息
 * @param {Object} data
 * @returns promise
 */
export const editPositionInfo = (data) => {
  return request({
    method: 'PUT',
    url: `/vm-service/node/${data.id}`,
    data,
  })
}

/**
 * 新增点位
 * @param {Object} data
 * @returns promise
 */
export const addPositionInfo = (data) => {
  return request({
    method: 'POST',
    url: '/vm-service/node',
    data,
  })
}

/**
 * 删除点位信息
 * @param {String} id 点位id
 * @returns promise
 */
export const delPositionInfo = (id) => {
  return request({
    method: 'DELETE',
    url: `/vm-service/node/${id}`,
  })
}
