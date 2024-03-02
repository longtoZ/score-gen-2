import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './navbar.css';

import { SideBar } from './SideBar';
import { TopBar } from './TopBar';

export const NavBar = () => {
    const [hideNav, setHideNav] = useState(true);

    const navRef = useRef(null);
    const logoRef = useRef(null);
    const searchRef = useRef(null);
    const suggestRef = useRef(null);
    const visualRef = useRef(null);
    const printRef = useRef(null);

    const location = useLocation();

    useEffect(() => {
        // Path changed
        searchRef.current.classList.remove('current-page');
        suggestRef.current.classList.remove('current-page');
        visualRef.current.classList.remove('current-page');
        printRef.current.classList.remove('current-page');

        document.querySelector('footer').style.display = 'block';
        setHideNav(true);

        if (location.pathname === '/search') {
            searchRef.current.classList.add('current-page');
        } else if (location.pathname === '/suggest') {
            suggestRef.current.classList.add('current-page');
        } else if (location.pathname === '/visual') {
            visualRef.current.classList.add('current-page');
        } else if (location.pathname === '/print') {
            printRef.current.classList.add('current-page');
        } else if (location.pathname.includes('/docs')) {
            document.querySelector('footer').style.display = 'none';
            navRef.current.style.top = '0';
            setHideNav(false);
        }
    }, [location]);

    useEffect(() => {
        if (!hideNav) return;

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
                if (currentScrollPos > windowHeight/2) {
                    addBtn.style.right = '1rem';
                } else {
                    addBtn.style.right = '-20rem';
                }
            }

            prevScrollPos = currentScrollPos;
        };

        return () => (window.onscroll = null);
    }, [hideNav]);

    return (
        <>
            {window.innerWidth < 768 ? (
                <SideBar
                    navRef={navRef}
                    logoRef={logoRef}
                    searchRef={searchRef}
                    suggestRef={suggestRef}
                    visualRef={visualRef}
                    printRef={printRef}
                />
            ) : (
                <TopBar
                    navRef={navRef}
                    logoRef={logoRef}
                    searchRef={searchRef}
                    suggestRef={suggestRef}
                    visualRef={visualRef}
                    printRef={printRef}
                />
            )}
        </>
    );
};
