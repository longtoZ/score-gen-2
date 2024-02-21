import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AppsIcon from '@mui/icons-material/Apps';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const Benefits = () => {
  return (
    <div className='Benefits mt-[30rem] px-[18%] py-20'>
        <h1 className='text-center font-semibold text-4xl'>Vì sao nên sử dụng Score?</h1>

        <div className='benefits-grid mt-[5rem] grid grid-cols-4 gap-8 text-center relative'>
            <div className='py-6 px-6 rounded-lg bg-white bg-opacity-60 dark:bg-black dark:bg-opacity-30 backdrop-blur z-[2]'>
                <div className='rounded-lg p-2 bg-teal-100 inline-block mx-auto'>
                    <AccessTimeIcon className='text-teal-500' style={{fontSize:'2.2em'}} />
                </div>
                <h1 className='mt-2 font-semibold text-lg'>Nhanh chóng</h1>
                <p className='mt-2 leading-6'>
                    Tra cứu thông tin trường học một cách đầy đủ với rất ít thao tác.
                </p>
            </div>

            <div className='py-6 px-6 rounded-lg bg-white bg-opacity-60 dark:bg-black dark:bg-opacity-30 backdrop-blur z-[2]'>
                <div className='rounded-lg p-2 bg-teal-100 inline-block mx-auto'>
                    <AppsIcon className='text-teal-500' style={{fontSize:'2.2em'}} />
                </div>
                <h1 className='mt-2 font-semibold text-lg'>Đa chức năng</h1>
                <p className='mt-2 leading-6'>
                    Dữ liệu được sắp xếp và trực quan hoá qua biểu đồ, bảng, đồ thị để bạn dễ dàng so sánh, phân tích và đánh giá.
                </p>
            </div>

            <div className='py-6 px-6 rounded-lg bg-white bg-opacity-60 dark:bg-black dark:bg-opacity-30 backdrop-blur z-[2]'>
                <div className='rounded-lg p-2 bg-teal-100 inline-block mx-auto'>
                    <PeopleAltIcon className='text-teal-500' style={{fontSize:'2.2em'}} />
                </div>
                <h1 className='mt-2 font-semibold text-lg'>Thân thiện</h1>
                <p className='mt-2 leading-6'>
                    Giao diện đơn giản và trực quan, dễ sử dụng, dễ dàng thao tác.
                </p>
            </div>

            <div className='py-6 px-6 rounded-lg bg-white bg-opacity-60 dark:bg-black dark:bg-opacity-30 backdrop-blur z-[2]'>
                <div className='rounded-lg p-2 bg-teal-100 inline-block mx-auto'>
                    <AttachMoneyIcon className='text-teal-500' style={{fontSize:'2.2em'}} />
                </div>
                <h1 className='mt-2 font-semibold text-lg'>Miễn phí</h1>
                <p className='mt-2 leading-6'>
                    Các tính năng cơ bản hoàn toàn miễn phí, không cần đăng kí tài khoản để sử dụng.
                </p>
            </div>

            <div className='absolute top-0 left-1/2 -translate-x-1/2 opacity-40 mesh2'></div>
            <div className='absolute -top-[4rem] left-1/2 opacity-50 mesh3 moveUpAnimation'></div>
            <div className='absolute -top-[2rem] right-2/3 opacity-50 mesh4 moveDownAnimation'></div>

        </div>
    </div>
  )
}
