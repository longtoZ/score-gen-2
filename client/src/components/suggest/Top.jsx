import { useContext, useRef, useState } from 'react';

import { FilterContext } from '../../pages/suggest/Suggest';

export const Top = () => {
    const highestRef = useRef(null);
    const lowestRef = useRef(null);
    const [top, setTop] = useState(10);

    const { filterData, setFilterData, setToastMessage } =
        useContext(FilterContext);

    const handleTop = (e) => {
        setTop(parseInt(e.target.value));
    };

    const handleData = (e) => {
        if (top < 1) {
            setToastMessage({
                type: 'warning',
                msg: 'Số lượng phải lớn hơn 0',
            });
            return;
        }

        const dataType = e.target.getAttribute('data-type');

        if (dataType === 'highest') {
            highestRef.current.classList.add('enable');
            lowestRef.current.classList.remove('enable');
        } else {
            lowestRef.current.classList.add('enable');
            highestRef.current.classList.remove('enable');
        }

        setFilterData({
            ...filterData,
            topValue: top,
            positionValue: dataType,
        });
    };

    return (
        <div className="inputs-grid mt-[2rem] grid grid-cols-3 gap-2">
            <input
                className="bs-in-light p-2 bg-transparent rounded-lg text-center"
                type="number"
                min="0"
                max="30"
                placeholder="Số lượng"
                onChange={handleTop}
            />
            <button
                className="enable font-semibold text-text-color p-2 rounded-lg shadow-thick cursor-pointer opacity-50"
                ref={highestRef}
                data-type="highest"
                onClick={handleData}
            >
                Cao nhất
            </button>
            <button
                className="font-semibold text-text-color p-2 rounded-lg shadow-thick cursor-pointer opacity-50"
                ref={lowestRef}
                data-type="lowest"
                onClick={handleData}
            >
                Thấp nhất
            </button>
        </div>
    );
};
