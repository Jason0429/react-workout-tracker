// React
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Components
import ConfirmationDialog from "../components/global/ConfirmationDialog";

// Material
import "react-calendar/dist/Calendar.css";
import { Typography, Stack, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { StaticDatePicker } from "@mui/lab";
// import { BrowserView, MobileView } from "react-device-detect";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemButton from "@mui/material/ListItemButton";

// Styles
// import * as Styles from "../components/Progress/ProgressPage.styles";

// Hooks
import { useWindowSize } from "../hooks/hooks";

function ProgressPage({ user, handleDeleteWorkout, handleOpenSnackbar }) {
	const [width, height] = useWindowSize();
	const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
	const [selectedWorkoutToDelete, setSelectedWorkoutToDelete] =
		useState(null);
	const [dateSelected, setDateSelected] = useState(new Date());
	const [workoutsOnThisDay, setWorkoutsOnThisDay] = useState(
		getWorkoutsOnThisDay(dateSelected)
	);

	useEffect(() => {
		setWorkoutsOnThisDay(getWorkoutsOnThisDay(dateSelected));
	}, [dateSelected, user.workouts]);

	/**
	 * Returns array of workouts on specified date.
	 * @param {Date} dateSelected the current date selected.
	 * @returns workouts on the specified date.
	 */
	function getWorkoutsOnThisDay(dateSelected) {
		return user.workouts.filter(
			(w) =>
				new Date(w.dateCreated).toDateString() ===
				dateSelected.toDateString()
		);
	}

	/**
	 * Handles changing dateSelected state to new date.
	 * @param {Date} newValue the new date value.
	 */
	function handleDateChange(newValue) {
		setDateSelected(newValue);
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
	}

	return (
		<>
			{/* Delete Workout Confirmation Dialog */}
			{selectedWorkoutToDelete && (
				<ConfirmationDialog
					open={openConfirmationDialog}
					onClose={handleCloseConfirmationDialog}
					title={"Delete Workout?"}
					message={
						<>
							Are you sure you want to delete{" "}
							<span style={{ fontWeight: "bold" }}>
								{selectedWorkoutToDelete.name}
							</span>
						</>
					}
					yesFunction={() => {
						handleDeleteWorkout(selectedWorkoutToDelete.id);
						handleCloseConfirmationDialog();
						handleOpenSnackbar(
							`Successfully deleted workout: ${selectedWorkoutToDelete.name}`
						);
					}}
				/>
			)}

			<Stack
				direction={width >= 768 ? "row" : "column"}
				spacing={4}
				alignItems={width >= 768 ? "" : "center"}
				justifyContent={width >= 768 ? "center" : ""}
				sx={{
					width: "100%",
					height: "100%",
					marginTop: "80px",
					marginBottom: "100px"
				}}
			>
				<Paper
					variant='outlined'
					sx={{
						height: "fit-content",
						paddingBottom: "20px",
						width: "350px"
					}}
				>
					{/* Calendar / Date Picker */}
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<StaticDatePicker
							orientation='portrait'
							openTo='day'
							value={dateSelected}
							onChange={handleDateChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</Paper>
				{/* Workouts on this day list */}
				<Paper
					variant='outlined'
					sx={{ height: "fit-content", width: "350px" }}
				>
					<Typography
						align='center'
						p={1}
						color={
							workoutsOnThisDay.length > 0 ? "#00bfff" : "#ff726f"
						}
					>
						{workoutsOnThisDay.length > 0
							? "Workouts on this Day:"
							: "No Workouts On This Day"}
					</Typography>
					<Divider />
					<List sx={{ width: "350px", padding: "0" }}>
						{workoutsOnThisDay.map((workout, idx) => (
							<ListItem
								divider
								key={idx}
								secondaryAction={
									<IconButton
										edge='end'
										aria-label='delete'
										// To delete workout
										onClick={() => {
											setSelectedWorkoutToDelete(workout);
											handleOpenConfirmationDialog();
										}}
									>
										<DeleteIcon />
									</IconButton>
								}
							>
								<ListItemButton
									component={NavLink}
									to={`/start/${workout.id}`}
								>
									<ListItemText primary={workout.name} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Paper>
			</Stack>
		</>
	);
}

export default ProgressPage;
