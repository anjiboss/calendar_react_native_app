import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";

// ------------------------------------------------- Import Router
import { userRouter } from "./Routes/user";
import { iconRouter } from "./Routes/icon";
import { dayRouter } from "./Routes/day";
// --------------------------------------------------

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

createConnection().catch((error) => console.log(error));
console.log("connected to DB");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/icon", iconRouter);
app.use("/api/v1/day", dayRouter);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
