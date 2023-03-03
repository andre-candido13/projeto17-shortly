
import { Router } from "express";
import { createShort, shortUrlOpen, urlP } from "../controllers/url.js"
import { authorization } from "../middleware/authSchema.js";


const short = Router()


short.post("/urls/shorten",authorization, createShort)
short.get("/urls/:id", urlP)
short.get("/urls/open/:shortUrl", shortUrlOpen)



export default short