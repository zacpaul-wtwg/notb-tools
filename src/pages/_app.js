import "@aws-amplify/ui-react/styles.css"
import { Amplify } from "aws-amplify"
import awsExports from "../aws-exports"
import "../styles/globals.css"
import PublicLayout from "../components/layouts/PublicLayout"
import MemberLayout from "../components/layouts/MemberLayout"

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
		<PublicLayout>
			<InnerComponent {...pageProps} />
		</PublicLayout>
	)
}

export default MyApp
