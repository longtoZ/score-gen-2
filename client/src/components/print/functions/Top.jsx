import { useState, useEffect, useRef, useContext } from 'react';
import { FunctionContext } from '../../../pages/print/Print';
import {
    normalSubjectsObj,
    specialSubjectsObj,
    districtsList,
} from '../../../utils/lists';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';

export const Top = () => {

    const { data, setData } = useContext(FunctionContext);

    const fullDistrictsList = ['Tất cả', ...districtsList];

    const districtRef = useRef(null);
    const highestRef = useRef(null);
    const lowestRef = useRef(null);
    
    const [top, setTop] = useState(10);
    const [position, setPosition] = useState('highest');
    const [showNormalWish, setShowNormalWish] = useState(false);
    const [showDistrict, setShowDistrict] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState([
        ...districtsList,
    ]);

    const [selectedNormalWish, setSelectedNormalWish] = useState(
        Object.entries(normalSubjectsObj)[0][0],
    );

    const handleTop = (e) => {
        setTop(e.target.value);
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

        if (dataType === 'highest') {
            highestRef.current.classList.add('enable');
            lowestRef.current.classList.remove('enable');
        } else {
            lowestRef.current.classList.add('enable');
            highestRef.current.classList.remove('enable');
        }

        setPosition(dataType);
    };

    // Add the data to the main array
    const addData = () => {
        setData([
            ...data,
            {
                dataType: 'top',
                wish: selectedNormalWish,
                district: selectedDistrict,
                top,
                position,
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
                    value={top}
                    min="0"
                    max="30"
                    placeholder="Số lượng"
                    onChange={handleTop}
                />
                <button
                    className="enable font-semibold text-text-color p-2 rounded-lg shadow-md cursor-pointer opacity-50"
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
            <button className='float-right mt-[1rem] bg-teal-600 text-white p-2 rounded-lg' onClick={addData}>Thêm</button>
        </div>
    );
};
