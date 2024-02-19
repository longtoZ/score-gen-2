import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const Questions = () => {
  return (
    <div className='Questions mt-[30rem] px-[20%]'>
        <h1 className='text-center font-semibold text-4xl'>Câu hỏi thường gặp?</h1>

        <div className='relative'>
            <div className='grid grid-cols-2 gap-8 mt-[3rem]'>
                <div className='flex gap-4 p-6 rounded-lg z-[2] bg-white bg-opacity-50 backdrop-blur'>
                    <HelpOutlineIcon className='w-[20%]'/>
                    <div className='w-[80%]'>
                        <h1 className='text-lg font-semibold'>Dữ liệu của Score lấy từ đâu?</h1>
                        <p className='mt-4'>
                            Mọi tên trường, địa chỉ, điểm nguyện vọng, tỉ lệ chọi,... đều là những thông tin
                            công khai từ các trang báo qua các năm. Chúng tôi không lưu trữ thông tin cá nhân
                            của bất kỳ ai.
                        </p>
                    </div>
                </div>

                <div className='flex gap-4 p-6 rounded-lg z-[2] bg-white bg-opacity-50 backdrop-blur'>
                    <HelpOutlineIcon className='w-[20%]'/>
                    <div className='w-[80%]'>
                        <h1 className='text-lg font-semibold'>Tôi có cần tạo tài khoản để sử dụng không?</h1>
                        <p className='mt-4'>
                            Không cần thiết. Score được thiết kế để sử dụng mà không cần tài khoản. 
                            Tuy nhiên, Score vẫn hỗ trợ chức năng để bạn có thể xuất dữ liệu để lưu trữ dài hạn.
                        </p>
                    </div>
                </div>

                <div className='flex gap-4 p-6 rounded-lg z-[2] bg-white bg-opacity-50 backdrop-blur'>
                    <HelpOutlineIcon className='w-[20%]'/>
                    <div className='w-[80%]'>
                        <h1 className='text-lg font-semibold'>Score hỗ trợ tra cứu điểm trong phạm vi nào?</h1>
                        <p className='mt-4'>
                            Hiện tại chúng tôi chỉ hoạt động trong khu vực Thành phố Hồ Chí Minh. 
                            Nếu dự án có triển vọng và được hỗ trợ về dữ liệu, chúng tôi sẽ lên kế hoạch mở rộng.
                        </p>
                    </div>
                </div>

                <div className='flex gap-4 p-6 rounded-lg z-[2] bg-white bg-opacity-50 backdrop-blur'>
                    <HelpOutlineIcon className='w-[20%]'/>
                    <div className='w-[80%]'>
                        <h1 className='text-lg font-semibold'>Tôi có thể dùng Score trên điện thoại không?</h1>
                        <p className='mt-4'>
                            Tất nhiên rồi! Score được thiết kế để tương thích với mọi thiết bị, kể cả điện thoại di động.
                            Lưu ý, thiết bị của bạn cần có kết nối mạng để truy cập dữ liệu.
                        </p>
                    </div>
                </div>

                <div className='flex gap-4 p-6 rounded-lg z-[2] bg-white bg-opacity-50 backdrop-blur'>
                    <HelpOutlineIcon className='w-[20%]'/>
                    <div className='w-[80%]'>
                        <h1 className='text-lg font-semibold'>Nếu tôi không biết sử dụng một vài chức năng thì sao?</h1>
                        <p className='mt-4'>
                            Đừng lo lắng! Chúng tôi đã thiết kế Score để dễ sử dụng nhất có thể. 
                            Nếu bạn vẫn gặp khó khăn, hãy truy cập trang tài liệu để xem chi tiết hơn.
                        </p>
                    </div>
                </div>

                <div className='flex gap-4 p-6 rounded-lg z-[2] bg-white bg-opacity-50 backdrop-blur'>
                    <HelpOutlineIcon className='w-[20%]'/>
                    <div className='w-[80%]'>
                        <h1 className='text-lg font-semibold'>Làm sao để tôi đóng góp ý kiến cho Score?</h1>
                        <p className='mt-4'>
                            Score luôn hoan nghênh mọi ý kiến đóng góp từ cộng đồng. 
                            Bạn có thể gửi email trực tiếp cho chúng tôi.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className='absolute top-0 right-[40%] mesh4'></div>
            <div className='absolute top-[15%] right-[25%] w-[25rem] h-[25rem] mesh3'></div>
            <div className='absolute -bottom-[5rem] right-[40%] mesh1'></div>

        </div>
    </div>  
)
}
