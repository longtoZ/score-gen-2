import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { getAxios, handleData, getDetailInfo } from './utils';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Detail } from './Detail';
import './table.css'


export const Table = ({keyword, schoolType, year}) => {
    const [result, setResult] = useState([]);

    useEffect(() => {
        getAxios(keyword, schoolType, year).then((res) => {
            setResult(handleData(res));
        });
    }, [keyword, schoolType, year]);

    const handleMore = (e) => {
        if (e.target.parentNode.getAttribute('state') === 'collapse') {
            e.target.parentNode.setAttribute('state', 'expand');

            const data = e.target.parentNode.getAttribute('data');

            getDetailInfo(data).then((res) => {

                console.log(e.target.parentNode.parentNode.nextSibling)

                const portalElement = document.createElement('tr');
                portalElement.classList.add('detail-portal')
                const root = ReactDOM.createRoot(portalElement);
                root.render(<Detail {...res[0]} />);
                
                e.target.parentNode.parentNode.parentNode.insertBefore(portalElement, e.target.parentNode.parentNode.nextSibling);
            });

        } else {
            e.target.parentNode.setAttribute('state', 'collapse');
            if (e.target.parentNode.parentNode.nextSibling.classList.contains('detail-portal'))
                e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.nextSibling);
        }

    }

    // console.log(result)

    return (
        <div>
            {schoolType === 'Trường thường' ? (
                <table className='rounded-lg text-center mx-auto w-2/3 mt-20 shadow-basic'>
                    <thead className='bg-emerald-600 text-white font-bold'>
                        <tr>
                            <th className='py-2 px-4'>STT</th>
                            <th className='py-2 px-4'>TÊN TRƯỜNG</th>
                            <th className='py-2 px-4'>TÊN QUẬN</th>
                            <th className='py-2 px-4'>ĐIỂM NV1</th>
                            <th className='py-2 px-4'>ĐIỂM NV2</th>
                            <th className='py-2 px-4'>ĐIỂM NV3</th>
                            <th className='py-2 px-4'>THÊM</th>
                        </tr>
                    </thead>

                    <tbody>

                        {result.map((item, index) => {
                            return (
                                <tr key={index} className='[&:nth-child(even)]:bg-even-row-color'>
                                    <td className='py-2 text-emerald-600 font-bold'>{index+1}</td>
                                    <td className='py-2'>{item[0]}</td>
                                    <td className='py-2'>{item[1]}</td>
                                    <td className='py-2'>{item[2]['NV1']}</td>
                                    <td className='py-2'>{item[2]['NV2']}</td>
                                    <td className='py-2'>{item[2]['NV3']}</td>
                                    <td className='py-2 cursor-pointer' onClick={handleMore} data={item[0]} state="collapse"><MoreHorizIcon className='text-gray-500'/></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            ) : (
                <table className='rounded-lg text-center mx-auto w-2/3 mt-20 shadow-basic'>
                    <thead className='bg-emerald-600 text-white font-bold'>
                        <tr>
                            <th className='py-2 px-4'>STT</th>
                            <th className='py-2 px-4'>TÊN TRƯỜNG</th>
                            <th className='py-2 px-4'>TÊN QUẬN</th>
                            <th className='py-2 px-4'>MÔN</th>
                            <th className='py-2 px-4'>ĐIỂM NV1</th>
                            <th className='py-2 px-4'>ĐIỂM NV2</th>
                            <th className='py-2 px-4'>THÊM</th>
                        </tr>
                    </thead>

                    <tbody>
                        {result.map((item, index) => {
                            const subjects = Object.entries(item[2]);
                            const subjectsObj = {};

                            for (let i=0; i<subjects.length/2; i++) {
                                const subj = subjects[i][0].substring(4);

                                subjectsObj[subj] = [item[2][`NV1_${subj}`], item[2][`NV2_${subj}`]]
                            }

                            return (
                                <>
                                {Object.entries(subjectsObj).map((subject, index2) => {
                                    return (
                                        <tr key={parseInt(`${index}${index2}`)} className='[&:nth-child(even)]:bg-even-row-color'>
                                            {index2 === 0 ? (
                                                <>
                                                    <td className='py-2 text-emerald-600 font-bold'>{index+1}</td>
                                                    <td className='py-2'>{item[0]}</td>
                                                    <td className='py-2'>{item[1]}</td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className='py-2'></td>
                                                    <td className='py-2'></td>
                                                    <td className='py-2'></td>
                                                </>
                                            )}
                                            <td className='py-2'>{subject[0]}</td>
                                            <td className='py-2'>{subject[1][0]}</td>
                                            <td className='py-2'>{subject[1][1]}</td>
                                            <td className='py-2 cursor-pointer' onClick={handleMore} data={item[0]} state="collapse"><MoreHorizIcon className='text-gray-500'/></td>
                                        </tr>
                                    )
                                })}
                                </>
                            )


                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
};
