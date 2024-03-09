import axios from 'axios';

export const getAxiosCommon = (schoolType, wish) => {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_SERVER + '/api/suggest', {
                params: { schoolType, wish },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const calcScore = (score, year) => {
    return year <= 2020 ? (score / 50) * 100 : (score / 30) * 100;
};

export const handleData = (data, schoolType, wish) => {
    return new Promise((resolve) => {
        const calc = {};

        for (let i = 0; i < data.length; i++) {
            const school = data[i];
            calc[school['ma_truong']] = {};

            if (schoolType === 'Lớp thường') {
                calc[school['ma_truong']]['NV1'] = [];
                calc[school['ma_truong']]['NV2'] = [];
                calc[school['ma_truong']]['NV3'] = [];
            } else {
                calc[school['ma_truong']][wish.replace('%', '1')] = [];
                calc[school['ma_truong']][wish.replace('%', '2')] = [];
            }

            calc[school['ma_truong']]['info'] = [
                school['ten_truong'],
                school['QUAN/HUYEN'],
            ];
        }

        for (let i = 0; i < data.length; i++) {
            const school = data[i];

            if (school['diem'] !== 0) {
                if (schoolType === 'Lớp thường') {
                    calc[school['ma_truong']][school['ma_nv']].push(
                        calcScore(school['diem'], school['nam_hoc']),
                    );
                } else {
                    calc[school['ma_truong']][school['ma_nv']].push(
                        school['diem'],
                    );
                }
            }
        }

        const full = [];
        for (const info of Object.entries(calc)) {
            const value = info[1];

            if (schoolType === 'Lớp thường') {
                full.push({
                    name: value['info'][0],
                    district: value['info'][1],
                    NV1:
                        value['NV1'].length > 0
                            ? (
                                  value['NV1'].reduce((a, b) => a + b) /
                                  value['NV1'].length
                              ).toFixed(2)
                            : 0,
                    NV2:
                        value['NV2'].length > 0
                            ? (
                                  value['NV2'].reduce((a, b) => a + b) /
                                  value['NV2'].length
                              ).toFixed(2)
                            : 0,
                    NV3:
                        value['NV3'].length > 0
                            ? (
                                  value['NV3'].reduce((a, b) => a + b) /
                                  value['NV3'].length
                              ).toFixed(2)
                            : 0,
                });
            } else {
                full.push({
                    name: value['info'][0],
                    district: value['info'][1],
                    NV1:
                        value[wish.replace('%', '1')].length > 0
                            ? (
                                  value[wish.replace('%', '1')].reduce(
                                      (a, b) => a + b,
                                  ) / value[wish.replace('%', '1')].length
                              ).toFixed(2)
                            : 0,
                    NV2:
                        value[wish.replace('%', '2')].length > 0
                            ? (
                                  value[wish.replace('%', '2')].reduce(
                                      (a, b) => a + b,
                                  ) / value[wish.replace('%', '2')].length
                              ).toFixed(2)
                            : 0,
                });
            }
        }

        resolve(full);
    });
};