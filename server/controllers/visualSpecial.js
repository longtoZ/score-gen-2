import { db } from "../connect.js";

export const visualSpecialController = (req, res) => {
  const year = req.query.year;
  const wish = req.query.wish;

  const query =
    "SELECT `truong`.`TEN_TRUONG`, `diem_chuan`.`MA_TRUONG`, `truong`.`QUAN/HUYEN`, `diem_chuan`.`NAM_HOC`, `diem_chuan`.`MA_NV`, `diem_chuan`.`DIEM` FROM `diem_chuan` LEFT OUTER JOIN `truong` on `truong`.`MA_TRUONG` = `diem_chuan`.`MA_TRUONG` WHERE `NAM_HOC` = " + year + " AND `MA_NV` LIKE '" + wish + "' ORDER BY `MA_TRUONG` ASC";

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};