export const TopTable = ({ tableData, filterData }) => {
    tableData.sort((a, b) => {
        const wish1 = parseFloat(a[filterData.wishValue]);
        const wish2 = parseFloat(b[filterData.wishValue]);

        if (filterData.positionValue === 'highest') {
            return wish2 - wish1;
        } else {
            return wish1 - wish2;
        }
    });

    const filteredTableData = tableData.slice(0, filterData.topValue);

    return (
        <>
            {filteredTableData.length !== 0 ? (
                <>
                    <h1 className="text-center text-2xl font-bold mt-10">
                        Top {filterData.topValue} trường có điểm{' '}
                        {filterData.wishValue} cao nhất
                    </h1>
                    <table className="rounded-lg text-center mx-auto w-2/3 mt-20 shadow-basic">
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
                                        <td className="text-emerald-600">
                                            {index + 1}
                                        </td>
                                        <td className="py-2">{item['name']}</td>
                                        <td className="py-2">
                                            {item['district']}
                                        </td>
                                        <td
                                            className={`py-2 ${
                                                filterData.wishValue === 'NV1'
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
                                                filterData.wishValue === 'NV2'
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
                                                filterData.wishValue === 'NV3'
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
