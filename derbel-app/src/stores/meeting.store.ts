import type { IMeeting } from '@/types/meeting.type';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMeetingStore = defineStore('meeting', () => {
  const meeting = ref<IMeeting | null>();
  const contact = ref<IMeeting | null>();
  return { meeting, contact };
});
