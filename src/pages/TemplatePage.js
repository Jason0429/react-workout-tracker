// React
import { useState, useEffect } from "react";

// Material
import { TextField, Stack } from "@mui/material";

// Components
import ExercisesDialog from "../components/Template/ExercisesDialog";
import ExerciseTemplate from "../components/Template/ExerciseTemplate";

// Models
import { Set } from "../models/Set.model";
import { Template } from "../models/Template.model";

// Styles
import {
	Container,
	Header,
	BlueBtn,
	GreenBtn,
	FullRowFixed
} from "../components/Template/TemplatePage.styles";

function TemplatePage({ handleAddTemplate }) {
	const [template, setTemplate] = useState({
		name: "",
		exercises: []
	});

	const [openDialog, setOpenDialog] = useState(false);

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
				(e, idx) => idx !== exerciseIdx
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
			exercises: template["exercises"].map((e, idx) =>
				idx === exerciseIdx
					? {
							...e,
							sets: [...e["sets"], Set()]
					  }
					: e
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
			exercises: template["exercises"].map((e, idx) =>
				idx === exerciseIdx
					? {
							...e,
							sets: e["sets"].filter((set, idx) => idx !== setIdx)
					  }
					: e
			)
		}));
	}

	/**
	 * Handles changing the reps, lbs, or rpe in a set.
	 * @param {Event} event the input event.
	 * @param {Number} exerciseIdx the index of the exercise template.
	 * @param {Number} setNumber the index of the set.
	 */
	function handleEditSetDetail(event, exerciseIdx, setIdx, type) {
		const newValue = parseInt(event.target.value);
		setTemplate((template) => ({
			...template,
			exercises: template["exercises"].map((e, idx) =>
				idx === exerciseIdx
					? {
							...e,
							sets: e["sets"].map((set, idx) =>
								idx === setIdx
									? {
											...set,
											[type]: newValue
									  }
									: set
							)
					  }
					: e
			)
		}));
	}

	function handleAddTemplateAndClear() {
		handleAddTemplate({ ...template, name: template.name.trim() });
		setTemplate(Template());
	}

	return (
		<Container>
			<Header variant='h5'>Create a Workout Template</Header>
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
			</Stack>
			<FullRowFixed>
				<BlueBtn onClick={handleOpenDialog}>+ Add Exercise</BlueBtn>
				<GreenBtn onClick={handleAddTemplateAndClear}>
					Create Template
				</GreenBtn>
			</FullRowFixed>
			<ExercisesDialog
				selectedValue={""}
				open={openDialog}
				handleCloseDialog={handleCloseDialog}
			/>
		</Container>
	);
}

export default TemplatePage;
