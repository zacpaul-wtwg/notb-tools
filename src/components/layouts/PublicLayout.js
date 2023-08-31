// File: src/components/Layout.js

import Navigation from "@ui/Navigation"
import { Container } from "@mui/material"

function Layout({ children }) {
	return (
		<div>
			<Navigation />
			<Container maxWidth="lg">
				<main>{children}</main>
			</Container>
			<footer>{/* Your footer content */}</footer>
		</div>
	)
}

export default Layout
