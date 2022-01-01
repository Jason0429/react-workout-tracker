import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import WorkoutRow from "../components/WorkoutRow";

function CalendarPage() {
	const [value, setValue] = useState(new Date());

	return (
		<Screen>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<StaticDatePicker
					displayStaticWrapperAs='mobile'
					value={value}
					onChange={(newValue) => {
						setValue(newValue);
					}}
					renderInput={(params) => <TextField {...params} />}
					style={{ width: "100%" }}
				/>
			</LocalizationProvider>
			<Typography
				variant='h6'
				mt={2}
				ml={2}
				style={{ fontWeight: "bold" }}
			>
				Workouts on this Day:
			</Typography>
			<WorkoutRow />
		</Screen>
	);
}

export default CalendarPage;
