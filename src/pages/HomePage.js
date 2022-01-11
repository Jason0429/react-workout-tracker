import styled from "styled-components";
import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

function HomePage({ user }) {
	const Container = styled.div`
		margin-top: 50px;
		padding: 20px;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	`;

	const MyNavLink = styled(NavLink)`
		background: #eeeeee;
		border-radius: 20px;
		padding: 10px;
		width: 200px;
		text-align: center;
		text-decoration: none;
		color: black;
		/* transition: background 0.1s ease-in-out; */

		&:hover {
			background: #dedede;
		}
	`;

	return (
		// <Container>
		<Stack
			direction='column'
			spacing={3}
			justifyContent='center'
			alignItems='center'
			height='100vh'
		>
			<MyNavLink to='/template'>Create Template</MyNavLink>
			<MyNavLink to='/progress'>View Progress</MyNavLink>
			<MyNavLink to='/exercises'>My Exercises</MyNavLink>
			<MyNavLink to='/start'>Start Workout</MyNavLink>
		</Stack>
		// </Container>
	);
}

export default HomePage;
