<script setup lang="ts">
import Contact from '@/components/contact/Contact.vue';
import Meeting from '@/components/meeting/Meeting.vue';
import { useWebSockets } from '@/stores/websockets.store';
import { type IContact } from '@/types/contact.type';
import axios from '@/utils/axios';
import { onMounted, ref } from 'vue';
import Aside from '@/components/aside/Aside.vue';
import { useMeetingStore } from '@/stores/meeting.store';

const contacts = ref<IContact[]>([]);
const openContact = ref<IContact>();
const sockets = useWebSockets();
const meetingStore = useMeetingStore();

onMounted(async () => {
  contacts.value = await axios.get('/contacts').then((res) => res.data);

  for (const contact of contacts.value)
    sockets.websocket.emit('meeting-notification', { contactId: contact.id });

  sockets.websocket.on('incoming-meeting', ({ meeting }) => {
    const contact = contacts.value.find((c) => c.id === meeting.contactId);
    if (contact) contact.meeting = meeting;
  });

  sockets.websocket.on('meeting-ended', ({ contactId }) => {
    const contact = contacts.value.find((c) => c.id === contactId);
    if (contact) contact.meeting = null;
    meetingStore.meeting = null;
  });
});

async function addContact(contact: IContact) {
  contacts.value.unshift(contact);
}

async function showMessages(contact: IContact) {
  openContact.value = contact;
}

async function requestMeeting() {
  if (!openContact.value) return;
  const contact = openContact.value;
  sockets.websocket.emit('request-meeting', { contactId: contact.id }, (meeting: any) => {
    meetingStore.meeting = meeting;
    contact.meeting = meeting;
  });
}

async function joinMeeting(contact: IContact) {
  openContact.value = contact;
  meetingStore.meeting = contact.meeting;
}

async function meetingEnded() {
  meetingStore.meeting = null;
  if (openContact.value) openContact.value.meeting = null;
}

async function leftMeeting() {
  meetingStore.meeting = null;
}
</script>

<template>
  <div class="flex justify-center h-screen p-5 gap-2.5 overflow-hidden">
    <Aside
      :contacts="contacts"
      :open-contact="openContact"
      @add-contact="addContact"
      @join-meeting="joinMeeting"
      @show-messages="showMessages"
    />

    <main class="main-section flex-1 rounded-r-xl bg-slate-100">
      <TransitionGroup v-if="openContact">
        <Meeting
          v-if="meetingStore.meeting"
          v-show="meetingStore.meeting"
          :meetingId="meetingStore.meeting.id"
          @meeting-ended="meetingEnded"
          @left-meeting="leftMeeting"
          :key="1"
        />
        <Contact
          v-show="!meetingStore.meeting"
          :contact="openContact"
          class="h-full"
          @request-meeting="requestMeeting"
          @join-meeting="joinMeeting(openContact)"
          :key="2"
        />
      </TransitionGroup>
      <div v-else class="flex justify-center items-center h-full">Open a contact</div>
    </main>
  </div>
</template>

<style scoped>
.main-section {
  border-radius: 40px;
  padding: 10px;
  background: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 400ms ease;
}

.v-leave-to,
.v-enter-from {
  opacity: 0;
}
</style>
