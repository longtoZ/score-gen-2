import font1 from '../../assets/img/docs/1.png';
import font2 from '../../assets/img/docs/2.png';
import suggest1 from '../../assets/img/docs/3.png';
import suggest2 from '../../assets/img/docs/4.png';
import visual1 from '../../assets/img/docs/5.png';
import visual2 from '../../assets/img/docs/6.png';
import visual3 from '../../assets/img/docs/7.png';
import print1 from '../../assets/img/docs/8.png';
import search1 from '../../assets/img/docs/9.png';

export const Migration = () => {
    return (
        <div>
            <h1 className="font-semibold text-4xl pb-2 border-b-2 border-neutral-200 dark:border-neutral-700 border-dashed">
                Score Gen 2
            </h1>
            <p className="mt-[1rem]">
                Score Gen 2 là phiên bản nâng cấp từ phiên bản Gen 1 với nhiều
                cải tiến về hiệu suất, trải nghiệm người dùng và tính năng mới.
                <br />
                <br />
                Score Gen 2 không chỉ là một bản cập nhật mà còn là sự đột phá
                trong việc phân tích dữ liệu học tập. Với sự tập trung vào việc
                cung cấp thông tin chi tiết và khả năng đánh giá mạnh mẽ, trang
                web này giúp người dùng hiểu rõ hơn về tiến triển học tập và đề
                xuất các cải tiến cụ thể.
            </p>
            <h1 className="font-semibold text-3xl pb-2 border-b-2 border-neutral-200 dark:border-neutral-700 border-dashed mt-[4rem]">
                Thay đổi trong giao diện
            </h1>
            <p className="mt-[1rem]">
                Score Gen 2 sở hữu giao diện mới, hiện đại và tối ưu hơn. Chúng
                tôi đã ghi nhận những phản hồi của người dùng từ phiên bản Gen
                1, từ đó sửa đổi và cải thiện giao diện để phù hợp hơn với nhu
                cầu của người dùng.
            </p>
            <h1 className="font-semibold text-2xl pb-2 border-b-2 border-neutral-200 dark:border-neutral-700 border-dashed mt-[4rem]">
                Font chữ
            </h1>
            <p className="mt-[1rem]">
                Ở phiên bản cũ, font chữ được sử dụng là{' '}
                <a
                    href="https://fonts.google.com/specimen/MuseoModerno"
                    className="text-sky-500 underline"
                >
                    Museo Moderno
                </a>
                . Tuy nhiên, người dùng đã có những phản hồi không tốt về font
                chữ này vì họ gặp khó khăn trong việc đọc và tập trung vào nội
                dung.
            </p>
            <img
                src={font1}
                alt="font1"
                className="my-6 w-full rounded-lg border-2 border-border-color"
            />
            <p className="mt-[1rem]">
                Do đó, chúng tôi đã quyết định chuyển sang sử dụng font chữ{' '}
                <a
                    href="https://fonts.google.com/specimen/Poppins"
                    className="text-sky-500 underline"
                >
                    Poppins
                </a>
                . Đây là một font chữ cơ bản và không serifs, giúp người đọc dễ
                dàng hơn trong việc đọc và tập trung vào nội dung.
            </p>
            <img
                src={font2}
                alt="font2"
                className="my-6 w-full rounded-lg border-2 border-border-color"
            />
            <h1 className="font-semibold text-2xl pb-2 border-b-2 border-neutral-200 dark:border-neutral-700 border-dashed mt-[4rem]">
                Giao diện trang &quot;Tra cứu&quot;
            </h1>
            <p className="mt-[1rem]">
                Ở phiên bản mới, mỗi trường sẽ có 1 ô giúp người dùng có thể xem
                thông tin chi tiết về trường như: địa chỉ, năm thành lập, trang
                thông tin chính và địa chỉ trên bản đồ.
            </p>
            <img
                src={search1}
                alt="font2"
                className="my-6 w-full rounded-lg border-2 border-border-color"
            />
            <h1 className="font-semibold text-2xl pb-2 border-b-2 border-neutral-200 dark:border-neutral-700 border-dashed mt-[4rem]">
                Giao diện trang &quot;Đề xuất&quot;
            </h1>
            <p className="mt-[1rem]">
                Ở phiên bản cũ, &quot;bộ lọc&quot; và &quot;chức năng&quot;
                không được phân chia rõ ràng, gây khó khăn cho người mới sửa
                dụng. Đồng thời, 3 chức năng &quot;Lọc khoảng&quot;, &quot;Thứ
                tự&quot; và &quot;Trung bình&quot; cũng không được sắp xếp một
                cách hợp lý.
                <img
                    src={suggest1}
                    alt="font2"
                    className="my-6 w-full rounded-lg border-2 border-border-color"
                />
            </p>
            <p className="mt-[1rem]">
                Vì vậy, bộ công cụ đã được sắp xếp và phân chia lại.
            </p>
            <img
                src={suggest2}
                alt="font2"
                className="my-6 w-full rounded-lg border-2 border-border-color"
            />
            <h1 className="font-semibold text-2xl pb-2 border-b-2 border-neutral-200 dark:border-neutral-700 border-dashed mt-[4rem]">
                Giao diện trang &quot;Phân tích&quot;
            </h1>
            <p className="mt-[1rem]">
                Phiên bản cũ chỉ cho phép người dùng phân tích tối đa 1 trường
                mà không thể so sánh với các trường khác, trong khi 3 nguyện
                vọng là rất quan trọng.
            </p>
            <img
                src={visual1}
                alt="font2"
                className="my-6 w-full rounded-lg border-2 border-border-color"
            />
            <p className="mt-[1rem]">
                Vì vậy, chúng tôi đã thêm tuỳ chọn so sánh tối đa lên đến 3
                trường, giúp người dùng có cái nhìn tổng quan hơn về 3 trường mà
                bản thân đang hướng tới.
            </p>
            <img
                src={visual2}
                alt="font2"
                className="my-6 w-full rounded-lg border-2 border-border-color"
            />
            <img
                src={visual3}
                alt="font2"
                className="my-6 w-full rounded-lg border-2 border-border-color"
            />
            <p className="mt-[1rem]">
                Ngoài ra, các mục được cho là không cần thiết cũng bị loại bỏ.
            </p>
            <h1 className="font-semibold text-2xl pb-2 border-b-2 border-neutral-200 dark:border-neutral-700 border-dashed mt-[4rem]">
                Giao diện trang &quot;Báo cáo&quot;
            </h1>
            <p className="mt-[1rem]">
                Trước cập nhật, trang &quot;Báo cáo&quot; cố định nội dung mà
                người dùng có thể in, điều này đồng nghĩa vói việc bạn không thể
                thêm, xoá hay sắp xếp các mục theo ý muốn của mình. Đồng thời,
                số lượng các mục cũng bị giới hạn (chỉ 5 mục).
                <br />
                <br />
                Ở phiên bản Gen 2, chúng tôi đã xây dựng giao diện mới giúp
                người dùng có thể tuỳ chọn mục với thông số tuỳ ý. Đồng thời,
                bạn cũng hoàn toàn có thể chỉnh sửa lại thông tin mục đã thêm
                hoặc xoá chúng. Ngoài ra, bạn cũng có thể kéo thả để sắp xếp lại
                các mục theo ý muốn của mình.
                <br />
                <br />
                Nếu cần thiết, bạn vẫn có thể lưu nội dung các mục vào bộ nhớ
                tạm trên thiết bị của mình. Lần tiếp theo truy cập vào Score, dữ
                liệu vẫn được giữ nguyên.
            </p>
            <img
                src={print1}
                alt="font2"
                className="my-6 w-full rounded-lg border-2 border-border-color"
            />
            <h1 className="font-semibold text-2xl pb-2 border-b-2 border-neutral-200 dark:border-neutral-700 border-dashed mt-[4rem]">
                Thuật toán và hiệu năng
            </h1>
            <p className="mt-[1rem]">
                Score Gen 2 sở hữu những cải thiện đáng kể trong thuật toán,
                giúp tối ưu hóa hiệu năng và tốc độ xử lý dữ liệu.
            </p>
        </div>
    );
};
