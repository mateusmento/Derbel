<script setup lang="ts">
import axios from '@/utils/axios';
import { ref } from 'vue';
import { type IContact } from '@/types/contact.type';
import { useAuthStore } from '@/stores/auth.store';
import IconSearch from '@/components/icons/IconSearch.vue';
import Tabs from './Tabs.vue';
import Contact from './Contact.vue';

defineProps<{
  contacts: IContact[];
  openContact?: IContact;
}>();

const emit = defineEmits(['show-messages', 'join-meeting', 'add-contact']);

const authStore = useAuthStore();

const username = ref('');
const usernameInputEl = ref<HTMLInputElement | null>(null);

async function addContact() {
  const { data } = await axios.post('/contacts', { username: username.value });
  username.value = '';
  emit('add-contact', data);
}
</script>

<template>
  <aside class="aside">
    <header class="top-menu inset-shadow">
      <div class="user-profile">
        <div class="user-photo"></div>
        <div class="user-name">{{ authStore.user?.name }}</div>
      </div>
      <Tabs />
      <form class="search-contacts" @submit.prevent="addContact" @click="usernameInputEl?.focus()">
        <input v-model="username" placeholder="Search for a contact" ref="usernameInputEl" />
        <button class="add-contact-btn" type="submit">
          <IconSearch />
        </button>
      </form>
    </header>
    <ul class="contacts">
      <template v-for="(contact, i) of contacts" :key="contact.id">
        <li @click="emit('show-messages', contact)">
          <Contact
            :contact="contact"
            :open="!!openContact && openContact.id === contact.id"
            :unread-messages="i === 0"
            @join-meeting="emit('join-meeting', contact)"
          />
        </li>
        <div v-if="i !== contacts.length - 1" class="divider"></div>
      </template>
    </ul>
  </aside>
</template>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 360px;
  padding: 10px;
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f0f0f0;
  border-radius: 30px 30px 20px 20px;
}

.user-profile {
  display: flex;
  gap: 15px;
  padding: 20px;
}

.user-photo {
  width: 40px;
  height: 40px;
  background-color: #919891;
  border-radius: 40px;
}

.user-name {
  font-weight: 500;
  font-size: 20px;
}

.search-contacts {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 15px 20px;
  border-radius: 10px 10px 20px 20px;
  background-color: #e0e6e4;
}

.search-contacts input {
  background-color: transparent;
  border: none;
  font-size: 16px;
  padding: 0;
  outline: none;
}

.search-contacts:focus-within {
  background-color: #d2d8d6;
}

.search-contacts input::placeholder {
  color: #464646;
}

.add-contact-btn {
  background-color: transparent;
  padding: 0;
  border: none;
}

.contacts {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 10px;
}

.divider {
  width: 200px;
  border-top: 1px solid #ccc;
  margin: 0 auto;
}
</style>
