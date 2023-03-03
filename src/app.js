import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import auth from "./routers/signUpRouter.js"

dotenv.config()



const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

//routes
app.use([auth])

app.listen(5000, () => console.log("Servidor ON na porta", + 5000))