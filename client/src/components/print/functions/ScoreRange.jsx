import { useState, useEffect, useRef, useContext } from 'react';
import { FunctionContext } from '../../../pages/print/Print';
import {
    normalSubjectsObj,
    specialSubjectsObj,
    districtsList,
} from '../../../utils/lists';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';

export const ScoreRange = () => {

    const { data, setData } = useContext(FunctionContext);

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(30);

    const schoolTypeList = ['Lớp thường', 'Lớp chuyên'];
    const fullDistrictsList = ['Tất cả', ...districtsList];

    const schoolTypeRef = useRef(null);

    const districtRef = useRef(null);

    const [showSchoolType, setShowSchoolType] = useState(false);
    const [showNormalWish, setShowNormalWish] = useState(false);
    const [showSpecialWish, setShowSpecialWish] = useState(false);
    const [showDistrict, setShowDistrict] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState([
        ...districtsList,
    ]);

    const [schoolType, setSchoolType] = useState(schoolTypeList[0]);
    const [selectedNormalWish, setSelectedNormalWish] = useState(
        Object.entries(normalSubjectsObj)[0][0],
    );
    const [selectedSpecialWish, setSelectedSpecialWish] = useState(
        Object.entries(specialSubjectsObj)[0][0],
    );

    const handleStart = (e) => {
        setStart(e.target.value);
    };

    const handleEnd = (e) => {
        setEnd(e.target.value);
    };

    const handleShowSchoolType = () => {
        setShowSchoolType(!showSchoolType);
    }

    const handleShowNormalWish = () => {
        setShowNormalWish(!showNormalWish);
    };

    const handleShowSpecialWish = () => {
        setShowSpecialWish(!showSpecialWish);
    };

    const handleShowDistrict = () => {
        setShowDistrict(!showDistrict);
    };

    const handleSchoolType = (e) => {
        setSchoolType(e.target.innerText);
    }

    const handleNormalWish = (e) => {
        setSelectedNormalWish(e.target.innerText);
    };

    const handleSpecialWish = (e) => {
        setSelectedSpecialWish(e.target.innerText);
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

    // Add the data to the main array
    const addData = () => {
        setData([
            ...data,
            {
                dataType: 'score-range',
                schoolType,
                wish: schoolType === 'Lớp thường' ? selectedNormalWish : selectedSpecialWish,
                district: selectedDistrict,
                start,
                end,
            }
        ])
    }

    // Update the selected district
    useEffect(() => {
        districtRef.current.querySelectorAll('li').forEach((item) => {
            if (selectedDistrict.includes(item.getAttribute('dataset'))) {
                item.classList.add('selected-district');
            } else {
                item.classList.remove('selected-district');
            }
        });
    }, [selectedDistrict]);

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
                    className="mb-2 mx-auto w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                    onClick={handleShowSchoolType}
                >
                    <p className="pr-2" ref={schoolTypeRef}>
                        {schoolType}
                    </p>
                    <ArrowDropDownIcon />

                    <ul
                        className="overflow-y-scroll h-[14rem] w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg z-[3]"
                        style={
                            showSchoolType
                                ? { display: 'block' }
                                : { display: 'none' }
                        }
                    >
                        {schoolTypeList.map(
                            (item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out"
                                        onClick={handleSchoolType}
                                    >
                                        {item}
                                    </li>
                                );
                            },
                        )}
                    </ul>
                </div>
                {schoolType === 'Lớp thường' ? (
                    <div
                        className="mx-auto w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                        onClick={handleShowNormalWish}
                    >
                        <p className="pr-2">
                            {selectedNormalWish}
                        </p>
                        <ArrowDropDownIcon />

                        <ul
                            className="w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg"
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
                ) : (
                    <div
                        className=" mx-auto w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                        onClick={handleShowSpecialWish}
                    >
                        <p className="pr-2">
                            {selectedSpecialWish}
                        </p>
                        <ArrowDropDownIcon />

                        <ul
                            className="overflow-y-scroll h-[14rem] w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg"
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
                )}
                <div
                    className=" mx-auto w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                    onClick={handleShowDistrict}
                >
                    <p className="pr-2">Chọn khu vực</p>
                    <ArrowDropDownIcon />

                    <ul
                        className="overflow-y-scroll h-[14rem] w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg"
                        style={
                            showDistrict
                                ? { display: 'block' }
                                : { display: 'none' }
                        }
                        ref={districtRef}
                    >
                        {fullDistrictsList.map((item, index) => {
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
                                            fontSize: '1.2rem',
                                        }}
                                    />
                                    <span className="ml-4">{item}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
            <section className="mt-[2rem] w-full grid grid-cols-2 gap-2 px-[10%]">
                <h1 className='text-center font-semibold'>Điểm đầu</h1>
                <input
                    className="bs-in p-2 bg-bg-sank-color rounded-lg text-center"
                    type="number"
                    min="0"
                    max="30"
                    placeholder={start}
                    onChange={handleStart}
                />
                <h1 className='text-center font-semibold'>Điểm cuối</h1>
                <input
                    className="bs-in p-2 bg-bg-sank-color rounded-lg text-center"
                    type="number"
                    min="0"
                    max="30"
                    placeholder={end}
                    onChange={handleEnd}
                />
            </section>
            <button className='float-right mt-[1rem] bg-teal-600 text-white p-2 rounded-lg' onClick={addData}>Thêm</button>
        </div>
    );
};
