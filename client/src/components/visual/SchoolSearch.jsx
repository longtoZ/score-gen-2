import { useContext } from 'react';

import ClearIcon from '@mui/icons-material/Clear';

import { SchoolContext } from '../../pages/visual/Visual';
import { schoolTypesObjRev } from '../../utils/lists';

export const SchoolSearch = ({ school }) => {
    const {
        schoolData,
        setSchoolData,
        competeData,
        setCompeteData,
        areaData,
        setAreaData,
        districtList,
        setDistrictList,
    } = useContext(SchoolContext);

    const handleRemove = () => {
        const removedDistrictList = districtList.DATA.filter(
            (s) => s !== school['QUAN/HUYEN'],
        );
        setSchoolData(
            schoolData.filter((s) => s['ma_truong'] !== school['ma_truong']),
        );
        setSchoolData(
            schoolData
                .filter((s) => s['ma_truong'] !== school['ma_truong'])
                .map((s, i, arr) => {
                    if (i === arr.length - 1) {
                        s['CHOSEN'] = true;
                    }

                    return s;
                }),
        );
        setCompeteData(
            competeData.filter((s) => s['ma_truong'] !== school['ma_truong']),
        );
        setAreaData(
            areaData.filter((s) => s['QUAN/HUYEN'] !== school['QUAN/HUYEN']),
        );
        setDistrictList({
            DATA: removedDistrictList,
            CHOSEN:
                removedDistrictList.length > 0
                    ? (districtList.CHOSEN =
                          removedDistrictList[removedDistrictList.length - 1])
                    : '',
        });
    };

    return (
        <div>
            <div className="bg-input-color shadow-basic py-3 px-4 rounded-lg">
                <div className="block m-auto border-l-4 border-teal-400 px-4">
                    <p className="text-text-subtitle-color mt-2">
                        {school['QUAN/HUYEN']}
                    </p>
                    <p className="text-lg font-semibold">
                        {school['ten_truong']}
                    </p>
                </div>
                <h1 className="text-text-subtitle-color mt-3">
                    {schoolTypesObjRev[school['ma_loai']]}
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
