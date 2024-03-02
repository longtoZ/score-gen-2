export const SpecialTable = ({ data }) => {
    const tableData = data.tableData.sort((a, b) => b['DIEM'] - a['DIEM']);
    const wish1 = data.wish.replace('%', '1');
    const wish2 = data.wish.replace('%', '2');

    const filteredTableData = tableData.sort((a, b) => 
        parseFloat(b['DIEM'][wish1]) - parseFloat(a['DIEM'][wish1])
    )

    return (
        <>
            {filteredTableData.length !== 0 ? (
                <>
                    <section className="text-center">
                        <h1 className="text-3xl font-bold">{data.title}</h1>
                        <h1 className="text-center text-lg mt-5"></h1>
                    </section>
                    <table className="rounded-lg text-center w-full mt-20 shadow-basic">
                        <thead className="bg-sky-600 text-white font-bold">
                            <tr>
                                <th className="py-2 px-4">NĂM</th>
                                <th className="py-2 px-4">TÊN TRƯỜNG</th>
                                <th className="py-2 px-4">TÊN QUẬN</th>
                                <th className="py-2 px-4">ĐIỂM {wish1}</th>
                                <th className="py-2 px-4">ĐIỂM {wish2}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredTableData.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className={
                                            item['TEN_TRUONG'] === data.school
                                                ? 'bg-amber-100 text-black'
                                                : '[&:nth-child(even)]:bg-even-row-color-light'
                                        }
                                    >
                                        <td className="py-2 ">
                                            {item['NAM_HOC']}
                                        </td>
                                        <td className="py-2">
                                            {item['TEN_TRUONG']}
                                        </td>
                                        <td className="py-2">
                                            {item['QUAN/HUYEN']}
                                        </td>
                                        <td className="py-2">
                                            {item['DIEM'][wish1]}
                                        </td>
                                        <td className="py-2">
                                            {item['DIEM'][wish2]}
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
