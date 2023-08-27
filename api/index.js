import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import cors from "cors";

const app = express();
dotenv.config();

async function connect () {
    try {
        await mongoose.connect(process.env.MONG, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to mongodb :)")
    }catch (error) {
        console.error(error);
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected :(");
});

//MIDDLEWARES
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

app.use((err, rq, rs, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong :(";
    return rs.status(errorStatus).json({
        succes: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800, () => {
    connect();
    console.log("Connected to backend :)");
});