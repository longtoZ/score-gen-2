export const RangeTable = ({tableData, schoolType}) => {
  return (
    <>
      {tableData.length !== 0 ? (
          <table className='rounded-lg text-center mx-auto w-2/3 mt-20 shadow-basic'>
            <thead className={`${schoolType === 'Lớp thường' ? 'bg-emerald-600' : 'bg-sky-600'} text-white font-bold`}>
                <tr>
                    <th className='py-2 px-4'>STT</th>
                    <th className='py-2 px-4'>TÊN TRƯỜNG</th>
                    <th className='py-2 px-4'>TÊN QUẬN</th>
                    <th className='py-2 px-4'>ĐIỂM NV1</th>
                    <th className='py-2 px-4'>ĐIỂM NV2</th>
                    {schoolType === 'Lớp thường' ? (
                      <th className='py-2 px-4'>ĐIỂM NV3</th>
                    ): null}
                </tr>
            </thead>

            <tbody>
                {tableData.map((item, index) => {
                    return (
                        <tr key={index} className='[&:nth-child(even)]:bg-even-row-color'>
                            <td className={`${schoolType === 'Lớp thường' ? 'text-emerald-600' : 'text-sky-600'} font-bold py-2`}>{index+1}</td>
                            <td className='py-2'>{item['name']}</td>
                            <td className='py-2'>{item['district']}</td>
                            {schoolType === 'Lớp thường' ? (
                              <>
                                <td className='py-2'>{(parseFloat(item['NV1'])*0.3).toFixed(2)}</td>
                                <td className='py-2'>{(parseFloat(item['NV2'])*0.3).toFixed(2)}</td>
                                <td className='py-2'>{(parseFloat(item['NV3'])*0.3).toFixed(2)}</td>
                              </>
                            ) : (
                              <>
                                <td className='py-2'>{item['NV1']}</td>
                                <td className='py-2'>{item['NV2']}</td>
                              </>
                            )}

                        </tr>
                    )
                })}

            </tbody>
        </table>
      ) : (
        <>
        </>
      )}
    </>

  )
}
