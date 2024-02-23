import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

import './docs.css';

export const Docs = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    };

    const handleHide = (e) => {
        if (e.target === e.currentTarget) {
            setShow(false);
        }
    };

    // Update document title
    useEffect(() => {
        document.title = 'Score | Tài liệu';
    }, []);

    return (
        <div className="Docs mx-[8%]">
            {window.innerWidth < 992 ? (
                <>
                    <div className="fixed top-0 left-0 pl-[8%] pt-[6rem] pb-[1rem] w-full border-b-2 border-neutral-200 dark:border-neutral-700 border-dashed bg-bg-color">
                        <MenuIcon
                            onClick={handleShow}
                            className="cursor-pointer"
                            style={{ fontSize: '2rem' }}
                        />
                    </div>
                    <div
                        className={`w-full h-full fixed top-0 left-0 bg-black bg-opacity-40 z-[2] ${show ? 'block' : 'hidden'}`}
                        onClick={handleHide}
                    ></div>
                    <div
                        className={`side-bar w-[30%] pt-[6rem] pl-[2rem] h-full fixed top-0 left-0 p-4 bg-bg-color z-[3] transition-transform ease-in-out duration-300 ${show ? 'translate-x-0' : '-translate-x-[100%]'}`}
                    >
                        <section className="mb-[2rem]">
                            <h1 className="text-lg font-semibold">Bắt đầu</h1>
                            <ul className="mt-4">
                                <li className="pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold" onClick={() => setShow(false)}>
                                    <Link to="/docs/introduction">
                                        Tổng quan
                                    </Link>
                                </li>
                                <li className="pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold" onClick={() => setShow(false)}>
                                    <Link to="/docs/migration">
                                        Phiên bản mới
                                    </Link>
                                </li>
                            </ul>
                        </section>
                        <section className="mb-[2rem]">
                            <h1 className="text-lg font-semibold">Hướng dẫn</h1>
                            <ul className="mt-4">
                                <li className="pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold" onClick={() => setShow(false)}>
                                    <Link to="/docs/search">Tra cứu</Link>
                                </li>
                                <li className="pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold" onClick={() => setShow(false)}>
                                    <Link to="/docs/suggest">Đề xuất</Link>
                                </li>
                                <li className="pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold" onClick={() => setShow(false)}>
                                    <Link to="/docs/visual">Phân tích</Link>
                                </li>
                                <li className="pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold" onClick={() => setShow(false)}>
                                    <Link to="/docs/print">Báo cáo</Link>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div className="py-[12rem] leading-7">
                        <Outlet />
                    </div>
                </>
            ) : (
                <>
                    <div className="fixed h-[100vh] border-r-2 border-border-color overflow-y-scroll">
                        <nav className="pr-[5rem] py-[10rem]">
                            <div className="getting-started">
                                <section className="mb-[2rem]">
                                    <h1 className="text-lg font-semibold">
                                        Bắt đầu
                                    </h1>
                                    <ul className="mt-4">
                                        <li className="pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold">
                                            <Link to="/docs/introduction">
                                                Tổng quan
                                            </Link>
                                        </li>
                                        <li className="pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold">
                                            <Link to="/docs/migration">
                                                Phiên bản mới
                                            </Link>
                                        </li>
                                    </ul>
                                </section>
                                <section className="mb-[2rem]">
                                    <h1 className="text-lg font-semibold">
                                        Hướng dẫn
                                    </h1>
                                    <ul className="mt-4">
                                        <li className="pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold">
                                            <Link to="/docs/search">
                                                Tra cứu
                                            </Link>
                                        </li>
                                        <li className="pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold">
                                            <Link to="/docs/suggest">
                                                Đề xuất
                                            </Link>
                                        </li>
                                        <li className="pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold">
                                            <Link to="/docs/visual">
                                                Phân tích
                                            </Link>
                                        </li>
                                        <li className="pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold">
                                            <Link to="/docs/print">
                                                Báo cáo
                                            </Link>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                        </nav>
                    </div>
                    <div className="pl-[20%] py-[10rem] leading-7">
                        <Outlet />
                    </div>
                </>
            )}
            <div className="w-full my-6">
                <small className="block text-right">
                    Copyright © 2024, Score Project
                </small>
            </div>
        </div>
    );
};
