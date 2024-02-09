import { db } from "../connect.js";

export const visualCompeteController = (req, res) => {
  const school = req.query.school;

  const query =
    "SELECT `chi_tieu`.`NAM_HOC`, `truong`.`TEN_TRUONG`, `chi_tieu`.`MA_TRUONG`, `truong`.`QUAN/HUYEN`, `chi_tieu`.`CHI_TIEU`, `chi_tieu`.`SO_LUONG` FROM `chi_tieu` LEFT OUTER JOIN `truong` on `truong`.`MA_TRUONG` = `chi_tieu`.`MA_TRUONG` WHERE `TEN_TRUONG` LIKE '%" + school + "%'  AND (`truong`.`MA_LOAI` = 'L02' OR `truong`.`MA_LOAI` = 'L03') ORDER BY `MA_TRUONG` ASC;";

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};