export const TopTable = ({ data }) => {
    const tableData = data.tableData;

    const filteredTableData = tableData
        .filter((item) => data.districtValue.includes(item.district))
        .sort((a, b) => {
            const wish1 = parseFloat(a[data.wishValue]);
            const wish2 = parseFloat(b[data.wishValue]);

            if (data.positionValue === 'highest') {
                return wish2 - wish1;
            } else {
                return wish1 - wish2;
            }
        })
        .slice(0, data.topValue);

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
                                <th className="py-2 px-4">STT</th>
                                <th className="py-2 px-4">TÊN TRƯỜNG</th>
                                <th className="py-2 px-4">TÊN QUẬN</th>
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
                                        className="[&:nth-child(even)]:bg-even-row-color"
                                    >
                                        <td className="text-emerald-600 py-2 font-semibold">
                                            {index + 1}
                                        </td>
                                        <td className="py-2">{item['name']}</td>
                                        <td className="py-2">
                                            {item['district']}
                                        </td>
                                        <td
                                            className={`py-2 ${
                                                data.wishValue === 'NV1'
                                                    ? 'bg-amber-100'
                                                    : ''
                                            }`}
                                        >
                                            {(
                                                parseFloat(item['NV1']) * 0.3
                                            ).toFixed(2)}
                                        </td>
                                        <td
                                            className={`py-2 ${
                                                data.wishValue === 'NV2'
                                                    ? 'bg-amber-100'
                                                    : ''
                                            }`}
                                        >
                                            {(
                                                parseFloat(item['NV2']) * 0.3
                                            ).toFixed(2)}
                                        </td>
                                        <td
                                            className={`py-2 ${
                                                data.wishValue === 'NV3'
                                                    ? 'bg-amber-100'
                                                    : ''
                                            }`}
                                        >
                                            {(
                                                parseFloat(item['NV3']) * 0.3
                                            ).toFixed(2)}
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
