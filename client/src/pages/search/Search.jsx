import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Table } from '../../components/search/Table.jsx';
import { yearsList, schoolTypesList } from '../../constants/lists.js'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [schoolType, setSchoolType] = useState('Trường thường');
    const [year, setYear] = useState('2023');

    const [showType, setShowType] = useState(false);
    const [showYear, setShowYear] = useState(false);

    const schoolTypeRef = useRef(null);
    const yearRef = useRef(null);

    const handleShowType = () => {
        setShowType(!showType);
    };

    const handleShowYear = () => {
        setShowYear(!showYear);
    };

    const handleKeyword = (e) => {
        setKeyword(e.target.value.trim());
    };

    const handleSchoolType = (e) => {
        e.stopPropagation();
        setSchoolType(e.target.innerText);
        setShowType(false);
        schoolTypeRef.current.innerText = e.target.innerText;
    };

    const handleYear = (e) => {
        e.stopPropagation();
        setYear(e.target.innerText);
        setShowYear(false);
        yearRef.current.innerText = e.target.innerText;
    };

    return (
        <div className="Search mt-[10rem]">
            <div className='w-1/2 mx-auto'>
                <h1 className='text-center my-10 text-3xl font-semibold'>Tra cứu cơ bản</h1>
                <p className='text-center italic text-sm'>
                    Tại đây bạn có thể tìm kiếm điểm nguyện vọng 1, 2, 3 và môn chuyên của các trường qua từng năm mà không cần dò thủ công theo danh sách.
                    <br/>
                    Chưa rõ? <Link to='/guide' className='text-blue-500'>Xem hướng dẫn</Link>
                </p>

                <div className='flex justify-center gap-2 mt-10'>
                    <input className="bg-white border shadow-md rounded-lg py-2 px-3 text-sm" type="text" placeholder="Search for school name" onChange={handleKeyword}></input>
                    <div className='w-[10rem] bg-white relative border flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer' onClick={handleShowType}>
                        <p className='pr-2' ref={schoolTypeRef}>Trường thường</p>
                        <ArrowDropDownIcon />

                        <ul className='w-[10rem] absolute top-[100%] left-0 mt-4 bg-white shadow-md p-2 rounded-lg' style={showType===true ? {display: 'block'} : {display: 'none'}}>
                            {schoolTypesList.map((item, index) => {
                                return (
                                    <li key={index} className='rounded py-2 px-1 hover:bg-gray-100 transition duration-200 ease-in-out' onClick={handleSchoolType}>{item}</li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='w-[8rem] bg-white relative border flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer' onClick={handleShowYear}>
                        <p className='pr-2' ref={yearRef}>Năm 2023</p>
                        <ArrowDropDownIcon />

                        <ul className='overflow-y-scroll h-[14rem] w-[8rem] absolute top-[100%] left-0 mt-4 bg-white shadow-md p-2 rounded-lg' style={showYear===true ? {display: 'block'} : {display: 'none'}}>
                            {yearsList.map((item, index) => {
                                return (
                                    <li key={index} className='rounded py-2 px-1 hover:bg-gray-100 transition duration-200 ease-in-out' onClick={handleYear}>Năm {item}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <Table keyword={keyword} schoolType={schoolType} year={year.replace('Năm ', '').trim()} />                

        </div>
    );
};
