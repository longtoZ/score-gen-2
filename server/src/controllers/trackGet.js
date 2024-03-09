import { db } from "../connect.js";

export const trackGetController = (req, res) => {
  const query = "SELECT * FROM `activity` WHERE `IP` = '" + req.query.ip + "'"
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
