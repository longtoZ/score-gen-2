import { useContext, useRef, useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { SchoolContext } from '../../../pages/visual/Visual';

export const SingleSchool = () => {
    const { schoolData, setSchoolData } = useContext(SchoolContext);
    const [showSchool, setShowSchool] = useState(false);

    const schoolRef = useRef(null);

    const handleShowSchool = () => {
        setShowSchool(!showSchool);
    };

    const handleSchool = (e) => {
        e.stopPropagation();
        const code = e.target.getAttribute('data-school');

        setSchoolData(
            schoolData.map((i) => {
                if (i.MA_TRUONG === code) {
                    return {
                        ...i,
                        CHOSEN: true,
                    };
                } else {
                    return {
                        ...i,
                        CHOSEN: false,
                    };
                }
            }),
        );
        setShowSchool(false);

        schoolRef.current.innerText = e.target.innerText;
    };

    return (
        <div className="m-1">
            <h1 className="font-semibold mx-2 my-1 block">Chọn khu vực</h1>
            <div
                className="w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                onClick={handleShowSchool}
            >
                <p className="pr-2" ref={schoolRef}>
                    {schoolData.find((i) => i.CHOSEN === true) !== undefined
                        ? schoolData.find((i) => i.CHOSEN === true).TEN_TRUONG
                        : 'Chọn trường'}
                </p>
                <ArrowDropDownIcon />

                <ul
                    className="overflow-y-scroll w-[8rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg z-[3]"
                    style={
                        showSchool === true
                            ? { display: 'block' }
                            : { display: 'none' }
                    }
                >
                    {schoolData.map((item, index) => {
                        const name = item.TEN_TRUONG;
                        const code = item.MA_TRUONG;

                        return (
                            <li
                                key={index}
                                className="rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out"
                                onClick={handleSchool}
                                data-school={code}
                            >
                                {name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
