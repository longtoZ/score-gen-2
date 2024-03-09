import { pool } from "../connect.js";

export const visualYearController = (req, res) => {
  const school = req.query.school.replace(/[^\w\s]/g, "\\$&");

  const query = `SELECT "truong"."ma_truong", "diem_chuan"."nam_hoc", "truong"."ten_truong", "truong"."QUAN/HUYEN", "diem_chuan"."ma_nv", "diem_chuan"."diem", "truong"."ma_loai" FROM "diem_chuan" LEFT OUTER JOIN "truong" on "truong"."ma_truong" = "diem_chuan"."ma_truong" WHERE "ten_truong" ILIKE '%${school}%' AND ("truong"."ma_loai" = 'L02' OR "truong"."ma_loai" = 'L03') ORDER BY "ma_truong" ASC;`;

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