"use client"

import MainNav from "@/components/common/main-nav";
import { TemplateGallery } from "@/components/common/template-gallery";

const DocsPage = () => {

	return (
		<div className="min-h-dvh">
			<div className="fixed inset-0 bg-white h-fit">
				<MainNav />
			</div>
			<div>
				<div className="md:h-20 h-32" />
				<TemplateGallery />
			</div>
		</div>
	)
}

export default DocsPage;