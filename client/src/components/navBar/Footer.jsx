import { Link } from 'react-router-dom';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PinterestIcon from '@mui/icons-material/Pinterest';

import './navbar.css';

import logoTitleDark from '../../assets/img/logo-title-dark.png';

export const Footer = () => {
    return (
        <footer className="bg-[#262626] mt-[30rem] px-[15%] pt-[10%] pb-[2%]">
            <div className="flex justify-between gap-20">
                <div className="w-[33%]">
                    <img
                        src={logoTitleDark}
                        alt="Score"
                        className="w-[10rem] mb-6"
                    />
                    <p className="text-neutral-500">
                        <b>SCORE</b> - Hệ thống tra cứu, phân tích và trực quan
                        hoá điểm chuẩn tuyển sinh 10 khu vực TP.HCM.
                    </p>
                    <div className="flex gap-2 mt-4">
                        <a
                            href="https://www.facebook.com/its.longto/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FacebookIcon className="text-neutral-500" />
                        </a>
                        <a
                            href="https://www.instagram.com/longto_/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <InstagramIcon className="text-neutral-500" />
                        </a>
                        <a
                            href="https://www.pinterest.com/TheRealNautilus/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <PinterestIcon className="text-neutral-500" />
                        </a>
                        <a
                            href="https://github.com/longtoZ"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitHubIcon className="text-neutral-500" />
                        </a>
                    </div>
                </div>
                <div className="w-[33%] grid grid-cols-2">
                    <div>
                        <h1 className="text-white">Hỗ trợ</h1>
                        <ul className="text-neutral-500 mt-6">
                            <li className="py-1">FAQ</li>
                            <li className="py-1">Liên hệ</li>
                            <li className="py-1">Điều khoản</li>
                            <li className="py-1">Quyền riêng tư</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-white">Thông tin</h1>
                        <ul className="text-neutral-500 mt-6">
                            <li className="py-1">Về chúng tôi</li>
                            <li className="py-1">
                                <Link to="/docs/introduction">Tài liệu</Link>
                            </li>
                            <li className="py-1">Đối tác</li>
                        </ul>
                    </div>
                </div>
                <div className="w-[33%]">
                    <h1 className="text-white">Liên hệ chúng tôi</h1>
                    <p className="text-neutral-500 mt-6 hover:text-white transition-colors ease-in duration-100">
                        <a href="https://maps.app.goo.gl/vPbrJpWpSnAfUhsv5">
                            <LocationOnIcon /> 11 Đoàn Kết, Bình Thọ, Thành Phố
                            Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam.
                        </a>
                    </p>
                    <p className="text-neutral-500 mt-2 hover:text-white transition-colors ease-in duration-100">
                        <a href="mailto:longto.xp@gmail.com">
                            <AlternateEmailIcon /> longto.xp@gmail.com
                        </a>
                    </p>
                </div>
            </div>
            <div className="text-neutral-500 text-center text-lg mt-[5rem]">
                <small>Copyright © 2024, Score Project</small>
            </div>
        </footer>
    );
};
