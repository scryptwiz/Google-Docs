import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TemplateStore = {
	hideTemplates: boolean;
	toggleTemplates: () => void;
};

export const useTemplateStore = create<TemplateStore>()(
	persist(
		(set) => ({
			hideTemplates: false,
			toggleTemplates: () => set((state) => ({ hideTemplates: !state.hideTemplates })),
		}),
		{
			name: "template-visibility",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
