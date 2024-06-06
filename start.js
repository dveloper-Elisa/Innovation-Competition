import express from "express"
import dotenv from "dotenv"




// imports of user defined function
import router from "./routes/subController.js"




dotenv.config()

const app = express()
app.use(express.json())
app.use(router)






app.listen(process.env.PORT,()=>{
    console.log(`App is Listen to port ${process.env.PORT}`)
})