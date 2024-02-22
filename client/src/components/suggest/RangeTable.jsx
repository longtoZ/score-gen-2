export const RangeTable = ({ tableData, filterData, schoolType }) => {
    const filteredTableData =
        schoolType === 'Lớp thường'
            ? tableData
                  .filter(
                      (item) =>
                          filterData.districtValue.includes(item['district']) &&
                          parseFloat(item[filterData.wishValue]) >=
                              filterData.startValue &&
                          parseFloat(item[filterData.wishValue]) <=
                              filterData.endValue,
                  )
                  .sort(
                      (a, b) =>
                          parseFloat(a[filterData.wishValue]) -
                          parseFloat(b[filterData.wishValue]),
                  )
            : tableData
                  .filter(
                      (item) =>
                          filterData.districtValue.includes(item['district']) &&
                          parseFloat(item['NV1']) >= filterData.startValue &&
                          parseFloat(item['NV1']) <= filterData.endValue,
                  )
                  .sort((a, b) => parseFloat(a['NV1']) - parseFloat(b['NV1']));

    return (
        <>
            {filteredTableData.length !== 0 ? (
                <>
                    {schoolType === 'Lớp thường' ? (
                        <h1 className="text-center text-2xl font-bold mt-10">
                            Các trường có điểm {filterData.wishValue} trong
                            khoảng {(filterData.startValue * 0.3).toFixed(2)} -{' '}
                            {(filterData.endValue * 0.3).toFixed(2)}
                        </h1>
                    ) : (
                        <h1 className="text-center text-2xl font-bold mt-10">
                            Các trường có điểm{' '}
                            {filterData.wishValue.replace('%', '')} trong khoảng{' '}
                            {parseFloat(filterData.startValue).toFixed(2)} -{' '}
                            {parseFloat(filterData.endValue).toFixed(2)}
                        </h1>
                    )}

                    <table className="suggest-table rounded-lg text-center w-full mt-20 shadow-basic">
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
                                        className="[&:nth-child(even)]:bg-even-row-color"
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
                                                        filterData.wishValue ===
                                                        'NV1'
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
                                                        filterData.wishValue ===
                                                        'NV2'
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
                                                        filterData.wishValue ===
                                                        'NV3'
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
