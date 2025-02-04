type Template = {
	id: string;
	label: string;
	imageUrl: string;
	desc?: string;
	initialContent: string;
};

export const templates: Template[] = [
	{
		id: "blank",
		label: "Blank Document",
		imageUrl: "/docs-blank-googlecolors.png",
		initialContent: "",
	},
	{
		id: "resume-1",
		label: "Resume",
		imageUrl: "/resume-1.png",
		desc: "Coral",
		initialContent: `
			<h1>Your Name</h1>
			<p>Email: your.email@example.com | Phone: (123) 456-7890 | Location: Your City, ST</p>
			<h2>Professional Summary</h2>
			<p>Highly motivated professional with experience in...</p>
			<h2>Work Experience</h2>
			<h3>Job Title - Company Name</h3>
			<p>Dates of Employment</p>
			<ul>
				<li>Responsibility 1</li>
				<li>Responsibility 2</li>
				<li>Responsibility 3</li>
			</ul>
			<h2>Education</h2>
			<h3>Degree - University Name</h3>
			<p>Year of Graduation</p>
		`,
	},
	{
		id: "report",
		label: "Report",
		imageUrl: "/report.png",
		desc: "Playful",
		initialContent: `
			<h1 style="color: #ff4500;">Science Report</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
			<p><strong>Your Name</strong><br>09/04/20XX</p>
		`,
	},
	{
		id: "resume",
		label: "Resume",
		imageUrl: "/resume.png",
		desc: "Serif",
		initialContent: `
			<h1>Your Name</h1>
			<h2>Contact Information</h2>
			<p>Email: your.email@example.com | Phone: (123) 456-7890</p>
			<h2>Objective</h2>
			<p>Seeking a position in...</p>
			<h2>Experience</h2>
			<h3>Job Title - Company</h3>
			<p>Dates</p>
			<ul>
				<li>Key achievement or responsibility</li>
				<li>Key achievement or responsibility</li>
			</ul>
			<h2>Education</h2>
			<h3>Degree - University</h3>
			<p>Year</p>
			<h2>Skills</h2>
			<ul>
				<li>Skill 1</li>
				<li>Skill 2</li>
				<li>Skill 3</li>
			</ul>
		`,
	},
	{
		id: "Letter",
		label: "Letter",
		imageUrl: "letter.png",
		desc: "Speramint",
		initialContent: `
			<p><strong>Your Name</strong><br>123 Your Street<br>Your City, ST 12345<br>(123) 456-7890<br>you@example.com</p>
			<p>4th September 20XX</p>
			<p><strong>Ronny Reader</strong><br>CEO, Company Name<br>123 Address St<br>AnyTown, ST 12345</p>
			<p>Dear Ms. Reader,</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
			<p>Sincerely,</p>
			<p><strong>Your Name</strong></p>
		`,
	},
	{
		id: "project-proposal",
		label: "Project proposal",
		imageUrl: "/project.png",
		desc: "Tropic",
		initialContent: `
			<h1>Project Name</h1>
			<p>09.04.20XX</p>
			<p><strong>Your Name</strong><br>Your Company<br>123 Your Street<br>Your City, ST 12345</p>
		`,
	},
	{
		id: "brochure",
		label: "Brochure",
		imageUrl: "/brochure.png",
		desc: "Geometric",
		initialContent: `
			<h1 style="color: #1f3c88;">Your Company</h1>
			<p>123 Your Street<br>Your City, ST 12345<br>(123) 456 - 7890</p>
			<h2 style="color: #1f3c88;">Product Brochure</h2>
			<p style="color: red;">September 04 20XX</p>
			<h3>Product Overview</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
			<h3>Dolor Sit</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
		`,
	},
];