import { yearsList } from '../../utils/lists';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useRef, useContext } from 'react';
import { SchoolContext } from '../../pages/visual/Visual';

export const SingleYear = () => {
    const { singleYear, setSingleYear } = useContext(SchoolContext);
    const [showYear, setShowYear] = useState(false);

    const yearRef = useRef(null);

    const handleShowYear = () => {
        setShowYear(!showYear);
    }

    const handleYear = (e) => {
        e.stopPropagation();
        setSingleYear(parseInt(e.target.getAttribute('data-year')));
        setShowYear(false);
        yearRef.current.innerText = e.target.innerText;
    }

    return (
        <div className='m-1'>
            <h1 className='font-semibold mx-2 my-1 block'>Chọn năm</h1>
            <div
            className="w-[8rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer z-[3]"
            onClick={handleShowYear}
            >
                <p className="pr-2" ref={yearRef}>
                    Năm {singleYear}
                </p>
                <ArrowDropDownIcon />

                <ul
                    className="overflow-y-scroll h-[14rem] w-[8rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg"
                    style={
                        showYear === true
                            ? { display: 'block' }
                            : { display: 'none' }
                    }
                >
                    {yearsList.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className="rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out"
                                onClick={handleYear}
                                data-year={item}
                            >
                                Năm {item}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>

    );
};
