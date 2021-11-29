import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import LoginScreen from "./screens/LoginScreen";
import CalendarScreen from "./screens/CalendarScreen";
import AddScreen from "./screens/AddScreen";
import TemplateScreen from "./screens/TemplateScreen";

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
		<Router>
			<Main>
				<Routes>
					<Route exact path='/' element={<LoginScreen />} />
					<Route
						exact
						path='/calendar'
						element={<CalendarScreen />}
					/>
					<Route exact path='/add' element={<AddScreen />} />
					<Route
						exact
						path='/template'
						element={<TemplateScreen />}
					/>
				</Routes>
			</Main>
			<Navbar />
		</Router>
	);
}

export default App;
