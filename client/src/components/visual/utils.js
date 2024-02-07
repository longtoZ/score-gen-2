import axios from 'axios';

export const getAxiosYear = (school) => {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_SERVER + '/api/visual/year', {
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

export const handleDataYear = (data) => {

    let result = [];
    let year = '';
    let code = '';
    let school = {
        'MA_TRUONG': '',
        'NAM_HOC': 0,
        'TEN_TRUONG': '',
        'QUAN/HUYEN': '',
        'MA_LOAI': '',
        'DIEM': {}
    };

    for (let i = 0; i < data.length; i++) {
        if (year === '') {
            if (i !== 0) {

                if (code !== data[i]['MA_TRUONG']) {
                    break;
                }

                school['MA_TRUONG'] = data[i - 1]['MA_TRUONG'];
                school['NAM_HOC'] = data[i - 1]['NAM_HOC'];
                school['TEN_TRUONG'] = data[i - 1]['TEN_TRUONG'];
                school['QUAN/HUYEN'] = data[i - 1]['QUAN/HUYEN'];
                school['MA_LOAI'] = data[i - 1]['MA_LOAI'];
                school['DIEM'][data[i - 1]['MA_NV']] = data[i - 1]['DIEM'];
                school['DIEM'][data[i]['MA_NV']] = data[i]['DIEM'];
                year = data[i - 1]['NAM_HOC'];
                code = data[i - 1]['MA_TRUONG'];
            } else {
                school['MA_TRUONG'] = data[i]['MA_TRUONG'];
                school['NAM_HOC'] = data[i]['NAM_HOC'];
                school['TEN_TRUONG'] = data[i]['TEN_TRUONG'];
                school['QUAN/HUYEN'] = data[i]['QUAN/HUYEN'];
                school['MA_LOAI'] = data[i]['MA_LOAI'];
                school['DIEM'][data[i]['MA_NV']] = data[i]['DIEM'];
                year = data[i]['NAM_HOC'];
                code = data[i]['MA_TRUONG'];
            }
        } else if (year === data[i]['NAM_HOC']) {
            school['DIEM'][data[i]['MA_NV']] = data[i]['DIEM'];
        } else if (year !== data[i]['NAM_HOC']) {
            result.push(school);
            school = {
                'MA_TRUONG': '',
                'NAM_HOC': 0,
                'TEN_TRUONG': '',
                'QUAN/HUYEN': '',
                'MA_LOAI': '',
                'DIEM': {}
            };
            year = '';
        }

        if (i === data.length - 1) {
            result.push(school);
            school = {
                'MA_TRUONG': '',
                'NAM_HOC': 0,
                'TEN_TRUONG': '',
                'QUAN/HUYEN': '',
                'MA_LOAI': '',
                'DIEM': {}
            };
            year = '';
        }
    }

    return result;

}