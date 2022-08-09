import request from '@/utils/request'

// 获取商品列表
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
export function getEditCommodity(classId) {
  return request({
    url: `/vm-service/skuClass/${classId}`,
    method: 'PUT',
  })
}
