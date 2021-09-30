import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AllEquipment from '../views/AllEquipment.vue'
import EquipmentOverview from '../views/EquipmentOverview.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/equipmentoverview',
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

export default router