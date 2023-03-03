import { Router } from "express"
import { signUp, signIn } from "../controllers/signup.js"
import { signInPass, signUpPass } from "../middleware/authSchema.js"



const auth = Router()


auth.post("/signup", signUpPass, signUp )

auth.post("/signin", signInPass, signIn )

export default auth;
