import { useState, useRef, createContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { SchoolSearch } from '../../components/visual/SchoolSearch';
import { YearChart } from '../../components/visual/YearChart';
import { CompeteChart } from '../../components/visual/CompeteChart';
import { getAxiosYear, handleDataYear, getAxiosCompete, handleDataCompete } from '../../components/visual/utils';
import { yearsList } from '../../utils/lists';
import './add.css';

export const SchoolContext = createContext();
export const CompeteContext = createContext();

export const Visual = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [startYear, setStartYear] = useState(yearsList[yearsList.length - 1]);
    const [endYear, setEndYear] = useState(yearsList[0]);
    const [singleYear , setSingleYear] = useState(yearsList[0]);
    const [selectedWish, setSelectedWish] = useState('NV1');
    const [schoolList, setSchoolList] = useState([]);
    const [schoolData, setSchoolData] = useState([]);
    const [competeData, setCompeteData] = useState([]);

    const keywordRef = useRef(null);
    const searchRef = useRef(null);
    const addSchoolRef = useRef(null);

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleKeyword = (e) => {
        setKeyword(e.target.value.trim());
    };

    const handleSearch = () => {
        getAxiosYear(keyword)
            .then((res) => handleDataYear(res))
            .then((data) => {
                const school = {
                    MA_TRUONG: data[0]['MA_TRUONG'],
                    TEN_TRUONG: data[0]['TEN_TRUONG'],
                    'QUAN/HUYEN': data[0]['QUAN/HUYEN'],
                    MA_LOAI: data[0]['MA_LOAI'],
                };

                if (!schoolList.includes(school)) {
                    setSchoolList([...schoolList, school]);

                    setSchoolData([
                        ...schoolData,
                        {
                            MA_TRUONG: data[0]['MA_TRUONG'],
                            DATA: data,
                        },
                    ]);
                } else {
                    alert('Trường đã có trong danh sách');
                }

                setKeyword('');
                keywordRef.current.value = '';
                keywordRef.current.focus();
            });
        
        getAxiosCompete(keyword)
            .then((res) => handleDataCompete(res))
            .then((data) => {
                setCompeteData([
                    ...competeData,
                    data
                ]);
            });
        

    };

    useEffect(() => {
        if (schoolList.length === 3) {
            addSchoolRef.current.style.display = 'none';
        } else {
            addSchoolRef.current.style.display = 'block';
        }
    }, [schoolList]);

    return (
        <div className="Visual py-[10rem]">
            <div className="w-[90%] mx-auto">
                <h1 className="text-center my-10 text-3xl font-semibold">
                    Phân tích và trực quan hoá điểm số
                </h1>
                <p className="text-center italic text-sm text-text-subtitle-color">
                    Đây là nơi cho bạn một góc nhìn tổng quát nhất về một trường
                    thông qua các biểu đồ và tuỳ biến đa dạng.
                    <br />
                    Chưa rõ?{' '}
                    <Link to="/guide" className="text-blue-500 underline">
                        Xem hướng dẫn
                    </Link>
                </p>

                <div className="flex justify-center gap-4 mt-[3rem]">
                    <SchoolContext.Provider
                        value={{
                            schoolList,
                            setSchoolList,
                            schoolData,
                            setSchoolData,
                            competeData,
                            setCompeteData
                        }}
                    >
                        {schoolList.map((school, index) => (
                            <SchoolSearch key={index} school={school} />
                        ))}
                    </SchoolContext.Provider>

                    <div className="relative" ref={addSchoolRef}>
                        <div
                            className="add cursor-pointer bg-input-color p-1 rounded-[50%] shadow-basic flex"
                            onClick={handleShowSearch}
                        >
                            <AddIcon
                                className={
                                    showSearch ? 'rotate-45' : 'rotate-180'
                                }
                                style={{ transition: 'transform ease 0.2s' }}
                            />
                            <h1 className="ml-1 font-semibold">Thêm</h1>
                        </div>
                        <div
                            className={`absolute top-16 left-0 p-2 shadow-basic bg-input-color rounded-lg flex gap-2 ${showSearch ? 'block' : 'hidden'}`}
                        >
                            <input
                                className="bg-bg-sank-color bs-in p-1 rounded-lg"
                                type="text"
                                placeholder="Nhập tên trường..."
                                ref={keywordRef}
                                onChange={handleKeyword}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        searchRef.current.click();
                                    }
                                }}
                            />
                            <button
                                className="rounded-[50%] bg-emerald-500 text-white p-1"
                                onClick={handleSearch}
                                ref={searchRef}
                            >
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                </div>

                <SchoolContext.Provider
                    value={{
                        startYear,
                        setStartYear,
                        endYear,
                        setEndYear,
                        selectedWish,
                        setSelectedWish,
                        schoolData,
                    }}
                >
                    <YearChart selectedWish={selectedWish} />
                </SchoolContext.Provider>

                <SchoolContext.Provider
                    value={{
                        startYear,
                        setStartYear,
                        endYear,
                        setEndYear
                    }}
                >
                    <CompeteContext.Provider value={{ competeData, singleYear, setSingleYear }}>
                        <CompeteChart/>
                    </CompeteContext.Provider>
                </SchoolContext.Provider>

            </div>
        </div>
    );
};
