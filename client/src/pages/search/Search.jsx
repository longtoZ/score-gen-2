import { useState, useEffect, useRef, createContext } from 'react';
import { Link } from 'react-router-dom';

import { Table } from '../../components/search/Table.jsx';
import { yearsList, schoolTypesList } from '../../utils/lists.js';
import { getAxios, handleData } from '../../components/search/utils.js';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const KeywordContext = createContext();

export const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [schoolType, setSchoolType] = useState('Trường thường');
    const [year, setYear] = useState('2023');

    const [showType, setShowType] = useState(false);
    const [showYear, setShowYear] = useState(false);

    const schoolTypeRef = useRef(null);
    const yearRef = useRef(null);

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        getAxios(schoolType, year.replace('Năm ', '').trim())
            .then((res) => handleData(res))
            .then((data) => setTableData(data));
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
                    <Link to="/guide" className="text-blue-500 underline">
                        Xem hướng dẫn
                    </Link>
                </p>

                <div className="flex justify-center gap-2 mt-10">
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
                            Trường thường
                        </p>
                        <ArrowDropDownIcon />

                        <ul
                            className="w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg"
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
                            Năm 2023
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
                                    >
                                        Năm {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <Table
                tableData={tableData}
                keyword={keyword}
                schoolType={schoolType}
            />
        </div>
    );
};
