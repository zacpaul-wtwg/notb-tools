import Link from "next/link" // Import the Link component

import { useState } from "react"
import {
	AppBar,
	Toolbar,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemText,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

function Navigation() {
	const [drawerOpen, setDrawerOpen] = useState(false)

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return
		}
		setDrawerOpen(open)
	}

	const menuItems = [
		{ text: "Price Card", route: "/member/pricecard" },
		{ text: "Attributes Generation", route: "/member/attributes" },
		{ text: "HighRoller Finder", route: "/member/hirofinder" },
		{ text: "Inventory Worksheet", route: "/member/inventoryworksheet" },
		{ text: "Find Pictures Required", route: "/member/picturefinder" },
	]

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<h1>NOTB Fireworks Tools</h1>
				</Toolbar>
			</AppBar>

			<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
				<List>
					{menuItems.map((item, index) => (
						<Link href={item.route} key={item.text} passHref>
							<ListItem ButtonBase onClick={toggleDrawer(false)}>
								<ListItemText primary={item.text} />
							</ListItem>
						</Link>
					))}
				</List>
			</Drawer>
		</>
	)
}

export default Navigation
