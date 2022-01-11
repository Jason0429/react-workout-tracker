// React
import { useState } from "react";

// Material
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button
} from "@mui/material";

function DeleteExerciseConfirmationDialog({
	open,
	onClose,
	exercise,
	handleDeleteExercise
}) {
	/**
	 * Handles deleting exercise from user's list of exercises after user confirmation.
	 * @param {String} exerciseId the id of the exercise to be deleted.
	 */
	function handleDelete(exerciseId) {
		handleDeleteExercise(exerciseId);
		onClose();
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Delete Exercise?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete{" "}
					<span style={{ fontWeight: "bold" }}>{exercise?.name}</span>
					?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button
					variant='outlined'
					onClick={() => handleDelete(exercise.id)}
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default DeleteExerciseConfirmationDialog;
