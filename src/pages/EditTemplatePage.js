// React
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

// Material
import {
	TextField,
	Stack,
	Typography,
	Snackbar,
	IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
} from "../components/Template/EditTemplatePage.styles";

function EditTemplatePage({
	user,
	handleUpdateTemplate,
	handleOpenSnackbar,
	handleAddExercise
}) {
	const { id } = useParams();
	const [template, setTemplate] = useState(
		user.templates.filter((t) => t.id === id)[0] || null
	);
	const [openDialog, setOpenDialog] = useState(false);
	const endOfExercisesRef = useRef();

	// If template id is not valid.
	if (template === null) return "Template Not Found";

	// useEffect(() => {
	// 	scrollToBottom();
	// }, [handleAddExercise]);

	function scrollToBottom() {
		endOfExercisesRef.current?.scrollIntoView({ behavior: "smooth" });
	}

	/**
	 * Handles template name.
	 * @param {Event} e the TextField event.
	 */
	function handleName(e) {
		setTemplate((prev) => ({
			...prev,
			name: e.target.value
		}));
	}

	/**
	 * Handles opening dialog.
	 */
	function handleOpenDialog() {
		setOpenDialog(true);
	}

	/**
	 * Handles closing dialog.
	 */
	function handleCloseDialog() {
		setOpenDialog(false);
	}

	/**
	 * Handles adding an exercise to array of exercises in template.
	 * @param {Exercise} exercise
	 */
	function handleAddExerciseToList(exercise) {
		setTemplate((t) => ({
			...t,
			exercises: [...t["exercises"], exercise]
		}));
	}

	/**
	 * Handles deleting exercise from template.
	 * @param {Number} exerciseIdx the index of the exercise template.
	 */
	function handleDeleteExercise(exerciseIdx) {
		setTemplate((template) => ({
			...template,
			exercises: template["exercises"].filter(
				(_, idx) => idx !== exerciseIdx
			)
		}));
	}

	/**
	 * Handles adding a set to exercise in template.
	 * @param {String} exerciseIdx the index of the exercise template.
	 */
	function handleAddSet(exerciseIdx) {
		setTemplate((template) => ({
			...template,
			exercises: template["exercises"].map((exercise, idx) =>
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
		setTemplate((template) => ({
			...template,
			exercises: template["exercises"].map((exercise, idx) =>
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
		setTemplate((template) => ({
			...template,
			exercises: template["exercises"].map((exercise, idx) =>
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

	/**
	 * Handles saving the edits made to a template.
	 */
	function handleSaveTemplate() {
		if (template.name.trim() === "")
			return handleOpenSnackbar("Please enter a template name");

		// Updates templates in user's list of templates.
		handleUpdateTemplate({ ...template, name: template.name.trim() });

		handleOpenSnackbar(
			`Successfully updated template: ${template.name.trim()}`
		);

		// User directed to start page afterwards.
	}

	return (
		<Container>
			<Stack direction='column' spacing={2} style={{ width: "350px" }}>
				<Typography variant='h6' mt={5} textAlign='center'>
					Edit Workout Template
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
						label='Workout Name'
						variant='outlined'
						value={template.name}
						onChange={handleName}
						fullWidth
					/>
					{/* Render all exercises here */}
					<Stack direction='column' spacing={2} alignItems='center'>
						{template.exercises.map((e, idx) => (
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
					<GreenBtn onClick={handleSaveTemplate} to='/start'>
						Update Template
					</GreenBtn>
				</FullRowFixed>
				<ExercisesDialog
					exercises={user.exercises}
					open={openDialog}
					handleCloseDialog={handleCloseDialog}
					handleAddExercise={handleAddExercise}
					handleAddExerciseToList={handleAddExerciseToList}
				/>
			</Stack>
		</Container>
	);
}

export default EditTemplatePage;
