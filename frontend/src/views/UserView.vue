<script lang="ts" setup>
import { ref, watchEffect, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import TheButton from '@/components/TheButton.vue';

const router = useRouter();
const user = ref({
    task: "Implement the /user route on your backend and get this to work"
});

// handle signOut
const onSignOut = async () => {}

// hint for the task
// watchEffect(async () => {
//     const response = await fetch(`${apiDomain}/user`)
//     user.value = await response.json();
//     await nextTick()
// })
</script>

<template>
    <div>
        <h1>Welcome User!</h1>
        <div>
            {{ user }}
        </div>
        <TheButton label="Sign Out" @clicked="onSignOut" />
    </div>
</template>
