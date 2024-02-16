import { useState, useContext, useRef, useEffect } from 'react';
import { FunctionContext } from '../../../pages/print/Print';
import { AddContext } from '../../../pages/print/Print';
import {
    specialSubjectsObj,
    specialSubjectsObjReverse,
    yearsList
} from '../../../utils/lists';
import { getAxiosSpecial, handleDataSpecial } from '../../visual/utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const Special = () => {

    const { data, setData } = useContext(FunctionContext);
    const { showAdd, setShowAdd } = useContext(AddContext);

    const mode = showAdd.mode
    const dataIndex = showAdd.index;

    const titleRef = useRef(null);

    const [title, setTitle] = useState(mode === 'add' ? '' : data[dataIndex].title);
    const [showYear, setShowYear] = useState(false);
    const [showSpecialWish, setShowSpecialWish] = useState(false);

    const [selectedYear, setSelectedYear] = useState(mode === 'add' ? yearsList[0] : data[dataIndex].year);
    const [selectedSpecialWish, setSelectedSpecialWish] = useState(
        mode === 'add' ? Object.entries(specialSubjectsObj)[0][0] : specialSubjectsObjReverse[data[dataIndex].wish],
    );

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

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
        const wishValue = specialSubjectsObj[selectedSpecialWish].replace('1', '%');
    
        getAxiosSpecial(selectedYear, wishValue)
            .then((res) => handleDataSpecial(res))
            .then((tableData) => {
                setData([
                    ...data,
                    {
                        dataType: 'special',
                        title,
                        year: selectedYear,
                        wish: wishValue,
                        tableData,
                    }
                ])
            })
            .then(() => setShowAdd({
                show: false,
                mode: 'add',
                index: 0,
            }));
    }

    const editData = () => {
        const wishValue = specialSubjectsObj[selectedSpecialWish].replace('1', '%');
    
        getAxiosSpecial(selectedYear, wishValue)
            .then((res) => handleDataSpecial(res))
            .then((tableData) => {
                const newData = [...data];
                newData[dataIndex] = {
                    dataType: 'special',
                    title,
                    year: selectedYear,
                    wish: wishValue,
                    tableData,
                };
                setData(newData);
            })
            .then(() => setShowAdd({
                show: false,
                mode: 'add',
                index: 0,
            }));
    }

    useEffect(() => {
        if (mode === 'edit') {
            titleRef.current.value = data[dataIndex].title;
        }
    }, [mode])

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
                    ref={titleRef}
                    onChange={handleTitle}
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
            {showAdd.mode === 'add' ? (
                <button className='float-right mt-[1rem] bg-teal-600 text-white p-2 rounded-lg' onClick={addData}>Thêm mới</button>
            ) : (
                <button className='float-right mt-[1rem] bg-teal-600 text-white p-2 rounded-lg' onClick={editData}>Thay đổi</button>
            )}
        </div>
    );
};
