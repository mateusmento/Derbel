<script lang="ts" setup>
import { reactive, ref } from 'vue';
import axios from '@/utils/axios';
import { useRoute, useRouter } from 'vue-router';
import { isAxiosError } from 'axios';

const route = useRoute();
const router = useRouter();

const credential = reactive({
  username: route.query.username || '',
  password: '',
});

const unauthorizedSignin = ref(false);

async function signin() {
  try {
    await axios.post('/auth/access', credential);
    router.push('/');
  } catch (ex) {
    if (isAxiosError(ex) && ex.response && [404, 401].includes(ex.response.status))
      unauthorizedSignin.value = true;
  }
}
</script>

<template>
  <main class="flex justify-center items-center h-screen">
    <form @submit.prevent="signin" class="flex flex-col gap-5 items-end">
      <div v-if="unauthorizedSignin">Username and password don't match</div>
      <fieldset>
        <legend>Username</legend>
        <input v-model="credential.username" />
      </fieldset>
      <fieldset>
        <legend>Password</legend>
        <input v-model="credential.password" type="password" />
      </fieldset>
      <div>
        Don't have an account yet?
        <RouterLink to="/signup">Sign up.</RouterLink>
      </div>
      <button>Sign In</button>
    </form>
  </main>
</template>
