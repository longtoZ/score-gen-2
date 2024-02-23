import { createContext, useEffect, useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Average } from '../../components/suggest/Average.jsx';
import { AverageTable } from '../../components/suggest/AverageTable.jsx';
import { Range } from '../../components/suggest/Range.jsx';
import { RangeTable } from '../../components/suggest/RangeTable.jsx';
import { Top } from '../../components/suggest/Top.jsx';
import { TopTable } from '../../components/suggest/TopTable.jsx';

import { getAxiosCommon, handleData } from '../../components/suggest/utils.js';
import {
    districtsList,
    normalSubjectsObj,
    specialSubjectsObj,
} from '../../utils/lists.js';
import { ModeContext } from '../../utils/setModeContext.js';

import { Loader } from '../../components/loader/Loader';

import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import './responsive.css';
import './suggest.css';
import './top.css';

export const FilterContext = createContext();

export const Suggest = () => {
    const { theme } = useContext(ModeContext);
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
    const [selectedNormalWish, setSelectedNormalWish] = useState(
        Object.entries(normalSubjectsObj)[0][0],
    );
    const [selectedSpecialWish, setSelectedSpecialWish] = useState(
        Object.entries(specialSubjectsObj)[0][0],
    );
    const [showNormalWish, setShowNormalWish] = useState(false);
    const [showSpecialWish, setShowSpecialWish] = useState(false);
    const [showDistrict, setShowDistrict] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState([
        ...districtsList,
    ]);
    const [currentFunction, setCurrentFunction] = useState('Lọc khoảng');

    const [tableData, setTableData] = useState([]);
    const [filterData, setFilterData] = useState({
        districtValue: districtsList,
        wishValue: '',
        startValue: 0,
        endValue: 0,
        topValue: 10,
        positionValue: 'highest',
        averageValue: 'higher',
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

    const [toastMessage, setToastMessage] = useState({
        type: '',
        msg: '',
    });

    const [showLoader, setShowLoader] = useState(false);

    // Get the data from the server
    useEffect(() => {
        const wishValue =
            schoolType === 'Lớp thường'
                ? normalSubjectsObj[selectedNormalWish]
                : specialSubjectsObj[selectedSpecialWish].replace('1', '%');

        setShowLoader(true);
        getAxiosCommon(schoolType, wishValue)
            .then((res) => handleData(res, schoolType, wishValue))
            .then((data) => {
                setTableData(data);
            })
            .then(() => setShowLoader(false));
    }, [schoolType]);

    const handleShowNormalWish = () => {
        setShowNormalWish(!showNormalWish);
    };

    const handleShowSpecialWish = () => {
        setShowSpecialWish(!showSpecialWish);
    };

    const handleShowDistrict = () => {
        setShowDistrict(!showDistrict);
    };

    const handleNormalWish = (e) => {
        setSelectedNormalWish(e.target.innerText);
    };

    const handleSpecialWish = (e) => {
        setSelectedSpecialWish(e.target.innerText);
    };

    const handleSchoolType = (e) => {
        if (e.target.innerText === 'Lớp thường') {
            normalSchoolRef.current.classList.add('select-school-type');
            specialSchoolRef.current.classList.remove('select-school-type');
        } else {
            specialSchoolRef.current.classList.add('select-school-type');
            normalSchoolRef.current.classList.remove('select-school-type');
        }

        setCurrentFunction('Lọc khoảng');
        setSchoolType(e.target.innerText);
    };

    // Update the title
    useEffect(() => {
        document.title = 'Score | Đề xuất';
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

    // Update the current function
    useEffect(() => {
        rangeRef.current.classList.remove('select-function-type');
        if (schoolType === 'Lớp thường') {
            topRef.current.classList.remove('select-function-type');
            averageRef.current.classList.remove('select-function-type');
        }

        if (currentFunction === 'Lọc khoảng') {
            rangeRef.current.classList.add('select-function-type');
        } else if (currentFunction === 'Thứ tự') {
            topRef.current.classList.add('select-function-type');
        } else {
            averageRef.current.classList.add('select-function-type');
        }
    }, [currentFunction]);

    const handleFunction = (e) => {
        const type = e.target.innerText;

        if (type === 'Lọc khoảng') {
            setCurrentFunction('Lọc khoảng');
        } else if (type === 'Thứ tự') {
            setCurrentFunction('Thứ tự');
        } else {
            setCurrentFunction('Trung bình');
        }
    };

    const addDistrict = (e) => {
        e.stopPropagation();

        const dataset = e.target
            .closest('.select-area')
            .getAttribute('dataset');

        if (dataset === 'Tất cả') {
            if (selectedDistrict.length === districtsList.length) {
                setSelectedDistrict([]);
            } else {
                setSelectedDistrict(districtsList);
            }
        } else {
            if (selectedDistrict.includes(dataset)) {
                setSelectedDistrict(
                    selectedDistrict.filter((item) => item !== dataset),
                );
            } else {
                setSelectedDistrict([...selectedDistrict, dataset]);
            }
        }
    };

    // Update the selected district
    useEffect(() => {
        if (selectedDistrict.length === districtsList.length) {
            districtRef.current
                .querySelector('li')
                .classList.add('selected-district');
        } else {
            districtRef.current
                .querySelector('li')
                .classList.remove('selected-district');
        }

        districtRef.current.querySelectorAll('li').forEach((item, index) => {
            if (index !== 0) {
                if (selectedDistrict.includes(item.getAttribute('dataset'))) {
                    item.classList.add('selected-district');
                } else {
                    item.classList.remove('selected-district');
                }
            }
        });

        setFilterData({
            ...filterData,
            districtValue: selectedDistrict,
        });
    }, [selectedDistrict]);

    // Update selected wish
    useEffect(() => {
        setFilterData({
            ...filterData,
            wishValue:
                schoolType === 'Lớp thường'
                    ? normalSubjectsObj[selectedNormalWish]
                    : specialSubjectsObj[selectedSpecialWish].replace('1', '%'),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedNormalWish, selectedSpecialWish]);

    return (
        <div className="Suggest py-[10rem]">
            <ToastContainer />

            <div className="w-2/3 mx-auto container">
                <h1 className="text-center my-10 text-3xl font-semibold">
                    Đề xuất trường
                </h1>
                <p className="text-center italic text-sm text-text-subtitle-color">
                    Bạn có thể tuỳ chỉnh các bộ lọc từ đơn giản đến chi tiết để
                    lựa chọn và xem xét trường có số điểm phù hợp với nguyện
                    vọng của mình.
                    <br />
                    Chưa rõ?{' '}
                    <Link
                        to="/docs/suggest"
                        className="text-blue-500 underline"
                    >
                        Xem hướng dẫn
                    </Link>
                    <br />
                    <br />
                    <span className="text-red-500">
                        *Điểm được đề xuất dựa trên trung bình cộng từ điểm các
                        năm
                    </span>
                </p>

                <div className="school-type-grid mt-[3rem] w-1/3 mx-auto grid grid-cols-2 p-2 rounded-lg bg-bg-color bs-in text-center font-semibold cursor-pointer school-type-select">
                    <div
                        className="py-1 select-school-type rounded-lg"
                        school-type="normal"
                        ref={normalSchoolRef}
                        onClick={handleSchoolType}
                    >
                        <h1>Lớp thường</h1>
                    </div>
                    <div
                        className="py-1 rounded-lg"
                        school-type="special"
                        ref={specialSchoolRef}
                        onClick={handleSchoolType}
                    >
                        <h1>Lớp chuyên</h1>
                    </div>
                </div>

                <div className="mt-[1rem] w-full mx-auto rounded-lg shadow-basic bg-container-color p-4">
                    <div className="w-3/4 mx-auto grid grid-cols-2 gap-4 suggest-grid">
                        <div className="border-2 border-border-color p-4 rounded-lg">
                            <h1 className="font-semibold">Bộ lọc</h1>

                            <div className="mt-4 grid grid-cols-1 gap-4">
                                {schoolType === 'Lớp thường' ? (
                                    <div
                                        className="mx-auto w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                                        onClick={handleShowNormalWish}
                                    >
                                        <p className="pr-2" ref={normalWishRef}>
                                            {selectedNormalWish}
                                        </p>
                                        <ArrowDropDownIcon />

                                        <ul
                                            className="w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg z-[2]"
                                            style={
                                                showNormalWish
                                                    ? { display: 'block' }
                                                    : { display: 'none' }
                                            }
                                        >
                                            {Object.entries(
                                                normalSubjectsObj,
                                            ).map((item, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className="rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out"
                                                        onClick={
                                                            handleNormalWish
                                                        }
                                                    >
                                                        {item[0]}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ) : (
                                    <div
                                        className="mx-auto w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                                        onClick={handleShowSpecialWish}
                                    >
                                        <p
                                            className="pr-2"
                                            ref={specialWishRef}
                                        >
                                            {selectedSpecialWish}
                                        </p>
                                        <ArrowDropDownIcon />

                                        <ul
                                            className="overflow-y-scroll h-[14rem] w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg z-[2]"
                                            style={
                                                showSpecialWish
                                                    ? { display: 'block' }
                                                    : { display: 'none' }
                                            }
                                        >
                                            {Object.entries(
                                                specialSubjectsObj,
                                            ).map((item, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className="rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out"
                                                        onClick={
                                                            handleSpecialWish
                                                        }
                                                    >
                                                        {item[0]}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}

                                <div
                                    className="mx-auto w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                                    onClick={handleShowDistrict}
                                >
                                    <p className="pr-2">Chọn khu vực</p>
                                    <ArrowDropDownIcon />

                                    <ul
                                        className="overflow-y-scroll h-[14rem] w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg z-[2]"
                                        style={
                                            showDistrict
                                                ? { display: 'block' }
                                                : { display: 'none' }
                                        }
                                        ref={districtRef}
                                    >
                                        {fullDistrictsList.map(
                                            (item, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className="rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out select-area"
                                                        dataset={item}
                                                        onClick={addDistrict}
                                                    >
                                                        <AddIcon
                                                            className="border-2 border-border-color rounded-lg"
                                                            style={{
                                                                fontSize:
                                                                    '1.2rem',
                                                            }}
                                                        />
                                                        <span className="ml-4">
                                                            {item}
                                                        </span>
                                                    </li>
                                                );
                                            },
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {schoolType === 'Lớp thường' ? (
                            <div className="border-2 border-border-color p-4 rounded-lg">
                                <h1 className="font-semibold">Chức năng</h1>

                                <div className="mt-[1rem] w-full grid grid-cols-3 p-2 rounded-lg bg-transparent bs-in text-center font-semibold cursor-pointer">
                                    <div
                                        className="p-1 select-function-type rounded-lg"
                                        ref={rangeRef}
                                        onClick={handleFunction}
                                    >
                                        <h1>Lọc khoảng</h1>
                                    </div>
                                    <div
                                        className="p-1 rounded-lg"
                                        ref={topRef}
                                        onClick={handleFunction}
                                    >
                                        <h1>Thứ tự</h1>
                                    </div>
                                    <div
                                        className="p-1 rounded-lg"
                                        ref={averageRef}
                                        onClick={handleFunction}
                                    >
                                        <h1>Trung bình</h1>
                                    </div>
                                </div>

                                <FilterContext.Provider
                                    value={{
                                        filterData,
                                        setFilterData,
                                        setToastMessage,
                                    }}
                                >
                                    {currentFunction === 'Lọc khoảng' ? (
                                        <Range
                                            min={0}
                                            max={30}
                                            schoolType="Lớp thường"
                                            selectedDistrict={selectedDistrict}
                                            wish={selectedNormalWish}
                                        />
                                    ) : currentFunction === 'Thứ tự' ? (
                                        <Top />
                                    ) : (
                                        <Average />
                                    )}
                                </FilterContext.Provider>
                            </div>
                        ) : (
                            <div className="border-2 border-border-color p-4 rounded-lg">
                                <h1 className="font-semibold">Chức năng</h1>

                                <div className="mt-[1rem] w-full grid grid-cols-1 p-1 rounded-lg bg-bg-color bs-in text-center font-semibold">
                                    <div
                                        className="py-1 select-function-type rounded-lg"
                                        ref={rangeRef}
                                    >
                                        <h1>Lọc khoảng</h1>
                                    </div>
                                </div>

                                <FilterContext.Provider
                                    value={{
                                        filterData,
                                        setFilterData,
                                        setToastMessage,
                                    }}
                                >
                                    <Range
                                        min={0}
                                        max={50}
                                        schoolType="Lớp chuyên"
                                        selectedDistrict={selectedDistrict}
                                        wish={selectedSpecialWish}
                                    />
                                </FilterContext.Provider>
                            </div>
                        )}
                    </div>
                </div>

                {showLoader && <Loader />}

                {currentFunction === 'Lọc khoảng' ? (
                    <RangeTable
                        tableData={tableData}
                        filterData={filterData}
                        schoolType={schoolType}
                    />
                ) : currentFunction === 'Thứ tự' ? (
                    <TopTable tableData={tableData} filterData={filterData} />
                ) : (
                    <AverageTable
                        tableData={tableData}
                        filterData={filterData}
                    />
                )}
            </div>
        </div>
    );
};
