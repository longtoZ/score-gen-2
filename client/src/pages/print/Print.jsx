import { useState, useRef, createContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Add } from '../../components/print/AddMenu';
import { ScoreRangeTable } from '../../components/print/ScoreRangeTable';
import { TopTable } from '../../components/print/TopTable';
import { YearRangeTable } from '../../components/print/YearRangeTable';
import { CompeteTable } from '../../components/print/CompeteTable';
import { AreaTable } from '../../components/print/AreaTable';
import { GroupTable } from '../../components/print/GroupTable';
import { SpecialTable } from '../../components/print/SpecialTable';

import AddIcon from '@mui/icons-material/Add';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ListIcon from '@mui/icons-material/List';

import './print.css'

const functionsDescription = {
    'score-range': 'Khoảng điểm',
    'top': 'Top điểm',
    'year-range': 'Điểm các năm',
    'compete': 'Tỉ lệ chọi các năm',
    'area': 'Trường trong khu vực',
    'group': 'Trường tương đương',
    'special': 'Lớp chuyên',
}

export const AddContext = createContext();
export const FunctionContext = createContext();

export const Print = () => {

    const [data, setData] = useState([]);
    const [showAdd, setShowAdd] = useState({
        show: false,
        mode: 'add',
        index: 0,
    });

    const handleShowAdd = () => {
        setShowAdd({
            ...showAdd,
            show: true,
        });
    }

    const editData = (index) => {
        setShowAdd({
            show: true,
            mode: 'edit',
            index,
        });
    }

    const deleteData = (index) => {
        const newData = data.filter((item, i) => i !== index);
        setData(newData);
    }

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <FunctionContext.Provider value={{ data, setData }}>
                <AddContext.Provider value={{ showAdd, setShowAdd }}>
                    {showAdd.show && <Add />}
                </AddContext.Provider>
            </FunctionContext.Provider>

            <div className="Visual py-[10rem] w-[90%] mx-auto relative">
                <h1 className="text-center my-10 text-3xl font-semibold">
                    Phân tích và trực quan hoá điểm số
                </h1>
                <p className="text-center italic text-sm text-text-subtitle-color">
                    Tuỳ chỉnh thông tin để in ấn và lưu trữ lâu dài.
                    <br />
                    Chưa rõ?{' '}
                    <Link to="/guide" className="text-blue-500 underline">
                        Xem hướng dẫn
                    </Link>
                </p>

                <div className="mx-auto mt-[3rem] w-[8rem] cursor-pointer" onClick={handleShowAdd}>
                    <div className="p-2 flex justify-center gap-2 rounded-lg bg-input-color shadow-basic">
                        <AddIcon />
                        <h1 className="font-semibold">Thêm mục</h1>
                    </div>
                </div>

                <div className='fixed bottom-4 right-4 p-2 cursor-pointer add-btn' onClick={handleShowAdd}>
                    <div className="p-2 flex justify-center gap-2 bg-input-color shadow-basic">
                        <h1 className="font-semibold add-text">Thêm mục</h1>
                        <AddIcon />
                    </div>
                </div>

                <div className='mt-[3rem] px-[5%]'>
                    {data.map((item, index) => {

                        return (
                            <div key={index} className='my-[5rem] bg-input-color border-2 border-border-color rounded-xl overflow-hidden'>
                                <div className='flex justify-between py-3 px-[5%] bg-even-row-color'>
                                    <div className='flex gap-2'>
                                        <button className='bg-input-color p-1 rounded-lg border-2 border-border-color text-gray-600 cursor-pointer mx-auto'>
                                            <ListIcon />
                                        </button>
                                        <h1 className='leading-[0] my-auto font-semibold'>{functionsDescription[item.dataType]}</h1>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button className='bg-input-color p-1 rounded-lg border-2 border-border-color text-gray-600 cursor-pointer mx-auto' onClick={() => editData(index)}>
                                            <EditNoteIcon />
                                        </button>
                                        <button className='bg-input-color p-1 rounded-lg border-2 border-border-color text-gray-600 cursor-pointer mx-auto' onClick={() => deleteData(index)}>
                                            <DeleteForeverIcon />
                                        </button>
                                    </div>
                                </div>
                                <div className='py-6 px-[5%]'>
                                    {item.dataType === 'score-range' && <ScoreRangeTable data={item} />}
                                    {item.dataType === 'top' && <TopTable data={item} />}
                                    {item.dataType === 'year-range' && <YearRangeTable data={item} />}
                                    {item.dataType === 'compete' && <CompeteTable data={item} />}
                                    {item.dataType === 'area' && <AreaTable data={item} />}
                                    {item.dataType === 'group' && <GroupTable data={item} />}
                                    {item.dataType === 'special' && <SpecialTable data={item} />}
                                </div>
                            </div>
                        );
                        
                    })}
                </div>

            </div>
        </>
    );
};
