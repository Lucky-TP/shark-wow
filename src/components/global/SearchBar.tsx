"use client"
import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import { searchProject } from "src/services/apiService/projects/searchProject";


export default function SearchBar({ onSearch }: { onSearch: (searchResult: any) => void }) {
    const [searchText, setSearchText] = useState("");

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await searchProject(searchText);
            onSearch(result.data);
        } catch (error) {
            console.error("Search failed", error);
        }
    };

    return (
        <div className="flex items-center rounded-3xl px-4 py-3 shadow-lg hover:border-orange-400 border-orange-300 border-2 duration-700 transition-colors backdrop-blur-sm">
            <form onSubmit={handleSearchSubmit} className="flex items-center justify-center w-full">
                <FaSearch className="text-orange-500 text-xl ml-2 mr-5" />
                <input
                    type="text"
                    placeholder="Explore projects"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="text-lg bg-transparent text-orange-500 placeholder-orange-300 focus:outline-none w-full"
                />
            </form>
        </div>
    );
}
