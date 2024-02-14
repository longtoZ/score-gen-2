import { useContext, useEffect, useState } from 'react';
import { AddContext } from '../../pages/print/Print';
import { ScoreRange } from './functions/ScoreRange';
import { Top } from './functions/Top';
import { YearRange } from './functions/YearRange';
import { Compete } from './functions/Compete';
import { Area } from './functions/Area';
import { Group } from './functions/Group';
import { Special } from './functions/Special';

import DataArrayIcon from '@mui/icons-material/DataArray';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ScoreIcon from '@mui/icons-material/Score';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import GradeIcon from '@mui/icons-material/Grade';

const functionId = [
    'Khoảng điểm',
    'Top điểm',
    'Điểm các năm',
    'Tỉ lệ chọi các năm',
    'Trường trong khu vực',
    'Trường tương đương',
    'Lớp chuyên',
]

export const Add = () => {

    const { setShowAdd } = useContext(AddContext);
    const [ showFunction, setShowFunction ] = useState(functionId[0]);

    const handleHideAdd = (e) => {
        if (e.target === e.currentTarget) {
            setShowAdd(false);
        }
    };

    const handleSelectFunction = (e) => {
        setShowFunction(e.target.closest('.func-btn').getAttribute('data-function'));
    };


    return (
        <div
            className="w-full h-full fixed bg-black bg-opacity-40 flex justify-center items-center"
            onClick={handleHideAdd}
        >
            <div className="w-[70%] py-8 px-4 bg-input-color rounded-lg">
                <h1 className="text-lg text-center font-semibold">
                    Các mục in khả dụng
                </h1>
                <div className="grid grid-cols-2 gap-4 mt-[2rem] ">
                    <div className="border-2 border-border-color rounded-lg p-2">
                        <h1 className="text-text-subtitle-color">Tính năng</h1>
                        <span className="mt-[1rem] grid grid-cols-2 gap-2">
                            
                            <div onClick={handleSelectFunction} data-function={functionId[0]} className={`flex gap-2 p-1 hover:bg-even-row-color rounded-lg func-btn transition-colors ease duration-200 cursor-pointer ${showFunction === functionId[0] ? 'bg-amber-100' : ''}`}>
                                <div className="bg-emerald-500 text-white p-1 rounded-lg w-8 h-8">
                                    <DataArrayIcon />
                                </div>
                                <h2 className="leading-[2rem] font-semibold">
                                    Khoảng điểm
                                </h2>
                            </div>

                            <div onClick={handleSelectFunction} data-function={functionId[1]} className={`flex gap-2 p-1 hover:bg-even-row-color rounded-lg func-btn transition-colors ease duration-200 cursor-pointer ${showFunction === functionId[1] ? 'bg-amber-100' : ''}`}>
                                <div className="bg-emerald-500 text-white p-1 rounded-lg w-8 h-8">
                                    <AutoGraphIcon />
                                </div>
                                <h2 className="leading-[2rem] font-semibold">
                                    Top điểm
                                </h2>
                            </div>

                            <div onClick={handleSelectFunction} data-function={functionId[2]} className={`flex gap-2 p-1 hover:bg-even-row-color rounded-lg func-btn transition-colors ease duration-200 cursor-pointer ${showFunction === functionId[2] ? 'bg-amber-100' : ''}`}>
                                <div className="bg-emerald-500 text-white p-1 rounded-lg w-8 h-8">
                                    <ScoreIcon />
                                </div>
                                <h2 className="leading-[2rem] font-semibold">
                                    Điểm các năm
                                </h2>
                            </div>

                            <div onClick={handleSelectFunction} data-function={functionId[3]} className={`flex gap-2 p-1 hover:bg-even-row-color rounded-lg func-btn transition-colors ease duration-200 cursor-pointer ${showFunction === functionId[3] ? 'bg-amber-100' : ''}`}>
                                <div className="bg-emerald-500 text-white p-1 rounded-lg w-8 h-8">
                                    <FormatListBulletedIcon />
                                </div>
                                <h2 className="leading-[2rem] font-semibold">
                                    Tỉ lệ chọi các năm
                                </h2>
                            </div>

                            <div onClick={handleSelectFunction} data-function={functionId[4]} className={`flex gap-2 p-1 hover:bg-even-row-color rounded-lg func-btn transition-colors ease duration-200 cursor-pointer ${showFunction === functionId[4] ? 'bg-amber-100' : ''}`}>
                                <div className="bg-emerald-500 text-white p-1 rounded-lg w-8 h-8">
                                    <HomeWorkIcon />
                                </div>
                                <h2 className="leading-[2rem] font-semibold">
                                    Trường trong khu vực
                                </h2>
                            </div>

                            <div onClick={handleSelectFunction} data-function={functionId[5]} className={`flex gap-2 p-1 hover:bg-even-row-color rounded-lg func-btn transition-colors ease duration-200 cursor-pointer ${showFunction === functionId[5] ? 'bg-amber-100' : ''}`}>
                                <div className="bg-emerald-500 text-white p-1 rounded-lg w-8 h-8">
                                    <CompareArrowsIcon />
                                </div>
                                <h2 className="leading-[2rem] font-semibold">
                                    Trường tương đương
                                </h2>
                            </div>

                            <div onClick={handleSelectFunction} data-function={functionId[6]} className={`flex gap-2 p-1 hover:bg-even-row-color rounded-lg func-btn transition-colors ease duration-200 cursor-pointer ${showFunction === functionId[6] ? 'bg-amber-100' : ''}`}>
                                <div className="bg-emerald-500 text-white p-1 rounded-lg w-8 h-8">
                                    <GradeIcon />
                                </div>
                                <h2 className="leading-[2rem] font-semibold">
                                    Lớp chuyên
                                </h2>
                            </div>
                        </span>
                    </div>
                    <div className="border-2 border-border-color rounded-lg p-2">
                        <div>
                            { showFunction === functionId[0] && <ScoreRange />}
                            { showFunction === functionId[1] && <Top /> }
                            { showFunction === functionId[2] && <YearRange /> }
                            { showFunction === functionId[3] && <Compete /> }
                            { showFunction === functionId[4] && <Area /> }
                            { showFunction === functionId[5] && <Group /> }
                            { showFunction === functionId[6] && <Special />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
