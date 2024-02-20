import { db } from "../connect.js";

export const visualYearController = (req, res) => {
  const school = req.query.school.replace(/[^\w\s]/g, "\\$&");

  const query =
    "SELECT `truong`.`MA_TRUONG`, `diem_chuan`.`NAM_HOC`, `truong`.`TEN_TRUONG`, `truong`.`QUAN/HUYEN`, `diem_chuan`.`MA_NV`, `diem_chuan`.`DIEM`, `truong`.`MA_LOAI` FROM `diem_chuan` LEFT OUTER JOIN `truong` on `truong`.`MA_TRUONG` = `diem_chuan`.`MA_TRUONG` WHERE `TEN_TRUONG` LIKE '%" + school + "%' AND (`truong`.`MA_LOAI` = 'L02' OR `truong`.`MA_LOAI` = 'L03') ORDER BY `MA_TRUONG` ASC;";

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};