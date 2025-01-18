import React from 'react';

type Props = {};

const DocMenuBar = (props: Props) => {
	const menus = [
		{ id: 'docs-file-menu', label: 'File' },
		{ id: 'docs-edit-menu', label: 'Edit' },
		{ id: 'docs-view-menu', label: 'View' },
		{ id: 'docs-insert-menu', label: 'Insert' },
		{ id: 'docs-format-menu', label: 'Format' },
		{ id: 'docs-tools-menu', label: 'Tools' },
		{ id: 'docs-extensions-menu', label: 'Extensions' },
		{ id: 'docs-help-menu', label: 'Help' },
	];

	return (
		<div
			id="docs-menubar"
			role="menubar"
			className="flex"
		>
			{menus.map((menu) => (
				<div
					key={menu.id}
					id={menu.id}
					role="menuitem"
					tabIndex={0}
					aria-haspopup="true"
					className="text-sm menu-button text-gray-800 px-2 py-1 rounded hover:bg-s1/15 focus:outline-none focus:bg-s1/20 cursor-pointer"
				>
					{menu.label}
				</div>
			))}
		</div>
	);
};

export default DocMenuBar;
