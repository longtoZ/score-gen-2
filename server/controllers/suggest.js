import { db } from "../connect.js";

export const suggestController = (req, res) => {
  const schoolType = req.query.schoolType;
  const wish = req.query.wish;
  const extend =
    schoolType === "Lớp thường"
      ? "IN ('NV1', 'NV2', 'NV3')"
      : "LIKE '%" + wish + "%'";

  const query =
    "SELECT `truong`.`TEN_TRUONG`, `diem_chuan`.`MA_TRUONG`, `truong`.`QUAN/HUYEN`, `diem_chuan`.`NAM_HOC` ,`diem_chuan`.`MA_NV`, `diem_chuan`.`DIEM` FROM `diem_chuan` LEFT OUTER JOIN `truong` on `truong`.`MA_TRUONG` = `diem_chuan`.`MA_TRUONG` WHERE `diem_chuan`.`MA_NV` " +
    extend +
    " AND `NAM_HOC` <> 2021;";

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
