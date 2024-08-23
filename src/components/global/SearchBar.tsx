import { FaSearch } from 'react-icons/fa'; // Make sure to install react-icons if not already
import React from 'react';

export default function SearchBar() {
  return (
    <div className="flex items-center bg-orange-600 rounded-full px-4 py-3 shadow-lg">
      <FaSearch className="text-black mr-6" />
      <form action="">
        <input
            type="text"
            placeholder="Search for projects"
            className="bg-transparent placeholder-black focus:outline-none w-full"
        />
      </form>
      
    </div>
  );
}
