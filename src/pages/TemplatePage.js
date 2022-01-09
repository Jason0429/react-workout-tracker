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
import CloseIcon from "@mui/icons-material/Close";

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

function TemplatePage({ handleAddTemplate, handleOpenSnackbar }) {
	const [template, setTemplate] = useState(Template());
	const [openDialog, setOpenDialog] = useState(false);
	const isValid = Boolean(template.name);
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
		setTemplate((prev) => ({
			...prev,
			exercises: [...prev["exercises"], exercise]
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

	function handleCreateTemplate() {
		if (template.name.trim() === "") return;
		handleAddTemplate({ ...template, name: template.name.trim() });
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
						error={!isValid}
						required
						label='Workout Name'
						variant='standard'
						value={template.name}
						onChange={handleName}
						style={{ width: "100%", minWidth: "250px" }}
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
					<GreenBtn onClick={handleCreateTemplate}>
						Create Template
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

export default TemplatePage;
