// Components
import TemplateStart from "../components/Start/TemplateStart";

// Material
import { Stack, Grid, Paper, Typography } from "@mui/material";

// Styles
import * as Styles from "../components/Start/StartPage.styles";

function StartPage({ user, handleDeleteTemplate }) {
	return (
		<Styles.Container>
			<Stack
				spacing={3}
				sx={{
					width: "100%",
					maxWidth: "800px",
					padding: "20px"
				}}
			>
				<Stack direction='column' spacing={2}>
					<Typography variant='h5'>Templates</Typography>
					<Grid
						container
						columns={{ xs: 1, sm: 6, md: 12 }}
						gap={3}
						style={{
							width: "100%"
						}}
					>
						{user.templates.map((template, idx) => (
							<Grid item xs={2} sm={3} md={4} key={idx}>
								<TemplateStart
									template={template}
									key={idx}
									templateIdx={idx}
									handleDeleteTemplate={handleDeleteTemplate}
								/>
							</Grid>
						))}
					</Grid>
				</Stack>
				<Styles.BlueBtn to={`/start/new`}>
					Start Own Workout
				</Styles.BlueBtn>
			</Stack>
		</Styles.Container>
	);
}

export default StartPage;
