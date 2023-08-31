import { useAuthStore } from '@/stores/auth.store';
import axios from '@/utils/axios';
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router';

async function beforeEnter(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  try {
    const authStore = useAuthStore();
    const { data } = await axios.get('/auth/access');
    authStore.user = data.user;
    authStore.token = data.token;
    next();
  } catch (ex) {
    next('/signin');
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      beforeEnter,
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SigninView.vue'),
    },
  ],
});

export default router;
