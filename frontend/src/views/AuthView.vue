<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import TheButton from '@/components/TheButton.vue'

const router = useRouter();

const email = ref('');
const password = ref('');

// handle sign in
const onSignIn = async () => {}

// handle sign up
const onSignUp = async () => {}

</script>
<template>
    <main class="container mx-auto">
        <div class="space-y-4">
            <input type="email" v-model="email"
                class="block w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-white bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none leading-relaxed "
                placeholder="email">
            <input type="email" v-model="password"
                class="block w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-white-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none leading-relaxed "
                placeholder="password">
            <div>
                <TheButton label="Sign Up" @clicked="onSignUp" />
                <TheButton label="Sign In" @clicked="onSignIn" />
            </div>
        </div>
    </main>
</template>