import request from '@/utils/request'

// 获取商品类型列表
export function getCommodityList(params) {
  return request({
    url: '/vm-service/skuClass/search',
    params,
  })
}

// 获取搜索商品
export function getCommoditySearch(params) {
  return request({
    url: '/vm-service/skuClass/search',
    params,
  })
}

//新增商品类型
export function getAddCommodity(data) {
  return request({
    url: '/vm-service/skuClass',
    method: 'POST',
    data,
  })
}

// 修改商品类型
export function getEditCommodity(classId, className) {
  return request({
    url: `/vm-service/skuClass/${classId}`,
    method: 'PUT',
    data: {
      className: className,
    },
  })
}

// 删除商品类型
// /api/vm-service/skuClass/:classId
export function getDeletCommodity(classId) {
  return request({
    url: `/vm-service/skuClass/${classId}`,
    method: 'DELETE',
  })
}

// 获取搜索商品
export function getAllCommodity(params) {
  return request({
    url: 'vm-service/sku/search',
    params,
  })
}

// 新增商品
export function getAddComm(data) {
  return request({
    url: '/vm-service/sku',
    method: 'POST',
    data,
  })
}
