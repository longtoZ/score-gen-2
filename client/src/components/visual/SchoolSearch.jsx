import { useContext } from 'react';
import { SchoolContext } from '../../pages/visual/Visual';
import { schoolTypesObjRev } from '../../utils/lists';

import ClearIcon from '@mui/icons-material/Clear';
import './schoolSearch.css';

export const SchoolSearch = ({ school }) => {
    const { schoolData, setSchoolData, competeData, setCompeteData, areaData, setAreaData } =
        useContext(SchoolContext);

    const handleRemove = () => {
        setSchoolData(
            schoolData.filter((s) => s['MA_TRUONG'] !== school['MA_TRUONG']),
        );
        setSchoolData(
            schoolData.filter((s) => s['MA_TRUONG'] !== school['MA_TRUONG']),
        );
        setCompeteData(
            competeData.filter((s) => s['MA_TRUONG'] !== school['MA_TRUONG']),
        );
        setAreaData(
            areaData.filter((s) => s['QUAN/HUYEN'] !== school['QUAN/HUYEN']),
        )
    };

    return (
        <div>
            <div className="bg-input-color shadow-basic py-3 px-4 rounded-lg">
                <div className="block m-auto border-l-4 border-teal-400 px-4">
                    <p className="text-text-subtitle-color mt-2">
                        {school['QUAN/HUYEN']}
                    </p>
                    <p className="text-lg font-semibold">
                        {school['TEN_TRUONG']}
                    </p>
                </div>
                <h1 className="text-text-subtitle-color mt-3">
                    {schoolTypesObjRev[school['MA_LOAI']]}
                </h1>
            </div>
            <div className="flex justify-center mt-4 cursor-pointer">
                <div
                    className="remove bg-red-400 p-1 shadow-basic text-white flex"
                    onClick={handleRemove}
                >
                    <ClearIcon />
                    <h1 className="ml-1 font-semibold">Xoá</h1>
                </div>
            </div>
        </div>
    );
};
