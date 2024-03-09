import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AreaChart } from '../../components/visual/AreaChart';
import { CompeteChart } from '../../components/visual/CompeteChart';
import { GroupChart } from '../../components/visual/GroupChart';
import { SchoolSearch } from '../../components/visual/SchoolSearch';
import { YearChart } from '../../components/visual/YearChart';
import {
    getAxiosArea,
    getAxiosCompete,
    getAxiosGroup,
    getAxiosYear,
    handleDataArea,
    handleDataCompete,
    handleDataGroup,
    handleDataYear,
} from '../../components/visual/utils';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import './add.css';
import './responsive.css';
import './schoolSearch.css';

import { yearsList } from '../../utils/lists';
import { ModeContext } from '../../utils/setModeContext';

export const SchoolContext = createContext();

export const Visual = () => {
    const { theme } = useContext(ModeContext);
    const [showSearch, setShowSearch] = useState(false);
    const [keyword, setKeyword] = useState('Nguyễn Hữu Huân');
    const [startYear, setStartYear] = useState(yearsList[yearsList.length - 1]);
    const [endYear, setEndYear] = useState(yearsList[0]);
    const [singleYear, setSingleYear] = useState(yearsList[0]);
    const [singleWish, setSingleWish] = useState('NV1');
    const [districtList, setDistrictList] = useState({ DATA: [], CHOSEN: '' });
    const [singleDiff, setSingleDiff] = useState(0.5);
    const [sendDiff, setSendDiff] = useState(false);

    const [schoolData, setSchoolData] = useState([]);
    const [competeData, setCompeteData] = useState([]);
    const [areaData, setAreaData] = useState([]);
    const [groupData, setGroupData] = useState([]);

    const [toastMessage, setToastMessage] = useState({
        type: '',
        msg: '',
    });

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
    };

    const keywordRef = useRef(null);
    const searchRef = useRef(null);
    const addSchoolRef = useRef(null);

    const searchBasedOnKeyword = (keyword) => {
        getAxiosYear(keyword)
            .then((res) => handleDataYear(res))
            .then((data) => {
                if (data.length === 0) {
                    setToastMessage({
                        type: 'error',
                        msg: 'Không tìm thấy trường!',
                    });
                    return;
                }

                if (
                    !schoolData.some(
                        (s) => s['ma_truong'] === data[0]['ma_truong'],
                    )
                ) {
                    const prev = schoolData.map((i) => {
                        return {
                            ...i,
                            CHOSEN: false,
                        };
                    });
                    setSchoolData([
                        ...prev,
                        {
                            ma_truong: data[0]['ma_truong'],
                            ten_truong: data[0]['ten_truong'],
                            'QUAN/HUYEN': data[0]['QUAN/HUYEN'],
                            ma_loai: data[0]['ma_loai'],
                            DATA: data.map((d) => {
                                return {
                                    nam_hoc: d['nam_hoc'],
                                    diem: {
                                        NV1: d['diem']['NV1'],
                                        NV2: d['diem']['NV2'],
                                        NV3: d['diem']['NV3'],
                                    },
                                };
                            }),
                            CHOSEN: true,
                        },
                    ]);

                    // setToastMessage({
                    //     type: 'success',
                    //     msg: 'Lấy thông tin thành công'
                    // })
                } else {
                    setToastMessage({
                        type: 'warning',
                        msg: 'Trường đã có trong danh sách!',
                    });
                    return;
                }

                if (!districtList.DATA.includes(data[0]['QUAN/HUYEN'])) {
                    setDistrictList({
                        DATA: [...districtList.DATA, data[0]['QUAN/HUYEN']],
                        CHOSEN: data[0]['QUAN/HUYEN'],
                    });
                }

                setKeyword('');
                keywordRef.current.value = '';
                keywordRef.current.focus();
            })
            .catch(() => {});

        getAxiosCompete(keyword)
            .then((res) => handleDataCompete(res))
            .then((data) => {
                if (data.length === 0) {
                    setToastMessage({
                        type: 'error',
                        msg: 'Không tìm thấy trường!',
                    });
                    return;
                }

                if (
                    !schoolData.some(
                        (s) => s['ma_truong'] === data['ma_truong'],
                    )
                ) {
                    setCompeteData([...competeData, data]);
                } else {
                    setToastMessage({
                        type: 'warning',
                        msg: 'Trường đã có trong danh sách!',
                    });
                    return;
                }
            })
            .catch(() => {});
    };

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleKeyword = (e) => {
        setKeyword(e.target.value.trim());
    };

    const handleSearch = () => {
        searchBasedOnKeyword(keyword);
    };

    // Update document title
    useEffect(() => {
        document.title = 'Score | Phân tích';
    }, []);

    // Toast message management
    useEffect(() => {
        if (toastMessage.type === 'error') {
            toast.error(toastMessage.msg, toastOptions);
        } else if (toastMessage.type === 'warning') {
            toast.warn(toastMessage.msg, toastOptions);
        } else if (toastMessage.type === 'success') {
            toast.success(toastMessage.msg, toastOptions);
        }
    }, [toastMessage]);

    useEffect(() => {
        searchBasedOnKeyword(keyword);
    }, []);

    // Get area data
    useEffect(() => {
        if (districtList.DATA.length === 0) return;

        const promises = districtList.DATA.map((district) =>
            getAxiosArea(district, singleYear, singleWish).then((res) =>
                handleDataArea(res),
            ),
        );

        Promise.all(promises).then((dataList) => {
            setAreaData(dataList);
        });
    }, [districtList, singleYear, singleWish]);

    // Get group data
    useEffect(() => {
        if (schoolData.length === 0) return;

        const selectedScore = schoolData
            .find((s) => s['CHOSEN'] === true)['DATA']
            .find((d) => d['nam_hoc'] === singleYear)['diem'][singleWish];

        getAxiosGroup(singleYear, singleWish, selectedScore, singleDiff)
            .then((res) => handleDataGroup(res))
            .then((data) => {
                setGroupData(data);
            });
    }, [sendDiff]);

    // Disable add button when there are 3 schools
    useEffect(() => {
        if (schoolData.length === 3) {
            addSchoolRef.current.style.display = 'none';
        } else {
            addSchoolRef.current.style.display = 'inline-block';
        }
    }, [schoolData]);

    return (
        <div className="Visual py-[10rem]">
            <ToastContainer />
            <div className="w-[90%] mx-auto">
                <h1 className="text-center my-10 text-3xl font-semibold">
                    Phân tích và trực quan hoá điểm số
                </h1>
                <p className="text-center italic text-sm text-text-subtitle-color">
                    Đây là nơi cho bạn một góc nhìn tổng quát nhất về một trường
                    thông qua các biểu đồ và tuỳ biến đa dạng.
                    <br />
                    Chưa rõ?{' '}
                    <Link to="/docs/visual" className="text-blue-500 underline">
                        Xem hướng dẫn
                    </Link>
                </p>

                <div className="flex justify-center my-[2rem]">
                    <div className="relative" ref={addSchoolRef}>
                        <div
                            className="add cursor-pointer bg-input-color p-1 rounded-[50%] shadow-basic flex"
                            onClick={handleShowSearch}>
                            <AddIcon
                                className={
                                    showSearch ? 'rotate-45' : 'rotate-180'
                                }
                                style={{ transition: 'transform ease 0.2s' }}
                            />
                            <h1 className="ml-1 font-semibold">Thêm</h1>
                        </div>
                        <div
                            className={`absolute top-[150%] left-0 p-2 shadow-basic bg-input-color rounded-lg flex gap-2 ${showSearch ? 'block' : 'hidden'}`}>
                            <input
                                className="bg-input-color bs-in-light py-1 px-2 rounded-lg"
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
                                ref={searchRef}>
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-[6rem] flex-wrap">
                    <SchoolContext.Provider
                        value={{
                            schoolData,
                            setSchoolData,
                            competeData,
                            setCompeteData,
                            areaData,
                            setAreaData,
                            districtList,
                            setDistrictList,
                        }}>
                        {schoolData.map((school, index) => (
                            <SchoolSearch key={index} school={school} />
                        ))}
                    </SchoolContext.Provider>
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
                    }}>
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
                        setSingleYear,
                    }}>
                    <CompeteChart />
                </SchoolContext.Provider>

                <SchoolContext.Provider
                    value={{
                        districtList,
                        setDistrictList,
                        areaData,
                        setAreaData,
                        singleYear,
                        setSingleYear,
                        singleWish,
                        setSingleWish,
                        schoolData,
                    }}>
                    {areaData.length === districtList.DATA.length ? (
                        <AreaChart />
                    ) : null}
                </SchoolContext.Provider>

                <SchoolContext.Provider
                    value={{
                        groupData,
                        setGroupData,
                        schoolData,
                        setSchoolData,
                        singleYear,
                        setSingleYear,
                        singleWish,
                        setSingleWish,
                        singleDiff,
                        setSingleDiff,
                        sendDiff,
                        setSendDiff,
                        setToastMessage,
                    }}>
                    {schoolData.length > 0 ? <GroupChart /> : null}
                </SchoolContext.Provider>
            </div>
        </div>
    );
};
