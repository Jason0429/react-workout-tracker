import { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";

function WorkoutCalendar() {
	const [value, setValue] = useState(new Date());

	return (
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
	);
}

export default WorkoutCalendar;
