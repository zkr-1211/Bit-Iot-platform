import Vue from 'vue'
import store from '@/store'
// import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName:"login"*/ '@/views/Login')
const Home = () => import(/* webpackChunkName:"Home"*/ '@/views/Home')
const AllEquipment = () => import(/* webpackChunkName:"AllEquipment"*/ '@/views/AllEquipment')
const EquipmentOverview = () => import(/* webpackChunkName:"EquipmentOverview"*/ '@/views/EquipmentOverview')
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
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
    if (to.path === '/login') return next()
    const token = store.getters.getToken
    if (!token) return next('/login')
    next()
});
export default router