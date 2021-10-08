import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import AllEquipment from '../views/AllEquipment.vue'
import EquipmentOverview from '../views/EquipmentOverview.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [{
                path: '/allequipment',
                name: 'AllEquipment',
                component: AllEquipment
            },
            {
                path: '/equipmentoverview',
                name: 'EquipmentOverview',
                component: EquipmentOverview
            },
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const token = store.getters.getToken
    if (!token) return next('/login')
    next()
        // // 导航守卫限制路由跳转
        // if (to.path === '/login') {
        //     next()
        // }
        // const token = store.getters.getToken
        // if (!token) {
        //     next('/login')
        // } else {
        //     console.log("通过")
        //     next()
        // }
});
export default router