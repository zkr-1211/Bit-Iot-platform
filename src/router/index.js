import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import AllEquipment from '../views/AllEquipment.vue'
import EquipmentOverview from '../views/EquipmentOverview.vue'

Vue.use(VueRouter)

const routes = [
    {
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
    const token1 = store.state.token
    const token2 = localStorage.getItem('token')
    if (token1||token2) {
        next();
    } else {
        if (to.path == '/login') {
            next();
        } else { //不然就跳转到登录；
            next({
                path: '/login',
            })
        }
    }
});
export default router