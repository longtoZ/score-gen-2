import { useRef, useContext } from 'react';
import { FilterContext } from '../../pages/suggest/Suggest';
import './top.css';

export const Average = () => {
    const higherRef = useRef(null);
    const lowerRef = useRef(null);

    const { filterData, setFilterData } = useContext(FilterContext);

    const handleData = (e) => {
        const dataType = e.target.getAttribute('data-type');

        if (dataType === 'higher') {
            higherRef.current.classList.add('enable');
            lowerRef.current.classList.remove('enable');
        } else {
            lowerRef.current.classList.add('enable');
            higherRef.current.classList.remove('enable');
        }

        setFilterData({
            ...filterData,
            averageValue: dataType,
        });
    };

    return (
        <div className="mt-[2rem] grid grid-cols-2 gap-2">
            <button
                className="enable font-semibold text-text-color p-2 rounded-lg shadow-md cursor-pointer opacity-50"
                ref={higherRef}
                data-type="higher"
                onClick={handleData}
            >
                Trên trung bình
            </button>
            <button
                className="font-semibold text-text-color p-2 rounded-lg shadow-md cursor-pointer opacity-50"
                ref={lowerRef}
                data-type="lower"
                onClick={handleData}
            >
                Dưới trung bình
            </button>
        </div>
    );
};
