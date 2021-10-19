import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home/Home.vue"

Vue.use(VueRouter)

const routes=[
    {
        path:'/',
        name:'Home',
        component:Home
    },
    {
        path:'/DataPage',
        name:'DataPage',
        component: ()=>import('../views/Data/DataPage.vue'),
        children:[
            {
                path:'DataHome',
                name:'dataHome',
                component:()=>import('../views/Data/DataHome.vue')
            },
            {
                path:'Social',
                name:'social',
                component:()=>import('../views/Data/Social.vue'),
                children:[
                    {
                        path:'Delicious',
                        name:'delicious',
                        component:()=>import('../views/Social/Delicious')
                    },
                    {
                        path:'ScenicSpot',
                        name:'scenicSpot',
                        component:()=>import('../views/Social/ScenicSpot')
                    },
                    {
                        path:'University',
                        name:'university',
                        component:()=>import('../views/Social/University')
                    },
                    {
                        path:'More',
                        name:'more',
                        component:()=>import('../views/Social/More')
                    }
                ]
            },
            {
                path:'News',
                name:'news',
                component:()=>import('../views/Data/News')
            },
            {
                path:'Transportation',
                name:'transportation',
                component:()=>import('../views/Data/Transportation')
            }
        ]
    }
]

const router=new VueRouter({
    mode:"history",
    base:process.env.BASE_URL,
    routes
})

export default router