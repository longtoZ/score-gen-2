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

export const getAxiosCompete = (school) => {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_SERVER + '/api/visual/compete', {
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

export const getAxiosArea = (district, year, wish) => {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_SERVER + '/api/visual/area', {
                params: { district, year, wish },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getAxiosAreaAll = (district, year) => {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_SERVER + '/api/visual/areaAll', {
                params: { district, year },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getAxiosGroup = (year, wish, score, diff) => {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_SERVER + '/api/visual/group', {
                params: { year, wish, score, diff },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getAxiosSpecial = (year, wish) => {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_SERVER + '/api/visual/special', {
                params: { year, wish },
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
        ma_truong: '',
        nam_hoc: 0,
        ten_truong: '',
        'QUAN/HUYEN': '',
        ma_loai: '',
        diem: {},
    };

    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            if (year === '') {
                if (i !== 0) {
                    if (code !== data[i]['ma_truong']) {
                        break;
                    }

                    school['ma_truong'] = data[i - 1]['ma_truong'];
                    school['nam_hoc'] = data[i - 1]['nam_hoc'];
                    school['ten_truong'] = data[i - 1]['ten_truong'];
                    school['QUAN/HUYEN'] = data[i - 1]['QUAN/HUYEN'];
                    school['ma_loai'] = data[i - 1]['ma_loai'];
                    school['diem'][data[i - 1]['ma_nv']] = data[i - 1]['diem'];
                    school['diem'][data[i]['ma_nv']] = data[i]['diem'];
                    year = data[i - 1]['nam_hoc'];
                    code = data[i - 1]['ma_truong'];
                } else {
                    school['ma_truong'] = data[i]['ma_truong'];
                    school['nam_hoc'] = data[i]['nam_hoc'];
                    school['ten_truong'] = data[i]['ten_truong'];
                    school['QUAN/HUYEN'] = data[i]['QUAN/HUYEN'];
                    school['ma_loai'] = data[i]['ma_loai'];
                    school['diem'][data[i]['ma_nv']] = data[i]['diem'];
                    year = data[i]['nam_hoc'];
                    code = data[i]['ma_truong'];
                }
            } else if (year === data[i]['nam_hoc']) {
                school['diem'][data[i]['ma_nv']] = data[i]['diem'];
            } else if (year !== data[i]['nam_hoc']) {
                result.push(school);
                school = {
                    ma_truong: '',
                    nam_hoc: 0,
                    ten_truong: '',
                    'QUAN/HUYEN': '',
                    ma_loai: '',
                    diem: {},
                };
                year = '';
            }

            if (i === data.length - 1) {
                result.push(school);
                school = {
                    ma_truong: '',
                    nam_hoc: 0,
                    ten_truong: '',
                    'QUAN/HUYEN': '',
                    ma_loai: '',
                    diem: {},
                };
                year = '';
            }
        }
    }

    return result;
};

export const handleDataCompete = (data) => {
    const code = data[0]['ma_truong'];
    const result = {
        ma_truong: data[0]['ma_truong'],
        ten_truong: data[0]['ten_truong'],
        'QUAN/HUYEN': data[0]['QUAN/HUYEN'],
        DATA: [],
    };

    for (let i = 0; i < data.length; i++) {
        if (code !== data[i]['ma_truong']) {
            break;
        }

        result.DATA.push({
            nam_hoc: data[i]['nam_hoc'],
            chi_tieu: data[i]['chi_tieu'],
            so_luong: data[i]['so_luong'],
        });
    }

    return result;
};

export const handleDataArea = (data) => {
    const result = {
        'QUAN/HUYEN': data[0]['QUAN/HUYEN'],
        ma_nv: data[0]['ma_nv'],
        DATA: Array.from(data, (item) => {
            return {
                ma_truong: item['ma_truong'],
                ten_truong: item['ten_truong'],
                diem: item['diem'],
            };
        }),
    };

    return result;
};

export const handleDataAreaAll = (data) => {
    let result = [];
    let code = '';
    let school = {
        ma_truong: '',
        ten_truong: '',
        'QUAN/HUYEN': '',
        nam_hoc: 0,
        diem: {},
    };

    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            if (code === '') {
                if (i !== 0) {
                    school['ma_truong'] = data[i - 1]['ma_truong'];
                    school['ten_truong'] = data[i - 1]['ten_truong'];
                    school['QUAN/HUYEN'] = data[i - 1]['QUAN/HUYEN'];
                    school['nam_hoc'] = data[i - 1]['nam_hoc'];
                    school['diem'][data[i - 1]['ma_nv']] = data[i - 1]['diem'];
                    school['diem'][data[i]['ma_nv']] = data[i]['diem'];
                    code = data[i - 1]['ma_truong'];
                } else {
                    school['ma_truong'] = data[i]['ma_truong'];
                    school['ten_truong'] = data[i]['ten_truong'];
                    school['QUAN/HUYEN'] = data[i]['QUAN/HUYEN'];
                    school['nam_hoc'] = data[i]['nam_hoc'];
                    school['diem'][data[i]['ma_nv']] = data[i]['diem'];
                    code = data[i]['ma_truong'];
                }
            } else if (code === data[i]['ma_truong']) {
                school['diem'][data[i]['ma_nv']] = data[i]['diem'];
            } else if (code !== data[i]['ma_truong']) {
                result.push(school);
                school = {
                    ma_truong: '',
                    ten_truong: '',
                    'QUAN/HUYEN': '',
                    nam_hoc: 0,
                    diem: {},
                };
                code = '';
            }

            if (i === data.length - 1) {
                result.push(school);
                school = {
                    ma_truong: '',
                    ten_truong: '',
                    'QUAN/HUYEN': '',
                    nam_hoc: 0,
                    diem: {},
                };
                code = '';
            }
        }
    }

    return result;
};

export const handleDataGroup = (data) => {
    const result = Array.from(data, (item) => {
        return {
            'QUAN/HUYEN': item['QUAN/HUYEN'],
            ma_truong: item['ma_truong'],
            ten_truong: item['ten_truong'],
            nam_hoc: item['nam_hoc'],
            ma_nv: item['ma_nv'],
            diem: item['diem'],
        };
    });

    return result;
};

export const handleDataSpecial = (data) => {
    let result = [];
    let code = '';
    let school = {
        ma_truong: '',
        ten_truong: '',
        'QUAN/HUYEN': '',
        nam_hoc: 0,
        diem: {},
    };

    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            if (code === '') {
                if (i !== 0) {
                    school['ma_truong'] = data[i - 1]['ma_truong'];
                    school['ten_truong'] = data[i - 1]['ten_truong'];
                    school['QUAN/HUYEN'] = data[i - 1]['QUAN/HUYEN'];
                    school['nam_hoc'] = data[i - 1]['nam_hoc'];
                    school['diem'][data[i - 1]['ma_nv']] = data[i - 1]['diem'];
                    school['diem'][data[i]['ma_nv']] = data[i]['diem'];
                    code = data[i - 1]['ma_truong'];
                } else {
                    school['ma_truong'] = data[i]['ma_truong'];
                    school['ten_truong'] = data[i]['ten_truong'];
                    school['QUAN/HUYEN'] = data[i]['QUAN/HUYEN'];
                    school['nam_hoc'] = data[i]['nam_hoc'];
                    school['diem'][data[i]['ma_nv']] = data[i]['diem'];
                    code = data[i]['ma_truong'];
                }
            } else if (code === data[i]['ma_truong']) {
                school['diem'][data[i]['ma_nv']] = data[i]['diem'];
            } else if (code !== data[i]['ma_truong']) {
                result.push(school);
                school = {
                    ma_truong: '',
                    ten_truong: '',
                    'QUAN/HUYEN': '',
                    nam_hoc: 0,
                    diem: {},
                };
                code = '';
            }

            if (i === data.length - 1) {
                result.push(school);
                school = {
                    ma_truong: '',
                    ten_truong: '',
                    'QUAN/HUYEN': '',
                    nam_hoc: 0,
                    diem: {},
                };
                code = '';
            }
        }
    }

    return result;
};