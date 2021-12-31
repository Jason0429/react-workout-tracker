const express = require("express");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");

dotenv.config();
const clientId =
	"1038653702258-03sghkq725kmre9pbv2dtu9b66qge1jk.apps.googleusercontent.com";
const client = new OAuth2Client(clientId);

const app = express();
app.use(express.json());

const users = [];

function upsert(arr, item) {
	const i = arr.findIndex((_item) => _item.email === item.email);
	if (i > -1) arr[i] = item;
	else arr.push(item);
}

app.post("/api/google-login", async (req, res) => {
	const { token } = req.body;

	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: clientId
	});

	const { name, email, picture } = ticket.getPayload();

	upsert(users, { name, email, picture });

	res.status(201);

	res.json({ name, email, picture });
});

app.listen(process.env.PORT || 3001, () => {
	console.log(
		`Server is ready at http://localhost:${process.env.PORT || 3001}`
	);
});
