import styled, { makeStyl } from "styled-components";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { signInWithGoogle, signOutOfGoogle } from "../actions";

function Navbar() {
	// const logged = useSelector((state) => state.logged);
	// const dispatch = useDispatch();

	const Nav = styled.div`
		position: fixed;
		bottom: 0;
		left: 0;
		height: 50px;
		width: 100%;
		background: #fefefe;
		padding: 0 10px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-shadow: 0 0 15px 3px #00000020;
	`;

	const nonActiveStyle = {
		textDecoration: "none",
		color: "inherit",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "40px",
		width: "40px",
		borderRadius: "100%"
	};

	const activeStyle = {
		textDecoration: "none",
		color: "inherit",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "40px",
		width: "40px",
		borderRadius: "100%",
		boxShadow: "0 0 15px 3px #00000020"
	};

	const iconStyle = {
		height: "20px",
		width: "20px"
	};

	return (
		<Nav>
			<NavLink
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
			</NavLink>
		</Nav>
	);
}

export default Navbar;
