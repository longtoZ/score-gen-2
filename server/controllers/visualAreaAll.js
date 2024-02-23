import { pool } from "../connect.js";

export const visualAreaAllController = (req, res) => {
  const district = req.query.district;
  const year = req.query.year;

  const query = `SELECT "truong"."ten_truong", "diem_chuan"."ma_truong", "truong"."QUAN/HUYEN", "diem_chuan"."nam_hoc", "diem_chuan"."ma_nv", "diem_chuan"."diem" FROM "diem_chuan" LEFT OUTER JOIN "truong" on "truong"."ma_truong" = "diem_chuan"."ma_truong" WHERE "QUAN/HUYEN" ILIKE '%${district}' AND "nam_hoc" = ${year} AND "ma_nv" LIKE 'NV_' ORDER BY "ma_truong" ASC`;

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
      console.error("Error: " + error);
    });
};
