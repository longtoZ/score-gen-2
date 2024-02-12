import { db } from "../connect.js";

export const visualGroupController = (req, res) => {
  const year = req.query.year;
  const wish = req.query.wish;
  const score = parseFloat(req.query.score);
  const diff = parseFloat(req.query.diff);

  const query =
    "SELECT `truong`.`TEN_TRUONG`, `diem_chuan`.`MA_TRUONG`, `truong`.`QUAN/HUYEN`, `diem_chuan`.`NAM_HOC`, `diem_chuan`.`MA_NV`, `diem_chuan`.`DIEM` FROM `diem_chuan` LEFT OUTER JOIN `truong` on `truong`.`MA_TRUONG` = `diem_chuan`.`MA_TRUONG` WHERE (`DIEM` >= " + (score-diff) + " AND `DIEM` <= " + (score+diff) + ") AND `NAM_HOC` = " + year + " AND `MA_NV` = '" + wish + "' ORDER BY `DIEM` DESC";

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};