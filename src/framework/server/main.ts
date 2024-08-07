import express, { json } from "express";
import { routes } from "./routes/routes";
import { logRoutes } from "./config/logRoutes";

const SERVER_PORT: number = Number(process.env.PORT || 3000);
const app = express();

app.use(json());
app.use(routes);

app.listen(SERVER_PORT, () => {
	console.log(`Server Running on port ${SERVER_PORT}`);
	// logRoutes(routes);
});