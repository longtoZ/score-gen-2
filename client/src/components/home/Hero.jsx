import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Home1 from '../../assets/img/home1.png';
import Home2 from '../../assets/img/home2.png';
import Home3 from '../../assets/img/home3.png';
import Home4 from '../../assets/img/home4.png';

export const Hero = () => {
    return (
        <section className="Hero px-[8%] flex justify-between mt-[10rem]">
            <div className="w-[40%] p-6 flex flex-col justify-center">
                <h1 className="text-6xl font-semibold">
                    Phân tích điểm tuyển sinh 10 với{' '}
                    <span className="Score">Score</span>
                </h1>
                <p className="mt-[2rem]">
                    Dữ liệu không chỉ dừng lại ở những con số, với Score, bạn sẽ
                    có một góc nhìn toàn diện hơn về điểm chuẩn giữa các trường,
                    từ đó có lựa chọn tốt nhất cho tương lai của mình.
                    <br />
                    <br />
                    Chúng tôi cung cấp cho bạn những công cụ mạnh mẽ để bạn có
                    thể dễ dàng tìm kiếm, so sánh và phân tích điểm chuẩn. Chỉ
                    cần có kết nối internet, bạn có thể truy cập mọi lúc, mọi
                    nơi.
                </p>
                <div className="flex gap-6">
                    <button
                        className="mt-[2rem] bg-emerald-400 text-white font-semibold rounded-lg p-2 w-[7rem]"
                        style={{
                            boxShadow: '7px 7px 10px rgba(52, 211, 153, 0.3)',
                        }}
                    >
                        <Link to="/search">Thử ngay</Link>
                    </button>
                    <button
                        className="mt-[2rem] bg-bg-color border-2 font-semibold rounded-lg p-2 w-[8rem]"
                        style={{
                            boxShadow: 'rgb(209 209 209 / 30%) 7px 7px 10px',
                        }}
                    >
                        <PlayArrowIcon className="mr-2" />
                        Xem demo
                    </button>
                </div>
            </div>
            <div className="w-[60%] py-16 px-20 relative">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    modules={[Pagination, Autoplay]}
                    style={{ height: '20rem' }}
                    className="rounded-lg"
                >
                    <SwiperSlide>
                        <img src={Home1} alt="home1" className="object-fill" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={Home2} alt="home2" className="object-fill" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={Home3} alt="home3" className="object-fill" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={Home4} alt="home4" className="object-fill" />
                    </SwiperSlide>
                </Swiper>

                <div className="absolute -top-[1rem] left-[20%] mesh1 moveDownAnimation"></div>
                <div className="absolute bottom-0 left-0 mesh2"></div>
                <div className="absolute -bottom-[1rem] right-0 mesh3 moveUpAnimation animation-delay-2000"></div>
            </div>
        </section>
    );
};
