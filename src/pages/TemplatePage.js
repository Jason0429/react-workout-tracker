// React
import { useState, useEffect, useRef } from "react";

// Material
import {
	TextField,
	Stack,
	Typography,
	Snackbar,
	IconButton
} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// Components
import ExercisesDialog from "../components/Template/ExercisesDialog";
import ExerciseTemplate from "../components/Template/ExerciseTemplate";

// Models
import { Template } from "../models/Template.model";

// Styles
import {
	Container,
	Header,
	BlueBtn,
	GreenBtn,
	FullRowFixed
} from "../components/Template/TemplatePage.styles";

function TemplatePage({
	user,
	handleAddTemplate,
	handleOpenSnackbar,
	handleAddExercise
}) {
	const [template, setTemplate] = useState(Template());
	const [openDialog, setOpenDialog] = useState(false);
	const endOfExercisesRef = useRef();

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
		let newValue = parseInt(event.target.value);
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
	 * Handles creating and adding template to user's list of templates.
	 */
	function handleSaveTemplate() {
		if (template.name.trim() === "")
			return handleOpenSnackbar("Please enter a template name");

		// Add template to user's list of templates.
		handleAddTemplate({ ...template, name: template.name.trim() });

		// Reset template.
		setTemplate(Template());

		handleOpenSnackbar(
			`Successfully created template: ${template.name.trim()}`
		);
	}

	return (
		<Container>
			<Stack direction='column' spacing={2} style={{ width: "350px" }}>
				<Typography variant='h6' mt={5} textAlign='center'>
					Create a Workout Template
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
					<GreenBtn onClick={handleSaveTemplate}>
						Create Template
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

export default TemplatePage;
