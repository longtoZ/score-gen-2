import { pool } from '../connect.js';

export const trackPutController = (req, res) => {
    const ip = req.body.params.ip;
    const time = req.body.params.time;
    const userInfo = req.body.params.userInfo;
    // const data = req.body.params.data;

  const query = `UPDATE "activity" SET "platform" = '${userInfo}', "time" = '${time}', "count" = "count"+1 WHERE "ip" = '${ip}'`;
    
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