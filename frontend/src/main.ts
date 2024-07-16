import './assets/main.css'
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

SuperTokens.init({
    appInfo: {
        apiDomain: "http://localhost:4400",
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
