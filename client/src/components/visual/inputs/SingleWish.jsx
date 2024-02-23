import { useContext, useRef, useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { SchoolContext } from '../../../pages/visual/Visual';

const wishFullName = {
    NV1: 'Nguyện vọng 1',
    NV2: 'Nguyện vọng 2',
    NV3: 'Nguyện vọng 3',
};

const wishList = ['NV1', 'NV2', 'NV3'];

export const SingleWish = () => {
    const { singleWish, setSingleWish } = useContext(SchoolContext);
    const [showWish, setShowWish] = useState(false);

    const wishRef = useRef(null);

    const handleShowWish = () => {
        setShowWish(!showWish);
    };

    const handleWish = (e) => {
        e.stopPropagation();
        setSingleWish(e.target.getAttribute('data-wish'));
        setShowWish(false);
        wishRef.current.innerText = e.target.innerText;
    };

    return (
        <div className="m-1">
            <h1 className="font-semibold mx-2 my-1 block">Chọn nguyện vọng</h1>
            <div
                className="w-[10rem] bg-input-color relative border border-border-color flex justify-between shadow-md rounded-lg py-2 px-3 text-sm cursor-pointer"
                onClick={handleShowWish}
            >
                <p className="pr-2" ref={wishRef}>
                    {wishFullName[singleWish]}
                </p>
                <ArrowDropDownIcon />

                <ul
                    className="w-[8rem] absolute top-[100%] left-0 mt-4 bg-input-color shadow-md p-2 rounded-lg z-[3]"
                    style={
                        showWish === true
                            ? { display: 'block' }
                            : { display: 'none' }
                    }
                >
                    {wishList.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className="rounded py-2 px-1 hover:bg-even-row-color transition duration-200 ease-in-out"
                                onClick={handleWish}
                                data-wish={item}
                            >
                                {wishFullName[item]}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
