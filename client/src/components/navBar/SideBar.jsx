import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import logoLight from '../../assets/img/logo-full-light.png';


export const SideBar = () => {
    const logoRef = useRef(null);

    return (
        <>
            <header
                className="flex justify-between py-2 px-[4%] shadow-md fixed top-0 left-0 right-0 z-[5] bg-header-color"
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
                <div>
                    <MenuIcon />
                </div>
            </header>
            <div className='w-full h-full fixed bg-black bg-opacity-40'>
                <div className='p-4 bg-bg-color rounded-lg'>
                    <h1>Mục lục</h1>
                    <div className="rounded-lg border-2 border-border-color p-2 flex">
                        <input type="text" className="w-[80%]" />
                        <SearchIcon />
                    </div>

                    <ul>
                        <li>
                            <Link to="/search">Tra cứu</Link>
                        </li>
                        <li>
                            <Link to="/suggest">Đề xuất</Link>
                        </li>
                        <li>
                            <Link to="/visual">Phân tích</Link>
                        </li>
                        <li>
                            <Link to="/print">Báo cáo</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
