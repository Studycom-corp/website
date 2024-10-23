import { useAccountStore } from '@/stores/account'
import { useErrorHandle, type LocalError } from '@/stores/error_handle'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: () => import('@/views/app/app.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/app/home.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/libraries',
          name: 'libraries',
          component: () => import('@/views/app/libraries.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/channels',
          name: 'channels',
          component: () => import('@/views/app/channels.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/editor',
          name: 'editor',
          component: () => import('@/views/app/editor.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/app/profile.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('@/views/app/settings.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/notifications',
          name: 'notifications',
          component: () => import('@/views/app/notifications.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/spaces',
          name: 'spaces',
          component: () => import('@/views/app/spaces.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/inbox',
          name: 'inbox',
          component: () => import('@/views/app/inbox.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/create_new',
          name: 'create new',
          component: () => import('@/views/app/create_new.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('@/views/app/search.vue'),
          meta: {
            requireAuth: true
          }
        },
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/auth/auth_wrapper.vue'),
      children: [
        {
          name: 'index',
          path: '/index',
          component: () => import('@/views/auth/index.vue')
        },
        {
          name: 'signup',
          path: '/signup',
          component: () => import('@/views/auth/signup.vue')
        },
        {
          name: 'login',
          path: '/login',
          component: () => import('@/views/auth/login.vue')
        },
        {
          name: 'verify_email',
          path: '/verify_email',
          component: () => import('@/views/auth/verify_email.vue')
        },
        {
          name: 'reset_password',
          path: '/reset_password',
          component: () => import('@/views/auth/reset_password.vue')
        },
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const accountStore = useAccountStore()
  const errorHandle = useErrorHandle()

  if (to.meta.requireAuth) {
    if(accountStore.user.email_address.length > 0){
      if(accountStore.user.verified){
        next()
      } else {
        const error: LocalError = {
          message: 'Account requires verification',
          text: 'Verification Error'
        }
        errorHandle.alertError(error)
        const res = await accountStore.requestResendCode(accountStore.user.email_address)

        if(res){
          next({name: 'verify_email'})
        } else {
          next({name: 'login'})
        }
      }
    } else {
      next({name: 'index'})
    }
  } else {
    next()
  }
})

export default router
