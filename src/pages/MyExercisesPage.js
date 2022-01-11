// React
import { useState } from "react";

// Components
import EditExerciseDialog from "../components/MyExercises/EditExerciseDialog";
import AddExerciseDialog from "../components/MyExercises/AddExerciseDialog";
import ConfirmationDialog from "../components/global/ConfirmationDialog";

// Styles
import { BlueBtn } from "../components/MyExercises/MyExercisesPage.styles";

// Material
import {
	IconButton,
	Typography,
	Stack,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	TextField,
	Paper,
	List,
	ListItem,
	ListItemText
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";

function MyExercisesPage({
	user,
	handleUpdateExercise,
	handleDeleteExercise,
	handleAddExercise,
	handleOpenSnackbar
}) {
	const [expanded, setExpanded] = useState(true);
	const [searchedExercise, setSearchedExercise] = useState("");
	const [openAddExerciseDialog, setOpenAddExerciseDialog] = useState(false);
	const [openEditExerciseDialog, setOpenEditExerciseDialog] = useState(false);
	const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
	const [selectedExerciseToEdit, setSelectedExerciseToEdit] = useState(null);
	const [selectedExerciseToDelete, setSelectedExerciseToDelete] =
		useState(null);

	/**
	 * Handles searching for exercise.
	 * @param {Event} e the TextField's event.
	 */
	function handleSearchedExercise(e) {
		setSearchedExercise(e.target.value);
	}

	/**
	 * Handles opening dialog to edit exercise.
	 * @param {Exercise} exercise the exercise to edit.
	 */
	function handleEditExercise(exercise) {
		setSelectedExerciseToEdit(exercise);
		setOpenEditExerciseDialog(true);
	}

	/**
	 * Handles closing exercise dialog and resetting selected exercise to edit.
	 */
	function handleCloseEditExerciseDialog() {
		setOpenEditExerciseDialog(false);
		setTimeout(() => setSelectedExerciseToEdit(null), 300);
	}

	/**
	 * Handles opening confirmation dialog.
	 */
	function handleOpenConfirmationDialog() {
		setOpenConfirmationDialog(true);
	}

	/**
	 * Handles closing confirmation dialog.
	 */
	function handleCloseConfirmationDialog() {
		setOpenConfirmationDialog(false);

		// Temp
		setSelectedExerciseToDelete(null);
	}

	/**
	 * Handles deleting exercise from user's list of exercises.
	 * - Opens confirmation dialog first.
	 * @param {Exercise} exercise the exercise to be deleted.
	 */
	function handleDelete(exercise) {
		setSelectedExerciseToDelete(exercise);
		handleOpenConfirmationDialog();
	}

	/**
	 * Handles opening add exercise dialog.
	 */
	function handleOpenAddExerciseDialog() {
		setOpenAddExerciseDialog(true);
	}

	/**
	 * Handles closing add exercise dialog.
	 */
	function handleCloseAddExerciseDialog() {
		setOpenAddExerciseDialog(false);
	}

	return (
		<>
			{/* {openAddExerciseDialog && ( */}
			<AddExerciseDialog
				open={openAddExerciseDialog}
				onClose={handleCloseAddExerciseDialog}
				handleAddExercise={handleAddExercise}
				handleOpenSnackbar={handleOpenSnackbar}
			/>
			{/* Delete Exercise Confirmation Dialog */}
			{selectedExerciseToDelete && (
				<ConfirmationDialog
					open={openConfirmationDialog}
					onClose={handleCloseConfirmationDialog}
					title={"Delete Exercise?"}
					message={
						<>
							Are you sure you want to delete{" "}
							<span style={{ fontWeight: "bold" }}>
								{selectedExerciseToDelete.name}
							</span>
						</>
					}
					yesFunction={() => {
						handleDeleteExercise(selectedExerciseToDelete.id);
						handleCloseConfirmationDialog();
						handleOpenSnackbar(
							`Successfully deleted exercise: ${selectedExerciseToDelete.name}`
						);
					}}
				/>
			)}
			{/* Exercise Dialog */}
			{selectedExerciseToEdit && (
				<EditExerciseDialog
					user={user}
					handleUpdateExercise={handleUpdateExercise}
					open={openEditExerciseDialog}
					onClose={handleCloseEditExerciseDialog}
					exercise={selectedExerciseToEdit}
					handleOpenSnackbar={handleOpenSnackbar}
				/>
			)}
			{/* List of Exercises */}
			<Stack
				direction='column'
				sx={{
					margin: "100px 0 200px 0",
					width: "95%",
					maxWidth: "600px"
				}}
			>
				<Paper variant='outlined'>
					<Accordion
						disableGutters
						expanded={expanded}
						onChange={() => setExpanded((expanded) => !expanded)}
						sx={{
							width: "100%",
							boxShadow: "none"
						}}
					>
						<AccordionSummary
							sx={{
								background: "#fefefe"
							}}
						>
							<Stack
								direction='row'
								alignItems='center'
								spacing={2}
							>
								<IconButton size='small'>
									<KeyboardArrowDownIcon
										sx={{
											transform: `rotate(${
												expanded ? "0deg" : "180deg"
											})`,
											transition: "0.2s ease-in-out"
										}}
									/>
								</IconButton>
								<Typography variant='h6'>
									My Exercises
								</Typography>
							</Stack>
						</AccordionSummary>
						<AccordionDetails
							sx={{
								padding: 0
							}}
						>
							<TextField
								label='Search for exercise'
								variant='filled'
								fullWidth
								value={searchedExercise}
								onChange={handleSearchedExercise}
							/>
							<List
								sx={{
									width: "100%",
									padding: "0"
								}}
							>
								{user.exercises
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
											.includes(
												searchedExercise.toLowerCase()
											)
									)
									.map((exercise, idx) => (
										<ListItem
											divider
											key={idx}
											secondaryAction={
												<Stack
													direction='row'
													alignItems='center'
													spacing={1}
												>
													<IconButton
														edge='end'
														aria-label='edit'
														// To edit exercise
														onClick={() =>
															handleEditExercise(
																exercise
															)
														}
													>
														<EditIcon />
													</IconButton>
													<IconButton
														edge='end'
														aria-label='delete'
														// To delete exercise
														onClick={() =>
															handleDelete(
																exercise
															)
														}
													>
														<DeleteIcon />
													</IconButton>
												</Stack>
											}
										>
											<ListItemText
												primary={exercise.name}
											/>
										</ListItem>
									))}
							</List>
						</AccordionDetails>
					</Accordion>
				</Paper>
			</Stack>
			{/* Bottom Fixed Row */}
			<Paper
				variant='outlined'
				sx={{
					zIndex: 2,
					padding: "20px",
					position: "fixed",
					bottom: 0,
					background: "#ffffff",
					width: "100%"
				}}
			>
				<Stack
					direction='column'
					alignItems='center'
					justifyContent='center'
					fullWidth
				>
					<BlueBtn onClick={handleOpenAddExerciseDialog}>
						+ Add New Exercise
					</BlueBtn>
				</Stack>
			</Paper>
		</>
	);
}

export default MyExercisesPage;
