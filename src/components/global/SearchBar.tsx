import { FaSearch } from "react-icons/fa";
import React from "react";

export default function SearchBar() {
    return (
        <div className="flex items-center bg-orange-200 rounded-full px-4 py-3 shadow-lg">
            <form action="" className="flex items-center justify-center w-full">
                <FaSearch className="text-gray-600 text-xl ml-2 mr-5" />
                <input
                    type="text"
                    placeholder="Explore projects"
                    className="text-lg bg-transparent text-gray-600 placeholder-gray-600 focus:outline-none w-full"
                />
            </form>
        </div>
    );
}
