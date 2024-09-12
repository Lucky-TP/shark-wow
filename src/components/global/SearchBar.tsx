import { FaSearch } from "react-icons/fa";
import React from "react";

export default function SearchBar() {
    return (
        <div className="flex items-center  rounded-3xl px-4 py-3 shadow-lg hover:border-orange-400 border-orange-300 border-2 duration-700 transition-colors">
            <form action="" className="flex items-center justify-center w-full">
                <FaSearch className="text-orange-500 text-xl ml-2 mr-5" />
                <input
                    type="text"
                    placeholder="Explore projects"
                    className="text-lg bg-transparent text-orange-500 placeholder-orange-300 focus:outline-none w-full"
                />
            </form>
        </div>
    );
}
