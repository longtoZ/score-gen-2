import { useState, useEffect, useContext } from 'react';
import { SchoolContext } from '../../pages/visual/Visual.jsx';
import { YearRange } from './inputs/YearRange.jsx';
import {
    BarElement,
    CategoryScale,
    Chart,
    LinearScale,
    Title,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './responsive.css';

Chart.register(
    ChartDataLabels,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
);

const wishFullName = {
    NV1: 'Nguyện vọng 1',
    NV2: 'Nguyện vọng 2',
    NV3: 'Nguyện vọng 3',
};

const color = [
    {
        bg: 'rgba(16, 185, 129, 0.2)',
        border: '#10b981',
    },
    {
        bg: 'rgba(6, 182, 212, 0.2)',
        border: '#06b6d4',
    },
    {
        bg: 'rgba(59, 130, 246, 0.2)',
        border: '#3b82f6',
    },
];

export const YearChart = () => {



    const { startYear, endYear, schoolData, singleWish } = useContext(SchoolContext);

    // console.log(schoolData)

    const years = [];
    for (let i = startYear; i <= endYear; i++) {
        years.push(i);
    }

    const wishes = {
        NV1: [],
        NV2: [],
        NV3: [],
    };
    const wishesPercentage = {
        NV1: [],
        NV2: [],
        NV3: [],
    };

    for (const data of schoolData) {
        const school = data['DATA'];

        wishes.NV1.push({
            TEN_TRUONG: data['TEN_TRUONG'],
            DIEM: Array.from(school, (s) =>
                years.includes(s['NAM_HOC']) ? s['DIEM']['NV1'] : null,
            ).filter((s) => s !== null),
        });

        wishes.NV2.push({
            TEN_TRUONG: data['TEN_TRUONG'],
            DIEM: Array.from(school, (s) =>
                years.includes(s['NAM_HOC']) ? s['DIEM']['NV2'] : null,
            ).filter((s) => s !== null),
        });

        wishes.NV3.push({
            TEN_TRUONG: data['TEN_TRUONG'],
            DIEM: Array.from(school, (s) =>
                years.includes(s['NAM_HOC']) ? s['DIEM']['NV3'] : null,
            ).filter((s) => s !== null),
        });

        wishesPercentage.NV1.push({
            TEN_TRUONG: data['TEN_TRUONG'],
            DIEM: Array.from(school, (s) => {
                if (years.includes(s['NAM_HOC'])) {
                    if (s['DIEM']['NV1'] === 0) {
                        return NaN
                    }

                    if (s['NAM_HOC'] < 2021) {
                        return ((s['DIEM']['NV1'] / 50) * 100).toFixed(2);
                    } else {
                        return ((s['DIEM']['NV1'] / 30) * 100).toFixed(2);
                    }
                }
                return null;
            }).filter((s) => s !== null),
        });

        wishesPercentage.NV2.push({
            TEN_TRUONG: data['TEN_TRUONG'],
            DIEM: Array.from(school, (s) => {
                if (years.includes(s['NAM_HOC'])) {
                    if (s['DIEM']['NV2'] === 0) {
                        return NaN
                    }

                    if (s['NAM_HOC'] < 2021) {
                        return ((s['DIEM']['NV2'] / 50) * 100).toFixed(2);
                    } else {
                        return ((s['DIEM']['NV2'] / 30) * 100).toFixed(2);
                    }
                }
                return null;
            }).filter((s) => s !== null),
        });

        wishesPercentage.NV3.push({
            TEN_TRUONG: data['TEN_TRUONG'],
            DIEM: Array.from(school, (s) => {
                if (years.includes(s['NAM_HOC'])) {
                    if (s['DIEM']['NV3'] === 0) {
                        return NaN
                    }

                    if (s['NAM_HOC'] < 2021) {
                        return ((s['DIEM']['NV3'] / 50) * 100).toFixed(2);
                    } else {
                        return ((s['DIEM']['NV3'] / 30) * 100).toFixed(2);
                    }
                }
                return null;
            }).filter((s) => s !== null),
        });
    }

    let delayedYear;
    const optionsYear = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: wishFullName[singleWish],
            },
            datalabels: {
                display: false,
                color: 'gray',
                align: 'top',
                anchor: 'end',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Năm',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Điểm',
                },
                // min: 0,
                max: 50,
            },
        },

        animation: {
            onComplete: () => {
                delayedYear = true;
            },
            delay: (context) => {
                let delay = 0;
                if (
                    context.type === 'data' &&
                    context.mode === 'default' &&
                    !delayedYear
                ) {
                    delay =
                        context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
    };

    let delayedTrend;
    const optionsTrend = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: wishFullName[singleWish],
            },
            datalabels: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Năm',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Phần trăm',
                },
            },
        },

        animation: {
            onComplete: () => {
                delayedTrend = true;
            },
            delay: (context) => {
                let delay = 0;
                if (
                    context.type === 'data' &&
                    context.mode === 'default' &&
                    !delayedTrend
                ) {
                    delay =
                        context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
    };

    const dataYear = {
        labels: years,
        datasets: Array.from(wishes[singleWish], (wish, index) => {
            return {
                label: wish['TEN_TRUONG'],
                data: wish['DIEM'],
                backgroundColor: color[index]['bg'],
                borderColor: color[index]['border'],
                borderWidth: 1,
            };
        }),
    };

    const dataTrend = {
        labels: years,
        datasets: Array.from(wishesPercentage[singleWish], (wish, index) => {
            return {
                label: wish['TEN_TRUONG'],
                data: wish['DIEM'],
                backgroundColor: color[index]['bg'],
                borderColor: color[index]['border'],
                borderWidth: 2,
                pointStyle: 'circle',
                pointRadius: 5,
            };
        }),
    };

    return (
        <>
            {schoolData.length !== 0 ? (
                <div className="mt-[5rem] grid grid-cols-2 gap-4 year-chart-grid">
                    <div className="shadow-basic rounded-lg overflow-hidden">
                        <h1 className="w-full bg-emerald-500 text-center text-white font-semibold text-lg py-2">
                            Điểm qua các năm
                        </h1>
                        <YearRange />
                        <div className="p-4 w-full">
                            <Bar
                                data={dataYear}
                                options={optionsYear}
                                plugins={[ChartDataLabels]}
                            />
                        </div>
                    </div>
                    <div className="shadow-basic rounded-lg overflow-hidden">
                        <h1 className="w-full bg-emerald-500 text-center text-white font-semibold text-lg py-2">
                            Xu hướng điểm (%)
                        </h1>
                        <div className="p-4 w-full h-[25rem]">
                            <Line
                                data={dataTrend}
                                options={optionsTrend}
                                plugins={[ChartDataLabels]}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};
