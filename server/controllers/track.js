import { db } from "../connect.js";

export const trackController = (req, res) => {
    const ip = req.query.ip;
    const data = req.query.data;
    const userInfo = req.query.userInfo;
    const time = req.query.time;
    
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
