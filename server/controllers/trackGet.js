import { pool } from '../connect.js';

export const trackGetController = (req, res) => {
  const query = `SELECT * FROM "activity" WHERE "ip" = '` + req.query.ip + "'"
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
    console.error("Error: " + error);
  })
};
