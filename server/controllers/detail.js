import { db } from '../connect.js';

export const detailController = (req, res) => {

    const school = req.query.school.replace(/[^\w\s]/g, "\\$&")

    const query = "SELECT * FROM `links` WHERE `TEN_TRUONG` LIKE '%" + school + "%';";

    db.query(query, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

}