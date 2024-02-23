import { pool } from "../connect.js";

export const suggestController = (req, res) => {
  const schoolType = req.query.schoolType;
  const wish = req.query.wish;
  const extend =
    schoolType === "Lớp thường"
      ? "IN ('NV1', 'NV2', 'NV3')"
      : "ILIKE '%" + wish + "%'";

  const query =
    `select "truong"."ten_truong", "diem_chuan"."ma_truong", "truong"."QUAN/HUYEN", "diem_chuan"."nam_hoc" ,"diem_chuan"."ma_nv", "diem_chuan"."diem" from "diem_chuan" left outer join "truong" on "truong"."ma_truong" = "diem_chuan"."ma_truong" where "diem_chuan"."ma_nv"` +
    extend +
    ` AND "nam_hoc" <> 2021;`;

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
