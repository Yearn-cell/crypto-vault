import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useCryptoStore } from '@/store'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/encrypt',
      name: 'encrypt',
      component: () => import('../views/EncryptView.vue')
    },
    {
      path: '/decrypt',
      name: 'decrypt',
      component: () => import('../views/DecryptView.vue')
    },
    {
      path: '/text-encrypt',
      name: 'text-encrypt',
      component: () => import('../views/TextEncryptView.vue')
    },
    {
      path: '/text-decrypt',
      name: 'text-decrypt',
      component: () => import('../views/TextDecryptView.vue')
    }
  ]
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const store = useCryptoStore()
  if (from.name) { 
    store.reset()
  }
  next()
})

export default router 