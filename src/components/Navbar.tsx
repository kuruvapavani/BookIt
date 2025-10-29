"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [input, setInput] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false); // for mobile search toggle

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Highway Delite Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>

        {/* Desktop Search */}
        <form
          onSubmit={handleSubmit}
          className="hidden sm:flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              onSearch(e.target.value);
            }}
            placeholder="Search experiences"
            className="w-[220px] md:w-[260px] h-[34px] bg-[#EDEDED] rounded-md px-3 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD643]"
          />
          <button
            type="submit"
            className="bg-[#FFD643] hover:bg-[#f8ca1a] text-[14px] font-medium px-4 py-[6px] rounded-md transition-colors duration-200 cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Mobile Search Icon */}
        <button
          className="sm:hidden p-2 rounded-md bg-[#FFD643] hover:bg-[#f8ca1a] transition"
          onClick={() => setIsSearchOpen((prev) => !prev)}
        >
          <Search className="w-4 h-4 text-gray-800" />
        </button>
      </div>

      {/* Mobile Search Bar (Dropdown style) */}
      {isSearchOpen && (
        <div className="sm:hidden px-4 pb-3 transition-all duration-200">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="Search experiences"
              className="flex-1 h-[36px] bg-[#EDEDED] rounded-md px-3 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD643]"
            />
            <button
              type="submit"
              className="bg-[#FFD643] hover:bg-[#f8ca1a] text-[14px] font-medium px-3 py-[6px] rounded-md transition-colors duration-200 cursor-pointer"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
