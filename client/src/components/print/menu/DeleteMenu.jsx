import { useContext } from 'react';
import { DeleteContext } from '../../../pages/print/Print';


const functionType = {
  'score-range': 'Khoảng điểm',
  top: 'Top điểm',
  'year-range': 'Điểm các năm',
  compete: 'Tỉ lệ chọi các năm',
  area: 'Trường trong khu vực',
  group: 'Trường tương đương',
  special: 'Lớp chuyên',
};

export const DeleteMenu = () => {
    const { data, setData, showDelete, setShowDelete, setToastMessage } = useContext(DeleteContext);

    const handleHideDelete = (e) => {
        if (e.target === e.currentTarget) {
            setShowDelete({
                show: false,
                index: 0,
            });
        }
    }

    const handleDelete = () => {
      const newData = data.filter((item, i) => i !== showDelete.index);
      setData(newData);
      setShowDelete({
          show: false,
          index: 0,
      });
      
      setToastMessage({
          type: 'success',
          msg: 'Xoá thành công',
      });

    }
    return (
        <div
            className="w-full h-full fixed bg-black bg-opacity-40 flex justify-center items-center z-[3]"
            onClick={handleHideDelete}
        >
            <div className="p-8 bg-input-color rounded-lg relative">
              <div className='text-center'>
                <h1 className="text-lg text-center font-semibold my-2">
                  Xoá mục "{functionType[data[showDelete.index].dataType]}"
                </h1>
                <p className='text-sm text-gray-400'>Hành động này không thể được hoàn tác.</p>
              </div>

              <div className='flex justify-center gap-4 mt-8'>
                <button className='w-[5rem] p-2 rounded-lg border-2 border-border-color text-gray-400 font-semibold' onClick={handleHideDelete}>Hủy</button>
                <button className='w-[5rem] p-2 rounded-lg bg-red-500 text-white font-semibold' onClick={handleDelete}>Xoá</button>
              </div>
            </div>
        </div>
    );
};
