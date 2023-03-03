import { db } from "../config/database.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"



export async function signUp ( req, res) {

const { name, email, password } = req.body

const passwordcrypt = bcrypt.hashSync(password, 10)

try {

await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
([name, email, passwordcrypt]))
return res.sendStatus(201).send("OK")



} catch (err) {
    res.status(500).send(err.message)

}
}

export async function signIn ( req, res ) {

const user = res.locals.user


const token = uuidv4()

try {

    await db.query(`INSERT INTO sessions ("userId", token) VALUES $1,$2`) 
    ([user.id, token])
    return res.status(200).send({token})



} catch (err) {
    res.status(200).send(err.message)
}

}