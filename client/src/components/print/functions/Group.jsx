import { useContext, useEffect, useRef, useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { FunctionContext } from '../../../pages/print/Print';
import { AddContext } from '../../../pages/print/Print';
import {
    normalSubjectsObj,
    normalSubjectsObjReverse,
    yearsList,
} from '../../../utils/lists';
import {
    getAxiosGroup,
    getAxiosYear,
    handleDataGroup,
    handleDataYear,
} from '../../visual/utils';

export const Group = () => {
    const { data, setData } = useContext(FunctionContext);
    const { showAdd, setShowAdd, setToastMessage } = useContext(AddContext);

    const mode = showAdd.mode;
    const dataIndex = showAdd.index;

    const titleRef = useRef(null);
    const schoolRef = useRef(null);
    const diffRef = useRef(null);

    const [title, setTitle] = useState(
        mode === 'add' ? '' : data[dataIndex].title,
    );
    const [school, setSchool] = useState(
        mode === 'add' ? '' : data[dataIndex].school,
    );
    const [diff, setDiff] = useState(
        mode === 'add' ? 0.5 : data[dataIndex].diff,
    );
    const [showYear, setShowYear] = useState(false);
    const [showNormalWish, setShowNormalWish] = useState(false);

    const [selectedYear, setSelectedYear] = useState(
        mode === 'add' ? yearsList[0] : data[dataIndex].year,
    );
    const [selectedNormalWish, setSelectedNormalWish] = useState(
        mode === 'add'
            ? Object.entries(normalSubjectsObj)[0][0]
            : normalSubjectsObjReverse[data[dataIndex].wish],
    );

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleSchool = (e) => {
        setSchool(e.target.value);
    };

    const handleDiff = (e) => {
        setDiff(parseFloat(e.target.value));
    };

    const handleShowYear = () => {
        setShowYear(!showYear);
    };

    const handleShowNormalWish = () => {
        setShowNormalWish(!showNormalWish);
    };

    const handleYear = (e) => {
        setSelectedYear(parseInt(e.target.getAttribute('data-year')));
    };

    const handleNormalWish = (e) => {
        setSelectedNormalWish(e.target.innerText);
    };

    // Add the data to the main array
    const addData = () => {
        getAxiosYear(school)
            .then((res) => handleDataYear(res))
            .then((schoolData) => {
                if (schoolData.length === 0) {
                    setToastMessage({
                        type: 'error',
                        msg: 'Không tìm thấy trường',
                    });
                    return;
                }

                const schoolName = schoolData[0].TEN_TRUONG;
                const selectedScore = schoolData.find(
                    (d) => d['NAM_HOC'] === selectedYear,
                )['DIEM'][normalSubjectsObj[selectedNormalWish]];

                getAxiosGroup(
                    selectedYear,
                    normalSubjectsObj[selectedNormalWish],
                    selectedScore,
                    diff,
                )
                    .then((res) => handleDataGroup(res))
                    .then((tableData) => {
                        setData([
                            ...data,
                            {
                                dataType: 'group',
                                title,
                                year: selectedYear,
                                wish: normalSubjectsObj[selectedNormalWish],
                                school: schoolName,
                                diff,
                                tableData,
                            },
                        ]);
                    });
            })
            .then(() =>
                setShowAdd({
                    show: false,
                    mode: 'add',
                    index: 0,
                }),
            );
    };

    const editData = () => {
        getAxiosYear(school)
            .then((res) => handleDataYear(res))
            .then((schoolData) => {
                if (schoolData.length === 0) {
                    setToastMessage({
                        type: 'error',
                        msg: 'Không tìm thấy trường',
                    });
                    return;
                }
                const schoolName = schoolData[0].TEN_TRUONG;
                const selectedScore = schoolData.find(
                    (d) => d['NAM_HOC'] === selectedYear,
                )['DIEM'][normalSubjectsObj[selectedNormalWish]];

                getAxiosGroup(
                    selectedYear,
                    normalSubjectsObj[selectedNormalWish],
                    selectedScore,
                    diff,
                )
                    .then((res) => handleDataGroup(res))
                    .then((tableData) => {
                        const newData = [...data];
                        newData[dataIndex] = {
                            dataType: 'group',
                            title,
                            year: selectedYear,
                            wish: normalSubjectsObj[selectedNormalWish],
                            school: schoolName,
                            diff,
                            tableData,
                        };
                        setData(newData);
                    });
            })
            .then(() =>
                setShowAdd({
                    show: false,
                    mode: 'add',
                    index: 0,
                }),
            );
    };

    // Update value for input fields
    useEffect(() => {
        if (mode === 'edit') {
            titleRef.current.value = data[dataIndex].title;
            schoolRef.current.value = data[dataIndex].school;
            diffRef.current.value = data[dataIndex].diff;
        }
    }, [mode]);

    return (
        <div>
            <section className="w-full px-[10%] block pt-8">
                <input
                    type="text"
                    className="block my-2 w-full bs-in p-2 bg-transparent rounded-lg text-center"
                    placeholder="Nhập tiêu đề mục..."
                    onChange={handleTitle}
                    ref={titleRef}
                />
                <div className="w-full border-b-2 border-border-color"></div>
            </section>
            <section className="options-grid mt-4 grid grid-cols-2 gap-2 pt-8 px-[10%]">
                <div
                    className="mx-auto w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                    onClick={handleShowYear}
                >
                    <p className="pr-2">Năm {selectedYear}</p>
                    <ArrowDropDownIcon />

                    <ul
                        className="z-[3] overflow-y-scroll h-[14rem] w-[10rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg"
                        style={
                            showYear
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
                                    data-year={item}
                                >
                                    Năm {item}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div
                    className="mx-auto w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                    onClick={handleShowNormalWish}
                >
                    <p className="pr-2">{selectedNormalWish}</p>
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
            </section>
            <section className="inputs-grid mt-[2rem] w-full grid grid-cols-2 gap-2 px-[10%]">
                <h1 className="text-center font-semibold">Tên trường</h1>
                <input
                    className="bs-in p-2 bg-transparent rounded-lg text-center"
                    type="text"
                    placeholder="Nhập tên trường"
                    onChange={handleSchool}
                    ref={schoolRef}
                />
                <h1 className="text-center font-semibold">Chênh lệch</h1>
                <input
                    className="bs-in p-2 bg-transparent rounded-lg text-center"
                    type="number"
                    step="0.1"
                    placeholder={diff}
                    onChange={handleDiff}
                    ref={diffRef}
                />
            </section>
            {showAdd.mode === 'add' ? (
                <button
                    className="float-right mt-[2rem] bg-teal-600 text-white p-2 rounded-lg"
                    onClick={addData}
                >
                    Thêm mới
                </button>
            ) : (
                <button
                    className="float-right mt-[2rem] bg-teal-600 text-white p-2 rounded-lg"
                    onClick={editData}
                >
                    Thay đổi
                </button>
            )}
        </div>
    );
};
