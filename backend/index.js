import express from "express";
import rootRoutes from "./src/routes/rootRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(rootRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`BE is running with port ${port}`);
});
