import { useContext, useEffect, useRef } from 'react';

import { SchoolContext } from '../../../pages/visual/Visual.jsx';

import { yearsList } from '../../../utils/lists.js';

import './yearRange.css';

export const YearRange = ({ showWish = true }) => {
    const {
        startYear,
        setStartYear,
        endYear,
        setEndYear,
        singleWish,
        setSingleWish,
    } = useContext(SchoolContext);
    const wish1Ref = useRef(null);
    const wish2Ref = useRef(null);
    const wish3Ref = useRef(null);

    const handleStartYear = (e) => {
        const year = parseInt(e.target.value);
        setStartYear(year);
    };

    const handleEndYear = (e) => {
        const year = parseInt(e.target.value);
        setEndYear(year);
    };

    useEffect(() => {
        wish1Ref.current.classList.remove('select-wish');
        wish2Ref.current.classList.remove('select-wish');
        wish3Ref.current.classList.remove('select-wish');

        if (singleWish === 'NV1') {
            wish1Ref.current.classList.add('select-wish');
        } else if (singleWish === 'NV2') {
            wish2Ref.current.classList.add('select-wish');
        } else {
            wish3Ref.current.classList.add('select-wish');
        }
    }, [singleWish]);

    const handleWish = (e) => {
        setSingleWish(e.target.getAttribute('data-wish'));
    };

    return (
        <div>
            <div className="bg-input-color p-2 rounded-lg shadow-basic inline-block m-4">
                <h1 className="mx-2 mb-2 text-text-color font-semibold">
                    Chọn khoảng năm
                </h1>
                <input
                    className="bg-input-color bs-in-light rounded-lg mx-2 py-1 font-semibold text-center"
                    type="number"
                    value={startYear}
                    min={yearsList[yearsList.length - 1]}
                    max={yearsList[0]}
                    step={1}
                    onChange={handleStartYear}
                    onKeyDown={(e) =>
                        e.key !== 'ArrowUp' &&
                        e.key !== 'ArrowDown' &&
                        e.preventDefault()
                    }
                />
                <input
                    className="bg-input-color bs-in-light rounded-lg mx-2 py-1 font-semibold text-center"
                    type="number"
                    value={endYear}
                    min={yearsList[yearsList.length - 1]}
                    max={yearsList[0]}
                    step={1}
                    onChange={handleEndYear}
                    onKeyDown={(e) =>
                        e.key !== 'ArrowUp' &&
                        e.key !== 'ArrowDown' &&
                        e.preventDefault()
                    }
                />
            </div>

            <div
                className={`bg-input-color p-2 rounded-lg shadow-basic m-4 ${showWish ? 'inline-block' : 'hidden'}`}
            >
                <h1 className="mx-2 mb-2 text-text-color font-semibold">
                    Chọn nguyện vọng
                </h1>
                <div className="bg-bg-input-color bs-in-light rounded-lg p-1 flex gap-2 cursor-pointer">
                    <div
                        className="bg-transparent font-semibold rounded-lg py-1 px-2"
                        data-wish="NV1"
                        onClick={handleWish}
                        ref={wish1Ref}
                    >
                        Nguyện vọng 1
                    </div>
                    <div
                        className="bg-transparent font-semibold rounded-lg py-1 px-2"
                        data-wish="NV2"
                        onClick={handleWish}
                        ref={wish2Ref}
                    >
                        Nguyện vọng 2
                    </div>
                    <div
                        className="bg-transparent font-semibold rounded-lg py-1 px-2"
                        data-wish="NV3"
                        onClick={handleWish}
                        ref={wish3Ref}
                    >
                        Nguyện vọng 3
                    </div>
                </div>
            </div>
        </div>
    );
};
