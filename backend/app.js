import express from 'express';
import cors from 'cors';
import supertokens from "supertokens-node";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";
import Session from "supertokens-node/recipe/session/index.js";
import EmailPassword from "supertokens-node/recipe/emailpassword/index.js";
import { middleware, errorHandler } from 'supertokens-node/framework/express/index.js';
// import { SessionRequest } from 'supertokens-node/framework/express';

const app = express()
const port = 4400

supertokens.init({
    framework: "express",
    supertokens: {
        // These are the connection details of the app you created on supertokens.com
        connectionURI: "https://st-dev-7eb537f0-39c9-11ef-b150-5d1d02fa1c1a.aws.supertokens.io",
        apiKey: "GODIbX6uNEr5vIB8dAHjgW8Ad4",
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: "SuperVue",
        apiDomain: `http://localhost:${port}`,
        websiteDomain: "http://localhost:5173",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(), // initializes signin / sign up features
        Session.init() // initializes session features
    ]
});

app.use(cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true
}))

app.use(middleware());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/user", verifySession(), async (req, res) => {
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

    console.log(userInfo)
    res.status(200).send(userInfo)

})

app.use(errorHandler());

app.listen(port, () => {
    console.log(`Server: ${port}`)
})