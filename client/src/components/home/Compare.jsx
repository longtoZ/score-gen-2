import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const Tick = () => {
    return <DoneIcon className="text-emerald-400" />;
};

const Cross = () => {
    return <CloseIcon className="text-slate-300" />;
};

export const Compare = () => {
    return (
        <div className="Compare mt-[30rem] px-[18%]">
            <h1 className="text-center font-semibold text-4xl">
                Score Gen 2 có gì mới?
            </h1>
            <p className="text-center mt-[1rem]">
                Phiên bản mới của Score được xây dựng bởi công nghệ hoàn toàn
                mới, phù hợp với xu hướng website tối giản và hiện đại.
            </p>

            <div className="relative">
                <table className="w-full mt-[5rem] text-center overflow-hidden rounded-lg z-[2] bg-white bg-opacity-60 dark:bg-black dark:bg-opacity-30 backdrop-blur-xl relative">
                    <thead>
                        <tr>
                            <th
                                className="px-4 py-2"
                                style={{ width: '30%' }}
                            ></th>
                            <th className="px-4 py-6 ">
                                <em className="text-slate-400">8/2022</em>
                                <h1 className="text-2xl">Score Gen 1</h1>
                            </th>
                            <th className="px-4 py-6">
                                <em className="text-slate-400">2/2024</em>
                                <h1 className="text-2xl">Score Gen 2</h1>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="font-semibold">
                                Tìm kiếm trường bằng tên, năm học, khu vực
                            </td>
                            <td>
                                <Tick />
                            </td>
                            <td>
                                <Tick />
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                Lọc trường theo khoảng điểm, thứ tự
                            </td>
                            <td>
                                <Tick />
                            </td>
                            <td>
                                <Tick />
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                Hiển thị điểm dưới dạng đồ thị (có thể tuỳ
                                chỉnh)
                            </td>
                            <td>
                                <Tick />
                            </td>
                            <td>
                                <Tick />
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Font chữ dễ nhìn</td>
                            <td>
                                <Cross />
                            </td>
                            <td>
                                <Tick />
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                Truy cập ổn định hơn
                            </td>
                            <td>
                                <Cross />
                            </td>
                            <td>
                                <Tick />
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                Lấy thông tin nhanh hơn
                            </td>
                            <td>
                                <Cross />
                            </td>
                            <td>
                                <Tick />
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                Thông tin chi tiết về trường
                            </td>
                            <td>
                                <Cross />
                            </td>
                            <td>
                                <Tick />
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                So sánh thông qua biểu đồ (tối đa 3 trường)
                            </td>
                            <td>
                                <Cross />
                            </td>
                            <td>
                                <Tick />
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Tự chọn mục để in</td>
                            <td>
                                <Cross />
                            </td>
                            <td>
                                <Tick />
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                Không giới hạn số lượng mục in
                            </td>
                            <td>
                                <Cross />
                            </td>
                            <td>
                                <Tick />
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                Sắp xếp, chỉnh sửa, lưu các mục
                            </td>
                            <td>
                                <Cross />
                            </td>
                            <td>
                                <Tick />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="absolute -top-[10%] -left-[10%] w-[25rem] h-[25rem] mesh4"></div>
                <div className="absolute top-[20%] -right-[10%] w-[25rem] h-[25rem] mesh2"></div>
                <div className="absolute -bottom-[15%] left-1/2 -translate-x-1/2 mesh1"></div>
                <div className="absolute -bottom-[10%] opacity-70 right-1/2 mesh3"></div>
            </div>
        </div>
    );
};
