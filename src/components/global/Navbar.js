// React
import { useState } from "react";
import { NavLink } from "react-router-dom";

// Material
import {
	Avatar,
	Menu,
	MenuItem,
	ListItemIcon,
	IconButton
} from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import BoyIcon from "@mui/icons-material/Boy";
import AddIcon from "@mui/icons-material/Add";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

// Styles
import { Nav, Logo } from "./Navbar.styles";

function Navbar({ user, handleLogout }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const openMenu = Boolean(anchorEl);

	function handleOpen(e) {
		setAnchorEl(e.target);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	return (
		<Nav>
			<Logo>{user ? user.name : "Workout Tracker"}</Logo>
			<IconButton
				onClick={handleOpen}
				size='small'
				sx={{ ml: 2 }}
				className='mui-fixed'
			>
				<Avatar
					sx={{ width: 35, height: 35 }}
					src={user.imageUrl || null}
				/>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={openMenu}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem component={NavLink} to='/'>
					<ListItemIcon>
						<HomeIcon fontSize='small' />
					</ListItemIcon>
					Home
				</MenuItem>
				<MenuItem component={NavLink} to='/template'>
					<ListItemIcon>
						<AddIcon fontSize='small' />
					</ListItemIcon>
					Create Template
				</MenuItem>
				<MenuItem component={NavLink} to='/progress'>
					<ListItemIcon>
						<SignalCellularAltIcon fontSize='small' />
					</ListItemIcon>
					View Progress
				</MenuItem>
				<MenuItem component={NavLink} to='/start'>
					<ListItemIcon>
						<FitnessCenterIcon fontSize='small' />
					</ListItemIcon>
					Log Workout
				</MenuItem>
				<MenuItem component={NavLink} to='/exercises'>
					<ListItemIcon>
						<BoyIcon fontSize='small' />
					</ListItemIcon>
					My Exercises
				</MenuItem>
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<LogoutOutlined fontSize='small' />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</Nav>
	);
}

export default Navbar;
