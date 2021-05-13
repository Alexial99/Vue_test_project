import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './components/MainPage.vue'
Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[

        {
            path:'/',
            component: MainPage,
            meta:{hideNavigation:false}
        },
        {
            path:'/registration',
            component:  () => import('./components/Registration'),
            meta:{hideNavigation:true}
        },
        {
            path:'/profile',
            component:  () => import('./components/Profile.vue'),
            meta:{hideNavigation:false}
        },
        {
            path:'/game',
            component: () => import('./components/Game.vue'),
            meta:{hideNavigation:false}
        }
    ]
})