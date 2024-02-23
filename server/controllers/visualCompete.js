import { pool } from "../connect.js";

export const visualCompeteController = (req, res) => {
  const school = req.query.school.replace(/[^\w\s]/g, "\\$&");

  const query = `SELECT "chi_tieu"."nam_hoc", "truong"."ten_truong", "chi_tieu"."ma_truong", "truong"."QUAN/HUYEN", "chi_tieu"."chi_tieu", "chi_tieu"."so_luong" FROM "chi_tieu" LEFT OUTER JOIN "truong" on "truong"."ma_truong" = "chi_tieu"."ma_truong" WHERE "ten_truong" ILIKE '%${school}%'  AND ("truong"."ma_loai" = 'L02' OR "truong"."ma_loai" = 'L03') ORDER BY "ma_truong" ASC;`;

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
