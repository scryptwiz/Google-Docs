"use client"

import { DocList } from "@/components/common/doc-list";
import MainNav from "@/components/common/main-nav";
import { TemplateGallery } from "@/components/common/template-gallery";
import { FullPageLoader } from "@/components/Loader/fullPage-loader";
import { api } from "../../../convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { useSearchStore } from "@/hooks/useSearchStore";

const DocsPage = () => {
	const { searchQuery } = useSearchStore();

	const { results, status, loadMore } = usePaginatedQuery(
		api.documents.getDocuments,
		{ search: searchQuery },
		{ initialNumItems: 10 }
	);

	if (results === undefined) {
		return <FullPageLoader label="Documents Loading..." />;
	}

	return (
		<div className="min-h-dvh">
			<div className="fixed inset-0 bg-white h-fit">
				<MainNav />
			</div>
			<div>
				<div className="md:h-20 h-32" />
				<TemplateGallery />
				<DocList
					documents={results}
					loadMore={loadMore}
					status={status}
				/>
			</div>
		</div>
	)
}

export default DocsPage;