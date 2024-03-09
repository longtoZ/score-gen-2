import { pool } from "../connect.js";

export const visualSpecialController = (req, res) => {
  const year = req.query.year;
  const wish = req.query.wish.replaceAll('%25', '%');

  const query =
    `SELECT "truong"."ten_truong", "diem_chuan"."ma_truong", "truong"."QUAN/HUYEN", "diem_chuan"."nam_hoc", "diem_chuan"."ma_nv", "diem_chuan"."diem" FROM "diem_chuan" LEFT OUTER JOIN "truong" on "truong"."ma_truong" = "diem_chuan"."ma_truong" WHERE "nam_hoc" = ${year} AND "ma_nv" = '${wish}' ORDER BY "ma_truong" ASC`;

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