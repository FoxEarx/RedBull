import request from '@/utils/request.js'

/**
 * 获取区域管理列表
 * @returns promise
 */
export const getLocationList = (pageIndex, name) => {
  return request({
    method: 'GET',
    url: '/vm-service/region/search',
    params: {
      pageIndex,
      name,
    },
  })
}

/**
 * 点位搜索
 * @param {String} regionId 区域id
 * @returns
 */
export const getAreaInfo = (regionId) => {
  return request({
    method: 'GET',
    url: '/vm-service/node/search',
    params: {
      regionId,
    },
  })
}

/**
 *
 * @param {Object} data
 * regionName   区域名称
 * remark       备注
 * @returns promise
 */
export const editAreaInfo = (data) => {
  return request({
    method: 'PUT',
    url: `/vm-service/region/${data.id}`,
    data,
  })
}

/**
 *
 * @param {String} id 当前区域id
 * @returns promise
 */
export const delAreaInfo = (id) => {
  return request({
    method: 'DELETE',
    url: `/vm-service/region/${id}`,
  })
}

/**
 * 搜索区域
 * @returns promise
 */
export const searchAreaInfo = () => {
  return request({
    method: '',
    url: '',
  })
}

export const addArea = (data) => {
  return request({
    method: 'POST',
    url: '/vm-service/region',
    data,
  })
}
