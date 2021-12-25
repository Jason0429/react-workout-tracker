import styled, { makeStyl } from "styled-components";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { signInWithGoogle, signOutOfGoogle } from "../actions";

function Navbar() {
	// const logged = useSelector((state) => state.logged);
	// const dispatch = useDispatch();

	const Logo = styled.div`
		font-size: 20px;
	`;

	const Nav = styled.div`
		position: fixed;
		top: 0;
		left: 0;
		height: 50px;
		width: 100%;
		background: #fefefe;
		padding: 0 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 0 15px 3px #00000020;
	`;

	return (
		<Nav>
			<Logo>Workout Tracker</Logo>

			{/* Add sign out drop down menu option */}
			<Avatar
				alt='profile'
				src={null}
				style={{ height: "35px", width: "35px", cursor: "pointer" }}
			/>

			{/* <NavLink
				to='/calendar'
				style={({ isActive }) =>
					isActive ? activeStyle : nonActiveStyle
				}
			>
				<CalendarTodayIcon style={iconStyle} />
			</NavLink>
			<NavLink
				to='/add'
				style={({ isActive }) =>
					isActive ? activeStyle : nonActiveStyle
				}
			>
				<AddIcon style={iconStyle} />
			</NavLink>
			<NavLink
				to='/template'
				style={({ isActive }) =>
					isActive ? activeStyle : nonActiveStyle
				}
			>
				<FitnessCenterIcon style={iconStyle} />
			</NavLink> */}
		</Nav>
	);
}

export default Navbar;
