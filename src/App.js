// React
import { useState, useEffect } from "react";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Styles
import { Main } from "./styled";

// Components
import Navbar from "./components/Navbar";

// Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import StartPage from "./pages/StartPage";
import ProgressPage from "./pages/ProgressPage";
import TemplatePage from "./pages/TemplatePage";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
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
				<Navbar />
				{user ? (
					<>
						<Routes>
							<Route
								path='/template'
								exact
								element={
									<>
										<TemplatePage />
									</>
								}
							/>
							<Route
								path='/progress'
								exact
								element={
									<>
										<ProgressPage />
									</>
								}
							/>
							<Route
								path='/start'
								exact
								element={
									<>
										<StartPage />
									</>
								}
							/>
							<Route
								path='/'
								element={
									<>
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
};

export default App;
