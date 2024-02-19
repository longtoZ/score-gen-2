import { useState, useRef, createContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AddMenu } from '../../components/print/menu/AddMenu';
import { OrderMenu } from '../../components/print/menu/OrderMenu';
import { DeleteMenu } from '../../components/print/menu/DeleteMenu';
import { ScoreRangeTable } from '../../components/print/ScoreRangeTable';
import { TopTable } from '../../components/print/TopTable';
import { YearRangeTable } from '../../components/print/YearRangeTable';
import { CompeteTable } from '../../components/print/CompeteTable';
import { AreaTable } from '../../components/print/AreaTable';
import { GroupTable } from '../../components/print/GroupTable';
import { SpecialTable } from '../../components/print/SpecialTable';

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ListIcon from '@mui/icons-material/List';
import './print.css';
import '../../components/print/responsive.css';

import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
};

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
export const OrderContext = createContext();
export const DeleteContext = createContext();
export const FunctionContext = createContext();

export const Print = () => {

    const [data, setData] = useState(localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []);
    const [showAdd, setShowAdd] = useState({
        show: false,
        mode: 'add',
        index: 0,
    });
    const [showOrder, setShowOrder] = useState(false);
    const [showDelete, setShowDelete] = useState({
        show: false,
        index: 0,
    
    });
    const [toastMessage, setToastMessage] = useState({
        type: '',
        msg: '',
    })

    const handleShowAdd = () => {
        setShowAdd({
            ...showAdd,
            show: true,
        });
    }

    const handleSaveData = () => {
        localStorage.setItem('data', JSON.stringify(data));
        setToastMessage({
            type: 'success',
            msg: 'Dữ liệu đã được lưu.'
        });
    }

    const handleDeleteData = () => {
        setData([]);
        localStorage.removeItem('data');
        setToastMessage({
            type: 'success',
            msg: 'Dữ liệu đã được xóa.'
        });
    }

    const handleShowOrder = () => {
        setShowOrder(true);
    }

    const editData = (index) => {
        setShowAdd({
            show: true,
            mode: 'edit',
            index,
        });
    }

    const deleteData = (index) => {
        setShowDelete({
            show: true,
            index,
        });
    }

    const [showPrint, setShowPrint] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheck = () => {
        setIsChecked(!isChecked);
    }

    const handleShowPrint = (e) => {
        e.stopPropagation();

        setShowPrint(!showPrint);
        
    }

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
        if (data.length !== 0) {
            setToastMessage({
                type: 'success',
                msg: 'Các mục đã được cập nhật.'
            })
        }
    }, [data]);

    return (
        <>
            <ToastContainer />

            <FunctionContext.Provider value={{ data, setData }}>
                <AddContext.Provider value={{ showAdd, setShowAdd, setToastMessage }}>
                    {showAdd.show && <AddMenu />}
                </AddContext.Provider>
            </FunctionContext.Provider>

            <OrderContext.Provider value={{ setShowOrder, data, setData }}>
                {showOrder && <OrderMenu />}
            </OrderContext.Provider>

            <DeleteContext.Provider value={{ showDelete, setShowDelete, data, setData, setToastMessage }}>
                {showDelete.show && <DeleteMenu />}
            </DeleteContext.Provider>

            <div className="Visual py-[10rem] w-[90%] mx-auto relative">
                <h1 className="text-center my-10 text-3xl font-semibold">
                    Báo cáo và xuất dữ liệu
                </h1>
                <p className="subtitle text-center italic text-sm text-text-subtitle-color">
                    Tuỳ chỉnh thông tin để in ấn và lưu trữ lâu dài.
                    <br />
                    Chưa rõ?{' '}
                    <Link to="/guide" className="text-blue-500 underline">
                        Xem hướng dẫn
                    </Link>
                </p>

                <div className='options flex justify-center gap-2 mt-[3rem]'>
                    <div className="w-[8rem] cursor-pointer" onClick={handleShowAdd}>
                        <div className="p-2 flex justify-center gap-2 rounded-lg bg-input-color shadow-basic">
                            <AddIcon />
                            <h1 className="font-semibold">Thêm mục</h1>
                        </div>
                    </div>
                    <div className="w-[8rem] cursor-pointer" onClick={handleSaveData}>
                        <div className="p-2 flex justify-center gap-2 rounded-lg bg-cyan-500 text-white shadow-basic">
                            <SaveIcon style={{fontSize: '1.4em'}} />
                            <h1 className="font-semibold">Lưu dữ liệu</h1>
                        </div>
                    </div>
                    <div className="w-[8rem] cursor-pointer" onClick={handleDeleteData}>
                        <div className="p-2 flex justify-center gap-2 rounded-lg bg-red-500 text-white shadow-basic">
                            <DeleteForeverIcon style={{fontSize: '1.4em'}} />
                            <h1 className="font-semibold">Xoá tất cả</h1>
                        </div>
                    </div>
                </div>

                <div className='fixed bottom-4 p-2 cursor-pointer add-area' >
                    <div className="my-2 p-2 flex justify-center gap-2 bg-white shadow-basic add-btn" onClick={handleShowAdd}>
                        <h1 className="font-semibold add-text">Thêm mục</h1>
                        <AddIcon />
                    </div>
                    <div className="float-right inline-block relative my-2 p-2 gap-2 bg-white shadow-basic print-btn" onClick={handleShowPrint} >
                        <PrintIcon />

                        <div className={` ${showPrint ? 'block' : 'hidden'} absolute bottom-0 right-[120%] bg-white py-2 px-6 rounded-lg w-[12rem]`}>
                            <label className='block mb-2'>
                                <h1 className='mx-2 inline-block'>Mỗi trang 1 mục</h1>
                                <input type="checkbox" checked={isChecked} onChange={handleCheck} />
                            </label>
                            <button className='block w-full bg-emerald-500 p-2 rounded-lg text-white font-bold my-1' onClick={() => { window.print()}}>In</button>
                        </div>
                    </div>
                </div>

                <div className='mt-[3rem] px-[5%] table-section'>
                    {data.map((item, index) => {

                        return (
                            <div key={index} className={`${isChecked ? 'page-break-after' : ''} table-area my-[5rem] bg-input-color border-2 border-border-color rounded-xl overflow-hidden`}>
                                <div className='table-options flex justify-between py-3 px-[5%] bg-even-row-color'>
                                    <div className='flex gap-2'>
                                        <button className='bg-input-color p-1 rounded-lg border-2 border-border-color text-gray-600 cursor-pointer mx-auto' onClick={handleShowOrder}>
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
