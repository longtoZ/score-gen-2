import { useState } from 'react';

export const Range = ({min, max}) => {

    const [start, setStart] = useState(min);
    const [end, setEnd] = useState(max);

    const handleStart = (e) => {
        setStart(e.target.value);
    }

    const handleEnd = (e) => {
        setEnd(e.target.value);
    }

    return (
        <div className="mt-[2rem] grid grid-cols-3 gap-2">
            <input
                className='bs-in p-2 bg-bg-sank-color rounded-lg text-center'
                type="number"
                value={start}
                min={min}
                max={max}
                placeholder="Điểm bắt đầu"
                onChange={handleStart}
            />
            <input
                className='bs-in p-2 bg-bg-sank-color rounded-lg text-center'
                type="number"
                value={end}
                min={min}
                max={max}
                placeholder="Điểm kết thúc"
                onChange={handleEnd}
            />
            <button className="font-semibold bg-teal-600 text-white p-2 rounded-lg shadow-md">Lọc</button>
        </div>
    );
};
