import { useContext, useEffect, useRef, useState } from 'react';

import { FunctionContext } from '../../../pages/print/Print';
import { AddContext } from '../../../pages/print/Print';
import { yearsList } from '../../../utils/lists';
import { getAxiosCompete, handleDataCompete } from '../../visual/utils';

export const Compete = () => {
    const { data, setData } = useContext(FunctionContext);
    const { showAdd, setShowAdd, setToastMessage } = useContext(AddContext);

    const mode = showAdd.mode;
    const dataIndex = showAdd.index;

    const titleRef = useRef(null);
    const schoolRef = useRef(null);
    const startRef = useRef(null);
    const endRef = useRef(null);

    const [title, setTitle] = useState(
        mode === 'add' ? '' : data[dataIndex].title,
    );
    const [school, setSchool] = useState(
        mode === 'add' ? '' : data[dataIndex].school,
    );
    const [start, setStart] = useState(
        mode === 'add'
            ? yearsList[yearsList.length - 1]
            : data[dataIndex].start,
    );
    const [end, setEnd] = useState(
        mode === 'add' ? yearsList[0] : data[dataIndex].end,
    );

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleSchool = (e) => {
        setSchool(e.target.value);
    };

    const handleStart = (e) => {
        setStart(e.target.value);
    };

    const handleEnd = (e) => {
        setEnd(e.target.value);
    };

    // Add the data to the main array
    const addData = () => {

        if (school === '') {
            setToastMessage({
                type: 'warning',
                msg: 'Tên trường không được để trống',
            });
            return;
        }

        if (end > yearsList[0] || start < yearsList[yearsList.length - 1]) {
            setToastMessage({
                type: 'error',
                msg: `Năm bắt đầu và kết thúc phải năm trong khoảng từ ${yearsList[yearsList.length - 1]} đến ${yearsList[0]}`,
            });
            return;
        }

        getAxiosCompete(school)
            .then((res) => handleDataCompete(res))
            .then((tableData) => {
                if (tableData.length === 0) {
                    setToastMessage({
                        type: 'error',
                        msg: 'Không tìm thấy trường',
                    });
                    return;
                }

                setData([
                    ...data,
                    {
                        dataType: 'compete',
                        title,
                        school: tableData.ten_truong,
                        start,
                        end,
                        tableData,
                    },
                ]);
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
        if (end > yearsList[0] || start < yearsList[yearsList.length - 1]) {
            setToastMessage({
                type: 'error',
                msg: `Năm bắt đầu và kết thúc phải năm trong khoảng từ ${yearsList[yearsList.length - 1]} đến ${yearsList[0]}`,
            });
            return;
        }

        getAxiosCompete(school)
            .then((res) => handleDataCompete(res))
            .then((tableData) => {
                if (tableData.length === 0) {
                    setToastMessage({
                        type: 'error',
                        msg: 'Không tìm thấy trường',
                    });
                    return;
                }
                const newData = data;
                newData[dataIndex] = {
                    dataType: 'compete',
                    title,
                    school: tableData.ten_truong,
                    start,
                    end,
                    tableData,
                };
                setData(newData);
            })
            .then(() =>
                setShowAdd({
                    show: false,
                    mode: 'add',
                    index: 0,
                }),
            );
    };

    useEffect(() => {
        if (mode === 'edit') {
            titleRef.current.value = data[dataIndex].title;
            schoolRef.current.value = data[dataIndex].school;
            startRef.current.value = data[dataIndex].start;
            endRef.current.value = data[dataIndex].end;
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
            <section className="inputs-grid mt-[2rem] w-full grid grid-cols-2 gap-2 px-[10%]">
                <h1 className="text-center font-semibold">Tên trường</h1>
                <input
                    className="bs-in p-2 bg-transparent rounded-lg text-center"
                    type="text"
                    placeholder="Nhập tên trường"
                    onChange={handleSchool}
                    ref={schoolRef}
                />
                <h1 className="text-center font-semibold">Năm bắt đầu</h1>
                <input
                    className="bs-in p-2 bg-transparent rounded-lg text-center"
                    type="number"
                    min={start}
                    max={end}
                    placeholder="Nhập năm bắt đầu"
                    onChange={handleStart}
                    ref={startRef}
                />
                <h1 className="text-center font-semibold">Năm kết thúc</h1>
                <input
                    className="bs-in p-2 bg-transparent rounded-lg text-center"
                    type="number"
                    min={start}
                    max={end}
                    placeholder="Nhập năm kết thúc"
                    onChange={handleEnd}
                    ref={endRef}
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
