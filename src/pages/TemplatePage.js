// React
import { useState, useEffect } from "react";

// Material
import { TextField, Stack } from "@mui/material";

// Components
import ExercisesDialog from "../components/Template/ExercisesDialog";
import ExerciseTemplate from "../components/Template/ExerciseTemplate";

// Models
import { Set } from "../models/Set";

// Styles
import {
	Container,
	MyStack,
	Header,
	BlueBtn,
	GreenBtn
} from "../components/Template/TemplatePageStyles";

const TemplatePage = () => {
	const [template, setTemplate] = useState({
		name: "",
		exercises: []
	});

	useEffect(() => {
		console.log(template);
	}, [template]);

	const [open, setOpen] = useState(false);

	/**
	 * Handles template name.
	 * @param {Event} e the TextField event.
	 */
	const handleName = (e) => {
		setTemplate((prev) => ({
			...prev,
			name: e.target.value.trim()
		}));
	};

	/**
	 * Handles open dialog.
	 */
	const handleOpen = () => {
		setOpen(true);
	};

	/**
	 * Handles closing dialog and selecting exercise.
	 * @param {Exercise | ""} exercise the selected exercise.
	 */
	const handleClose = (exercise) => {
		if (exercise !== "")
			setTemplate((prev) => ({
				...prev,
				exercises: [...prev["exercises"], exercise]
			}));

		setOpen(false);
	};

	/**
	 * Handles deleting exercise from template.
	 * @param {String} exerciseId the exercise id.
	 */
	const handleDeleteExercise = (exerciseId) => {
		setTemplate((template) => ({
			...template,
			exercises: template["exercises"].filter((e) => e.id !== exerciseId)
		}));
	};

	/**
	 * Handles adding a set to exercise in template.
	 * @param {String} exerciseId the exercise id.
	 */
	const handleAddSet = (exerciseId) => {
		setTemplate((template) => ({
			...template,
			exercises: template["exercises"].map((e) =>
				e.id === exerciseId
					? {
							...e,
							sets: [...e["sets"], new Set()]
					  }
					: e
			)
		}));
	};

	/**
	 * Handles changing reps in a set.
	 * @param {Event} event the input event.
	 * @param {Number} exerciseId the exercise id.
	 * @param {Number} setNumber the index of the set.
	 */
	const handleReps = (event, exerciseId, setNumber) => {
		const newReps = parseInt(event.target.value);
		setTemplate((template) => ({
			...template,
			exercises: template["exercises"].map((e) =>
				e.id === exerciseId
					? {
							...e,
							sets: e["sets"].map((set, idx) =>
								idx + 1 === setNumber
									? {
											...set,
											reps: newReps
									  }
									: set
							)
					  }
					: e
			)
		}));
	};

	/**
	 * Handles changing lbs in a set.
	 * @param {Event} event the input event.
	 * @param {Number} exerciseId the exercise id.
	 * @param {Number} setNumber the index of the set.
	 */
	const handleLbs = (event, exerciseId, setNumber) => {
		const newLbs = parseInt(event.target.value);
		setTemplate((template) => ({
			...template,
			exercises: template["exercises"].map((e) =>
				e.id === exerciseId
					? {
							...e,
							sets: e["sets"].map((set, idx) =>
								idx + 1 === setNumber
									? {
											...set,
											lbs: newLbs
									  }
									: set
							)
					  }
					: e
			)
		}));
	};

	/**
	 * Handles changing rpe in a set.
	 * @param {Event} event the input event.
	 * @param {Number} exerciseId the exercise id.
	 * @param {Number} setNumber the index of the set.
	 */
	const handleRpe = (event, exerciseId, setNumber) => {
		const newRpe = parseInt(event.target.value);
		setTemplate((template) => ({
			...template,
			exercises: template["exercises"].map((e) =>
				e.id === exerciseId
					? {
							...e,
							sets: e["sets"].map((set, idx) =>
								idx + 1 === setNumber
									? {
											...set,
											rpe: newRpe
									  }
									: set
							)
					  }
					: e
			)
		}));
	};

	return (
		<Container>
			<Header variant='h5'>Create a Workout Template</Header>
			<MyStack direction='column' spacing={3} alignItems='center'>
				<TextField
					label='Workout Name'
					variant='outlined'
					onChange={handleName}
				/>
				{/* Render all exercises here */}
				<Stack direction='column' spacing={2} alignItems='center'>
					{template.exercises.map((e) => (
						<ExerciseTemplate
							exercise={e}
							key={e.id}
							handleDeleteExercise={handleDeleteExercise}
							handleAddSet={handleAddSet}
							handleReps={handleReps}
							handleLbs={handleLbs}
							handleRpe={handleRpe}
						/>
					))}
				</Stack>
				<BlueBtn onClick={handleOpen}>+ Add Exercise</BlueBtn>
				<GreenBtn onClick={null}>Create Template</GreenBtn>
				<ExercisesDialog
					selectedValue={""}
					open={open}
					onClose={handleClose}
				/>
			</MyStack>
		</Container>
	);
};

export default TemplatePage;
