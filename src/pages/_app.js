// File: src/pages/_app.js

import { ThemeProvider, createTheme } from "@mui/material/styles"
import "@aws-amplify/ui-react/styles.css"
import { Amplify } from "aws-amplify"
import awsExports from "../aws-exports"
import "../styles/globals.css"
import PublicLayout from "../components/layouts/PublicLayout"
import MemberLayout from "../components/layouts/MemberLayout"

// Create a theme instance.
const theme = createTheme()

Amplify.configure({ ...awsExports, ssr: true })

function MyApp({ Component, pageProps, router }) {
	const isMemberRoute = router.pathname.startsWith("/member")
	let InnerComponent

	if (isMemberRoute) {
		InnerComponent = function InnerComponentWithMemberLayout() {
			return (
				<MemberLayout>
					<Component {...pageProps} />
				</MemberLayout>
			)
		}
	} else {
		InnerComponent = Component
	}

	return (
		<ThemeProvider theme={theme}>
			<PublicLayout>
				<InnerComponent {...pageProps} />
			</PublicLayout>
		</ThemeProvider>
	)
}

export default MyApp
