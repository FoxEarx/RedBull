import request from '@/utils/request'

/**
 * 人员搜索(列表页)
 * @returns Promise
 */
export function getPersonnelList(params) {
  return request({
    url: '/user-service/user/search',
    params,
  })
}

/**
 * 人员工作量列表
 * @returns Promise
 */
export function getUserWorkList(params) {
  return request({
    url: '/user-service/user/searchUserWork',
    params,
  })
}

/**
 * 区域列表
 * @returns Promise
 */
export function getAreaList(params) {
  return request({
    url: '/vm-service/region/search',
    params,
  })
}

/**
 * 角色列表
 * @returns Promise
 */
export function getRoleList() {
  return request({
    url: '/user-service/role',
  })
}

/**
 * 上传头像
 * @param {*} fileName 
 * @returns 
 */
export function updatImg(fileName) {
  return request({
    url: '/vm-service/sku/fileUpload',
    method: 'POST',
    data: fileName,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

/**
 * 新增人员
 * @param {*} data 
 * @returns 
 */
export function addPersonApi(data) {
  return request({
    url: '/user-service/user',
    method: 'POST',
    data,
  })
}

/**
 * 删除人员
 * @param {*} id
 * @returns
 */
export function delPersonApi(id) {
  return request({
    url: `/user-service/user/${id}`,
    method: 'DELETE',
  })
}

/**
 * 编辑人员
 * @param {*} data 
 * @param {*} id 
 * @returns 
 */
export function editPersonApi(data, id) {
  return request({
    url: `/user-service/user/${id}`,
    method: 'PUT',
    data,
  })
}

/**
 * 获取用户基本信息
 * @param {*} id
 * @returns
 */
export function getPersonById(id) {
  return request({
    url: `/user-service/user/${id}`,
  })
}

/**
 * 获取用户工作量(工单统计)
 * @param {*} params
 * @returns
 */
export function getUserWorkCount(params) {
  return request({
    url: '/task-service/task/userWork',
    params,
  })
}

/**
 * 获取当时工单汇总信息(人员统计头部信息)
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function getTaskReportInfo(start, end) {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`,
  })
}

/**
 * 工单状态统计
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function getCollectReport(start, end) {
  return request({
    url: `/task-service/task/collectReport/${start}/${end}`,
  })
}

/**
 * 人员排名
 * @param {*} start
 * @param {*} end
 * @param {*} isRepair
 * @param {*} regionId
 * @returns
 */
export function getUserWorkTop10(start, end, isRepair, regionId) {
  return request({
    url: `/task-service/task/userWorkTop10/${start}/${end}/${isRepair}/${regionId}`,
  })
}
