import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './error.css';

export const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        document.querySelector('header').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
    }, [location]);
    return (
        <div className="NotFound fixed h-[100vh] w-full overflow-hidden">
            <div className="absolute w-[60vw] text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="oops font-extrabold">Oops!!</h1>
                <h2 className="font-3xl font-bold my-6">
                    404 - PAGE NOT FOUND
                </h2>
                <p className="mt-[2rem]">
                    Xin lỗi nhưng trang bạn đang tìm kiếm không tồn tại, đã bị
                    xóa. Tên đã thay đổi hoặc tạm thời không có sẵn.
                </p>
                <button className="bg-emerald-400 text-white mt-[2rem] font-semibold py-2 px-4 rounded-xl">
                    <Link to="/">Quay lại trang chủ</Link>
                </button>
            </div>
        </div>
    );
};
