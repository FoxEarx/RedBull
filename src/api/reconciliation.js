import request from '@/utils/request'
// 获取一定时间范围之内的收入
export function getTimerIn(params) {
  return request({
    url: '/order-service/report/orderAmount',
    params,
  })
}

// 获取一定时间范围之内的订单总数
export function getNum(params) {
  return request({
    url: '/order-service/report/orderCount',
    params,
  })
}

// 获取一定时间范围之内的分成总数
export function getDivide(params) {
  return request({
    url: '/order-service/report/totalBill',
    params,
  })
}

// 获取合作商列表
export function getPartner() {
  return request({
    url: '/user-service/partner/search',
    params: {
      pageSize: 10,
    },
  })
}

// 获取一定日期范围之内的合作商分成汇总数据
export function getPartnerCollect(start, end) {
  return request({
    url: '/order-service/report/partnerCollect',
    params: {
      start: start,
      end: end,
      pageIndex: 1,
      pageSize: 10,
    },
  })
}
