import express from 'express';
import cors from 'cors';

const app = express()
const port = 5175

// Initialise supertokens here

// Add cors here

// Add middleware here


// Task: Get user metadatan and send to frontend
// Resource: https://supertokens.com/docs/emailpassword/common-customizations/get-user-info#fetching-information-using-the-users-id
app.get("/user", verifySession(), async (req, res) => {
    try {       
        let userInfo = {}
        res.status(200).json(userInfo)

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: "Unauthorized" })
    }

})

// Add error handler here

app.listen(port, () => {
    console.log(`Server: ${port}`)
})