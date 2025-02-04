import Image from "next/image";
import Link from "next/link"

import { DOCS_IMAGE } from "@/lib/constants";
import SearchInput from "./search-input";
import { OrganizationUserButton } from "./organization-user-button";

const MainNav = () => {
	return (
		<nav className="px-5 py-4">
			<div className="grid w-full grid-cols-[auto,auto] items-center gap-3 md:grid-cols-[1fr,auto,1fr]">
				{/* Logo */}
				<Link href="/docs" className="flex items-center gap-1">
					<Image src={DOCS_IMAGE} width={42} height={42} alt="Docs Logo" />
					<h1 className="text-xl font-normal">Docs</h1>
				</Link>

				{/* Search Input */}
				<div className="col-span-full max-w-full md:max-w-[720px] xl:min-w-[720px] md:min-w-[480px] w-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1">
					<SearchInput placeholder="Search" />
				</div>

				{/* User Button */}
				<div className="justify-self-end flex items-center">
					<OrganizationUserButton />
				</div>
			</div>
		</nav>
	)
}

export default MainNav;