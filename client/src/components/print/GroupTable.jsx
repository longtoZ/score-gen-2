import React from 'react';

export const GroupTable = ({ data }) => {
    const tableData = data.tableData.sort((a, b) => b['diem'] - a['diem']);
    const wish = data.wish;

    return (
        <>
            {tableData.length !== 0 ? (
                <>
                    <section className="text-center">
                        <h1 className="text-3xl font-bold">{data.title}</h1>
                        <h1 className="text-center text-lg mt-5"></h1>
                    </section>
                    <table className="rounded-lg text-center w-full mt-20 shadow-basic">
                        <thead className="bg-emerald-600 text-white font-bold">
                            <tr>
                                <th className="py-2 px-4">NĂM</th>
                                <th className="py-2 px-4">TÊN TRƯỜNG</th>
                                <th className="py-2 px-4">TÊN QUẬN</th>
                                {wish === 'NV1' && (
                                    <th className="py-2 px-4">ĐIỂM NV1</th>
                                )}
                                {wish === 'NV2' && (
                                    <th className="py-2 px-4">ĐIỂM NV2</th>
                                )}
                                {wish === 'NV3' && (
                                    <th className="py-2 px-4">ĐIỂM NV3</th>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {tableData.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className={
                                            item['ten_truong'] === data.school
                                                ? 'bg-amber-100 text black'
                                                : '[&:nth-child(even)]:bg-even-row-color-light'
                                        }
                                    >
                                        <td className="py-2">
                                            {item['nam_hoc']}
                                        </td>
                                        <td className="py-2">
                                            {item['ten_truong']}
                                        </td>
                                        <td className="py-2">
                                            {item['QUAN/HUYEN']}
                                        </td>

                                        {wish === 'NV1' && (
                                            <td className="py-2">
                                                {item['diem']}
                                            </td>
                                        )}
                                        {wish === 'NV2' && (
                                            <td className="py-2">
                                                {item['diem']}
                                            </td>
                                        )}
                                        {wish === 'NV3' && (
                                            <td className="py-2">
                                                {item['diem']}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            ) : null}
        </>
    );
};
