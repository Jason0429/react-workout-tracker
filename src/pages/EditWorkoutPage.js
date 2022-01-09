// React
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

// Material
import { TextField, Stack, Typography } from "@mui/material";

// Components
import ExercisesDialog from "../components/Template/ExercisesDialog";
import ExerciseTemplate from "../components/Template/ExerciseTemplate";

// Styles
import {
	Container,
	BlueBtn,
	RedBtn,
	GreenBtn,
	FullRowFixed
} from "../components/Start/EditWorkoutPage.styles";

// Models
import { Workout } from "../models/Workout.model";

function EditWorkoutPage({
	user,
	handleAddWorkout,
	handleUpdateWorkout,
	handleOpenSnackbar
}) {
	// Id of template, if any
	const { id } = useParams();
	const [workout, setWorkout] = useState(getNewWorkout(id));
	const [openDialog, setOpenDialog] = useState(false);
	const endOfExercisesRef = useRef();

	// useEffect(() => {
	// 	scrollToBottom();
	// }, [handleAddExercise]);

	if (workout == null) {
		return "Workout Not Found";
	}

	function getNewWorkout(id) {
		const templateIfExists = user.templates.filter((t) => t.id === id)[0];
		const workoutIfExists = user.workouts.filter((w) => w.id === id)[0];

		// If neither a template or workout exists with this id
		if (!templateIfExists && !workoutIfExists) {
			return null;
		}

		// If using template, create new workout id
		if (templateIfExists) {
			let newWorkout = Workout();
			newWorkout = {
				...newWorkout,
				name: templateIfExists.name,
				exercises: templateIfExists.exercises
			};
			return newWorkout;
			// If editing existing workout, keep same id
		} else if (workoutIfExists) {
			return workoutIfExists;
		}

		return null;
	}

	function scrollToBottom() {
		endOfExercisesRef.current?.scrollIntoView({ behavior: "smooth" });
	}

	/**
	 * Handles template name.
	 * @param {Event} e the TextField event.
	 */
	function handleName(e) {
		setWorkout((w) => ({
			...w,
			name: e.target.value
		}));
	}

	/**
	 * Handles open dialog.
	 */
	function handleOpenDialog() {
		setOpenDialog(true);
	}

	/**
	 * Handles closing dialog and selecting exercise.
	 * @param {Exercise | ""} exercise the selected exercise.
	 */
	function handleCloseDialog(exercise) {
		if (exercise !== "") handleAddExercise(exercise);
		setOpenDialog(false);
	}

	/**
	 * Handles adding an exercise to array of exercises in template.
	 * @param {Exercise} exercise
	 */
	function handleAddExercise(exercise) {
		setWorkout((w) => ({
			...w,
			exercises: [...w["exercises"], exercise]
		}));
	}

	/**
	 * Handles deleting exercise from template.
	 * @param {Number} exerciseIdx the index of the exercise template.
	 */
	function handleDeleteExercise(exerciseIdx) {
		setWorkout((w) => ({
			...w,
			exercises: w["exercises"].filter((_, idx) => idx !== exerciseIdx)
		}));
	}

	/**
	 * Handles adding a set to exercise in template.
	 * @param {String} exerciseIdx the index of the exercise template.
	 */
	function handleAddSet(exerciseIdx) {
		setWorkout((w) => ({
			...w,
			exercises: w["exercises"].map((exercise, idx) =>
				idx === exerciseIdx
					? {
							...exercise,
							sets: [
								...exercise["sets"],
								exercise["sets"][exercise["sets"].length - 1]
							]
					  }
					: exercise
			)
		}));
	}

	/**
	 * Handles deleting a set from an exercise in template.
	 * @param {String} exerciseIdx the index of the exercise template.
	 * @param {Number} setIdx the index of the set.
	 */
	function handleDeleteSet(exerciseIdx, setIdx) {
		setWorkout((w) => ({
			...w,
			exercises: w["exercises"].map((exercise, idx) =>
				idx === exerciseIdx
					? {
							...exercise,
							sets: exercise["sets"].filter(
								(_, idx) => idx !== setIdx
							)
					  }
					: exercise
			)
		}));
	}

	/**
	 * Handles changing the reps, lbs, or rpe in a set.
	 * @param {Event} event the input event.
	 * @param {Number} exerciseIdx the index of the exercise template.
	 * @param {Number} setIdx the index of the set.
	 */
	function handleEditSetDetail(event, exerciseIdx, setIdx) {
		const type = event.target.name;
		const newValue = parseInt(event.target.value);
		setWorkout((w) => ({
			...w,
			exercises: w["exercises"].map((exercise, idx) =>
				idx === exerciseIdx
					? {
							...exercise,
							sets: exercise["sets"].map((set, idx) =>
								idx === setIdx
									? {
											...set,
											[type]: newValue
									  }
									: set
							)
					  }
					: exercise
			)
		}));
	}

	function handleSaveWorkout() {
		if (workout.name.trim() === "") return;

		// Decide whether to add workout or update existing workout
		// by getting all current workouts with same id.
		// If matched, update workout, else add workout.
		if (user.workouts.filter((w) => w.id === workout.id).length > 0) {
			handleUpdateWorkout(workout);
			handleOpenSnackbar(
				`Successfully updated workout: ${workout.name.trim()}`
			);
		} else {
			handleAddWorkout(workout);
			handleOpenSnackbar(
				`Successfully added new workout: ${workout.name.trim()}`
			);
		}

		// User directed to start page afterwards.
	}

	return (
		<Container>
			<Stack direction='column' spacing={2} style={{ width: "350px" }}>
				<Typography variant='h6' mt={5} textAlign='center'>
					Log Workout
				</Typography>
				<Stack
					direction='column'
					spacing={3}
					alignItems='center'
					style={{
						paddingBottom: "150px"
					}}
				>
					<TextField
						required
						label='Workout Name'
						variant='standard'
						value={workout.name}
						onChange={handleName}
						style={{ width: "100%", minWidth: "250px" }}
					/>
					{/* Render all exercises here */}
					<Stack direction='column' spacing={2} alignItems='center'>
						{workout.exercises.map((e, idx) => (
							<ExerciseTemplate
								exercise={e}
								key={idx}
								exerciseIdx={idx}
								handleAddSet={handleAddSet}
								handleDeleteSet={handleDeleteSet}
								handleDeleteExercise={handleDeleteExercise}
								handleEditSetDetail={handleEditSetDetail}
							/>
						))}
					</Stack>
					<div ref={endOfExercisesRef}></div>
				</Stack>
				<FullRowFixed>
					<BlueBtn onClick={handleOpenDialog}>+ Add Exercise</BlueBtn>
					<RedBtn to='/start'>Cancel</RedBtn>
					<GreenBtn onClick={handleSaveWorkout} to='/start'>
						Save Workout
					</GreenBtn>
				</FullRowFixed>
				<ExercisesDialog
					selectedValue={""}
					open={openDialog}
					handleCloseDialog={handleCloseDialog}
				/>
			</Stack>
		</Container>
	);
}

export default EditWorkoutPage;
