
import { pool } from '../connect.js';
import { schoolTypesObj } from "../utils/lists.js";

export const searchController = (req, res) => {
  const type =
    req.query.type === "Trường thường"
      ? `"truong"."ma_loai" = 'L02' OR "truong"."ma_loai" = 'L03'`
      : `"truong"."ma_loai" = ` +
        `'${schoolTypesObj[req.query.type]}'` +
        ` AND "diem_chuan"."ma_nv" LIKE '%\\_%'`;
  const year = req.query.year;

  const query =
    `SELECT "truong"."ten_truong", "diem_chuan"."ma_truong", "truong"."QUAN/HUYEN", "diem_chuan"."ma_nv", "diem_chuan"."diem" FROM "diem_chuan" LEFT OUTER JOIN "truong" on "truong"."ma_truong" = "diem_chuan"."ma_truong" WHERE ((${type}) AND "diem_chuan"."nam_hoc" = ${year});`;

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
      res.status(500).send(error);
    })

};
