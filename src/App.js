// React
import { useState, useEffect } from "react";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Styled Components
import { Main } from "./styled";

// Other components
import Navbar from "./components/Navbar";

// Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import StartPage from "./pages/StartPage";
import ProgressPage from "./pages/ProgressPage";
import TemplatePage from "./pages/TemplatePage";
import ErrorPage from "./pages/ErrorPage";

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
	const [user, setUser] = useState(true);

	useEffect(() => {
		window.scrollTo(0, 0);

		/*
        db.collection("connectionName").onSnapshot(snapshot => {

        });

        db.collection("connectionName").add({

        });
        */
	}, []);

	return (
		<Router>
			<Main>
				{user ? (
					<>
						<Routes>
							<Route
								path='/template'
								exact
								element={
									<>
										<Navbar />
										<TemplatePage />
									</>
								}
							/>
							<Route
								path='/progress'
								exact
								element={
									<>
										<Navbar />
										<ProgressPage />
									</>
								}
							/>
							<Route
								path='/start'
								exact
								element={
									<>
										<Navbar />
										<StartPage />
									</>
								}
							/>
							<Route
								path='/'
								element={
									<>
										<Navbar />
										<HomePage />
									</>
								}
							/>
							<Route path='*' element={<ErrorPage />} />
						</Routes>
					</>
				) : (
					<LoginPage />
				)}
			</Main>
		</Router>
	);
}

export default App;
