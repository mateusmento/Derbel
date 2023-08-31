<script lang="ts" setup>
import type { IContact } from '@/types/contact.type';
import moment, { type Moment } from 'moment';
import { useMeetingStore } from '@/stores/meeting.store';
import IconAcceptCall from '@/components/icons/IconAcceptCall.vue';

defineProps<{
  contact: IContact;
  open: boolean;
  unreadMessages: boolean;
}>();

const emit = defineEmits(['join-meeting']);

const meetingStore = useMeetingStore();

function formatDate(date: string | Moment) {
  if (!date) return;
  return moment().startOf('day').isSame(moment(date).startOf('day'))
    ? moment(date).format('H:mm A')
    : moment(date).format('MMM DD');
}
</script>

<template>
  <div class="contact" :class="{ open, 'unread-messages': unreadMessages }">
    <div class="contact-photo"></div>
    <div class="contact-info">
      <div class="flex justify-between items-baseline">
        <div class="contact-name line-fit">{{ contact.speakingTo.name }}</div>
        <small class="last-message-time line-fit">{{
          contact.lastMessage ? formatDate(contact.lastMessage.sentAt) : ''
        }}</small>
      </div>
      <small class="contact-last-message line-fit">{{ contact.lastMessage?.text }}</small>
    </div>
    <div v-if="contact.meeting && !meetingStore.meeting" class="flex gap-5">
      <button @click.stop="emit('join-meeting')" class="p-2 border-none rounded-full bg-green-500">
        <IconAcceptCall />
      </button>
    </div>
  </div>
</template>

<style scoped>
.contact {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 5px 15px 15px 15px;
  transition: background-color 100ms;
}

.contact.open,
.contact:hover {
  background-color: #e0e6e4;
}

.contact-photo {
  width: 30px;
  height: 30px;
  background-color: #b2bdbd;
  border-radius: 40px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
}

.contact-name {
  font-size: 15px;
}

.unread-messages .contact-name {
  font-weight: 500;
}

.contact-last-message {
  font-size: 14px;
  height: 1em;
}

.last-message-time {
  font-size: 10px;
}

small {
  font-size: 12px;
}
</style>
