import request from '@/utils/request.js'

/**
 * 获取区域管理列表
 * @returns promise
 */
export const getLocationList = (pageIndex) => {
  return request({
    method: 'GET',
    url: '/vm-service/region/search',
    params: {
      pageIndex,
    },
  })
}

export const getAreaInfo = (regionId) => {
  return request({
    method: 'GET',
    url: `/api/vm-service/region/${regionId}`,
  })
}
