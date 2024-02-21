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
        MA_TRUONG: '',
        NAM_HOC: 0,
        TEN_TRUONG: '',
        'QUAN/HUYEN': '',
        MA_LOAI: '',
        DIEM: {},
    };

    if (data.length !== 0) {
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
                    MA_TRUONG: '',
                    NAM_HOC: 0,
                    TEN_TRUONG: '',
                    'QUAN/HUYEN': '',
                    MA_LOAI: '',
                    DIEM: {},
                };
                year = '';
            }

            if (i === data.length - 1) {
                result.push(school);
                school = {
                    MA_TRUONG: '',
                    NAM_HOC: 0,
                    TEN_TRUONG: '',
                    'QUAN/HUYEN': '',
                    MA_LOAI: '',
                    DIEM: {},
                };
                year = '';
            }
        }
    }

    return result;
};

export const handleDataCompete = (data) => {
    const code = data[0]['MA_TRUONG'];
    const result = {
        MA_TRUONG: data[0]['MA_TRUONG'],
        TEN_TRUONG: data[0]['TEN_TRUONG'],
        'QUAN/HUYEN': data[0]['QUAN/HUYEN'],
        DATA: [],
    };

    for (let i = 0; i < data.length; i++) {
        if (code !== data[i]['MA_TRUONG']) {
            break;
        }

        result.DATA.push({
            NAM_HOC: data[i]['NAM_HOC'],
            CHI_TIEU: data[i]['CHI_TIEU'],
            SO_LUONG: data[i]['SO_LUONG'],
        });
    }

    return result;
};

export const handleDataArea = (data) => {
    const result = {
        'QUAN/HUYEN': data[0]['QUAN/HUYEN'],
        MA_NV: data[0]['MA_NV'],
        DATA: Array.from(data, (item) => {
            return {
                MA_TRUONG: item['MA_TRUONG'],
                TEN_TRUONG: item['TEN_TRUONG'],
                DIEM: item['DIEM'],
            };
        }),
    };

    return result;
};

export const handleDataAreaAll = (data) => {
    let result = [];
    let code = '';
    let school = {
        MA_TRUONG: '',
        TEN_TRUONG: '',
        'QUAN/HUYEN': '',
        NAM_HOC: 0,
        DIEM: {},
    };

    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            if (code === '') {
                if (i !== 0) {
                    school['MA_TRUONG'] = data[i - 1]['MA_TRUONG'];
                    school['TEN_TRUONG'] = data[i - 1]['TEN_TRUONG'];
                    school['QUAN/HUYEN'] = data[i - 1]['QUAN/HUYEN'];
                    school['NAM_HOC'] = data[i - 1]['NAM_HOC'];
                    school['DIEM'][data[i - 1]['MA_NV']] = data[i - 1]['DIEM'];
                    school['DIEM'][data[i]['MA_NV']] = data[i]['DIEM'];
                    code = data[i - 1]['MA_TRUONG'];
                } else {
                    school['MA_TRUONG'] = data[i]['MA_TRUONG'];
                    school['TEN_TRUONG'] = data[i]['TEN_TRUONG'];
                    school['QUAN/HUYEN'] = data[i]['QUAN/HUYEN'];
                    school['NAM_HOC'] = data[i]['NAM_HOC'];
                    school['DIEM'][data[i]['MA_NV']] = data[i]['DIEM'];
                    code = data[i]['MA_TRUONG'];
                }
            } else if (code === data[i]['MA_TRUONG']) {
                school['DIEM'][data[i]['MA_NV']] = data[i]['DIEM'];
            } else if (code !== data[i]['MA_TRUONG']) {
                result.push(school);
                school = {
                    MA_TRUONG: '',
                    TEN_TRUONG: '',
                    'QUAN/HUYEN': '',
                    NAM_HOC: 0,
                    DIEM: {},
                };
                code = '';
            }

            if (i === data.length - 1) {
                result.push(school);
                school = {
                    MA_TRUONG: '',
                    TEN_TRUONG: '',
                    'QUAN/HUYEN': '',
                    NAM_HOC: 0,
                    DIEM: {},
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
            MA_TRUONG: item['MA_TRUONG'],
            TEN_TRUONG: item['TEN_TRUONG'],
            NAM_HOC: item['NAM_HOC'],
            MA_NV: item['MA_NV'],
            DIEM: item['DIEM'],
        };
    });

    return result;
};

export const handleDataSpecial = (data) => {
    let result = [];
    let code = '';
    let school = {
        MA_TRUONG: '',
        TEN_TRUONG: '',
        'QUAN/HUYEN': '',
        NAM_HOC: 0,
        DIEM: {},
    };

    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            if (code === '') {
                if (i !== 0) {
                    school['MA_TRUONG'] = data[i - 1]['MA_TRUONG'];
                    school['TEN_TRUONG'] = data[i - 1]['TEN_TRUONG'];
                    school['QUAN/HUYEN'] = data[i - 1]['QUAN/HUYEN'];
                    school['NAM_HOC'] = data[i - 1]['NAM_HOC'];
                    school['DIEM'][data[i - 1]['MA_NV']] = data[i - 1]['DIEM'];
                    school['DIEM'][data[i]['MA_NV']] = data[i]['DIEM'];
                    code = data[i - 1]['MA_TRUONG'];
                } else {
                    school['MA_TRUONG'] = data[i]['MA_TRUONG'];
                    school['TEN_TRUONG'] = data[i]['TEN_TRUONG'];
                    school['QUAN/HUYEN'] = data[i]['QUAN/HUYEN'];
                    school['NAM_HOC'] = data[i]['NAM_HOC'];
                    school['DIEM'][data[i]['MA_NV']] = data[i]['DIEM'];
                    code = data[i]['MA_TRUONG'];
                }
            } else if (code === data[i]['MA_TRUONG']) {
                school['DIEM'][data[i]['MA_NV']] = data[i]['DIEM'];
            } else if (code !== data[i]['MA_TRUONG']) {
                result.push(school);
                school = {
                    MA_TRUONG: '',
                    TEN_TRUONG: '',
                    'QUAN/HUYEN': '',
                    NAM_HOC: 0,
                    DIEM: {},
                };
                code = '';
            }

            if (i === data.length - 1) {
                result.push(school);
                school = {
                    MA_TRUONG: '',
                    TEN_TRUONG: '',
                    'QUAN/HUYEN': '',
                    NAM_HOC: 0,
                    DIEM: {},
                };
                code = '';
            }
        }
    }

    return result;
};
