// React
import { useState } from "react";

// Material
import {
	TextField,
	List,
	ListItem,
	ListItemText,
	Dialog,
	DialogTitle,
	Stack
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// Functions
import * as AppFunctions from "../../App";

// Models
import { Exercise } from "../../models/Exercise.model";

function ExercisesDialog({
	exercises,
	handleOpenSnackbar,
	handleCloseDialog,
	handleAddCustomExercise,
	selectedValue,
	open
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [customExerciseName, setCustomExerciseName] = useState("");

	/**
	 * Handles closing the dialog and clearing search field.
	 */
	function handleClose() {
		// alert(selectedValue);
		handleCloseDialog(selectedValue);
		setSearchTerm("");
		setCustomExerciseName("");
	}

	/**
	 * Handles  exercise from dialog.
	 * @param {Exercise} value the selected exercise.
	 */
	function handleAddExercise(exercise) {
		if (exercise.name.trim() === "") return;
		if (!exercises.some((e) => e.name === exercise.name)) {
			handleAddCustomExercise(exercise);
		}
		handleCloseDialog(exercise);
		setSearchTerm("");
		setCustomExerciseName("");
	}

	/**
	 * Handles searching of exercise.
	 * @param {Event} e the text field input event.
	 */
	function handleSearchOnChange(e) {
		setSearchTerm(e.target.value);
	}

	/**
	 * Handles custom exercise name state change.
	 * @param {Event} e the text field event.
	 */
	function handleCustomExerciseOnChange(e) {
		setCustomExerciseName(e.target.value);
	}

	return (
		<Dialog
			onClose={handleClose}
			open={open}
			fullWidth={true}
			style={{
				height: "90vh !important"
			}}
		>
			<DialogTitle>Select an Exercise</DialogTitle>
			{/* Search Bar */}
			<TextField
				label='Search for exercise'
				variant='filled'
				onChange={handleSearchOnChange}
				autoFocus
			/>
			{/* Custom Exercise */}
			<Stack
				direction='row'
				fullWidth={true}
				alignItems='center'
				sx={{
					position: "relative"
				}}
			>
				<TextField
					label='Enter custom exercise'
					variant='filled'
					onChange={handleCustomExerciseOnChange}
					sx={{
						width: "100%"
					}}
					onKeyPress={(e) =>
						e.key === "Enter"
							? handleAddExercise(
									Exercise(customExerciseName.trim(), [
										"Custom"
									])
							  )
							: null
					}
				/>
				<SendIcon
					sx={{
						position: "absolute",
						right: "10px",
						zIndex: 2,
						cursor: "pointer"
					}}
					onClick={() =>
						handleAddExercise(
							Exercise(customExerciseName.trim(), ["Custom"])
						)
					}
				/>
			</Stack>
			<List
				sx={{ pt: 0 }}
				style={{
					height: "80vh"
				}}
			>
				{exercises
					.sort((a, b) => {
						if (a.name < b.name) {
							return -1;
						} else if (a.name > b.name) {
							return 1;
						}
						return 0;
					})
					.filter((exercise) =>
						exercise.name
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					)
					.map((exercise, idx) => (
						<ListItem
							button
							onClick={() => handleAddExercise(exercise)}
							key={idx}
						>
							<ListItemText primary={exercise.name} />
						</ListItem>
					))}
			</List>
		</Dialog>
	);
}

export default ExercisesDialog;
