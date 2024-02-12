import { useState, useContext, useEffect, useRef } from 'react';
import { SchoolContext } from '../../../pages/visual/Visual';

export const SingleDiff = () => {
    const { singleDiff, setSingleDiff, sendDiff, setSendDiff } = useContext(SchoolContext);
    const [ diff, setDiff] = useState(singleDiff);
    const inputRef = useRef();

    const handleDiff = (e) => {
        setDiff(parseFloat(e.target.value));
    }

    const handleSendDiff = () => {
        setSingleDiff(diff);
        setSendDiff(!sendDiff);
    }

    useEffect(() => {
        inputRef.current.value = singleDiff;
    }, [])

    return (
        <div className='m-1 w-[10rem] block'>
            <h1 className='font-semibold mx-2 my-1 block'>Chênh lệch</h1>
            <div className='flex gap-2'>
                <input className='bg-input-color bs-in rounded-lg p-2 w-[80%]' type="number" step="0.1" placeholder='Nhập sai số' ref={inputRef} onChange={handleDiff}/>
                <button className='rounded-lg p-2 bg-emerald-500 text-white font-semibold' onClick={handleSendDiff}>Lọc</button>
            </div>
        </div>

    );
};
