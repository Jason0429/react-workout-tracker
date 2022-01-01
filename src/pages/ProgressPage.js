// React
import { useState, useEffect } from "react";

// Material
import "react-calendar/dist/Calendar.css";
import { Typography, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { MobileDatePicker } from "@mui/lab";
import { BrowserView, MobileView } from "react-device-detect";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemButton from "@mui/material/ListItemButton";

// Styles
import * as Styles from "../components/Progress/ProgressPage.styles";
import { styled } from "@mui/material/styles";

const columns = [
	{ id: "name", label: "Name", minWidth: 170 },
	{ id: "code", label: "ISO\u00a0Code", minWidth: 100 },
	{
		id: "population",
		label: "Population",
		minWidth: 170,
		align: "right",
		format: (value) => value.toLocaleString("en-US")
	},
	{
		id: "size",
		label: "Size\u00a0(km\u00b2)",
		minWidth: 170,
		align: "right",
		format: (value) => value.toLocaleString("en-US")
	},
	{
		id: "density",
		label: "Density",
		minWidth: 170,
		align: "right",
		format: (value) => value.toFixed(2)
	}
];

function createData(name, code, population, size) {
	const density = population / size;
	return { name, code, population, size, density };
}

const rows = [
	createData("India", "IN", 1324171354, 3287263),
	createData("China", "CN", 1403500365, 9596961),
	createData("Italy", "IT", 60483973, 301340),
	createData("United States", "US", 327167434, 9833520),
	createData("Canada", "CA", 37602103, 9984670),
	createData("Australia", "AU", 25475400, 7692024),
	createData("Germany", "DE", 83019200, 357578),
	createData("Ireland", "IE", 4857000, 70273),
	createData("Mexico", "MX", 126577691, 1972550),
	createData("Japan", "JP", 126317000, 377973),
	createData("France", "FR", 67022000, 640679),
	createData("United Kingdom", "GB", 67545757, 242495),
	createData("Russia", "RU", 146793744, 17098246),
	createData("Nigeria", "NG", 200962417, 923768),
	createData("Brazil", "BR", 210147125, 8515767)
];

function ProgressPage({ user }) {
	const [dateSelected, setDateSelected] = useState(new Date());
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const Demo = styled("div")(({ theme }) => ({
		backgroundColor: theme.palette.background.paper
	}));

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	function handleChange(newValue) {
		setDateSelected(newValue);
	}

	useEffect(() => {
		// console.log(dateSelected);
		// user.workouts.map((w) => console.log(new Date(w.dateCreated.seconds)));
	}, [dateSelected]);

	return (
		<Stack
			direction='column'
			spacing={4}
			alignItems='center'
			style={{
				// width: "350px",
				height: "100%",
				padding: "10px",
				marginTop: "150px"
			}}
		>
			{/* Data Table */}
			<Paper sx={{ width: "100%", overflow: "hidden" }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row) => {
									return (
										<TableRow
											hover
											role='checkbox'
											tabIndex={-1}
											key={row.code}
										>
											{columns.map((column) => {
												const value = row[column.id];
												return (
													<TableCell
														key={column.id}
														align={column.align}
													>
														{column.format &&
														typeof value ===
															"number"
															? column.format(
																	value
															  )
															: value}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			{/* Date Pickers (Browser and Mobile) */}
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<BrowserView>
					<DesktopDatePicker
						label='Select Date'
						inputFormat='MM/dd/yyyy'
						value={dateSelected}
						onChange={handleChange}
						renderInput={(params) => <TextField {...params} />}
					/>
				</BrowserView>
				<MobileView>
					<MobileDatePicker
						label='Select Date'
						inputFormat='MM/dd/yyyy'
						value={dateSelected}
						onChange={handleChange}
						renderInput={(params) => <TextField {...params} />}
					/>
				</MobileView>
			</LocalizationProvider>
			<Styles.WorkoutContainer>
				<Typography>Workouts on this Day:</Typography>
				<List style={{ width: "350px" }}>
					{user.workouts
						.filter(
							(w) =>
								new Date(w.dateCreated).toDateString() ===
								dateSelected.toDateString()
						)
						.map((w, idx) => (
							// Component will be NavLink to EditWorkoutPage
							<ListItem
								divider
								key={idx}
								secondaryAction={
									<IconButton
										edge='end'
										aria-label='delete'
										onClick={null}
									>
										<DeleteIcon />
									</IconButton>
								}
							>
								<ListItemButton onClick={null}>
									<ListItemText primary={w.name} />
								</ListItemButton>
							</ListItem>
						))}
				</List>
			</Styles.WorkoutContainer>
		</Stack>
	);
}

export default ProgressPage;
