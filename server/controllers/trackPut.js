import { db } from "../connect.js";

export const trackPutController = (req, res) => {
    const ip = req.body.params.ip;
    const time = req.body.params.time;
    const userInfo = req.body.params.userInfo;
    // const data = req.body.params.data;

  const query = "UPDATE `activity` SET `PLATFORM` = '" + userInfo + "', `TIME` = '" + time + "', `COUNT` = `COUNT`+1 WHERE `IP` = '" + ip +"'";
    
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};