import ChartDataLabels from 'chartjs-plugin-datalabels';

import { useContext } from 'react';
import { Bar } from 'react-chartjs-2';

import { SchoolContext } from '../../pages/visual/Visual.jsx';
import { SingleDistrict } from './inputs/SingleDistrict.jsx';
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

const selectedColor = {
    bg: 'rgba(245, 158, 11, 0.2)',
    border: '#f59e0b',
};

export const AreaChart = () => {
    const { theme } = useContext(ModeContext);
    const { areaData, singleYear, districtList, schoolData } =
        useContext(SchoolContext);

    // console.log(areaData, districtList, areaData.find((d) => d['QUAN/HUYEN'] === districtList.CHOSEN))

    if (areaData.length !== 0) {
        const schools = areaData.find(
            (d) => d['QUAN/HUYEN'] === districtList.CHOSEN,
        );
        const colorIndex = areaData.findIndex(
            (d) => d['QUAN/HUYEN'] === districtList.CHOSEN,
        );

        const schoolDataList = schoolData.map((s) => s['TEN_TRUONG']);

        let delayed;
        const options = {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `${districtList.CHOSEN} - ${singleYear}`,
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
                            context.dataIndex * 300 +
                            context.datasetIndex * 100;
                    }
                    return delay;
                },
            },
        };

        const data = {
            labels: schools['DATA'].map((d) => d['TEN_TRUONG']),
            datasets: [
                {
                    labels: null,
                    data: schools['DATA'].map((d) => d['DIEM']),
                    backgroundColor: schools['DATA'].map((d) =>
                        schoolDataList.includes(d['TEN_TRUONG'])
                            ? selectedColor.bg
                            : color[colorIndex].bg,
                    ),
                    borderColor: schools['DATA'].map((d) =>
                        schoolDataList.includes(d['TEN_TRUONG'])
                            ? selectedColor.border
                            : color[colorIndex].border,
                    ),
                    borderWidth: 1,
                },
            ],
        };

        return (
            <div className="mt-[3rem] bg-container-color shadow-basic rounded-lg overflow-hidden">
                <h1 className="w-full bg-emerald-500 text-center text-white font-semibold text-lg py-2">
                    Các trường trong khu vực
                </h1>
                <div className="flex justify-between p-2 area-chart-grid">
                    <div className="w-[60%]">
                        <div className="p-4 w-full h-[25rem] mx-auto">
                            <Bar
                                data={data}
                                options={options}
                                plugins={[ChartDataLabels]}
                            />
                        </div>
                    </div>
                    <div className="w-[40%] pt-4">
                        <div className="border-2 border-border-color p-4 rounded-lg w-full mx-auto flex flex-wrap">
                            <SingleYear />
                            <SingleWish />
                            <SingleDistrict />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <></>;
};
