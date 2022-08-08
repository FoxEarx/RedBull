import request from '@/utils/request'

// 获取商品列表
export function getCommodityList(params) {
  return request({
    url: '/vm-service/sku/search',
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
