import { useState, useContext, useEffect } from "react";
import { FormContext } from "@components/Form/index";

import addresses from "@assets/jsons/address.json";

const SelectAddress = ({ address }) => {
    const { handleChange, errors } = useContext(FormContext);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");

    useEffect(() => {
        if (address) {
            setSelectedProvince(address.province);
            setSelectedDistrict(address.district);
            setSelectedWard(address.ward);
            handleChange("province", address.province);
            handleChange("district", address.district);
            handleChange("ward", address.ward);
        }
    }, [address])

    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;

        // Kiểm tra nếu provinceCode tồn tại trong addresses
        if (addresses[provinceCode]) {
            // const provinceName = addresses[provinceCode].name_with_type;
            setSelectedProvince(provinceCode);
            setSelectedDistrict(""); // Reset district khi thay đổi province
            setSelectedWard("");     // Reset ward khi thay đổi province
            handleChange("province", provinceCode);
        }
    };

    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;

        // Kiểm tra nếu districtCode tồn tại trong addresses[selectedProvince]
        if (selectedProvince && addresses[selectedProvince].district[districtCode]) {
            //const districtName = addresses[selectedProvince].district[districtCode].name_with_type;
            setSelectedDistrict(districtCode);
            setSelectedWard("");     // Reset ward khi thay đổi district
            handleChange("district", districtCode);
        }
    };

    const handleWardChange = (e) => {
        const wardCode = e.target.value;

        // Kiểm tra nếu wardCode tồn tại trong addresses[selectedProvince].district[selectedDistrict]
        if (selectedProvince && selectedDistrict && addresses[selectedProvince].district[selectedDistrict].ward[wardCode]) {
            //const wardName = addresses[selectedProvince].district[selectedDistrict].ward[wardCode].name_with_type;
            setSelectedWard(wardCode);
            handleChange("ward", wardCode);
        }
    };

    const provinces = Object.keys(addresses);

    return (
        <div>
            <div className="mb-1">
                <select
                    name="province"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    className="block w-full border border-gray-300 rounded p-2"
                >
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {provinces
                        .sort((a, b) => addresses[a].name.localeCompare(addresses[b].name)) // Sắp xếp theo tên
                        .map((provinceCode) => (
                            <option key={provinceCode} value={provinceCode}>
                                {addresses[provinceCode].name_with_type}
                            </option>
                        ))}
                </select>
                {errors["province"] && (
                    <p className="text-red-500 text-sm mt-1">{errors["province"]}</p>
                )}
            </div>
            <div className="mb-1">
                <select
                    name="district"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    disabled={!selectedProvince}  // Disable nếu chưa chọn tỉnh/thành phố
                    className={`block w-full border border-gray-300 rounded p-2 ${!selectedProvince ? 'cursor-not-allowed opacity-70' : ''
                        }`}
                >
                    <option value="">Chọn Quận/Huyện</option>
                    {selectedProvince ? Object.keys(addresses[selectedProvince].district)
                        .sort((a, b) => addresses[selectedProvince].district[a].name.localeCompare(
                            addresses[selectedProvince].district[b].name)) // Sắp xếp district theo tên
                        .map((districtCode) => (
                            <option key={districtCode} value={districtCode}>
                                {addresses[selectedProvince].district[districtCode].name_with_type}
                            </option>
                        ))
                        : null}
                </select>
                {errors["district"] && (
                    <p className="text-red-500 text-sm mt-1">{errors["district"]}</p>
                )}
            </div>
            <div className="mb-1">
                <select
                    id="ward"
                    value={selectedWard}
                    onChange={handleWardChange}
                    disabled={!selectedDistrict}  // Disable nếu chưa chọn quận/huyện
                    className={`block w-full border border-gray-300 rounded p-2 ${!selectedDistrict ? 'cursor-not-allowed opacity-70' : ''
                        }`}
                >
                    <option value="">Chọn Phường/Xã</option>
                    {selectedProvince && selectedDistrict ? Object.keys(addresses[selectedProvince].district[selectedDistrict].ward)
                        .sort((a, b) => addresses[selectedProvince].district[selectedDistrict].ward[a].name.localeCompare(
                            addresses[selectedProvince].district[selectedDistrict].ward[b].name)) // Sắp xếp ward theo tên
                        .map((wardCode) => (
                            <option key={wardCode} value={wardCode}>
                                {addresses[selectedProvince].district[selectedDistrict].ward[wardCode].name_with_type}
                            </option>
                        ))
                        : null}
                </select>
                {errors["ward"] && (
                    <p className="text-red-500 text-sm mt-1">{errors["ward"]}</p>
                )}
            </div>
        </div>
    );
};

export default SelectAddress;
