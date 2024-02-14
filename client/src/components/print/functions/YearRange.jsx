import { useState, useRef, useContext } from 'react';
import { FunctionContext } from '../../../pages/print/Print';
import {
    yearsList
} from '../../../utils/lists';


export const YearRange = () => {

    const { data, setData } = useContext(FunctionContext);

    const [school, setSchool] = useState('');
    const [start, setStart] = useState(yearsList[yearsList.length - 1]);
    const [end, setEnd] = useState(yearsList[0]);


    const handleSchool = (e) => {
        setSchool(e.target.value);
    }

    const handleStart = (e) => {
        setStart(e.target.value);
    };

    const handleEnd = (e) => {
        setEnd(e.target.value);
    };


    // Add the data to the main array
    const addData = () => {
        setData([
            ...data,
            {
                dataType: 'year-range',
                school,
                start,
                end,
            }
        ])
    }


    return (
        <div>
            <section>
                <img src="" alt="demo" />
            </section>
            <section className='w-full px-[10%] block pt-8'>
                <input 
                    type="text" 
                    className="block my-2 w-full bs-in p-2 bg-bg-sank-color rounded-lg text-center" 
                    placeholder='Nhập tiêu đề mục...'
                />
                <input 
                    type="text" 
                    className="block my-2 w-full bs-in p-2 bg-bg-sank-color rounded-lg text-center" 
                    placeholder='Nhập ghi chú...'
                />
                <div className='w-full border-b-2 border-border-color'></div>
            </section>
            <section className="mt-[2rem] w-full grid grid-cols-2 gap-2 px-[10%]">
                <h1 className='text-center font-semibold'>Tên trường</h1>
                <input
                    className="bs-in p-2 bg-bg-sank-color rounded-lg text-center"
                    type="text"
                    placeholder="Nhập tên trường"
                    onChange={handleSchool}
                />
                <h1 className='text-center font-semibold'>Năm bắt đầu</h1>
                <input
                    className="bs-in p-2 bg-bg-sank-color rounded-lg text-center"
                    type="number"
                    min={start}
                    max={end}
                    placeholder={start}
                    onChange={handleStart}
                />
                <h1 className='text-center font-semibold'>Năm kết thúc</h1>
                <input
                    className="bs-in p-2 bg-bg-sank-color rounded-lg text-center"
                    type="number"
                    min={start}
                    max={end}
                    placeholder={end}
                    onChange={handleEnd}
                />
            </section>
            <button className='float-right mt-[1rem] bg-teal-600 text-white p-2 rounded-lg' onClick={addData}>Thêm</button>
        </div>
    );
};
