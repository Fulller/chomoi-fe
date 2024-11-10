import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import TollTip from "@components/TollTip";
import { useNavigate } from "react-router-dom";


export default function SearchBox({ className }) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Lấy danh sách từ khóa từ `localStorage`
    getKeyword();
  }, []);

  const getKeyword = () => {
    const savedKeywords = JSON.parse(localStorage.getItem('searchKeywords')) || [];
    setSuggestions(savedKeywords);
  }

  useEffect(() => {
    // Thêm sự kiện click vào document để ẩn gợi ý khi click ra ngoài
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm === "") return;
    if (searchTerm.trim()) {
      const savedKeywords = JSON.parse(localStorage.getItem('searchKeywords')) || [];
      const updatedKeywords = [searchTerm, ...savedKeywords.filter(k => k !== searchTerm)].slice(0, 5); // Giới hạn 5 từ khóa gần nhất
      localStorage.setItem('searchKeywords', JSON.stringify(updatedKeywords));
      getKeyword();
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
    }
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    navigate(`/search?query=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setSearchTerm("");
    inputRef.current.focus();
  };
  return (
    <div className={className + " flex-1 flex items-center mx-8"}>
      <div ref={inputRef} className="flex relative items-center w-full bg-gray-100 rounded-md p-1 pl-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus} // Hiện gợi ý khi click vào ô
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

        {showSuggestions && suggestions.length > 0 && (
          <div className="border border-gray-300 bg-white absolute max-h-52 overflow-y-auto z-10 w-full rounded top-10 right-1">
            {suggestions.map((suggestion, index) => (
              <div className="p-2 cursor-pointer hover:bg-gray-100" key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
