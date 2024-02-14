import { useState, useContext } from 'react';
import { FunctionContext } from '../../../pages/print/Print';
import {
    specialSubjectsObj,
    yearsList
} from '../../../utils/lists';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const Special = () => {

    const { data, setData } = useContext(FunctionContext);

    const [showYear, setShowYear] = useState(false);
    const [showSpecialWish, setShowSpecialWish] = useState(false);

    const [selectedYear, setSelectedYear] = useState(yearsList[0]);
    const [selectedSpecialWish, setSelectedSpecialWish] = useState(
        Object.entries(specialSubjectsObj)[0][0],
    );


    const handleShowYear = () => {
        setShowYear(!showYear);
    }

    const handleShowSpecialWish = () => {
        setShowSpecialWish(!showSpecialWish);
    };

    const handleYear = (e) => {
        setSelectedYear(e.target.getAttribute('data-year'));
    }

    const handleSpecialWish = (e) => {
        setSelectedSpecialWish(e.target.innerText);
    };

    // Add the data to the main array
    const addData = () => {
        setData([
            ...data,
            {
                dataType: 'special',
                year: selectedYear,
                wish: selectedSpecialWish,
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
            <section className="mt-4 grid grid-cols-2 gap-2 pt-8 px-[10%]">
                <div
                    className="mx-auto w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                    onClick={handleShowYear}
                >
                    <p className="pr-2">
                        Năm {selectedYear}
                    </p>
                    <ArrowDropDownIcon />

                    <ul
                        className="z-[3] overflow-y-scroll h-[14rem] w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg"
                        style={
                            showYear
                                ? { display: 'block' }
                                : { display: 'none' }
                        }
                    >
                        {yearsList.map(
                            (item, index) => {
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
                            },
                        )}
                    </ul>
                </div>

                <div
                    className="mx-auto w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                    onClick={handleShowSpecialWish}
                >
                    <p className="pr-2">
                        {selectedSpecialWish}
                    </p>
                    <ArrowDropDownIcon />

                    <ul
                        className="z-[3] overflow-y-scroll h-[14rem] w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg"
                        style={
                            showSpecialWish
                                ? { display: 'block' }
                                : { display: 'none' }
                        }
                    >
                        {Object.entries(specialSubjectsObj).map(
                            (item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out"
                                        onClick={handleSpecialWish}
                                    >
                                        {item[0]}
                                    </li>
                                );
                            },
                        )}
                    </ul>
                </div>
            </section>
            <button className='float-right mt-[1rem] bg-teal-600 text-white p-2 rounded-lg' onClick={addData}>Thêm</button>
        </div>
    );
};
