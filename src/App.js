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
import EditTemplatePage from "./pages/EditTemplatePage";
import EditWorkoutPage from "./pages/EditWorkoutPage";
import MyExercisesPage from "./pages/MyExercisesPage";

// Material UI
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Models
import { User } from "./models/User.model";

// Utils
// import { refreshTokenSetup } from "./utils/refreshToken";
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
	addDoc,
	query,
	getDocs,
	deleteDoc
} from "firebase/firestore";

function App() {
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
	const [user, setUser] = useState(null);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	useEffect(async () => {
		if (user) {
			await updateUserInDB();
		}
	}, [user]);

	useEffect(() => console.log(user));

	/**
	 * Updates user in database with current state of user.
	 * @returns user
	 */
	async function updateUserInDB() {
		await setDoc(doc(db, "users", user.googleId), user);
		return user;
	}

	/**
	 * Checks if user exists in database.
	 * @param {*} googleId the user's googleId.
	 * @returns {Boolean} true or false.
	 */
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
			// If user exists in db
			const userInDB = await getUserInDB(profile.googleId);
			setUser(userInDB);
		}
	}

	function onLoginFailure(res) {
		console.log("Failure: ", res);
		setUser(null);
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
		// addDoc(collection(db, `users/${user.googleId}/templates`), template);
		setUser((user) => ({
			...user,
			templates: [...user.templates, template]
		}));
	}

	function handleDeleteTemplate(templateIdx) {
		setUser((user) => ({
			...user,
			templates: user["templates"].filter((_, idx) => idx !== templateIdx)
		}));
	}

	function handleUpdateTemplate(template) {
		setUser((user) => ({
			...user,
			templates: user["templates"].map((t) =>
				t.id === template.id ? template : t
			)
		}));
	}

	function handleUpdateWorkout(workout) {
		setUser((user) => ({
			...user,
			workouts: user["workouts"].map((w) =>
				w.id === workout.id ? workout : w
			)
		}));
	}

	function handleAddWorkout(workout) {
		setUser((user) => ({
			...user,
			workouts: [...user["workouts"], workout]
		}));
	}

	function handleDeleteWorkout(workout) {
		setUser((user) => ({
			...user,
			workouts: user["workouts"].filter((w) => w.id !== workout.id)
		}));
	}

	/**
	 * Adds custom exercise to user's list of exercises.
	 * @param {Exercise} customExercise custom exercise made by user.
	 */
	function handleAddCustomExercise(customExercise) {
		if (user.exercises.some((e) => e.name === customExercise.name)) return;
		setUser((user) => ({
			...user,
			exercises: [...user["exercises"], customExercise]
		}));
	}

	function handleOpenSnackbar(message) {
		setSnackbarMessage(message);
		setOpenSnackbar(true);
	}

	function handleCloseSnackbar() {
		setOpenSnackbar(false);
	}

	// if (loading) return <LoadingPage />;

	return (
		<Router>
			<Main>
				{user && <Navbar user={user} handleLogout={handleLogout} />}
				{user && (
					<Snackbar
						open={openSnackbar}
						autoHideDuration={3000}
						onClose={handleCloseSnackbar}
						message={snackbarMessage}
						action={
							<IconButton
								size='small'
								aria-label='close'
								color='inherit'
								onClick={handleCloseSnackbar}
							>
								<CloseIcon fontSize='small' />
							</IconButton>
						}
					/>
				)}
				{user ? (
					<>
						<Routes>
							<Route
								path='/template'
								exact
								element={
									<>
										<TemplatePage
											user={user}
											handleAddTemplate={
												handleAddTemplate
											}
											handleOpenSnackbar={
												handleOpenSnackbar
											}
											handleAddCustomExercise={
												handleAddCustomExercise
											}
										/>
									</>
								}
							/>
							<Route
								path='/template/edit/:id'
								exact
								element={
									<>
										<EditTemplatePage
											user={user}
											handleUpdateTemplate={
												handleUpdateTemplate
											}
											handleOpenSnackbar={
												handleOpenSnackbar
											}
											handleAddCustomExercise={
												handleAddCustomExercise
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
										<ProgressPage
											user={user}
											handleDeleteWorkout={
												handleDeleteWorkout
											}
											handleOpenSnackbar={
												handleOpenSnackbar
											}
										/>
									</>
								}
							/>
							<Route
								path='/start'
								exact
								element={
									<>
										<StartPage
											user={user}
											handleDeleteTemplate={
												handleDeleteTemplate
											}
										/>
									</>
								}
							/>
							<Route
								path='/start/:id'
								exact
								element={
									<>
										<EditWorkoutPage
											user={user}
											handleAddWorkout={handleAddWorkout}
											handleUpdateWorkout={
												handleUpdateWorkout
											}
											handleOpenSnackbar={
												handleOpenSnackbar
											}
											handleAddCustomExercise={
												handleAddCustomExercise
											}
										/>
									</>
								}
							/>
							<Route
								path='/exercises'
								exact
								element={
									<>
										<MyExercisesPage user={user} />
									</>
								}
							/>
							<Route
								path='/*'
								// exact
								element={
									<>
										<HomePage user={user} />
									</>
								}
							/>
							{/* <Route path='*' element={<ErrorPage />} /> */}
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
