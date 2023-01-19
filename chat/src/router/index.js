import VueRouter from "vue-router"
import Vue from 'vue'
import index from '@/components/index.vue'
import content from '@/components/content.vue'




Vue.use(VueRouter)

const router = new VueRouter({  
    routes : [

        {path : '/',component:index},
        {path : '/content/:Id',component:content},
    ]
}

)

export default router
