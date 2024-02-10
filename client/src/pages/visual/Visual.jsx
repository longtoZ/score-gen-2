import { useState, useRef, createContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { SchoolSearch } from '../../components/visual/SchoolSearch';
import { YearChart } from '../../components/visual/YearChart';
import { CompeteChart } from '../../components/visual/CompeteChart';
import { AreaChart } from '../../components/visual/AreaChart';
import {
    getAxiosYear,
    handleDataYear,
    getAxiosCompete,
    handleDataCompete,
    getAxiosArea,
    handleDataArea,
} from '../../components/visual/utils';
import { yearsList } from '../../utils/lists';
import './add.css';

export const SchoolContext = createContext();

export const Visual = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [startYear, setStartYear] = useState(yearsList[yearsList.length - 1]);
    const [endYear, setEndYear] = useState(yearsList[0]);
    const [singleYear, setSingleYear] = useState(yearsList[0]);
    const [singleWish, setSingleWish] = useState('NV1');
    const [districtList, setDistrictList] = useState({
        DATA: [],
        CHOOSEN: ''
    });

    const [schoolData, setSchoolData] = useState([]);
    const [competeData, setCompeteData] = useState([]);
    const [areaData, setAreaData] = useState([]);

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

                if (
                    !schoolData.some(
                        (s) => s['MA_TRUONG'] === data[0]['MA_TRUONG'],
                    )
                ) {
                    setSchoolData([
                        ...schoolData,
                        {
                            MA_TRUONG: data[0]['MA_TRUONG'],
                            TEN_TRUONG: data[0]['TEN_TRUONG'],
                            'QUAN/HUYEN': data[0]['QUAN/HUYEN'],
                            MA_LOAI: data[0]['MA_LOAI'],
                            DATA: data.map((d) => {
                                return {
                                    NAM_HOC: d['NAM_HOC'],
                                    DIEM: {
                                        NV1: d['DIEM']['NV1'],
                                        NV2: d['DIEM']['NV2'],
                                        NV3: d['DIEM']['NV3'],
                                    },
                                }
                            }),
                        },
                    ]);

                } else {
                    alert('Trường đã có trong danh sách');
                }

                if (!districtList.DATA.includes(data[0]['QUAN/HUYEN'])) {
                    setDistrictList({
                        DATA: [...districtList.DATA, data[0]['QUAN/HUYEN']],
                        CHOOSEN: data[0]['QUAN/HUYEN'],
                    });
                }

                setKeyword('');
                keywordRef.current.value = '';
                keywordRef.current.focus();
            })
            .then(() => {
                getAxiosCompete(keyword)
                .then((res) => handleDataCompete(res))
                .then((data) => {
                    if (
                        !schoolData.some(
                            (s) => s['MA_TRUONG'] === data['MA_TRUONG'],
                        )
                    ) {
                        setCompeteData([...competeData, data]);
                    } else {
                        alert('Trường đã có trong danh sách');
                    }
                });
            })
    };

    // useEffect(() => {
    //     console.log('area data ', areaData)
    // }, [areaData])

    useEffect(() => {
        if (districtList.DATA.length === 0) return;

        const promises = districtList.DATA.map(district =>
            getAxiosArea(district, singleYear, singleWish)
                .then(res => handleDataArea(res))
        );
    
        Promise.all(promises)
            .then(dataList => {
                setAreaData(dataList);
            });

    }, [districtList, singleYear, singleWish]);

    useEffect(() => {
        if (schoolData.length === 3) {
            addSchoolRef.current.style.display = 'none';
        } else {
            addSchoolRef.current.style.display = 'block';
        }
    }, [schoolData]);

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
                            schoolData,
                            setSchoolData,
                            competeData,
                            setCompeteData,
                            areaData,
                            setAreaData,
                        }}
                    >
                        {schoolData.map((school, index) => (
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
                        singleWish,
                        setSingleWish,
                        schoolData,
                    }}
                >
                    <YearChart />
                </SchoolContext.Provider>

                <SchoolContext.Provider
                    value={{
                        startYear,
                        setStartYear,
                        endYear,
                        setEndYear,
                        competeData, 
                        singleYear, 
                        setSingleYear
                    }}
                >
                    <CompeteChart />
                </SchoolContext.Provider>

                <SchoolContext.Provider
                    value = {{
                        districtList,
                        setDistrictList,
                        areaData,
                        setAreaData,
                        singleYear,
                        setSingleYear,
                        singleWish,
                        setSingleWish,
                    }}    
                >   
                {areaData.length === districtList.DATA.length ? (
                    <AreaChart />
                ) : null}

                </SchoolContext.Provider>
            </div>
        </div>
    );
};
