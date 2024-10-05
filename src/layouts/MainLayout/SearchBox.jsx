import React, { useState, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import TollTip from "@components/TollTip";

export default function SearchBox({ className }) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const handleSearch = () => {
    console.log("Tìm kiếm:", searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    inputRef.current.focus();
  };
  return (
    <div className={className + " flex-1 flex items-center mx-8"}>
      <div className="flex items-center w-full bg-gray-100 rounded-md p-1 pl-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none py-1" // Điều chỉnh chiều cao cho input
          placeholder="Tìm kiếm sản phẩm..."
          ref={inputRef}
        />
        {searchTerm && (
          <TollTip content="Xóa">
            <button onClick={handleClear} className="text-500 p-2">
              <FaTimes />
            </button>
          </TollTip>
        )}
        <TollTip content="Tìm kiếm">
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 px-4 rounded-md hover:bg-blue-600" // Điều chỉnh padding
          >
            <FaSearch />
          </button>
        </TollTip>
      </div>
    </div>
  );
}
