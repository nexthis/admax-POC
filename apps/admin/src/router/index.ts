import { useAuthStore } from '@/stores/auth';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router/auto';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => setupLayouts(routes),
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from) => {
  const {user} = useAuthStore()
  if (!user && to.name !== 'login')
    return { name: 'login' }

  return true
})

export default router
