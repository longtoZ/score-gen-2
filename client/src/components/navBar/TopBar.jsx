import {useEffect, useRef, useContext} from 'react'
import {Link} from 'react-router-dom'
import {ModeContext} from '../../utils/setModeContext'

import logoLight from '../../assets/img/logo-full-light.png';
import logoDark from '../../assets/img/logo-full-dark.png';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const TopBar = ({logoRef, navRef, searchRef, suggestRef, visualRef, printRef}) => {
    const { theme, setTheme } = useContext(ModeContext);

    const lightRef = useRef(null);
    const darkRef = useRef(null);

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

    const handleMode = (e) => {
        if (e.target.closest('.mode-btn').getAttribute('mode') === 'light') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

  return (
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
  )
}
