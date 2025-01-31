type Template = {
	id: string;
	label: string;
	imageUrl: string;
	desc?: string;
};

export const templates: Template[] = [
	{ id: "blank", label: "Blank Document", imageUrl: "/docs-blank-googlecolors.png" },
	{ id: "resume-1", label: "Resume", imageUrl: "/resume-1.png", desc: "Coral" },
	{ id: "report", label: "Report", imageUrl: "/report.png", desc: "Playful" },
	{ id: "resume", label: "Resume", imageUrl: "/resume.png", desc: "Serif" },
	{ id: "Letter", label: "Letter", imageUrl: "letter.png", desc: "Speramint" },
	{ id: "project-proposal", label: "Project proposal", imageUrl: "/project.png", desc: "Tropic" },
	{ id: "brochure", label: "Brochure", imageUrl: "/brochure.png", desc: "Geometric" },
];