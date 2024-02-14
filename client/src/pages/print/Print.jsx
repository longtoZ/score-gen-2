import { useState, useRef, createContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Add } from '../../components/print/Add';

import AddIcon from '@mui/icons-material/Add';

export const AddContext = createContext();
export const FunctionContext = createContext();

export const Print = () => {

    const [data, setData] = useState([]);
    const [showAdd, setShowAdd] = useState(false);

    const handleShowAdd = () => {
        setShowAdd(true);
    }

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <FunctionContext.Provider value={{ data, setData }}>
                <AddContext.Provider value={{ setShowAdd }}>
                    {showAdd && <Add />}
                </AddContext.Provider>
            </FunctionContext.Provider>

            <div className="Visual py-[10rem]">
                <div className="w-[90%] mx-auto">
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
                </div>
            </div>
        </>
    );
};
