import request from '@/utils/request.js'

/**
 * 获取点位管理列表
 * @param {String} pageIndex 请求页数
 * @returns promise
 */
export const getPositionList = (pageIndex) => {
  return request({
    method: 'GET',
    url: '/vm-service/node/search',
    params: {
      pageIndex,
    },
  })
}
