import { FaSearch } from 'react-icons/fa';
import React from 'react';

export default function SearchBar() {
  return (
    <div className="flex items-center bg-primary rounded-full px-4 py-3 shadow-lg">
      <form action="" className="flex items-center w-full">
        <FaSearch className="text-black mr-6" />
        <input
          type="text"
          placeholder="Search for projects"
          className="bg-transparent placeholder-black focus:outline-none w-full"
        />
      </form>
    </div>
  );
}
