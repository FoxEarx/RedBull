import request from '@/utils/request'

/**
 *获取订单列表
 * @returns
 */
export function getOrderList(id) {
  return request({
    url: '/order-service/order/search',
    params: {
      pageIndex: id,
    },
  })
}
