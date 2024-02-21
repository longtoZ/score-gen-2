import React from 'react';
import './table.css';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const Detail = ({ ...res }) => {
    return (
        <td className="py-6 px-4 text-left bg-even-row-color" colSpan={7}>
            <div className="grid grid-cols-2">
                <ul className="block my-auto bg-[#14966a30] p-4 rounded-lg shadow-md border-2 border-[#14966a8a]">
                    <li className="my-2">
                        <CalendarMonthIcon className="mr-2" />
                        <b>Thành lập: </b> {res.THANH_LAP}
                    </li>
                    <li className="my-2">
                        <InsertLinkIcon className="mr-2" />
                        <b>Đường dẫn: </b>
                        <a
                            href={res.URL}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline"
                        >
                            {res.URL}
                        </a>
                    </li>
                    <li className="my-2">
                        <LocationOnIcon className="mr-2" />
                        <b>Địa chỉ: </b> {res.DIA_CHI}
                    </li>
                </ul>
                <div className='map-area' dangerouslySetInnerHTML={{ __html: res.BAN_DO }}></div>
            </div>
        </td>
    );
};
