// React
import { useState, useEffect } from "react";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Styles
import { Main } from "./components/Home/App.styles";

// Hooks
import { useLocalStorage } from "./hooks/hooks";

// Components
import Navbar from "./components/global/Navbar";

// Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import StartPage from "./pages/StartPage";
import ProgressPage from "./pages/ProgressPage";
import TemplatePage from "./pages/TemplatePage";
// import ErrorPage from "./pages/ErrorPage";
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
	// const [loading, setLoading] = useState(true);
	// const [wasLoggedOut, setWasLoggedOut] = useLocalStorage(
	// 	"wasLoggedOut",
	// 	true
	// );
	const [user, setUser] = useState(null);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	/**
	 * Every time user state is modified,
	 * update user document in firestore.
	 */
	useEffect(() => {
		async function updateUser() {
			if (user) {
				await setUserInDB(user.googleId, user);
			}
		}

		updateUser();
	}, [user]);

	/**
	 * Check localStorage to see if user was logged out
	 * If logged out, setLoading(false)
	 * to reveal login screen
	 */
	// useEffect(() => {
	// 	/**
	// 	 * If user was logged out, disable loading
	// 	 * to reveal login screen.
	// 	 * If user was not logged out, check if user has been
	// 	 * loaded in after 2 seconds.
	// 	 */
	// 	if (wasLoggedOut) {
	// 		setLoading(false);
	// 	} else {
	// 		setTimeout(() => {
	// 			if (!user) {
	// 				// setUser(null);
	// 				setLoading(false);
	// 			}
	// 		}, 2000);
	// 	}
	// }, []);

	/**
	 * Gets the user object from firestore.
	 * @param {String} googleId the user's googleId.
	 * @returns the desired user.
	 */
	async function getUserInDB(googleId) {
		return (await getDoc(doc(db, "users", googleId))).data();
	}

	/**
	 * Checks if user exists in database.
	 * @param {*} googleId the user's googleId.
	 * @returns {Boolean} true or false.
	 */
	async function isUserInDB(googleId) {
		return Boolean(await getUserInDB(googleId));
	}

	/**
	 * Sets user in firestore to new user object.
	 * @param {String} googleId the user's googleId.
	 * @param {User} user the user.
	 * @returns the user.
	 */
	async function setUserInDB(googleId, user) {
		await setDoc(doc(db, "users", googleId), user);
		return user;
	}

	/**
	 * Handles successful login.
	 * @param {Response} res the response.
	 */
	async function onLoginSuccess(res) {
		console.log("Successful Login");
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

		// setLoading(false);
		// setWasLoggedOut(false);
	}

	/**
	 * Handles failed login.
	 * @param {Response} res the response.
	 */
	function onLoginFailure(res) {
		console.log("Failure: ", res);
		setUser(null);
		// setLoading(false);
		// setWasLoggedOut(true);
	}

	/**
	 * Handles successful logout.
	 */
	function onLogoutSuccess() {
		console.log("Logout successful");
		setUser(null);
		// setWasLoggedOut(true);
	}

	/**
	 * Handles failed logout.
	 * @param {Response} res the response.
	 */
	function onLogoutFailure(res) {
		console.log("Logout failed: ", res);
		setUser(null);
		// setWasLoggedOut(true);
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
		isSignedIn: true
		// cookiePolicy: "single_host_origin"
	});

	/**
	 * Handles google login.
	 */
	function handleLogin() {
		signIn();
	}

	/**
	 * Handles google logout.
	 */
	function handleLogout() {
		signOut();
	}

	/**
	 * Handles adding exercise to user's list of exercise.
	 * @param {Exercise} exercise the exercise to be added.
	 */
	function handleAddExercise(exercise) {
		setUser((user) => ({
			...user,
			exercises: [...user["exercises"], exercise]
		}));
	}

	/**
	 * Handles deleting exercise from user's list of exercises.
	 * @param {String} exerciseId the id of exercise to be deleted.
	 */
	function handleDeleteExercise(exerciseId) {
		setUser((user) => ({
			...user,
			exercises: user["exercises"].filter((e) => e.id !== exerciseId)
		}));
	}

	/**
	 * Handles updating an exercise in the user's list of exercises.
	 * @param {Exercise} exercise the exercise that updates previous exercise.
	 */
	function handleUpdateExercise(exercise) {
		setUser((user) => ({
			...user,
			exercises: user["exercises"].map((e) =>
				e.id === exercise.id ? exercise : e
			)
		}));
	}

	/**
	 * Handles adding a new template to user's list of templates.
	 * @param {Template} template the template to be added.
	 */
	function handleAddTemplate(template) {
		setUser((user) => ({
			...user,
			templates: [...user.templates, template]
		}));
	}

	/**
	 * Handles deleting template from user's list of templates.
	 * @param {String} templateId the id of template to be deleted.
	 */
	function handleDeleteTemplate(templateId) {
		setUser((user) => ({
			...user,
			templates: user["templates"].filter((t) => t.id !== templateId)
		}));
	}

	/**
	 * Handles updating template in user's list of templates.
	 * (Checks for same template id)
	 * @param {Template} template the template to replace old template.
	 */
	function handleUpdateTemplate(template) {
		setUser((user) => ({
			...user,
			templates: user["templates"].map((t) =>
				t.id === template.id ? template : t
			)
		}));
	}

	/**
	 * Handles updating workout in user's list of workouts.
	 * @param {Workout} workout the workout to replace old workout.
	 */
	function handleUpdateWorkout(workout) {
		setUser((user) => ({
			...user,
			workouts: user["workouts"].map((w) =>
				w.id === workout.id ? workout : w
			)
		}));
	}

	/**
	 * Handles adding new workout to user's list of workouts.
	 * @param {Workout} workout the new workout to be added.
	 */
	function handleAddWorkout(workout) {
		setUser((user) => ({
			...user,
			workouts: [...user["workouts"], workout]
		}));
	}

	/**
	 * Handles deleting workout from user's list of workouts.
	 * @param {String} workoutId the id of workout to be deleted.
	 */
	function handleDeleteWorkout(workoutId) {
		setUser((user) => ({
			...user,
			workouts: user["workouts"].filter((w) => w.id !== workoutId)
		}));
	}

	/**
	 * Handles opening snackbar with a message.
	 * @param {String} message the message to be displayed.
	 */
	function handleOpenSnackbar(message) {
		setSnackbarMessage(message);
		setOpenSnackbar(true);
	}

	/**
	 * Handles closing snackbar.
	 */
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
											handleAddExercise={
												handleAddExercise
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
											handleAddExercise={
												handleAddExercise
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
											handleAddExercise={
												handleAddExercise
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
										<MyExercisesPage
											user={user}
											handleUpdateExercise={
												handleUpdateExercise
											}
											handleDeleteExercise={
												handleDeleteExercise
											}
											handleAddExercise={
												handleAddExercise
											}
											handleOpenSnackbar={
												handleOpenSnackbar
											}
										/>
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
