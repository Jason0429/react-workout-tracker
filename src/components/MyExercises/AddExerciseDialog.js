// React
import { useState, useEffect } from "react";

// Material
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Stack
} from "@mui/material";
import Chip from "@mui/material/Chip";

// Models
import { Exercise } from "../../models/Exercise.model";

function AddExerciseDialog({
	open,
	onClose,
	handleAddExercise,
	handleOpenSnackbar
}) {
	const [newExercise, setNewExercise] = useState(Exercise("", []));
	const [category, setCategory] = useState("");

	/**
	 * Handles closing dialog.
	 */
	function handleClose() {
		onClose();
		setCategory("");
	}

	/**
	 * Handles change in new exercise name.
	 * @param {Event} e the TextField event.
	 */
	function handleExerciseName(e) {
		setNewExercise((exercise) => ({
			...exercise,
			name: e.target.value
		}));
	}

	/**
	 * Handles change in category text.
	 * @param {Event} e the TextField event.
	 */
	function handleCategory(e) {
		setCategory(e.target.value);
	}

	/**
	 * Handles adding new category to exercise.
	 * @param {String} category the new category to be added to exercise.
	 */
	function handleAddCategory(category) {
		if (category === "") return;
		setNewExercise((exercise) => ({
			...exercise,
			categories: [...exercise["categories"], category]
		}));
		setCategory("");
	}

	/**
	 * Handles deleting category from exercise.
	 * - Takes index instead of category name to prevent deleting duplicates.
	 * @param {Number} idx the index of the category to be deleted from exercise.
	 */
	function handleDeleteCategory(idx) {
		setNewExercise((exercise) => ({
			...exercise,
			categories: exercise["categories"].filter((_, i) => i !== idx)
		}));
	}

	/**
	 * Handles adding new exercise to user's list of exercises
	 * after user confirmation.
	 * @param {Exercise} exercise the exercise to be added.
	 */
	function handleAdd(exercise) {
		if (exercise.name.trim() === "")
			return handleOpenSnackbar("Please enter an exercise name");

		handleAddExercise({
			...newExercise,
			name: newExercise["name"].trim()
		});
		handleOpenSnackbar(`Added new exercise: ${newExercise.name}`);
		handleClose();
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Add New Exercise</DialogTitle>
			<DialogContent>
				<Stack direction='column' spacing={3}>
					<TextField
						// autoFocus
						margin='normal'
						label='Exercise Name'
						variant='outlined'
						value={newExercise?.name}
						onChange={handleExerciseName}
						fullWidth
					/>
					<TextField
						label='New Category'
						value={category}
						onChange={handleCategory}
						sx={{
							width: "200px"
						}}
						variant='outlined'
						onKeyPress={(e) =>
							e.key === "Enter"
								? handleAddCategory(e.target.value.trim())
								: null
						}
					/>
					<Stack direction='row' gap={2} flexWrap='wrap'>
						{newExercise?.categories.map((c, idx) => (
							<Chip
								onDelete={() => handleDeleteCategory(idx)}
								label={c}
								key={idx}
							/>
						))}
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button
					onClick={() => {
						handleAdd(newExercise);
					}}
					variant='outlined'
				>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddExerciseDialog;
