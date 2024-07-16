<script lang="ts" setup>
import { ref, watchEffect, nextTick } from 'vue';
import Session from "supertokens-web-js/recipe/session";
import { useRouter } from 'vue-router';
import TheButton from '@/components/TheButton.vue';

const router = useRouter();
const user = ref({});

async function onSignOut() {
    await Session.signOut();
    router.push({ name: 'home' });
}

watchEffect(async () => {
    const response = await  fetch('http://localhost:3001/user')
    user.value = await response.json();
    await nextTick()
})
</script>

<template>
    <div>
        <h1>User</h1>
        <p>Email: {{ user }}</p>
        <TheButton label="Sign Out" @clicked="onSignOut" />
    </div>
</template>
