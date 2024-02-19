import searchDemo from '../../assets/vid/search-demo.mp4';
import suggestDemo from '../../assets/vid/suggest-demo.mp4';
import visualDemo from '../../assets/vid/visual-demo.mp4';
import printDemo from '../../assets/vid/print-demo.mp4';

export const Features = () => {
    return (
        <div className="Features mt-[30rem] px-[8%]">
            <h1 className="text-center font-semibold text-4xl">
                Những tính năng nổi bật
            </h1>

            <div className="features-grid mt-[5rem]">
                <div className="grid grid-cols-2 my-6">
                    <div className="relative px-10 py-16 overflow-hidden">
                        <video
                            loop
                            autoPlay
                            muted
                            className="object-fill relative rounded-lg h-[20rem] m-auto z-[2]"
                        >
                            <source src={searchDemo} type="video/mp4" />
                        </video>
                        <div className="absolute -bottom-[1rem] left-0 mesh2"></div>
                        <div className="absolute top-0 right-0 mesh4"></div>
                    </div>

                    <div className="px-16 flex justify-center flex-col">
                        <h1 className="text-2xl font-semibold">
                            Tra cứu thông minh
                        </h1>
                        <p className="mt-[1rem] leading-7">
                            Tìm kiếm bằng tên trường, loại trường, năm học.
                            Không những thế, bạn còn có thể xem chi tiết về
                            thông qua trang chính thức vị trí trường trên bản
                            đồ.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 my-6">
                    <div className="px-16 flex justify-center flex-col">
                        <h1 className="text-2xl font-semibold">
                            Đề xuất theo tiêu chí
                        </h1>
                        <p className="mt-[1rem] leading-7">
                            Dựa vào trung bình cộng điểm các năm, hệ thống sẽ tự
                            đề xuất những trường có điểm phù hợp với chỉ tiêu đề
                            ra. Bạn có thể lựa chọn loại trường, nguyện vọng,
                            khu vực và các chức năng sẵn có để lọc.
                        </p>
                    </div>

                    <div className="relative px-10 py-16 overflow-hidden">
                        <video
                            loop
                            autoPlay
                            muted
                            className="object-fill relative rounded-lg h-[20rem] m-auto z-[2]"
                        >
                            <source src={suggestDemo} type="video/mp4" />
                        </video>
                        <div className="absolute top-0 left-0 mesh1"></div>
                        <div className="absolute bottom-0 right-0 mesh3"></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 my-6">
                    <div className="relative px-10 py-16 overflow-hidden">
                        <video
                            loop
                            autoPlay
                            muted
                            className="object-fill relative rounded-lg h-[20rem] m-auto z-[2]"
                        >
                            <source src={visualDemo} type="video/mp4" />
                        </video>
                        <div className="absolute -bottom-[1rem] left-0 mesh2"></div>
                        <div className="absolute top-0 right-0 mesh4"></div>
                    </div>

                    <div className="px-16 flex justify-center flex-col">
                        <h1 className="text-2xl font-semibold">
                            Trực quan hoá dữ liệu
                        </h1>
                        <p className="mt-[1rem] leading-7">
                            Dữ liệu được trực quan hoá qua biểu đồ, bảng, đồ
                            thị. Bạn có thể dễ dàng so sánh, phân tích và đánh
                            giá thông tin một cách nhanh chóng và chính xác.
                            <br />
                            Ngoài ra, bạn còn có thể chọn tối đa 3 trường tương
                            ứng với 3 nguyện vọng của bạn để so sánh.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 my-6">
                    <div className="px-16 flex justify-center flex-col">
                        <h1 className="text-2xl font-semibold">
                            Soạn nội dung lưu trữ
                        </h1>
                        <p className="mt-[1rem] leading-7">
                            Không chỉ dừng lại ở việc tra cứu, bạn còn có thể
                            tạo các mục với thông số tuỳ chọn để hiển thị. Đồng
                            thời, bạn còn có thể sắp xếp, chỉnh sửa và lưu trữ
                            dữ liệu của mình để sử dụng sau này.
                        </p>
                    </div>

                    <div className="relative px-10 py-16 overflow-hidden">
                        <video
                            loop
                            autoPlay
                            muted
                            className="object-fill relative rounded-lg h-[20rem] m-auto z-[2]"
                        >
                            <source src={printDemo} type="video/mp4" />
                        </video>
                        <div className="absolute top-0 left-0 mesh1"></div>
                        <div className="absolute bottom-0 right-0 mesh3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
