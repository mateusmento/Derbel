<script lang="ts" setup>
import { reactive, ref } from 'vue';
import axios from '@/utils/axios';
import { useRouter } from 'vue-router';
import { isAxiosError } from 'axios';

const router = useRouter();

const credential = reactive({
  name: '',
  username: '',
  password: '',
});

const usernameAlreadyExists = ref(false);

async function signup() {
  try {
    const { data } = await axios.post('/auth/users', credential);
    router.push({ name: 'signin', query: { username: data.credential.username } });
  } catch (ex) {
    if (isAxiosError(ex) && ex.response && ex.response.status === 409)
      usernameAlreadyExists.value = true;
  }
}
</script>

<template>
  <main class="flex justify-center items-center h-screen">
    <form @submit.prevent="signup" class="flex flex-col gap-5 items-end">
      <fieldset>
        <legend>Name</legend>
        <input v-model="credential.name" />
      </fieldset>
      <fieldset>
        <legend>Username</legend>
        <input v-model="credential.username" @keyup="usernameAlreadyExists = false" />
        <small v-if="usernameAlreadyExists">Username already exists</small>
      </fieldset>
      <fieldset>
        <legend>Password</legend>
        <input v-model="credential.password" type="password" />
      </fieldset>
      <div>
        Already have an account?
        <RouterLink to="/signin">Sign in.</RouterLink>
      </div>
      <button>Sign Up</button>
    </form>
  </main>
</template>
