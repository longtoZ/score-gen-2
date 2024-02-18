import logoTitleDark from '../../assets/img/logo-title-dark.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {
  return (
    <footer className='bg-[#262626] mt-[30rem] px-[15%] py-[5%]'>
        <div className='flex justify-between'>
            <div className='w-[33%]'>
                <img src={logoTitleDark} alt="Score" className='w-[10rem]'/>
                <p className='text-neutral-500'>
                    <b>SCORE</b> - Hệ thống tra cứu, phân tích và trực quan hoá điểm chuẩn tuyển sinh 10 khu vực TP.HCM.
                </p>
                <div className='flex gap-2'>
                    <a href="https://www.facebook.com/its.longto/" target='_blank'>
                        <FacebookIcon className='text-neutral-500' />
                    </a>
                    <a href="https://www.facebook.com/its.longto/" target='_blank'>
                        <InstagramIcon className='text-neutral-500' />
                    </a>
                    <a href="https://www.facebook.com/its.longto/" target='_blank'>
                        <PinterestIcon className='text-neutral-500' />
                    </a>
                    <a href="https://www.facebook.com/its.longto/" target='_blank'>
                        <GitHubIcon className='text-neutral-500' />
                    </a>
                </div>
            </div>
            <div className='w-[33%] grid grid-cols-2'>
                <div>
                    <h1 className='text-white'>Hỗ trợ</h1>
                    <ul className='text-neutral-500'>
                        <li>FAQ</li>
                        <li>Liên hệ</li>
                        <li>Điều khoản</li>
                        <li>Quyền riêng tư</li>
                    </ul>
                </div>
                <div>
                    <h1 className='text-white'>Thông tin</h1>
                    <ul className='text-neutral-500'>
                        <li>Về chúng tôi</li>
                        <li>Tài liệu</li>
                        <li>Đối tác</li>
                    </ul>
                </div>
            </div>
            <div className='w-[33%]'>
                <h1 className='text-white'>Liên hệ chúng tôi</h1>
                <p className='text-neutral-500'>
                    11 Đoàn Kết, Bình Thọ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam
                </p>
                <p className='text-neutral-500'>
                    longto.xp@gmail.com
                </p>
            </div>
        </div>
        <div className='text-neutral-500'>
            <small>Copyright © 2024, Score Official Project</small>
        </div>
    </footer>
  )
}
