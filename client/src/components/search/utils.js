import axios from 'axios';

export const getAxios = (type, year) => {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_SERVER + '/api/search', {
                params: { type, year },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const handleData = (data) => {
    let result = [];
    let code = '';
    let school = ['', '', {}];

    for (let i = 0; i < data.length; i++) {
        if (code === '') {
            if (i !== 0) {
                school[0] = data[i - 1]['ten_truong'];
                school[1] = data[i - 1]['QUAN/HUYEN'];
                school[2][data[i - 1]['ma_nv']] = data[i - 1]['diem'];
                school[2][data[i]['ma_nv']] = data[i]['diem'];
                code = data[i - 1]['ma_truong'];
            } else {
                school[0] = data[i]['ten_truong'];
                school[1] = data[i]['QUAN/HUYEN'];
                school[2][data[i]['ma_nv']] = data[i]['diem'];
                code = data[i]['ma_truong'];
            }
        } else if (code === data[i]['ma_truong']) {
            school[2][data[i]['ma_nv']] = data[i]['diem'];
        } else if (code !== data[i]['ma_truong']) {
            result.push(school);
            school = ['', '', {}];
            code = '';
        }

        if (i === data.length - 1) {
            result.push(school);
            school = ['', '', {}];
            code = '';
        }
    }

    return result;
};

export const getDetailInfo = (school) => {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_SERVER + '/api/detail', {
                params: { school },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
