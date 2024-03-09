import { pool } from "../connect.js";

export const visualAreaController = (req, res) => {
  const district = req.query.district;
  const year = req.query.year;
  const wish = req.query.wish;

  const query = `SELECT "truong"."ten_truong", "diem_chuan"."ma_truong", "truong"."QUAN/HUYEN", "diem_chuan"."ma_nv", "diem_chuan"."diem" FROM "diem_chuan" LEFT OUTER JOIN "truong" on "truong"."ma_truong" = "diem_chuan"."ma_truong" WHERE "QUAN/HUYEN" = '${district}' AND "nam_hoc" = ${year} AND ("ma_nv" = '${wish}') ORDER BY "diem" DESC`;

  pool
    .connect()
    .then((client) => {
      console.log("ready to query...");

      pool.query(query, (error, result) => {
        if (error) {
          res.status(500).send("Error: " + error);
        } else {
          res.status(200).send(result.rows);
        }
      });

      client.release();
    })
    .catch((error) => {
      res.status(500).send("Error: " + error);
    });
};