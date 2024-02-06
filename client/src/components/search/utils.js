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
                school[0] = data[i - 1]['TEN_TRUONG'];
                school[1] = data[i - 1]['QUAN/HUYEN'];
                school[2][data[i - 1]['MA_NV']] = data[i - 1]['DIEM'];
                school[2][data[i]['MA_NV']] = data[i]['DIEM'];
                code = data[i - 1]['MA_TRUONG'];
            } else {
                school[0] = data[i]['TEN_TRUONG'];
                school[1] = data[i]['QUAN/HUYEN'];
                school[2][data[i]['MA_NV']] = data[i]['DIEM'];
                code = data[i]['MA_TRUONG'];
            }
        } else if (code === data[i]['MA_TRUONG']) {
            school[2][data[i]['MA_NV']] = data[i]['DIEM'];
        } else if (code !== data[i]['MA_TRUONG']) {
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
