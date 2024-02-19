import { Link, Outlet} from 'react-router-dom'
import './docs.css';


export const Docs = () => {
  return (
    <div className='Docs flex mx-[8%] py-[10rem]'>
        <div className='w-[20%] relative h-[100vh] overflow-y-scroll'>
            <nav className='fixed pr-[5rem] border-r-2 border-border-color'>
                <div className='getting-started'>
                    <section className='mb-[2rem]'>
                        <h1 className='text-lg font-semibold'>Bắt đầu</h1>
                        <ul className='mt-4'>
                            <li className='pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold'><Link to='/docs/introduction'>Tổng quan</Link></li>
                            <li className='pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold'><Link to='/docs/migration'>Phiên bản mới</Link></li>
                        </ul>
                    </section>
                    <section className='mb-[2rem]'>
                        <h1 className='text-lg font-semibold'>Hướng dẫn</h1>
                        <ul className='mt-4'>
                            <li className='pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold'><Link to='/docs/search'>Tra cứu</Link></li>
                            <li className='pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold'><Link to='/docs/suggest'>Đề xuất</Link></li>
                            <li className='pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold'><Link to='/docs/visual'>Phân tích</Link></li>
                            <li className='pl-4 py-2 border-l-2 border-border-color hover:border-l-4 hover:font-semibold'><Link to='/docs/print'>Báo cáo</Link></li>
                        </ul>
                    </section>
                </div>
            </nav>
        </div>
        <div className='w-[80%] leading-7'>
            <Outlet />
        </div>

    </div>
  )
}
