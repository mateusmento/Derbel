import { defineStore } from 'pinia';
import { useAuthStore } from './auth.store';
import { type Socket, io } from 'socket.io-client';

export const useWebSockets = defineStore('websockets', () => {
  const authStore = useAuthStore();
  const websocket = io('http://localhost:3000', {
    withCredentials: true,
    extraHeaders: {
      Authorization: authStore.token,
    },
  }) as Socket;

  return { websocket };
});
