import './assets/main.css'
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const apiDomain = import.meta.env.PROD ? import.meta.env.VITE_API_DOMAIN : "http://localhost:5175";

SuperTokens.init({
    appInfo: {
        apiDomain: apiDomain,
        apiBasePath: "/auth",
        appName: "SuperVue",
    },
    recipeList: [
        Session.init(),
        EmailPassword.init(),
    ],
});

const app = createApp(App)

app.use(router)

app.mount('#app')
