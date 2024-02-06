import { useState, useContext } from 'react';
import { FilterContext } from '../../pages/suggest/Suggest';
import { normalSubjectsObj, specialSubjectsObj } from '../../utils/lists';

export const Range = ({ min, max, schoolType, wish }) => {
    const { filterData, setFilterData } = useContext(FilterContext);

    const [start, setStart] = useState(min);
    const [end, setEnd] = useState(max);

    const handleStart = (e) => {
        setStart(e.target.value);
    };

    const handleEnd = (e) => {
        setEnd(e.target.value);
    };

    const handleData = () => {
        const startValue =
            schoolType === 'Lớp thường'
                ? ((start / 30) * 100).toFixed(2)
                : start;
        const endValue =
            schoolType === 'Lớp thường' ? ((end / 30) * 100).toFixed(2) : end;
        const wishValue =
            schoolType === 'Lớp thường'
                ? normalSubjectsObj[wish]
                : specialSubjectsObj[wish].replace('1', '%');

        setFilterData({
            ...filterData,
            startValue,
            endValue,
            wishValue,
        });
    };

    return (
        <div className="mt-[2rem] grid grid-cols-3 gap-2">
            <input
                className="bs-in p-2 bg-bg-sank-color rounded-lg text-center"
                type="number"
                value={start}
                min={min}
                max={max}
                placeholder="Điểm bắt đầu"
                onChange={handleStart}
            />
            <input
                className="bs-in p-2 bg-bg-sank-color rounded-lg text-center"
                type="number"
                value={end}
                min={min}
                max={max}
                placeholder="Điểm kết thúc"
                onChange={handleEnd}
            />
            <button
                className="font-semibold bg-teal-600 text-white p-2 rounded-lg shadow-md"
                onClick={handleData}
            >
                Lọc
            </button>
        </div>
    );
};
