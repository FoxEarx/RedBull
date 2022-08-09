import router from '@/router'
import store from '@/store'
const whitesList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  if (store.state.user.token) {
    if (!store.state.user.userInfo.userId) {
      await store.dispatch('user/getUserInfo')
    }

    if (!store.state.repair.AllList) {
      await store.dispatch('repair/getAllList')
    }
    if (!store.state.order.AllList) {
      await store.dispatch('order/getOrder')
    }
    if (!store.state.strategy.AllList) {
      await store.dispatch('strategy/getStrategy')
    }

    if (!store.state.equipment.AllEquipment) {
      await store.dispatch('equipment/getEquipment')
    }

    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    const isCludes = whitesList.includes(to.path)
    if (isCludes) {
      next()
    } else {
      next('/login')
    }
  }
})
