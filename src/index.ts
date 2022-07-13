import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";


const app: Express = express();
const PORT = process.env.PORT || 3457;
//enable cors and other global middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
dotenv.config();
console.log("Parsed Environment Variables");

//mount the routes
routes(app);
app.get("/", (req: Request, res: Response) => {
    res.send("hey there")
})

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
})


//mount the routes
routes(app)
export default app;