import request from '@/utils/request'

/**
 *获取策略列表
 * @returns
 */
export function getStrategyList(id) {
  return request({
    url: '/vm-service/policy/search',
    params: {
      pageIndex: id,
    },
  })
}

export function delStrategyId(id) {
  return request({
    url: '/vm-service/policy/' + id,
    method: 'DELETE',
  })
}

export function addStrategy(data) {
  return request({
    url: '/vm-service/policy',
    method: 'post',
    data,
  })
}
export function difStrategy(id) {
  return request({
    url: '/vm-service/policy/' + id,
    method: 'put',
    data,
  })
}
