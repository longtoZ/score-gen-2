import { db } from "../connect.js";

export const trackPostController = (req, res) => {
    const ip = req.body.params.ip;
    const time = req.body.params.time;
    const userInfo = req.body.params.userInfo;
    const data = req.body.params.data;

  const query = "INSERT INTO `activity` (`IP`, `DATAS`, `PLATFORM`, `TIME`, `COUNT`) VALUES('" + ip + "', '" + data + "', '" + userInfo + "', '" + time + "', '1')"
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};