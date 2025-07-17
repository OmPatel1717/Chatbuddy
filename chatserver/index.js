import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cors from "cors";

dotenv.config();

const app = express();

// using middleware
app.use(express.json());
const allowedOrigins = [
  'https://chatbuddy-theta.vercel.app', // Vercel frontend URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

//importing routes
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

//using routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is working on port ${process.env.PORT}`);
  connectDb();
});
