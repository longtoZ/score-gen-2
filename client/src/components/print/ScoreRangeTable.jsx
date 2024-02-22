export const ScoreRangeTable = ({ data }) => {
    const schoolType = data.schoolType;
    const tableData = data.tableData;

    const startValue =
        schoolType === 'Lớp thường'
            ? ((data.startValue / 30) * 100).toFixed(2)
            : data.startValue;
    const endValue =
        schoolType === 'Lớp thường'
            ? ((data.endValue / 30) * 100).toFixed(2)
            : data.endValue;

    const filteredTableData =
        schoolType === 'Lớp thường'
            ? tableData
                  .filter(
                      (item) =>
                          data.districtValue.includes(item.district) &&
                          parseFloat(item[data.wishValue]) >= startValue &&
                          parseFloat(item[data.wishValue]) <= endValue,
                  )
                  .sort(
                      (a, b) =>
                          parseFloat(a[data.wishValue]) -
                          parseFloat(b[data.wishValue]),
                  )
            : tableData
                  .filter(
                      (item) =>
                          data.districtValue.includes(item['district']) &&
                          parseFloat(item['NV1']) >= startValue &&
                          parseFloat(item['NV1']) <= endValue,
                  )
                  .sort((a, b) => parseFloat(a['NV1']) - parseFloat(b['NV1']));

    return (
        <>
            {filteredTableData.length !== 0 ? (
                <>
                    <section className="text-center">
                        <h1 className="text-3xl font-bold">{data.title}</h1>
                    </section>

                    <table className="rounded-lg text-center w-full mt-10 shadow-basic">
                        <thead
                            className={`${
                                schoolType === 'Lớp thường'
                                    ? 'bg-emerald-600'
                                    : 'bg-sky-600'
                            } text-white font-bold`}
                        >
                            <tr>
                                <th className="py-2 px-4">STT</th>
                                <th className="py-2 px-4">TÊN TRƯỜNG</th>
                                <th className="py-2 px-4">TÊN QUẬN</th>
                                <th className="py-2 px-4">ĐIỂM NV1</th>
                                <th className="py-2 px-4">ĐIỂM NV2</th>
                                {schoolType === 'Lớp thường' ? (
                                    <th className="py-2 px-4">ĐIỂM NV3</th>
                                ) : null}
                            </tr>
                        </thead>

                        <tbody>
                            {filteredTableData.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="[&:nth-child(even)]:bg-even-row-color-light"
                                    >
                                        <td
                                            className={`${
                                                schoolType === 'Lớp thường'
                                                    ? 'text-emerald-600'
                                                    : 'text-sky-600'
                                            } font-bold py-2`}
                                        >
                                            {index + 1}
                                        </td>
                                        <td className="py-2">{item['name']}</td>
                                        <td className="py-2">
                                            {item['district']}
                                        </td>
                                        {schoolType === 'Lớp thường' ? (
                                            <>
                                                <td
                                                    className={`py-2 ${
                                                        data.wishValue === 'NV1'
                                                            ? 'bg-amber-100 text-black'
                                                            : ''
                                                    }`}
                                                >
                                                    {(
                                                        parseFloat(
                                                            item['NV1'],
                                                        ) * 0.3
                                                    ).toFixed(2)}
                                                </td>
                                                <td
                                                    className={`py-2 ${
                                                        data.wishValue === 'NV2'
                                                            ? 'bg-amber-100 text-black'
                                                            : ''
                                                    }`}
                                                >
                                                    {(
                                                        parseFloat(
                                                            item['NV2'],
                                                        ) * 0.3
                                                    ).toFixed(2)}
                                                </td>
                                                <td
                                                    className={`py-2 ${
                                                        data.wishValue === 'NV3'
                                                            ? 'bg-amber-100 text-black'
                                                            : ''
                                                    }`}
                                                >
                                                    {(
                                                        parseFloat(
                                                            item['NV3'],
                                                        ) * 0.3
                                                    ).toFixed(2)}
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="py-2">
                                                    {item['NV1']}
                                                </td>
                                                <td className="py-2">
                                                    {item['NV2']}
                                                </td>
                                            </>
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
