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

// Styles
import { CustomExerciseSubmitBtn } from "./ExercisesDialog.styles";

// Data
import { exercises } from "../../data/exercises";

// Models
import { Exercise } from "../../models/Exercise.model";

function ExercisesDialog({ handleCloseDialog, selectedValue, open }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [customExercise, setCustomExercise] = useState("");

	/**
	 * Handles closing the dialog and clearing search field.
	 */
	const handleClose = () => {
		handleCloseDialog(selectedValue);
		setSearchTerm("");
		setCustomExercise("");
	};

	/**
	 * Handles selecting an exercise from dialog.
	 * @param {Exercise} value the selected exercise.
	 */
	const handleAddExercise = (exercise) => {
		if (exercise.name === "") return;
		handleCloseDialog(exercise);
		setSearchTerm("");
		setCustomExercise("");
	};

	/**
	 * Handles searching of exercise.
	 * @param {Event} e the text field input event.
	 */
	const handleSearchOnChange = (e) => {
		setSearchTerm(e.target.value);
	};

	/**
	 * Handles custom exercise name state change.
	 * @param {Event} e the text field event.
	 */
	const handleCustomExerciseOnChange = (e) => {
		setCustomExercise(e.target.value);
	};

	return (
		<Dialog onClose={handleClose} open={open} fullWidth={true}>
			<DialogTitle>Select an Exercise</DialogTitle>
			{/* Search Bar */}
			<TextField
				label='Search for exercise'
				variant='filled'
				onChange={handleSearchOnChange}
			/>
			{/* Custom Exercise */}
			<Stack direction='row' fullWidth={true}>
				<TextField
					label='Enter custom exercise'
					variant='filled'
					style={{ flex: 0.9 }}
					onChange={handleCustomExerciseOnChange}
					onKeyPress={(e) =>
						e.key === "Enter"
							? handleAddExercise(
									Exercise(customExercise.trim(), ["Custom"])
							  )
							: null
					}
				/>
				<CustomExerciseSubmitBtn
					onClick={() =>
						handleAddExercise(
							Exercise(customExercise.trim(), ["Custom"])
						)
					}
				>
					<SendIcon />
				</CustomExerciseSubmitBtn>
			</Stack>

			<List sx={{ pt: 0 }}>
				{exercises
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
