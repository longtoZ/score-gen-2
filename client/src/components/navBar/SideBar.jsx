import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logoLight from '../../assets/img/logo-full-light.png';
import SearchIcon from '@mui/icons-material/Search';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import BarChartIcon from '@mui/icons-material/BarChart';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './navbar.css';

export const SideBar = ({ logoRef, searchRef, suggestRef, visualRef, printRef }) => {

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    }

    const handleHide = (e) => {
        if (e.target === e.currentTarget) {
            setShow(false);
        }
    }

    useEffect(() => {
        console.log(show)
    }, [show])

    return (
        <>
            <header className="flex justify-between py-2 px-[4%] shadow-md fixed top-0 left-0 right-0 z-[5] bg-header-color">
                <div>
                    <Link to="/">
                        <img
                            src={logoLight}
                            alt="Main logo"
                            loading="lazy"
                            className="h-[50px]"
                            ref={logoRef}
                        />
                    </Link>
                </div>
                <div className="flex items-center cursor-pointer" onClick={handleShow}>
                    <MenuIcon />
                </div>
            </header>
            <div className={`w-full h-full fixed bg-black bg-opacity-40 z-[6] ${show ? 'block' :'hidden'}`} onClick={handleHide}>
            </div>
            <div className={`w-[30%] h-full fixed top-0 right-0 p-4 bg-bg-color z-[7] transition-transform ease-in-out duration-300 ${show ? 'translate-x-0' : 'translate-x-[100%]'}`}>
                <h1 className="text-2xl font-bold text-right my-4">Mục lục</h1>
                <div className="rounded-lg bs-in p-2 flex justify-between bg-input-color">
                    <input type="text" className="w-[80%] bg-transparent" placeholder="Tìm tài liệu..." />
                    <SearchIcon className="text-gray-400 cursor-pointer" />
                </div>

                <ul className="text-right mt-[2rem]">
                    <li className="p-2 font-semibold hover:bg-even-row-color rounded-lg" ref={searchRef}>
                        <Link to="/search">Tra cứu</Link>
                        <SearchIcon className="ml-2" style={{fontSize: '1.4em'}} />
                    </li>
                    <li className="p-2 font-semibold hover:bg-even-row-color rounded-lg" ref={suggestRef}>
                        <Link to="/suggest">Đề xuất</Link>
                        <TipsAndUpdatesIcon className="ml-2" style={{fontSize: '1.4em'}} />
                    </li>
                    <li className="p-2 font-semibold hover:bg-even-row-color rounded-lg" ref={visualRef}>
                        <Link to="/visual">Phân tích</Link>
                        <BarChartIcon className="ml-2" style={{fontSize: '1.4em'}} />
                    </li>
                    <li className="p-2 font-semibold hover:bg-even-row-color rounded-lg" ref={printRef}>
                        <Link to="/print">Báo cáo</Link>
                        <PostAddIcon className="ml-2" style={{fontSize: '1.4em'}} />
                    </li>
                </ul>

                <div className="overflow-hidden advertising text-white w-[80%] absolute bottom-6 rounded-2xl left-1/2 -translate-x-1/2">
                    <div className="relative w-full h-full p-4">
                        <h1 className="text-2xl font-bold">Score 2.0</h1>
                        <p className="mt-2 text-xs">Một phiên bản mới với những cải thiện về giao diện và chức năng.</p>
                        <div className="flex justify-between px-[10%] items-center text-xs mt-4">
                            <h1>Khám phá</h1>
                            <div className="rounded-[50%] bg-white text-emerald-400 p-1 cursor-pointer transition-transform ease-in-out duration-500 hover:rotate-[360deg]">
                                <ArrowForwardIcon />
                            </div>
                        </div>

                        <div className="bg-white bg-opacity-30 rounded-[50%] w-[8rem] h-[8rem] absolute -bottom-10 -left-8 -z-[1]"></div>
                        <div className=" rounded-[50%] w-[6rem] h-[6rem] absolute -top-10 -right-8 -z-[1]" style={{border: '6px solid rgba(255,255,255,0.3)'}}></div>
                    
                    </div>

                </div>
            </div>

        </>
    );
};
