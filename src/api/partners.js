import request from '@/utils/request'

/**
 * 获取供应商列表
 * @returns promise
 */
export const getPartnersList = (params) => {
  return request({
    method: 'GET',
    url: '/user-service/partner/search',
    params,
  })
}

/**
 * 重置密码
 * @param {Number} id 合作商id
 * @returns promise
 */
export const resetPassword = (id) => {
  return request({
    method: 'PUT',
    url: `/user-service/partner/resetPwd/${id}`,
  })
}

/**
 * 修改合作商信息
 * @param {Object} data
 * @returns promise
 */
export const editPartners = (data) => {
  return request({
    method: 'PUT',
    url: `/user-service/partner/${data.id}`,
    data,
  })
}

/**
 * 新增合作商
 * @param {Object} data
 * @returns promise
 */
export const addPartners = (data) => {
  return request({
    method: 'POST',
    url: '/user-service/partner',
    data,
  })
}

/**
 * 删除合作商
 * @param {Number} id 合作商id
 * @returns
 */
export const delPartners = (id) => {
  return request({
    method: 'DELETE',
    url: `/user-service/partner/${id}`,
  })
}
