// React
import { useState, useEffect } from "react";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Styles
import { Main } from "./components/Home/App.styles";

// Components
import Navbar from "./components/global/Navbar";

// Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import StartPage from "./pages/StartPage";
import ProgressPage from "./pages/ProgressPage";
import TemplatePage from "./pages/TemplatePage";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";

// Models
import { User } from "./models/User.model";

// Utils
import { refreshTokenSetup } from "./utils/refreshToken";
import "./hooks/hooks";
import { useGoogleLogout, useGoogleLogin } from "react-google-login";

// Firebase
import { db } from "./firebase";
import {
	onSnapshot,
	collection,
	doc,
	setDoc,
	getDoc,
	addDoc
} from "firebase/firestore";

function App() {
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// useEffect(
	// 	() => console.log(db.type),
	// 	// Target an entire collection
	// 	// onSnapshot(collection(db, "collectionName"), (snapshot) => {
	// 	// 	console.log(snapshot.docs.map((doc) => doc.data()));
	// 	// });
	// 	// Target specific documents
	// 	// onSnapshot(doc("color", "docID"), (doc) => {
	// 	//     console.log(doc.data());
	// 	// });
	// 	[]
	// );
	useEffect(async () => {
		if (user) {
			console.log(await updateUserInDB());
		}
	}, [user]);

	useEffect(() => {
		if (!localStorage.getItem("lastUserId")) {
			setLoading(false);
		}
	}, []);

	async function updateUserInDB() {
		await setDoc(doc(db, "users", user.googleId), user);
		return user;
	}

	async function isUserInDB(googleId) {
		return Boolean((await getDoc(doc(db, "users", googleId))).data());
	}

	async function setUserInDB(googleId, user) {
		await setDoc(doc(db, "users", googleId), user);
		return user;
	}

	async function getUserInDB(googleId) {
		return (await getDoc(doc(db, "users", googleId))).data();
	}

	async function onLoginSuccess(res) {
		console.log("Success: ", res.profileObj);
		const profile = res.profileObj;

		// If user does not exist in db
		if (!(await isUserInDB(profile.googleId))) {
			const newUser = User(profile);
			await setUserInDB(newUser.googleId, newUser);
			setUser(newUser);
		} else {
			const userInDB = await getUserInDB(profile.googleId);
			setUser(userInDB);
		}

		setLoading(false);

		localStorage.setItem("lastUserId", profile.googleId);
		// refreshTokenSetup(res);
	}

	function onLoginFailure(res) {
		console.log("Failure: ", res);
		setUser(null);

		setLoading(false);
	}

	function onLogoutSuccess() {
		console.log("Logout successful");
		setUser(null);
	}

	function onLogoutFailure(res) {
		console.log("Logout failed: ", res);
	}

	const { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess,
		onFailure: onLogoutFailure
	});

	const { signIn } = useGoogleLogin({
		clientId,
		onSuccess: onLoginSuccess,
		onFailure: onLoginFailure,
		isSignedIn: true,
		cookiePolicy: "single_host_origin"
		// accessType: "offline"
	});

	function handleLogin() {
		signIn();
	}

	function handleLogout() {
		signOut();
	}

	function handleAddTemplate(template) {
		setUser((user) => ({
			...user,
			templates: [...user.templates, template]
		}));
	}

	if (loading) return <LoadingPage />;

	return (
		<Router>
			<Main>
				{user && <Navbar user={user} handleLogout={handleLogout} />}
				{user ? (
					<>
						<Routes>
							<Route
								path='/template'
								exact
								element={
									<>
										<TemplatePage
											handleAddTemplate={
												handleAddTemplate
											}
										/>
									</>
								}
							/>
							<Route
								path='/progress'
								exact
								element={
									<>
										<ProgressPage user={user} />
									</>
								}
							/>
							<Route
								path='/start'
								exact
								element={
									<>
										<StartPage user={user} />
									</>
								}
							/>
							<Route
								path='/'
								exact
								element={
									<>
										<HomePage user={user} />
									</>
								}
							/>
							<Route path='*' element={<ErrorPage />} />
						</Routes>
					</>
				) : (
					<LoginPage handleLogin={handleLogin} />
				)}
			</Main>
		</Router>
	);
}

export default App;
