// React
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Material
import "react-calendar/dist/Calendar.css";
import { Typography, Stack, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
	MobileDatePicker,
	CalendarPicker,
	DesktopDatePicker,
	StaticDatePicker
} from "@mui/lab";
// import { BrowserView, MobileView } from "react-device-detect";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemButton from "@mui/material/ListItemButton";

// Styles
import * as Styles from "../components/Progress/ProgressPage.styles";

// Hooks
import { useWindowSize } from "../hooks/hooks";

function ProgressPage({ user, handleDeleteWorkout, handleOpenSnackbar }) {
	const [width, height] = useWindowSize();
	const [dateSelected, setDateSelected] = useState(new Date());
	const [workoutsOnThisDay, setWorkoutsOnThisDay] = useState(
		getWorkoutsOnThisDay(dateSelected)
	);

	useEffect(() => {
		setWorkoutsOnThisDay(getWorkoutsOnThisDay(dateSelected));
	}, [dateSelected, user.workouts]);

	function getWorkoutsOnThisDay(dateSelected) {
		return user.workouts.filter(
			(w) =>
				new Date(w.dateCreated).toDateString() ===
				dateSelected.toDateString()
		);
	}

	function handleDateChange(newValue) {
		setDateSelected(newValue);
	}

	return (
		<Stack
			direction={width >= 768 ? "row" : "column"}
			spacing={4}
			alignItems={width >= 768 ? "" : "center"}
			justifyContent={width >= 768 ? "center" : ""}
			sx={{
				width: "100%",
				height: "100%",
				padding: "10px",
				marginTop: "150px"
			}}
		>
			<Paper
				variant='outlined'
				sx={{ height: "fit-content", paddingBottom: "20px" }}
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
					color={workoutsOnThisDay.length > 0 ? "#00bfff" : "#ff726f"}
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
										handleDeleteWorkout(workout);
										handleOpenSnackbar(
											`Successfully deleted workout: ${workout.name}`
										);
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
	);
}

export default ProgressPage;
