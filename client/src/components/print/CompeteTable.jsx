export const CompeteTable = ({ data }) => {
    const school = data.tableData['TEN_TRUONG'];
    const district = data.tableData['QUAN/HUYEN'];
    const tableData = data.tableData.DATA;
    const length = tableData.length;

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
                                <th className="py-2 px-4">TÊN TRƯỜNG</th>
                                <th className="py-2 px-4">TÊN QUẬN</th>
                                <th className="py-2 px-4">Năm</th>
                                <th className="py-2 px-4">CHỈ TIÊU</th>
                                <th className="py-2 px-4">SỐ LƯỢNG</th>
                                <th className="py-2 px-4">TỈ LỆ CHỌI</th>
                                <th className="py-2 px-4">TĂNG/GIẢM</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tableData.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="[&:nth-child(even)]:bg-even-row-color-light"
                                    >
                                        {index === 0 ? (
                                            <>
                                                <td
                                                    className="py-2 text-emerald-600 font-semibold"
                                                    rowSpan={length}
                                                >
                                                    {school}
                                                </td>
                                                <td
                                                    className="py-2 text-emerald-600 font-semibold"
                                                    rowSpan={length}
                                                >
                                                    {district}
                                                </td>
                                            </>
                                        ) : null}
                                        <td className="py-2">
                                            {item['NAM_HOC']}
                                        </td>
                                        <td className="py-2">
                                            {item['CHI_TIEU']}
                                        </td>
                                        <td className="py-2">
                                            {item['SO_LUONG']}
                                        </td>
                                        <td className="py-2">
                                            {(item['SO_LUONG'] / item['CHI_TIEU']).toFixed(2)}
                                        </td>
                                        <td className="py-2">
                                            {index === 0 ? '' : (tableData[index]['SO_LUONG'] / tableData[index]['CHI_TIEU']).toFixed(2) - (tableData[index - 1]['SO_LUONG'] / tableData[index - 1]['CHI_TIEU']).toFixed(2) > 0 ? (
                                                <span className="text-emerald-600">
                                                    {((tableData[index]['SO_LUONG'] / tableData[index]['CHI_TIEU']) - (tableData[index - 1]['SO_LUONG'] / tableData[index - 1]['CHI_TIEU'])).toFixed(2)}
                                                </span>
                                            ) : (
                                                <span className="text-red-600">
                                                    {((tableData[index]['SO_LUONG'] / tableData[index]['CHI_TIEU']) - (tableData[index - 1]['SO_LUONG'] / tableData[index - 1]['CHI_TIEU'])).toFixed(2)}
                                                </span>
                                            )}
                                        </td>
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
