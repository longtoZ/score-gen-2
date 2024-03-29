import ChartDataLabels from 'chartjs-plugin-datalabels';

import { useContext } from 'react';
import { Bar } from 'react-chartjs-2';

import { SchoolContext } from '../../pages/visual/Visual.jsx';
import { SingleDiff } from './inputs/DiffInput.jsx';
import { SingleSchool } from './inputs/SingleSchool.jsx';
import { SingleWish } from './inputs/SingleWish.jsx';
import { SingleYear } from './inputs/SingleYear.jsx';

import { ModeContext } from '../../utils/setModeContext.js';
import {
    BarElement,
    CategoryScale,
    Chart,
    Legend,
    Title,
    Tooltip,
} from 'chart.js';

Chart.register(
    ChartDataLabels,
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const color = {
    normal: {
        bg: 'rgba(16, 185, 129, 0.2)',
        border: '#10b981',
    },
    selected: {
        bg: 'rgba(245, 158, 11, 0.2)',
        border: '#f59e0b',
    },
};

export const GroupChart = () => {
    const { theme } = useContext(ModeContext);
    const { groupData, schoolData } = useContext(SchoolContext);

    const selectedScore = schoolData.find((s) => s['CHOSEN'] === true)[
        'ten_truong'
    ];

    let delayed;
    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            title: {
                display: true,
                text: `${groupData.length > 0 ? groupData[0]['nam_hoc'] : ''}`,
                color: theme === 'light' ? '#18181b' : '#d4d4d8',
            },
            legend: {
                display: false,
            },
            datalabels: {
                display: true,
                color: 'gray',
                align: 'right',
                anchor: 'end',
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Trường',
                },
                ticks: {
                    color: theme === 'light' ? '#18181b' : '#d4d4d8',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Điểm',
                },
                ticks: {
                    color: theme === 'light' ? '#18181b' : '#d4d4d8',
                },
                max: groupData.length > 0 ? (groupData[0]['nam_hoc'] < 2021 ? 50 : 30) : 0
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

    const data = {
        labels: groupData.map((d) => d['ten_truong']),
        datasets: [
            {
                labels: null,
                data: groupData.map((d) => d['diem']),
                backgroundColor: groupData.map((d) =>
                    d['ten_truong'] === selectedScore
                        ? color.selected.bg
                        : color.normal.bg,
                ),
                borderColor: groupData.map((d) =>
                    d['ten_truong'] === selectedScore
                        ? color.selected.border
                        : color.normal.border,
                ),
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="mt-[3rem] bg-container-color shadow-basic rounded-lg overflow-hidden pb-4">
            <h1 className="w-full bg-emerald-500 text-center text-white font-semibold text-lg py-2">
                Các trường có điểm tương đương
            </h1>
            <div className="flex justify-between p-2 group-chart-grid">
                <div className="w-[60%]">
                    <div
                        className={`p-4 w-full my-auto ${groupData.length > 0 ? 'h-[25rem]' : 'h-0'}`}
                    >
                        {groupData.length > 0 && (
                            <Bar
                                data={data}
                                options={options}
                                plugins={[ChartDataLabels]}
                            />
                        )}
                    </div>
                </div>
                <div className="w-[40%] h-full pt-4 block">
                    <div className="border-2 border-border-color p-4 rounded-lg w-full mx-auto flex justify-between flex-wrap">
                        <SingleSchool />
                        <SingleYear />
                        <SingleWish />
                        <SingleDiff />
                    </div>
                    <div className="mt-[1rem] h-[15rem] overflow-y-scroll border-2 border-border-color py-4 px-6 rounded-lg">
                        <ul className="">
                            {groupData.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="flex justify-between py-2 my-2 border-b-2 border-border-color"
                                    >
                                        <h1 className="inline-block font-semibold">
                                            {item['ten_truong']}
                                        </h1>
                                        <h1 className="inline-block">
                                            {item['QUAN/HUYEN']}
                                        </h1>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
