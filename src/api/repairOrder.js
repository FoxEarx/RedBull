import request from '@/utils/request'

/**
 *工单搜索
 * @returns promise
 */
export function repairSearch(id) {
  return request({
    url: '/task-service/task/search',
    params: {
      pageIndex: id,
    },
  })
}

/**
 *获取工单列表
 * @returns promise
 */
export function getordList(id) {
  return request({
    url: '/task-service/task/search',
    params: {
      pageIndex: id,
      isRepair: true,
    },
  })
}
// 新增策略
export function addRepairOrder(data) {
  return request({
    url: '/task-service/task/create',
    method: 'POST',
    data,
  })
}

// 查看详情
export function getRepairOrderInfo(taskId) {
  return request({
    url: '/task-service/task/taskInfo/' + taskId,
  })
}
