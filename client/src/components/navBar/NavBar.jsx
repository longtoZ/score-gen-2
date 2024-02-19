import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TopBar } from './TopBar';
import { SideBar } from './SideBar';

import './navbar.css';

import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

export const NavBar = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const navRef = useRef(null);
    const logoRef = useRef(null);

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
        } else if(location.pathname === '/print') {
            printRef.current.classList.add('current-page');
        } else if (location.pathname.includes('/docs')) {
            document.querySelector('footer').style.display = 'none';
        }
    }, [location]);

    useEffect(() => {
        let prevScrollPos = window.scrollY;
        let windowHeight = window.innerHeight;
        const addBtn = document.querySelector('.add-area');

        window.onscroll = () => {

            let currentScrollPos = window.scrollY;

            if (navRef.current === null) return;

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
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);


    return (
        <>
            {windowWidth < 768 ? (
                <SideBar logoRef={logoRef} searchRef={searchRef} suggestRef={suggestRef} visualRef={visualRef} printRef={printRef} />
            ) : (
                <TopBar navRef={navRef} logoRef={logoRef} searchRef={searchRef} suggestRef={suggestRef} visualRef={visualRef} printRef={printRef} />
            )}
        </>
    );
};
