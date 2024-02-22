import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Home1Dark from '../../assets/img/home/home1-dark.png';
import Home1 from '../../assets/img/home/home1.png';
import Home2Dark from '../../assets/img/home/home2-dark.png';
import Home2 from '../../assets/img/home/home2.png';
import Home3Dark from '../../assets/img/home/home3-dark.png';
import Home3 from '../../assets/img/home/home3.png';
import Home4Dark from '../../assets/img/home/home4-dark.png';
import Home4 from '../../assets/img/home/home4.png';
import { ModeContext } from '../../utils/setModeContext';

export const Hero = () => {
    const { theme } = useContext(ModeContext);
    return (
        <section className="Hero px-[8%] flex justify-between mt-[10rem]">
            <div className="w-[40%] p-6 flex flex-col justify-center heading-container">
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
                    <button className="mt-[2rem] bg-emerald-400 text-white font-semibold rounded-lg p-2 w-[7rem] try-shadow">
                        <Link to="/search">Thử ngay</Link>
                    </button>
                    <button className="mt-[2rem] bg-bg-color border-2 font-semibold rounded-lg p-2 w-[8rem] demo-shadow">
                        <PlayArrowIcon className="mr-2" />
                        Xem demo
                    </button>
                </div>
            </div>
            <div className="w-[60%] py-16 px-20 relative swiper-container">
                <div className="flex items-center justify-center h-full">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        modules={[Pagination, Autoplay]}
                        className="slide-height rounded-lg h-[20rem] mx-auto"
                    >
                        <SwiperSlide>
                            <img
                                src={theme === 'light' ? Home1 : Home1Dark}
                                alt="home1"
                                className="h-full mx-auto object-fill"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={theme === 'light' ? Home2 : Home2Dark}
                                alt="home2"
                                className="h-full mx-auto object-fill"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={theme === 'light' ? Home3 : Home3Dark}
                                alt="home3"
                                className="h-full mx-auto object-fill"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={theme === 'light' ? Home4 : Home4Dark}
                                alt="home4"
                                className="h-full mx-auto object-fill"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

                <div className="absolute -top-[1rem] left-[20%] mesh1 moveDownAnimation"></div>
                <div className="absolute bottom-0 left-0 mesh2"></div>
                <div className="absolute -bottom-[1rem] right-0 mesh3 moveUpAnimation animation-delay-2000"></div>
            </div>
        </section>
    );
};
