import cors from "cors";
import express, { json } from "express";
import { routes } from "./routes/routes";

const SERVER_PORT: number = Number(process.env.PORT || 3000);
const app = express();

app.use(json());
app.use(cors());
app.use(routes);

app.listen(SERVER_PORT, () => {
	console.log(`Server Running on port ${SERVER_PORT}`);
});
