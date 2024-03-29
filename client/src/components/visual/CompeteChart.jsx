import { useContext } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';

import { SchoolContext } from '../../pages/visual/Visual.jsx';
import { SingleYear } from './inputs/SingleYear.jsx';
import { YearRange } from './inputs/YearRange.jsx';

import { yearsList } from '../../utils/lists.js';
import { ModeContext } from '../../utils/setModeContext.js';
import {
    ArcElement,
    Chart,
    Legend,
    LineElement,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';

Chart.register(ArcElement, Title, Tooltip, Legend, LineElement, LinearScale);

// const textCenter = {
//     id: 'textCenter',
//     beforeDatasetsDraw(chart, args, pluginOptions) {
//         const { ctx, data } = chart;

//         ctx.save();
//         ctx.font = 'bold 30px sans-serif';
//         ctx.fillStyle = 'black';
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         ctx.fillText(
//             'Center Text',
//             chart.getDatasetMeta(0).data[0].x,
//             chart.getDatasetMeta(0).data[0].y,
//         );
//     },
// };

const competeOptionsDoughnutChart = (title1) => {
    let delayed;
    return {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: title1,
            },
            legend: {
                display: true,
                position: 'top',
            },
            datalabels: {
                display: true,
                anchor: 'center',
            },
        },
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (
                    context.type === 'data' &&
                    context.mode === 'default' &&
                    !delayed
                ) {
                    delay =
                        context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
    };
};

const competeDataDoughnutChart = (target, total, bg, border) => {
    return {
        labels: ['Chỉ tiêu', 'Không đạt'],
        datasets: [
            {
                data: [target, total - target < 0 ? 0 : total - target],
                backgroundColor: [bg, 'rgba(156, 163, 175, 0.2)'],
                borderColor: [border, 'rgba(0,0,0,0)'],
                weight: 0.8,
            },
            {
                data: [],
                backgroundColor: [
                    'rgba(16, 185, 129, 0)',
                    'rgba(6, 182, 212, 0)',
                ],
                borderColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
            },
        ],
    };
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

const earliestYear = yearsList[yearsList.length - 1];

export const CompeteChart = () => {
    const { theme } = useContext(ModeContext);
    const { startYear, endYear, singleYear, competeData } =
        useContext(SchoolContext);

    const years = [];
    for (let i = startYear; i <= endYear; i++) {
        years.push(i);
    }

    let delayed;
    const optionsTrend = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                color: theme === 'light' ? '#18181b' : '#d4d4d8',
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
                ticks: {
                    color: theme === 'light' ? '#18181b' : '#d4d4d8',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Tỉ lệ',
                },
                ticks: {
                    color: theme === 'light' ? '#18181b' : '#d4d4d8',
                },
            },
        },
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (
                    context.type === 'data' &&
                    context.mode === 'default' &&
                    !delayed
                ) {
                    delay =
                        context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
    };

    const dataTrend = {
        labels: years,
        datasets: Array.from(competeData, (item, index) => {
            return {
                label: item['ten_truong'],
                data: years.map((year) =>
                    (
                        item['DATA'].find((item) => item['nam_hoc'] === year)[
                            'so_luong'
                        ] /
                        item['DATA'].find((item) => item['nam_hoc'] === year)[
                            'chi_tieu'
                        ]
                    ).toFixed(2),
                ),
                backgroundColor: color[index]['bg'],
                borderColor: color[index]['border'],
                // tension: 0.4
            };
        }),
    };

    return (
        <>
            {competeData.length !== 0 ? (
                <div className="mt-[3rem] flex justify-between gap-4 compete-chart-grid">
                    <div className="bg-container-color shadow-basic rounded-lg overflow-hidden w-[70%]">
                        <h1 className="w-full bg-emerald-500 text-center text-white font-semibold text-lg py-2">
                            Tỉ lệ chọi
                        </h1>
                        <div className="m-4">
                            <SingleYear />
                        </div>
                        <div className="p-4 w-full flex justify-center relative flex-wrap">
                            {competeData.map((item, index) => {
                                const title = item['ten_truong'];
                                const target = item['DATA'].find(
                                    (year) => year['nam_hoc'] === singleYear,
                                )['chi_tieu'];
                                const total = item['DATA'].find(
                                    (year) => year['nam_hoc'] === singleYear,
                                )['so_luong'];
                                const c = total / target;

                                const targetPrevious =
                                    singleYear - 1 >= earliestYear
                                        ? item['DATA'].find(
                                              (year) =>
                                                  year['nam_hoc'] ===
                                                  singleYear - 1,
                                          )['chi_tieu']
                                        : 0;
                                const totalPrevious =
                                    singleYear - 1 >= earliestYear
                                        ? item['DATA'].find(
                                              (year) =>
                                                  year['nam_hoc'] ===
                                                  singleYear - 1,
                                          )['so_luong']
                                        : 0;
                                const cPrevious =
                                    totalPrevious / targetPrevious;

                                return (
                                    <div
                                        className="h-[20rem] w-[33%] doughnut-chart my-2"
                                        key={index}
                                    >
                                        <div className="relative h-[90%]">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-center">
                                                <h1 className="text-5xl font-semibold">
                                                    {(total / target).toFixed(
                                                        2,
                                                    )}
                                                </h1>
                                                <p className="mt-2 text-text-subtitle-color">
                                                    {target}/{total}
                                                </p>
                                            </div>
                                            <Doughnut
                                                data={competeDataDoughnutChart(
                                                    target,
                                                    total,
                                                    color[index]['bg'],
                                                    color[index]['border'],
                                                )}
                                                options={competeOptionsDoughnutChart(
                                                    title,
                                                )}
                                                className="mx-2"
                                            />
                                        </div>
                                        {!isNaN(c) ? (
                                            c >= cPrevious ? (
                                                <p className="text-center text-green-500 font-semibold mt-4">
                                                    Tăng{' '}
                                                    {(c - cPrevious).toFixed(2)}{' '}
                                                    so với {singleYear - 1}
                                                </p>
                                            ) : (
                                                <p className="text-center text-red-400 font-semibold mt-4">
                                                    Giảm{' '}
                                                    {(cPrevious - c).toFixed(2)}{' '}
                                                    so với {singleYear - 1}
                                                </p>
                                            )
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="bg-container-color shadow-basic rounded-lg overflow-hidden w-[30%] relative">
                        <h1 className="w-full bg-emerald-500 text-center text-white font-semibold text-lg py-2">
                            Xu hướng tỉ lệ chọi
                        </h1>
                        <YearRange showWish={false} />
                        <div className="p-4 w-full h-[25rem]">
                            <Line data={dataTrend} options={optionsTrend} />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};
