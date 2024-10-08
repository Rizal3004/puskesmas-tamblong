import { storeToRefs } from 'pinia'
import { type NavigationGuardReturn, createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from './stores/authStore'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to): Promise<NavigationGuardReturn> => {
  const { profile } = storeToRefs(useAuthStore())
  const { getUserData } = useAuthStore()

  if (!(to.path.startsWith('/admin')) && localStorage.getItem('auth_token') && (profile && !profile.value)) {
    console.log('fetching user data')
    await getUserData()
  }

  if (to.name === '/admin') {
    return { name: '/admin/pasien/', message: 'Redirecting to /admin/pasien/' }
  }

  if (to.name === '/' && !profile.value) {
    return { name: '/auth/login' }
  } else if ((to.name === '/auth/login' || to.name === '/auth/register') && profile.value) {
    return {
      name: '/',
      message: 'You are already logged in',
    }
  }
})

export default router
