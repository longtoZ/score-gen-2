import { pool } from '../connect.js'

export const detailController = (req, res) => {

    const school = req.query.school.replace(/[^\w\s]/g, "\\$&")

    const query = `SELECT * FROM "links" WHERE "ten_truong" ILIKE '%` + school + `%';`;

    pool.connect()
    .then((client) => {
      console.log("ready to query...")

      pool.query(query, (error, result) => {
        if (error) {
          res.status(500).send("Error: " + error);
        } else {
          res.status(200).send(result.rows);
        }
      })

      client.release();
    })
    .catch((error) => {
        res.status(500).send("Error: " + error);
    })

}