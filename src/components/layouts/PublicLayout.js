// File: src/components/layouts/PublicLayout.js

function PublicLayout({ children }) {
	return (
		<div>
			<header>Public Header</header>
			<div className="w-[960px] mx-auto px-4 bg-red-500">
				<main>{children}</main>
			</div>
			<footer>Public Footer</footer>
		</div>
	)
}

export default PublicLayout
