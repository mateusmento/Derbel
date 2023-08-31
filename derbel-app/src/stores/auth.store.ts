import type { User } from '@/types/user.type';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>();
  const token = ref('');
  return { user, token };
});
