import { useState, useContext } from 'react';
import { FunctionContext } from '../../../pages/print/Print';
import {
    normalSubjectsObj,
    yearsList
} from '../../../utils/lists';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const Group = () => {

    const { data, setData } = useContext(FunctionContext);

    const [school, setSchool] = useState('');
    const [diff, setDiff] = useState(0.5);
    const [showYear, setShowYear] = useState(false);
    const [showNormalWish, setShowNormalWish] = useState(false);

    const [selectedYear, setSelectedYear] = useState(yearsList[0]);
    const [selectedNormalWish, setSelectedNormalWish] = useState(
        Object.entries(normalSubjectsObj)[0][0],
    );

    const handleSchool = (e) => {
        setSchool(e.target.value);
    }

    const handleDiff = (e) => {
        setDiff(e.target.value);
    }

    const handleShowYear = () => {
        setShowYear(!showYear);
    }

    const handleShowNormalWish = () => {
        setShowNormalWish(!showNormalWish);
    };

    const handleYear = (e) => {
        setSelectedYear(e.target.getAttribute('data-year'));
    }

    const handleNormalWish = (e) => {
        setSelectedNormalWish(e.target.innerText);
    };


    // Add the data to the main array
    const addData = () => {
        setData([
            ...data,
            {
                dataType: 'group',
                year: selectedYear,
                wish: selectedNormalWish,
                school,
                diff,
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
                    onClick={handleShowNormalWish}
                >
                    <p className="pr-2">
                        {selectedNormalWish}
                    </p>
                    <ArrowDropDownIcon />

                    <ul
                        className="z-[3] w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg"
                        style={
                            showNormalWish
                                ? { display: 'block' }
                                : { display: 'none' }
                        }
                    >
                        {Object.entries(normalSubjectsObj).map(
                            (item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out"
                                        onClick={handleNormalWish}
                                    >
                                        {item[0]}
                                    </li>
                                );
                            },
                        )}
                    </ul>
                </div>
            </section>
            <section className="mt-[2rem] w-full grid grid-cols-2 gap-2 px-[10%]">
                <h1 className='text-center font-semibold'>Tên trường</h1>
                <input
                    className="bs-in p-2 bg-bg-sank-color rounded-lg text-center"
                    type="text"
                    placeholder="Nhập tên trường"
                    onChange={handleSchool}
                />
                <h1 className='text-center font-semibold'>Chênh lệch</h1>
                <input
                    className="bs-in p-2 bg-bg-sank-color rounded-lg text-center"
                    type="number"
                    step="0.1"
                    placeholder={diff}
                    onChange={handleDiff}
                />
            </section>
            <button className='float-right mt-[1rem] bg-teal-600 text-white p-2 rounded-lg' onClick={addData}>Thêm</button>
        </div>
    );
};
