import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/logo-full-light.png';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const NavBar = () => {
    const navRef = useRef(null);
    const lightRef = useRef(null);
    const darkRef = useRef(null);

    useEffect(() => {
        let prevScrollPos = window.scrollY;

        window.onscroll = () => {
            let currentScrollPos = window.scrollY;

            console.log(prevScrollPos, currentScrollPos);

            if (prevScrollPos > currentScrollPos) {
                navRef.current.style.top = '0';
            } else {
                navRef.current.style.top = '-100%';
            }

            prevScrollPos = currentScrollPos;
        };

        return () => (window.onscroll = null);
    }, []);

    useEffect(() => {
        const mode = localStorage.getItem('mode');

        if (mode === 'light' || mode === null) {
            lightRef.current.classList.add('select');
        } else {
            darkRef.current.classList.add('select');
        }
    }, []);

    const handleMode = (e) => {
        if (e.target.closest('.mode-btn').getAttribute('mode') === 'light') {
            localStorage.setItem('mode', 'light');
            lightRef.current.classList.add('select');
            darkRef.current.classList.remove('select');
        } else {
            localStorage.setItem('mode', 'dark');
            darkRef.current.classList.add('select');
            lightRef.current.classList.remove('select');
        }
    };

    return (
        <header
            className="bg-white flex justify-between py-2 px-[4%] shadow-md fixed top-0 left-0 right-0 z-[5]"
            ref={navRef}
        >
            <div>
                <Link to="/">
                    <img
                        src={logo}
                        alt="Main logo"
                        loading="lazy"
                        className="h-[50px]"
                    />
                </Link>
            </div>
            <nav className="grid grid-cols-4 gap-4 text-center text-lg">
                <div className="block my-auto">
                    <Link to="/search">Tra cứu</Link>
                </div>
                <div className="block my-auto">
                    <Link to="/suggest">Đề xuất</Link>
                </div>
                <div className="block my-auto">
                    <Link to="/visual">Phân tích</Link>
                </div>
                <div className="block my-auto">
                    <Link to="/print">Báo cáo</Link>
                </div>
            </nav>
            <div className="relative w-[5rem] h-[2.5rem] flex justify-between bg-[#EFF2F9] rounded-xl p-1 bs-in cursor-pointer">
                <div
                    className="w-[45%] h-full rounded-xl mode-btn"
                    ref={lightRef}
                    mode="light"
                    onClick={handleMode}
                >
                    <LightModeIcon
                        className="block m-auto mx-1 z-[6] text-amber-400"
                        style={{ height: '100%' }}
                    />
                </div>
                <div
                    className="w-[45%] h-full rounded-xl mode-btn"
                    ref={darkRef}
                    mode="dark"
                    onClick={handleMode}
                >
                    <DarkModeIcon
                        className="block m-auto mx-1 z-[6] text-violet-800"
                        style={{ height: '100%' }}
                    />
                </div>
            </div>
        </header>
    );
};
