import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ModeContext } from '../../utils/setModeContext';
import { SideBar } from './SideBar';

import './navbar.css';
import logoLight from '../../assets/img/logo-full-light.png';
import logoDark from '../../assets/img/logo-full-dark.png';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const NavBar = () => {
    const { theme, setTheme } = useContext(ModeContext);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const navRef = useRef(null);
    const logoRef = useRef(null);
    const lightRef = useRef(null);
    const darkRef = useRef(null);

    const searchRef = useRef(null);
    const suggestRef = useRef(null);
    const visualRef = useRef(null);
    const printRef = useRef(null);

    const location = useLocation();
  
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        // Path changed
        searchRef.current.classList.remove('current-page');
        suggestRef.current.classList.remove('current-page');
        visualRef.current.classList.remove('current-page');
        printRef.current.classList.remove('current-page');

        if (location.pathname === '/search') {
            searchRef.current.classList.add('current-page');
        } else if (location.pathname === '/suggest') {
            suggestRef.current.classList.add('current-page');
        } else if (location.pathname === '/visual') {
            visualRef.current.classList.add('current-page');
        } else {
            printRef.current.classList.add('current-page');
        }

    }, [location]);

    useEffect(() => {
        let prevScrollPos = window.scrollY;
        let windowHeight = window.innerHeight;
        const addBtn = document.querySelector('.add-btn');

        window.onscroll = () => {
            let currentScrollPos = window.scrollY;

            if (prevScrollPos > currentScrollPos) {
                navRef.current.style.top = '0';
            } else {
                navRef.current.style.top = '-100%';
            }

            if (addBtn) {
                if (currentScrollPos > windowHeight) {
                    addBtn.style.right = '1rem';
                } else {
                    addBtn.style.right = '-4rem';
                }
            }

            prevScrollPos = currentScrollPos;
        };

        return () => (window.onscroll = null);
    }, []);

    useEffect(() => {
        if (theme === 'light' || theme === null) {
            lightRef.current.classList.add('select');
            darkRef.current.classList.remove('select');
            logoRef.current.src = logoLight;
        } else {
            darkRef.current.classList.add('select');
            lightRef.current.classList.remove('select');
            logoRef.current.src = logoDark;
        }
    }, [theme]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    const handleMode = (e) => {
        if (e.target.closest('.mode-btn').getAttribute('mode') === 'light') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return (
        <>
            {windowWidth < 768 ? <SideBar /> : 
                <header
                    className="flex justify-between py-2 px-[4%] shadow-md fixed top-0 left-0 right-0 z-[5] bg-header-color"
                    ref={navRef}
                >
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
                    <nav className="grid grid-cols-4 gap-4 text-center text-lg">
                        <div className="block my-auto" ref={searchRef}>
                            <Link to="/search">Tra cứu</Link>
                        </div>
                        <div className="block my-auto" ref={suggestRef}>
                            <Link to="/suggest">Đề xuất</Link>
                        </div>
                        <div className="block my-auto" ref={visualRef}>
                            <Link to="/visual">Phân tích</Link>
                        </div>
                        <div className="block my-auto" ref={printRef}>
                            <Link to="/print">Báo cáo</Link>
                        </div>
                    </nav>
                    <div className="relative w-[5rem] h-[2.5rem] flex justify-between bg-[#EFF2F9] rounded-xl p-1 bs-in cursor-pointer my-auto">
                        <div
                            className="w-[45%] h-full rounded-xl mode-btn light-mode"
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
                            className="w-[45%] h-full rounded-xl mode-btn dark-mode"
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
            }
        </>
    );
};
