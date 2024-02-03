import { db } from '../connect.js';

export const detailController = (req, res) => {

    const school = req.query.school

    // const query = "SELECT `truong`.`TEN_TRUONG`, `diem_chuan`.`MA_TRUONG`, `truong`.`QUAN/HUYEN`, `diem_chuan`.`MA_NV`, `diem_chuan`.`DIEM` FROM `diem_chuan` LEFT OUTER JOIN `truong` on `truong`.`MA_TRUONG` = `diem_chuan`.`MA_TRUONG` WHERE (`truong`.`TEN_TRUONG` LIKE '%" + keyword + "%' AND (" + type + ") AND `diem_chuan`.`NAM_HOC` = " + year + ");"
    const query = "SELECT * FROM `links` WHERE `TEN_TRUONG` LIKE '%" + school + "%';";

    db.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

}