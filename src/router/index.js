import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    //路由重定向
    {
        path: '/',
        redirect: '/movie'
    },
    {
        path: '/movie',
        name: 'Movie',
        component: () => import('../views/Movie/Movie'),
        //二级路由
        children: [
            {
                path:'/movie',
                redirect:'nowPlaying'
            },
            {
                path: 'city',
                component: () => import('../components/City/City')
            },
            {
                path: 'nowPlaying',
                component: () => import('../components/Nowplaying/NowPlaying')
            },
            {
                path: 'comingSoon',
                component: () => import('../components/CommingSoon/CommingSoon')
            }
            , {
                path: 'search',
                component: () => import('../components/Search/Search')
            }]
    },
    {
        path: '/mine',
        name: 'Mine',
        component: () => import('../views/Mine/Mine')
    },
    {
        path: '/cinema',
        name: 'Cinema',
        component: () => import('../views/Cinema/Cinema')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
