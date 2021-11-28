import styled from "styled-components";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
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

	const CircularShadowEffect = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
		height: 30px;
		width: 30px;
		box-shadow: 0 0 15px 3px #00000020;
		border-radius: 100%;
		background: #fefefe;
	`;

	return (
		<Nav>
			<CalendarTodayIcon />
			<CircularShadowEffect>
				<AddIcon />
			</CircularShadowEffect>
			<FitnessCenterIcon />
		</Nav>
	);
}

export default Navbar;
