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
	templates,
	handleUpdateTemplate,
	handleOpenSnackbar
}) {
	const { id } = useParams();
	const [template, setTemplate] = useState(
		templates.filter((t) => t.id === id)[0]
	);
	const [openDialog, setOpenDialog] = useState(false);
	const endOfExercisesRef = useRef();

	// If template id is not valid.
	if (template == []) return "Template Not Found";

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

	function handleUpdateTemplateBtn() {
		if (template.name.trim() === "") return;
		handleUpdateTemplate({ ...template, name: template.name.trim() });
		handleOpenSnackbar("Successfully updated template");
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
					<RedBtn to='/start'>Cancel</RedBtn>
					<GreenBtn onClick={handleUpdateTemplateBtn} to='/start'>
						Update Template
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

export default EditTemplatePage;
