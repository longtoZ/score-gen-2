import { useContext, useRef, useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { SchoolContext } from '../../../pages/visual/Visual';

export const SingleDistrict = () => {
    const { districtList, setDistrictList } = useContext(SchoolContext);
    const [showDistrict, setShowDistrict] = useState(false);

    const districtRef = useRef(null);

    const handleShowDistrict = () => {
        setShowDistrict(!showDistrict);
    };

    const handleDistrict = (e) => {
        e.stopPropagation();
        setDistrictList({
            DATA: districtList.DATA,
            CHOSEN: e.target.getAttribute('data-district'),
        });
        setShowDistrict(false);
        districtRef.current.innerText = e.target.innerText;
    };

    return (
        <div className="m-1">
            <h1 className="font-semibold mx-2 my-1 block">Chọn khu vực</h1>
            <div
                className="w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                onClick={handleShowDistrict}
            >
                <p className="pr-2" ref={districtRef}>
                    {districtList.CHOSEN}
                </p>
                <ArrowDropDownIcon />

                <ul
                    className="overflow-y-scroll w-[8rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg z-[3]"
                    style={
                        showDistrict === true
                            ? { display: 'block' }
                            : { display: 'none' }
                    }
                >
                    {districtList.DATA.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className="rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out"
                                onClick={handleDistrict}
                                data-district={item}
                            >
                                {item}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
