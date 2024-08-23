<script lang="ts" setup>
import { ref, watchEffect, nextTick } from 'vue';
import Session from "supertokens-web-js/recipe/session";
import { useRouter } from 'vue-router';
import TheButton from '@/components/TheButton.vue';

const router = useRouter();
const user = ref({});
const apiDomain = import.meta.env.PROD ? import.meta.env.VITE_API_DOMAIN : "http://localhost:5175";

async function onSignOut() {
    await Session.signOut();
    router.push({ name: 'auth' });
}

watchEffect(async () => {
    const response = await fetch(`${apiDomain}/user`)
    user.value = await response.json();
    await nextTick()
})
</script>

<template>
    <div>
        <h1>User</h1>
        <div>
            {{ user }}
        </div>
        <TheButton label="Sign Out" @clicked="onSignOut" />
    </div>
</template>
