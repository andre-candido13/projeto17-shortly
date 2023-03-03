import { db } from "../config/database.js"

export async function user (req, res) {


const { auth } = req.headers

const token = auth?.replace("Bearer", "")

try{

    const ses = await db.query("SELECT * FROM sessions WHERE token = $1",
    ([token]))
    if (ses.rowCount <= 0) {
    return res.sendStatus(401)
    }

    const urlUser = await db.query(`SELECT users.id, users.name, users."visitCount", json_agg((urls.id, urls."shortUrl" , urls.url, urls."visitCount"  )) AS "littleUrl" FROM urls 
    JOIN users ON users.id =
    urls."userId" 
    JOIN sessions ON sessions."userId" = 
    users.id WHERE sessions.token = $1
    Group BY users.id    
    `,([token]))
    
    if (urlUser.rows[0] === undefined) {
        const uToken = await db.query(`SELECT * FROM sessions WHERE token = $1`, ([token]))

      const uUrl = await db.query(`SELECT id, name, "visitCount", FROM users WHERE id = $1`,
    [uToken.rows[0].userId])

    return res.send({ ...uUrl.rows[0], littleUrl: [] })

    }


    const resultado = urlUser.rows[0]?.littleUrl.map((detail) => {
        return {
      id: detail.f1,
      ShortUrl: detail.f2,
      url: detail.f3,
      visitCount: detail.f4,
    }
  })


  return res.send({ ...urlUser.rows[0], littleUrl: result });



} catch (err) {
    res.status().send()
}
}

export async function ranking (req, res) {

    try {

        const rank = await db.query(`SELECT id, name, "linksCount", "visitCount" FROM users GROUP BY id ORDER BY "visitCount" desc limit 10 `)
    
        res.status(200).send(ranking.rows)


    } catch (err) {

    }







}