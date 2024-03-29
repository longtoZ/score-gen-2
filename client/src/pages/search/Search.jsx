import { createContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Table } from '../../components/search/Table.jsx';

import { getAxios, handleData } from '../../components/search/utils.js';
import { schoolTypesList, yearsList } from '../../utils/lists.js';

import { Loader } from '../../components/loader/Loader';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import './table.css';

export const KeywordContext = createContext();

export const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [schoolType, setSchoolType] = useState(schoolTypesList[0]);
    const [year, setYear] = useState(String(yearsList[0]));

    const [showType, setShowType] = useState(false);
    const [showYear, setShowYear] = useState(false);

    const schoolTypeRef = useRef(null);
    const yearRef = useRef(null);

    const [showLoader, setShowLoader] = useState(false);

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        document.title = 'Score | Tra cứu';
    }, []);

    // Get data from server
    useEffect(() => {
        setShowLoader(true);
        getAxios(schoolType, year.replace('Năm ', '').trim())
            .then((res) => handleData(res))
            .then((data) => setTableData(data))
            .then(() => setShowLoader(false));
    }, [schoolType, year]);

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
        <div className="Search py-[10rem]">
            <div className="w-2/3 mx-auto">
                <h1 className="text-center my-10 text-3xl font-semibold">
                    Tra cứu cơ bản
                </h1>
                <p className="text-center italic text-sm text-text-subtitle-color">
                    Tại đây bạn có thể tìm kiếm điểm nguyện vọng 1, 2, 3 và môn
                    chuyên của các trường qua từng năm mà không cần dò thủ công
                    theo danh sách.
                    <br />
                    Chưa rõ?{' '}
                    <Link to="/docs/search" className="text-blue-500 underline">
                        Xem hướng dẫn
                    </Link>
                </p>

                <div className="flex justify-center flex-wrap gap-2 mt-10">
                    <input
                        className="bg-input-color border border-border-color shadow-md rounded-lg py-2 px-3 text-sm"
                        type="text"
                        placeholder="Nhập tên trường"
                        onChange={handleKeyword}
                    ></input>
                    <div
                        className="w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                        onClick={handleShowType}
                    >
                        <p className="pr-2" ref={schoolTypeRef}>
                            {schoolType}
                        </p>
                        <ArrowDropDownIcon />

                        <ul
                            className="w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg z-[2]"
                            style={
                                showType === true
                                    ? { display: 'block' }
                                    : { display: 'none' }
                            }
                        >
                            {schoolTypesList.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out"
                                        onClick={handleSchoolType}
                                    >
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div
                        className="w-[8rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                        onClick={handleShowYear}
                    >
                        <p className="pr-2" ref={yearRef}>
                            Năm {year}
                        </p>
                        <ArrowDropDownIcon />

                        <ul
                            className="overflow-y-scroll h-[14rem] w-[8rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg z-[2]"
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
                                    >
                                        Năm {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            {showLoader && <Loader />}
            {tableData.length !== 0 && (
                <Table
                    tableData={tableData}
                    keyword={keyword}
                    schoolType={schoolType}
                />
            )}
        </div>
    );
};
