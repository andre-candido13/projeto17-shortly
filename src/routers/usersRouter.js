
import { Router } from "express";
import { user, ranking } from "../controllers/users.js"


const userGet = Router()

userGet.get("/users/me", user)
userGet.get("/ranking", ranking)


export default userGet