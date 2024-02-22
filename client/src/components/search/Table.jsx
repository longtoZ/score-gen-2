import ReactDOM from 'react-dom/client';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Detail } from './Detail';
import { getDetailInfo } from './utils';

export const Table = ({ tableData, keyword, schoolType }) => {
    const result = tableData.filter((item) =>
        item[0]
            .normalize('NFD')
            .toLowerCase()
            .includes(keyword.normalize('NFD').toLowerCase()),
    );

    const handleMore = (e) => {
        const moreBtn = e.target.closest('.more-btn');

        if (moreBtn.getAttribute('state') === 'collapse') {
            moreBtn.setAttribute('state', 'expand');

            const data = moreBtn.getAttribute('data');

            getDetailInfo(data).then((res) => {
                const portalElement = document.createElement('tr');
                portalElement.classList.add('detail-portal');
                const root = ReactDOM.createRoot(portalElement);
                root.render(<Detail {...res[0]} />);

                moreBtn.parentNode.parentNode.insertBefore(
                    portalElement,
                    moreBtn.parentNode.nextSibling,
                );
            });
        } else {
            moreBtn.setAttribute('state', 'collapse');
            if (
                moreBtn.parentNode.nextSibling.classList.contains(
                    'detail-portal',
                )
            )
                moreBtn.parentNode.parentNode.removeChild(
                    moreBtn.parentNode.nextSibling,
                );
        }
    };

    return (
        <div className="table-container">
            {schoolType === 'Trường thường' ? (
                <table className="search-table rounded-lg text-center mx-auto w-2/3 mt-20 shadow-basic">
                    <thead className="bg-emerald-600 text-white font-bold">
                        <tr>
                            <th className="py-2 px-4">STT</th>
                            <th className="py-2 px-4">TÊN TRƯỜNG</th>
                            <th className="py-2 px-4">TÊN QUẬN</th>
                            <th className="py-2 px-4">ĐIỂM NV1</th>
                            <th className="py-2 px-4">ĐIỂM NV2</th>
                            <th className="py-2 px-4">ĐIỂM NV3</th>
                            <th className="py-2 px-4">THÊM</th>
                        </tr>
                    </thead>

                    <tbody>
                        {result.map((item, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="[&:nth-child(even)]:bg-even-row-color"
                                >
                                    <td className="py-2 text-emerald-600 font-bold">
                                        {index + 1}
                                    </td>
                                    <td className="py-2">{item[0]}</td>
                                    <td className="py-2">{item[1]}</td>
                                    <td className="py-2">{item[2]['NV1']}</td>
                                    <td className="py-2">{item[2]['NV2']}</td>
                                    <td className="py-2">{item[2]['NV3']}</td>
                                    <td
                                        className="py-2 cursor-pointer more-btn"
                                        onClick={handleMore}
                                        data={item[0]}
                                        state="collapse"
                                    >
                                        <MoreHorizIcon className="text-gray-500" />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <table className="search-table rounded-lg text-center mx-auto w-2/3 mt-20 shadow-basic">
                    <thead className="bg-sky-600 text-white font-bold">
                        <tr>
                            <th className="py-2 px-4">STT</th>
                            <th className="py-2 px-4">TÊN TRƯỜNG</th>
                            <th className="py-2 px-4">TÊN QUẬN</th>
                            <th className="py-2 px-4">MÔN</th>
                            <th className="py-2 px-4">ĐIỂM NV1</th>
                            <th className="py-2 px-4">ĐIỂM NV2</th>
                            <th className="py-2 px-4">THÊM</th>
                        </tr>
                    </thead>

                    <tbody>
                        {result.map((item, index) => {
                            const subjects = Object.entries(item[2]);
                            const length = subjects.length / 2;
                            const subjectsObj = {};

                            for (let i = 0; i < length; i++) {
                                const subj = subjects[i][0].substring(4);

                                subjectsObj[subj] = [
                                    item[2][`NV1_${subj}`],
                                    item[2][`NV2_${subj}`],
                                ];
                            }

                            return (
                                <>
                                    {Object.entries(subjectsObj).map(
                                        (subject, index2) => {
                                            return (
                                                <tr
                                                    key={parseInt(
                                                        `${index}${index2}`,
                                                    )}
                                                    className={`[&:nth-child(even)]:bg-even-row-color ${index2 === 0 ? 'border-t-2 border-sky-600' : ''}`}
                                                >
                                                    {index2 === 0 ? (
                                                        <>
                                                            <td
                                                                className="py-2 text-sky-600 font-bold"
                                                                rowSpan={length}
                                                            >
                                                                {index + 1}
                                                            </td>
                                                            <td
                                                                className="py-2"
                                                                rowSpan={length}
                                                            >
                                                                {item[0]}
                                                            </td>
                                                            <td
                                                                className="py-2"
                                                                rowSpan={length}
                                                            >
                                                                {item[1]}
                                                            </td>
                                                        </>
                                                    ) : null}
                                                    <td className="py-2">
                                                        {subject[0]}
                                                    </td>
                                                    <td className="py-2">
                                                        {subject[1][0]}
                                                    </td>
                                                    <td className="py-2">
                                                        {subject[1][1]}
                                                    </td>
                                                    {index2 === length - 1 ? (
                                                        <td
                                                            className="py-2 cursor-pointer more-btn"
                                                            onClick={handleMore}
                                                            data={item[0]}
                                                            state="collapse"
                                                        >
                                                            <MoreHorizIcon className="text-gray-500" />
                                                        </td>
                                                    ) : (
                                                        <td className="py-2"></td>
                                                    )}
                                                </tr>
                                            );
                                        },
                                    )}
                                </>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};
