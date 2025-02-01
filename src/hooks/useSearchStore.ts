import { create } from "zustand";

type SearchStateProps = {
	searchQuery: string;
	setSearchQuery: (search: string) => void;
};

const useSearchStore = create<SearchStateProps>((set) => ({
	searchQuery: "",
	setSearchQuery: (searchQuery) => set({ searchQuery }),
}));

export { useSearchStore };