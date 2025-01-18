"use client";

import { Search, X } from "lucide-react";
import React, { useState } from "react";

interface SearchInputProps {
	placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
	placeholder = "Search",
}) => {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchQuery(value);
	};

	const clearSearch = () => {
		setSearchQuery("");
	};

	return (
		<div className="relative flex items-center w-full">
			{/* Search Icon */}
			<Search className="absolute left-4 text-gray-400" aria-label="Search" />

			{/* Input Field */}
			<input
				type="text"
				className="pl-12 pr-10 py-3 focus:outline-none bg-s4 focus:bg-white shadow-sm rounded-full w-full"
				placeholder={placeholder}
				value={searchQuery}
				onChange={handleSearch}
			/>

			{/* Clear Button */}
			{searchQuery && (
				<X className="absolute right-2 text-gray-400"
					aria-label="Clear search"
					onClick={clearSearch} />
			)}
		</div>
	);
};

export default SearchInput;
