import request from '@/utils/request'

/**
 * 人员搜索(列表页)
 * @returns Promise
 */
export function getPersonnelList(params) {
  return request({
    url: '/user-service/user/search',
    params
  })
}

/**
 * 人员工作量列表
 * @returns Promise
 */
export function getUserWorkList(params) {
  return request({
    url: '/user-service/user/searchUserWork',
    params
  })
}
