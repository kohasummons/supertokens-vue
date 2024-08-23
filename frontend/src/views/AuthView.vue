<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { signIn, signUp } from "supertokens-web-js/recipe/emailpassword";

import TheButton from '@/components/TheButton.vue'

const router = useRouter();

const email = ref('');
const password = ref('');

const onSignIn = async () => {
    console.log(email.value, password.value);
    if (!email.value || !password.value) return

    try {
        let response = await signIn({
            formFields: [{
                id: "email",
                value: email.value
            }, {
                id: "password",
                value: password.value
            }]
        })

        if (response.status === "FIELD_ERROR") {
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax).
                    window.alert(formField.error)
                }
            })
        } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
            window.alert("Email password combination is incorrect.")
        } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
            // the reason string is a user friendly message
            // about what went wrong. It can also contain a support code which users
            // can tell you so you know why their sign in was not allowed.
            window.alert(response.reason)
        } else {
            // sign in successful. The session tokens are automatically handled by
            // the frontend SDK.
            router.push({ name: 'user' })
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}

const onSignUp = async () => {
    console.log(email.value, password.value);

    try {
        let response = await signUp({
            formFields: [{
                id: "email",
                value: email.value
            }, {
                id: "password",
                value: password.value
            }]
        })

        if (response.status === "FIELD_ERROR") {
            // one of the input formFields failed validaiton
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax),
                    // or the email is not unique.
                    window.alert(formField.error)
                } else if (formField.id === "password") {
                    // Password validation failed.
                    // Maybe it didn't match the password strength
                    window.alert(formField.error)
                }
            })
        } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
            // the reason string is a user friendly message
            // about what went wrong. It can also contain a support code which users
            // can tell you so you know why their sign up was not allowed.
            window.alert(response.reason)
        } else {
            // sign up successful. The session tokens are automatically handled by
            // the frontend SDK.
            router.push({ name: 'user' })
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}

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