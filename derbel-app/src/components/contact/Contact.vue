<script lang="ts" setup>
import IconAcceptCall from '../icons/IconAcceptCall.vue';
import Messaging from './Messaging.vue';

defineProps<{
  contact: any;
}>();

const emit = defineEmits(['request-meeting', 'join-meeting']);
</script>

<template>
  <section class="contact flex flex-col gap-5">
    <div class="topbar flex gap-2.5">
      <div class="contact-photos">
        <div class="contact-photo" style="background: #b2bdbd"></div>
        <div class="contact-photo" style="background: #ccc9c6"></div>
        <div class="contact-photo" style="background: #bcc2bc"></div>
      </div>

      <div class="contact-name">{{ contact.speakingTo.name }}</div>
      <button
        @click="emit(contact.meeting ? 'join-meeting' : 'request-meeting')"
        class="p-2 ml-auto border-none rounded-full bg-green"
      >
        <IconAcceptCall />
      </button>
    </div>
    <Messaging :contact="contact" />
  </section>
</template>

<style scoped>
.contact {
  background-color: #f0f0f0;
  border-radius: 30px;
  padding: 10px;
}

.contact-photos {
  height: 40px;
  justify-content: flex-start;
  align-items: center;
  display: inline-flex;
}

.contact-photo {
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 20px;
}

.contact-photo:not(:first-of-type) {
  margin-left: -30px;
}

.contact-name {
  font-weight: 500;
  font-size: 16px;
}

.bg-green {
  background-color: #57ca4d;
}

.topbar {
  margin: 10px 10px 0 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #e0e6e4;
}

.close-btn {
  background: #f0f0f0;
}
</style>
