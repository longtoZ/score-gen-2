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
            calc[school['MA_TRUONG']] = {};

            if (schoolType === 'Lớp thường') {
                calc[school['MA_TRUONG']]['NV1'] = [];
                calc[school['MA_TRUONG']]['NV2'] = [];
                calc[school['MA_TRUONG']]['NV3'] = [];
            } else {
                calc[school['MA_TRUONG']][wish.replace('%', '1')] = [];
                calc[school['MA_TRUONG']][wish.replace('%', '2')] = [];
            }

            calc[school['MA_TRUONG']]['INFO'] = [
                school['TEN_TRUONG'],
                school['QUAN/HUYEN'],
            ];
        }

        for (let i = 0; i < data.length; i++) {
            const school = data[i];

            if (school['DIEM'] !== 0) {
                if (schoolType === 'Lớp thường') {
                    calc[school['MA_TRUONG']][school['MA_NV']].push(
                        calcScore(school['DIEM'], school['NAM_HOC']),
                    );
                } else {
                    calc[school['MA_TRUONG']][school['MA_NV']].push(
                        school['DIEM'],
                    );
                }
            }
        }

        const full = [];
        for (const info of Object.entries(calc)) {
            const value = info[1];

            if (schoolType === 'Lớp thường') {
                full.push({
                    name: value['INFO'][0],
                    district: value['INFO'][1],
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
                    name: value['INFO'][0],
                    district: value['INFO'][1],
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
