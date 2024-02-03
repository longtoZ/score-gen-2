import { db } from '../connect.js';
import { schoolTypesObj } from '../constants/lists.js';

export const searchController = (req, res) => {

    const keyword = req.query.keyword
    const type = req.query.type==="Trường thường" ? "`truong`.`MA_LOAI` = 'L02' OR `truong`.`MA_LOAI` = 'L03'" : "`truong`.`MA_LOAI` = " + `'${schoolTypesObj[req.query.type]}'` + " AND `diem_chuan`.`MA_NV` LIKE '%\\_%'"
    const year = req.query.year

    const query = "SELECT `truong`.`TEN_TRUONG`, `diem_chuan`.`MA_TRUONG`, `truong`.`QUAN/HUYEN`, `diem_chuan`.`MA_NV`, `diem_chuan`.`DIEM` FROM `diem_chuan` LEFT OUTER JOIN `truong` on `truong`.`MA_TRUONG` = `diem_chuan`.`MA_TRUONG` WHERE (`truong`.`TEN_TRUONG` LIKE '%" + keyword + "%' AND (" + type + ") AND `diem_chuan`.`NAM_HOC` = " + year + ");"
    
    db.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

}