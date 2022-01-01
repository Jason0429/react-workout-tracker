// Components
import TemplateStart from "../components/Start/TemplateStart";

// Material
import { Stack, Grid, Paper } from "@mui/material";

// Styles
import * as Styles from "../components/Start/StartPage.styles";

function StartPage({ user, handleDeleteTemplate }) {
	return (
		<Styles.Container>
			<Styles.MyStack spacing={3}>
				<Stack direction='column' spacing={2}>
					<Styles.Header>Templates</Styles.Header>
					<Grid
						container
						// spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 1, sm: 6, md: 12 }}
						gap={2}
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
				<Styles.Header>Start Your Own Workout</Styles.Header>
			</Styles.MyStack>
		</Styles.Container>
	);
}

export default StartPage;
