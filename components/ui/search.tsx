"use client"

import React, { useState } from 'react';
import logo from '../../public/magnifying-glass-solid.svg';
import Image from 'next/image';

interface SearchBarProps {
  onSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search)
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center justify-center py-2">
      <div className="w-2/5 h-1/2 p-4 bg-gray-100 rounded-lg">
        <p className="mb-2 text-center font-bold text-lg">Znajdź samochód dla siebie</p>
        <div className="relative border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus-within:border-blue-500">
          <input
            className="pl-10 pr-5 h-full w-full rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Marka, Model"
            value={search}
            onChange={handleSearch}
          />
          <div className="absolute left-0 top-0 h-full flex items-center pl-3">
          <Image src={logo} alt="Magnifying glass" width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
