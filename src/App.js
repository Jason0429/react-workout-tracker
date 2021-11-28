import React from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

/*
Add button (bottom right)
    - Add workout for current month/day/year

List of Workout Templates
    - Exercise
    - Weight
    - Reps (repeated # rows (sets))

Calendar 
    - linked to database based on month/day/year

Search for specific date
    - View workout(s) on that date
*/

function App() {
	const user = null;

	const Main = styled.div`
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	`;

	return (
		<>
			{!user ? (
				<>
					<Main>
						<Login />
					</Main>
					<Navbar />
				</>
			) : (
				<>
					<Main>Hello</Main>
					<Navbar />
				</>
			)}
		</>
	);
}

export default App;
