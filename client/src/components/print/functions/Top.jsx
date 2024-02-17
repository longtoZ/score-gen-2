import { useState, useEffect, useRef, useContext } from 'react';
import { FunctionContext } from '../../../pages/print/Print';
import { AddContext } from '../../../pages/print/Print';
import {
    normalSubjectsObj,
    normalSubjectsObjReverse,
    districtsList,
} from '../../../utils/lists';
import { getAxiosCommon, handleData } from '../../suggest/utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';

export const Top = () => {

    const { data, setData } = useContext(FunctionContext);
    const { showAdd, setShowAdd, setToastMessage } = useContext(AddContext);

    const mode = showAdd.mode
    const dataIndex = showAdd.index;

    const fullDistrictsList = ['Tất cả', ...districtsList];

    const districtRef = useRef(null);
    const highestRef = useRef(null);
    const lowestRef = useRef(null);
    const titleRef = useRef(null);
    const topRef = useRef(null);
    
    const [title, setTitle] = useState(mode === 'add' ? '' : data[dataIndex].title);
    const [top, setTop] = useState(mode === 'add' ? 10 : data[dataIndex].topValue);
    const [position, setPosition] = useState(mode === 'add' ? 'highest' : data[dataIndex].positionValue);
    const [showNormalWish, setShowNormalWish] = useState(false);
    const [showDistrict, setShowDistrict] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState(mode == 'add' ? districtsList : data[dataIndex].districtValue);

    const [selectedNormalWish, setSelectedNormalWish] = useState(
        mode === 'add' ? Object.entries(normalSubjectsObj)[0][0] : normalSubjectsObjReverse[data[dataIndex].wishValue]
    );

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleTop = (e) => {
        setTop(parseFloat(e.target.value));
    };

    const handleShowNormalWish = () => {
        setShowNormalWish(!showNormalWish);
    };


    const handleShowDistrict = () => {
        setShowDistrict(!showDistrict);
    };

    const handleNormalWish = (e) => {
        setSelectedNormalWish(e.target.innerText);
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

    const handlePosition = (e) => {
        const dataType = e.target.getAttribute('data-type');
        setPosition(dataType);
    };

    useEffect(() => {
        if (position === 'highest') {
            highestRef.current.classList.add('enable');
            lowestRef.current.classList.remove('enable');
        } else {
            lowestRef.current.classList.add('enable');
            highestRef.current.classList.remove('enable');
        }
    }, [position])

    // Add the data to the main array
    const addData = () => {

        if (top < 1) {
            setToastMessage({
                type: 'error',
                msg: 'Top điểm phải lớn hơn 0',
            });
            return;
        }

        const schoolType = 'Lớp thường'
        const wishValue = normalSubjectsObj[selectedNormalWish]
        
        getAxiosCommon(schoolType, wishValue)
            .then((res) => handleData(res, schoolType, wishValue))
            .then((tableData) => {
                setData([
                    ...data,
                    {
                        dataType: 'top',
                        title,
                        wishValue,
                        districtValue: selectedDistrict,
                        topValue: top,
                        positionValue: position,
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

        if (top < 1) {
            setToastMessage({
                type: 'warning',
                msg: 'Top điểm phải lớn hơn 0',
            });
            return;
        }
                
        const schoolType = 'Lớp thường'
        const wishValue = normalSubjectsObj[selectedNormalWish]

        getAxiosCommon(schoolType, wishValue)
            .then((res) => handleData(res, schoolType, wishValue))
            .then((tableData) => {
                const newData = data;
                newData[dataIndex] = {
                    dataType: 'top',
                    title,
                    wishValue,
                    districtValue: selectedDistrict,
                    topValue: top,
                    positionValue: position,
                    tableData,
                }
                setData(newData);
            })
            .then(() => setShowAdd({
                show: false,
                mode: 'add',
                index: 0,
            }));
    }

    // Update the selected district
    useEffect(() => {
        if (selectedDistrict.length === districtsList.length) {
            districtRef.current.querySelector('li').classList.add('selected-district');
        } else {
            districtRef.current.querySelector('li').classList.remove('selected-district');
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
    }, [selectedDistrict]);

    // Update value for input fields
    useEffect(() => {
        if (mode === 'edit') {
            titleRef.current.value = data[dataIndex].title;
            topRef.current.value = data[dataIndex].topValue;
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
                    onChange={handleTitle}
                    ref={titleRef}
                />
                <div className='w-full border-b-2 border-border-color'></div>
            </section>
            <span className='text-red-500 text-center block w-full pt-8'>*Điểm được đề xuất dựa trên trung bình cộng từ điểm các năm</span>
            <section className="mt-4 grid grid-cols-2 gap-2 px-[10%]">
                <div
                    className="mx-auto w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                    onClick={handleShowNormalWish}
                >
                    <p className="pr-2">
                        {selectedNormalWish}
                    </p>
                    <ArrowDropDownIcon />

                    <ul
                        className="z-[3] w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg"
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
                
                <div
                    className="mx-auto w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                    onClick={handleShowDistrict}
                >
                    <p className="pr-2">Chọn khu vực</p>
                    <ArrowDropDownIcon />

                    <ul
                        className="z-[3] overflow-y-scroll h-[14rem] w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg"
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
            <section className="mt-[2rem] w-full grid grid-cols-3 gap-2 px-[10%]">
                <input
                    className="bs-in p-2 bg-bg-sank-color rounded-lg text-center"
                    type="number"
                    placeholder={top}
                    min="0"
                    max="30"
                    onChange={handleTop}
                    ref={topRef}
                />
                <button
                    className="font-semibold text-text-color p-2 rounded-lg shadow-md cursor-pointer opacity-50"
                    ref={highestRef}
                    data-type="highest"
                    onClick={handlePosition}
                >
                    Cao nhất
                </button>
                <button
                    className="font-semibold text-text-color p-2 rounded-lg shadow-md cursor-pointer opacity-50"
                    ref={lowestRef}
                    data-type="lowest"
                    onClick={handlePosition}
                >
                    Thấp nhất
                </button>
            </section>
            {showAdd.mode === 'add' ? (
                <button className='float-right mt-[1rem] bg-teal-600 text-white p-2 rounded-lg' onClick={addData}>Thêm mới</button>
            ) : (
                <button className='float-right mt-[1rem] bg-teal-600 text-white p-2 rounded-lg' onClick={editData}>Thay đổi</button>
            )}
        </div>
    );
};
