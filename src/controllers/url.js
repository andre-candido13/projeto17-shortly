import { db } from "db"
import { nanoid } from "nanoid"


export async function createShort (req, res) {


const textUrl = res.locals.user

try {

    const shortUrl = nanoid(10)
    await db.query(` INSERT INTO urls (url, "userId", "shortUrl") VALUES ($1, $2, $3)`, 
    ([textUrl.user.url, textUrl.userId, shortUrl]))

    const short = await db.query(` SELECT * FROM urls WHERE "shortUrl"= $1`, ([shortUrl]))

    await db.query(`UPDATE users SET "linksCount" +1 WHERE id= $1 `, ([short.rows[0].userId]))

    res.status(201).send({ id: short.rows[0].id, shortUrl: short.rows[0].shortUrl })



} catch (err) {
    res.status(500).send(err.message)
}
}


export async function shortUrlOpen (req, res) {

const shorten = req.params.shortUrl

try {

    const shortenUrl = await db.query(` SELECT * FROM urls WHERE "shortUrl" = $1`, ([shorten]))

    if (shortenUrl.rowCount <= 0) { return res.sendStatus(404)}
        await db.query(`UPDATE urls SET "visitCount" = "visitCount"+1 WHERE id =$1`, [isShortUrl.rows[0].id])
        await db.query(`UPDATE urls SET "visitCount" = $1 WHERE id =$2`, [shortenUrl.rows[0].visitCount + 1, shortenUrl.rows[0].id])
        await db.query(`UPDATE users SET "visitCount" = $1 WHERE id =$2`, [shortenUrl.rows[0].visitCount + 1, shortenUrl.rows[0].userId])


        return res.redirect(shortenUrl.rows[0].url)

} catch (err) {
    res.status(500).send(err.message)

}
}

export async function urlP(req, res) {

    const id = req.params.id

    try {
        const urlOn = await db.query(`SELECT * FROM urls WHERE id = $1`, [id])

        if (urlOn.rowCount <= 0) { return res.sendStatus(404) }

        res.status(200).send({ id: urlOn.rows[0].id, shortUrl: urlOn.rows[0].shortUrl, url: urlOn.rows[0].url })

    } catch (error) {
        res.status(500).send(error.message)
    }
}
