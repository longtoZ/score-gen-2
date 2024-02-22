export const AverageTable = ({ tableData, filterData }) => {
    tableData.sort((a, b) => {
        const wish1 = parseFloat(a[filterData.wishValue]);
        const wish2 = parseFloat(b[filterData.wishValue]);

        if (filterData.averageValue === 'higher') {
            return wish2 - wish1;
        } else {
            return wish1 - wish2;
        }
    });

    let averageWish1 = 0;
    let averageWish2 = 0;
    let averageWish3 = 0;

    tableData.forEach((item) => {
        averageWish1 += parseFloat(item['NV1']);
        averageWish2 += parseFloat(item['NV2']);
        averageWish3 += parseFloat(item['NV3']);
    });

    averageWish1 = averageWish1 / tableData.length;
    averageWish2 = averageWish2 / tableData.length;
    averageWish3 = averageWish3 / tableData.length;

    return (
        <>
            {tableData.length !== 0 ? (
                <>
                    {filterData.wishValue === 'NV1' ? (
                        <h1 className="text-center text-2xl font-bold mt-10">
                            Điểm trung bình NV1:{' '}
                            {(averageWish1 * 0.3).toFixed(2)}
                        </h1>
                    ) : filterData.wishValue === 'NV2' ? (
                        <h1 className="text-center text-2xl font-bold mt-10">
                            Điểm trung bình NV2:{' '}
                            {(averageWish2 * 0.3).toFixed(2)}
                        </h1>
                    ) : (
                        <h1 className="text-center text-2xl font-bold mt-10">
                            Điểm trung bình NV3:{' '}
                            {(averageWish3 * 0.3).toFixed(2)}
                        </h1>
                    )}
                    <table className="suggest-table rounded-lg text-center w-full mt-20 shadow-basic">
                        <thead className="bg-emerald-600 text-white font-bold">
                            <tr>
                                <th className="py-2 px-4">STT</th>
                                <th className="py-2 px-4">TÊN TRƯỜNG</th>
                                <th className="py-2 px-4">TÊN QUẬN</th>
                                <th className="py-2 px-4">ĐIỂM NV1</th>
                                <th className="py-2 px-4">ĐIỂM NV2</th>
                                <th className="py-2 px-4">ĐIỂM NV3</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tableData.map((item, index) => {
                                return (
                                    <>
                                        {filterData.wishValue === 'NV1' &&
                                        (filterData.averageValue === 'higher'
                                            ? item['NV1'] >= averageWish1
                                            : item['NV1'] <= averageWish1) ? (
                                            <tr
                                                key={index}
                                                className="[&:nth-child(even)]:bg-even-row-color"
                                            >
                                                <td className="text-emerald-600">
                                                    {index + 1}
                                                </td>
                                                <td className="py-2">
                                                    {item['name']}
                                                </td>
                                                <td className="py-2">
                                                    {item['district']}
                                                </td>
                                                <td className="py-2 bg-amber-100 text-black">
                                                    {(
                                                        parseFloat(
                                                            item['NV1'],
                                                        ) * 0.3
                                                    ).toFixed(2)}
                                                </td>
                                                <td className="py-2">
                                                    {(
                                                        parseFloat(
                                                            item['NV2'],
                                                        ) * 0.3
                                                    ).toFixed(2)}
                                                </td>
                                                <td className="py-2">
                                                    {(
                                                        parseFloat(
                                                            item['NV3'],
                                                        ) * 0.3
                                                    ).toFixed(2)}
                                                </td>
                                            </tr>
                                        ) : filterData.wishValue === 'NV2' &&
                                          (filterData.averageValue === 'higher'
                                              ? item['NV2'] >= averageWish2
                                              : item['NV2'] <= averageWish2) ? (
                                            <tr
                                                key={index}
                                                className="[&:nth-child(even)]:bg-even-row-color"
                                            >
                                                <td className="text-emerald-600">
                                                    {index + 1}
                                                </td>
                                                <td className="py-2">
                                                    {item['name']}
                                                </td>
                                                <td className="py-2">
                                                    {item['district']}
                                                </td>
                                                <td className="py-2">
                                                    {(
                                                        parseFloat(
                                                            item['NV1'],
                                                        ) * 0.3
                                                    ).toFixed(2)}
                                                </td>
                                                <td className="py-2 bg-amber-100 text-black">
                                                    {(
                                                        parseFloat(
                                                            item['NV2'],
                                                        ) * 0.3
                                                    ).toFixed(2)}
                                                </td>
                                                <td className="py-2">
                                                    {(
                                                        parseFloat(
                                                            item['NV3'],
                                                        ) * 0.3
                                                    ).toFixed(2)}
                                                </td>
                                            </tr>
                                        ) : filterData.wishValue === 'NV3' &&
                                          (filterData.averageValue === 'higher'
                                              ? item['NV3'] >= averageWish3
                                              : item['NV3'] <= averageWish3) ? (
                                            <tr
                                                key={index}
                                                className="[&:nth-child(even)]:bg-even-row-color"
                                            >
                                                <td className="text-emerald-600">
                                                    {index + 1}
                                                </td>
                                                <td className="py-2">
                                                    {item['name']}
                                                </td>
                                                <td className="py-2">
                                                    {item['district']}
                                                </td>
                                                <td className="py-2">
                                                    {(
                                                        parseFloat(
                                                            item['NV1'],
                                                        ) * 0.3
                                                    ).toFixed(2)}
                                                </td>
                                                <td className="py-2">
                                                    {(
                                                        parseFloat(
                                                            item['NV2'],
                                                        ) * 0.3
                                                    ).toFixed(2)}
                                                </td>
                                                <td className="py-2 bg-amber-100 text-black">
                                                    {(
                                                        parseFloat(
                                                            item['NV3'],
                                                        ) * 0.3
                                                    ).toFixed(2)}
                                                </td>
                                            </tr>
                                        ) : null}
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            ) : null}
        </>
    );
};
