import { useContext, useState } from 'react';
import { OrderContext } from '../../../pages/print/Print';

import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import '../responsive.css';

const functionType = {
    'score-range': 'Khoảng điểm',
    top: 'Top điểm',
    'year-range': 'Điểm các năm',
    compete: 'Tỉ lệ chọi các năm',
    area: 'Trường trong khu vực',
    group: 'Trường tương đương',
    special: 'Lớp chuyên',
};

export const OrderMenu = () => {
    const { setShowOrder, data, setData } = useContext(OrderContext);
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleHideOrder = (e) => {
        if (e.target === e.currentTarget) {
            setShowOrder(false);
        }
    };

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    }

    const handleDragOver = (e, index) => {
        e.preventDefault()
        if (index !== draggedIndex) {
            // console.log(index, draggedIndex);
        }
    }

    const handleDrop = (index) => {
        if (index !== draggedIndex) {
            const newData = [...data];
            const item = newData.splice(draggedIndex, 1);
            newData.splice(index, 0, item[0]);
            setData(newData);
        }
    }

    return (
        <div
            className="w-full h-full fixed bg-black bg-opacity-40 flex justify-center items-center z-[3]"
            onClick={handleHideOrder}
        >
            <div className="w-1/3 py-8 px-16 bg-input-color rounded-lg relative order-container">
                <div className="absolute top-3 right-3 text-gray-400">
                    <CloseIcon
                        onClick={handleHideOrder}
                        className="cursor-pointer"
                    />
                </div>
                <h1 className="text-lg text-center font-semibold">
                    Kéo và thả để sắp xếp lại thứ tự
                </h1>
                <h1 className='text-sm text-gray-400 mt-[2rem]'>Tổng số mục: {data.length}</h1>
                <div className=''>
                    {data.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="overflow-hidden flex h-[3.5rem] rounded-lg border-2 border-border-color my-2 bg-input-color"
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={() => handleDrop(index)}
                            >
                                <div className="w-[10%] text-center bg-even-row-color p-1 cursor-grab grab-btn">
                                    <div className='flex items-center justify-center h-full'>
                                        <DragHandleIcon className='my-auto text-gray-400' />

                                    </div>
                                </div>
                                <div className="px-4 py-1 my-auto">
                                    <h1 className="font-semibold">
                                        {item.title === ''
                                            ? 'Không tiêu đề'
                                            : item.title}
                                    </h1>
                                    <p className="text-gray-400 text-xs">
                                        {functionType[item.dataType]}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
