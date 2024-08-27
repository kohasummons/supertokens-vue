import express from 'express';
import cors from 'cors';

import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session/index.js";
import EmailPassword from "supertokens-node/recipe/emailpassword/index.js";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";
import { middleware, errorHandler } from 'supertokens-node/framework/express/index.js';
import Dashboard from "supertokens-node/recipe/dashboard/index.js";

const app = express()
const port = 5175
const URI = process.env.SUPERTOKENS_URI
const KEY = process.env.SUPERTOKENS_KEY
const apiDomain = process.env.NODE_ENV === "production" ? process.env.API_DOMAIN : "http://localhost:5175";
const websiteDomain = process.env.NODE_ENV === "production" ? process.env.WEBSITE_DOMAIN : "http://localhost:5173";


supertokens.init({
    framework: "express",
    supertokens: {
        // These are the connection details of the app you created on supertokens.com
        connectionURI: `${URI}`,
        apiKey: `${KEY}`,
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: "SuperVue",
        apiDomain: apiDomain,
        websiteDomain: websiteDomain,
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(), // initializes signin / sign up features
        Session.init(), // initializes session features
        Dashboard.init() // iniT the dashbard
    ]
});

app.use(cors({
    origin: websiteDomain,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true
}))

app.use(middleware());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/user", verifySession(), async (req, res) => {
    try {       
        let userId = req.session.getUserId();
    
        let userInfo = await supertokens.getUser(userId)
    
        /**
         * 
         * userInfo contains the following info:
         * - emails
         * - id
         * - timeJoined
         * - tenantIds
         * - phone numbers
         * - third party login info
         * - all the login methods associated with this user.
         * - information about if the user's email is verified or not.
         * 
        */
    
        res.status(200).json(userInfo)

    } catch (error) {
        res.status(401).json({ error: "Unauthorized" })
    }

})

app.use(errorHandler());

app.listen(port, () => {
    console.log(`Server: ${port}`)
})