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
// 删除策略
export function delStrategyId(id) {
  return request({
    url: '/vm-service/policy/' + id,
    method: 'DELETE',
  })
}
// 新增策略
export function addStrategy(data) {
  return request({
    url: '/vm-service/policy',
    method: 'post',
    data,
  })
}
// 修改策略
export function difStrategy(data, policyId) {
  return request({
    url: '/vm-service/policy/' + policyId,
    method: 'PUT',
    data,
  })
}
// 查看详情
export function getStrategyInfo(policyId) {
  return request({
    url: '/vm-service/policy/vmList/' + policyId,
  })
}
