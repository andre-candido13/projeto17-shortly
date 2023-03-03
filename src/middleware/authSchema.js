import { db } from "../config/database.js"
import bcrypt from "bcrypt"
import { signInSchema } from "../schemas/signInSchema.js"
import { signUpSchema } from "../schemas/signUpSchema.js"



export async function authorization (req, res, next) {

const { authorization } = req.headers

const token = authorization?.replace("Bearer", "")

if (!token) return res.status(401).send("Não autorizado")

try {

    const session = await db.query("SELECT * FROM sessions WHERE token= $1" 
    ([token]))

    if (token.rows.length === 0)  return res.status(401).send("Não autorizado")

    res.locals.session = session.row[0]

    next()

} catch (err) {
    res.status(500).send(err.message)

}
}

export async function signUpPass (req, res, next) {

const user = req.body

const { err } = signUpSchema.validate(user)


if (err) {
    const err = err.details.map((details)=> 
    details.message)
        return res.status(422).send(err)
    }

    const dadosExist = await db.query(`SELECT * FROM users WHERE email = $1`, [user.email]);

    if (dadosExist.rowCount !== 0) {
        return res.status(409).send("OK")
    }
    res.locals.user = user
    next()

}

export async function signInPass (req, res, next) {

const { email, password } = req.body


const { error } = signInSchema.validate({email, password})
    
if (error) {
    const errors = error.details.map((d) => d.message)
    return res.status(422).send({ errors })

}

try {

    const userExist = await db.query("SELECT * FROM users WHERE email =$1", ([email]))

   
 
     
    if (userExist.rowCount === 0){
        return res.status(401).send()
    }

    const passwordExist = bcrypt.compareSync(password, userExist.rows[0], password)

    if (!passwordExist) {
        return res.status(401).send("Não autorizado")

    }

    res.locals.user = userExist.rows[0]
} catch(err) {
    res.status(500).send(err.message)
}
next()

}