import { useState, useRef, useEffect, createContext } from 'react';
import { Link } from 'react-router-dom';
import { Range } from '../../components/suggest/Range.jsx';
import { RangeTable } from '../../components/suggest/RangeTable.jsx';
import { Top } from '../../components/suggest/Top.jsx';
import { Average } from '../../components/suggest/Average.jsx';
import { normalSubjectsObj, districtsList, specialSubjectsObj } from '../../utils/lists.js'

import './suggest.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';

export const TableContext = createContext();

export const Suggest = () => {

    const fullDistrictsList = ['Tất cả', ...districtsList];

    const normalSchoolRef = useRef(null);
    const specialSchoolRef = useRef(null);
    const normalWishRef = useRef(null);
    const specialWishRef = useRef(null);
    const districtRef = useRef(null);

    const rangeRef = useRef(null);
    const topRef = useRef(null);
    const averageRef = useRef(null);

    const [schoolType, setSchoolType] = useState('Lớp thường');
    const [selectedNormalWish, setSelectedNormalWish] = useState(Object.entries(normalSubjectsObj)[0][0]);
    const [selectedSpecialWish, setSelectedSpecialWish] = useState(Object.entries(specialSubjectsObj)[0][0]);
    const [showNormalWish, setShowNormalWish] = useState(false);
    const [showSpecialWish, setShowSpecialWish] = useState(false);
    const [showDistrict, setShowDistrict] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState([]);
    const [currentFunction, setCurrentFunction] = useState('Lọc khoảng');

    const [tableData, setTableData] = useState([]);

    const handleShowNormalWish = () => {
        setShowNormalWish(!showNormalWish);
    }

    const handleShowSpecialWish = () => {
        setShowSpecialWish(!showSpecialWish);
    }

    const handleShowDistrict = () => {
        setShowDistrict(!showDistrict);
    }

    const handleNormalWish = (e) => {
        normalWishRef.current.innerText = e.target.innerText;
        setSelectedNormalWish(e.target.innerText);
        setShowNormalWish(false);
    }

    const handleSpecialWish = (e) => {
        specialWishRef.current.innerText = e.target.innerText;
        setSelectedSpecialWish(e.target.innerText);
        setShowSpecialWish(false);
    }

    const handleSchoolType = (e) => {
        if (e.target.innerText === 'Lớp thường') {
            normalSchoolRef.current.classList.add('select-school-type');
            specialSchoolRef.current.classList.remove('select-school-type');
        } else {
            specialSchoolRef.current.classList.add('select-school-type');
            normalSchoolRef.current.classList.remove('select-school-type');
        }

        setSchoolType(e.target.innerText);
    }

    const handleFunction = (e) => {

        const type = e.target.innerText;
        rangeRef.current.classList.remove('select-function-type');
        topRef.current.classList.remove('select-function-type');
        averageRef.current.classList.remove('select-function-type');

        if (type === 'Lọc khoảng') {
            setCurrentFunction('Lọc khoảng');
            rangeRef.current.classList.add('select-function-type');
        } else if (type === 'Thứ tự') {
            setCurrentFunction('Thứ tự');
            topRef.current.classList.add('select-function-type');
        } else {
            setCurrentFunction('Trung bình');
            averageRef.current.classList.add('select-function-type');
        }
    }

    const addDistrict = (e) => {
        e.stopPropagation()

        const dataset = e.target.closest('.select-area').getAttribute('dataset');

        if (dataset === 'Tất cả') {
            if (selectedDistrict.length === districtsList.length) {
                setSelectedDistrict([])
            } else {
                setSelectedDistrict(districtsList)
            }
        } else {
            if (selectedDistrict.includes(dataset)) {
                setSelectedDistrict(selectedDistrict.filter(item => item !== dataset))
            } else {
                setSelectedDistrict([...selectedDistrict, dataset])
            }
        }
    }

    useEffect(() => {
        districtRef.current.querySelectorAll('li').forEach(item => {
            if (selectedDistrict.includes(item.getAttribute('dataset'))) {
                item.classList.add('selected-district')
            } else {
                item.classList.remove('selected-district')
            }
        })
    }, [selectedDistrict])

    return (
        <div className="Suggest py-[10rem]">
            <div className="w-2/3 mx-auto">
                <h1 className="text-center my-10 text-3xl font-semibold">
                    Đề xuất trường
                </h1>
                <p className="text-center italic text-sm text-text-subtitle-color">
                    Bạn có thể tuỳ chỉnh các bộ lọc từ đơn giản đến chi tiết để
                    lựa chọn và xem xét trường có số điểm phù hợp với nguyện
                    vọng của mình.
                    <br />
                    Chưa rõ?{' '}
                    <Link to="/guide" className="text-blue-500 underline">
                        Xem hướng dẫn
                    </Link>
                </p>

                <div className="mt-[3rem] w-1/3 mx-auto grid grid-cols-2 p-2 rounded-lg bg-bg-sank-color bs-in text-center font-semibold cursor-pointer">
                    <div className="py-1 select-school-type rounded-lg" school-type="normal" ref={normalSchoolRef} onClick={handleSchoolType}>
                        <h1>Lớp thường</h1>
                    </div>
                    <div className="py-1 rounded-lg" school-type="special" ref={specialSchoolRef} onClick={handleSchoolType}>
                        <h1>Lớp chuyên</h1>
                    </div>
                </div>

                <div className='mt-[1rem] w-full mx-auto rounded-lg shadow-basic bg-input-color p-4'>
                    <div className='w-3/4 mx-auto grid grid-cols-2 gap-4'>
                        <div className='border-2 border-border-color p-4 rounded-lg'>
                            <h1 className='font-semibold'>Bộ lọc</h1>

                            <div className='mt-4 grid grid-cols-2'>
                                {schoolType === 'Lớp thường' ? (
                                    <div className='w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer' onClick={handleShowNormalWish}>
                                        <p className='pr-2' ref={normalWishRef}>{Object.entries(normalSubjectsObj)[0][0]}</p>
                                        <ArrowDropDownIcon />

                                        <ul className='w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg' style={showNormalWish ? {display: 'block'} : {display: 'none'}}>
                                            {Object.entries(normalSubjectsObj).map((item, index) => {
                                                return (
                                                    <li key={index} className='rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out' onClick={handleNormalWish}>{item[0]}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                ) : (
                                    <div className='w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer' onClick={handleShowSpecialWish}>
                                        <p className='pr-2' ref={specialWishRef}>{Object.entries(specialSubjectsObj)[0][0]}</p>
                                        <ArrowDropDownIcon />

                                        <ul className='overflow-y-scroll h-[14rem] w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg' style={showSpecialWish ? {display: 'block'} : {display: 'none'}}>
                                            {Object.entries(specialSubjectsObj).map((item, index) => {
                                                return (
                                                    <li key={index} className='rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out' onClick={handleSpecialWish}>{item[0]}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )}


                                <div className='w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer' onClick={handleShowDistrict}>
                                    <p className='pr-2'>Chọn khu vực</p>
                                    <ArrowDropDownIcon />

                                    <ul className='overflow-y-scroll h-[14rem] w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg' style={showDistrict ? {display: 'block'} : {display: 'none'}} ref={districtRef}>
                                        {fullDistrictsList.map((item, index) => {
                                            return (
                                                <li key={index} className='rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out select-area' dataset={item} onClick={addDistrict}>
                                                    <AddIcon className='border-2 border-border-color rounded-lg' style={{fontSize:'1.2rem'}}/>
                                                    <span className='ml-4'>{item}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {schoolType === 'Lớp thường' ? (
                            <div className='border-2 border-border-color p-4 rounded-lg'>
                                <h1 className='font-semibold'>Chức năng</h1>

                                <div className="mt-[1rem] w-full grid grid-cols-3 p-1 rounded-lg bg-bg-sank-color bs-in text-center font-semibold">
                                    <div className="py-1 select-function-type rounded-lg" ref={rangeRef} onClick={handleFunction}>
                                        <h1>Lọc khoảng</h1>
                                    </div>
                                    <div className="py-1 rounded-lg" ref={topRef} onClick={handleFunction}>
                                        <h1>Thứ tự</h1>
                                    </div>
                                    <div className="py-1 rounded-lg" ref={averageRef} onClick={handleFunction}>
                                        <h1>Trung bình</h1>
                                    </div>
                                </div>

                                <TableContext.Provider value={{tableData, setTableData}}>
                                    {currentFunction === 'Lọc khoảng' ? <Range min={0} max={30} schoolType='Lớp thường' selectedDistrict={selectedDistrict} wish={selectedNormalWish} /> : (currentFunction === 'Thứ tự' ? <Top/> : <Average/>)}
                                </TableContext.Provider>

                            </div>
                        ) : (
                            <div className='border-2 border-border-color p-4 rounded-lg'>
                                <h1 className='font-semibold'>Chức năng</h1>

                                <div className="mt-[1rem] w-full grid grid-cols-1 p-1 rounded-lg bg-bg-sank-color bs-in text-center font-semibold">
                                    <div className="py-1 select-function-type rounded-lg" ref={rangeRef}>
                                        <h1>Lọc khoảng</h1>
                                    </div>
                                </div>
                                <TableContext.Provider value={{tableData, setTableData}}>
                                    <Range min={0} max={50} schoolType='Lớp chuyên' selectedDistrict={selectedDistrict} wish={selectedSpecialWish}/>
                                </TableContext.Provider>
                            </div>
                        )}

                    </div>
                </div>

                <RangeTable tableData={tableData} schoolType={schoolType} />
            </div>
        </div>
    );
};
