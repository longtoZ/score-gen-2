export const AreaTable = ({ data }) => {
    const tableData = data.tableData;
    const length = tableData.length;

    const filteredTableData = tableData.sort((a, b) => {
        const wish1 = parseFloat(a['DIEM']['NV1']);
        const wish2 = parseFloat(b['DIEM']['NV1']);

        return wish2 - wish1;
    })

    return (
        <>
            {filteredTableData.length !== 0 ? (
                <>
                    <section className="text-center">
                        <h1 className="text-3xl font-bold">{data.title}</h1>
                        <h1 className="text-center text-lg mt-5"></h1>
                    </section>
                    <table className="rounded-lg text-center w-full mt-20 shadow-basic">
                        <thead className="bg-emerald-600 text-white font-bold">
                            <tr>
                                <th className="py-2 px-4">TÊN QUẬN</th>
                                <th className="py-2 px-4">NĂM</th>
                                <th className="py-2 px-4">TÊN TRƯỜNG</th>
                                <th className="py-2 px-4">ĐIỂM NV1</th>
                                <th className="py-2 px-4">ĐIỂM NV2</th>
                                <th className="py-2 px-4">ĐIỂM NV3</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredTableData.map((item, index) => {
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
                                                    {item['QUAN/HUYEN']}
                                                </td>
                                                <td
                                                    className="py-2 text-emerald-600 font-semibold"
                                                    rowSpan={length}
                                                >
                                                    {item['NAM_HOC']}
                                                </td>
                                            </>
                                        ) : null}
                                        <td className="py-2">
                                            {item['TEN_TRUONG']}
                                        </td>

                                        <td className="py-2">
                                            {item['DIEM']['NV1']}
                                        </td>
                                        <td className="py-2">
                                            {item['DIEM']['NV2']}
                                        </td>
                                        <td className="py-2">
                                            {item['DIEM']['NV3']}
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
