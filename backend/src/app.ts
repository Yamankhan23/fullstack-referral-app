import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import purchasesRouter from "./routes/purchases";
import referralsRouter from "./routes/referrals";
import dashboardRouter from "./routes/dashboard";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


console.log('authRouter type:', typeof authRouter);
console.log('purchasesRouter type:', typeof purchasesRouter);
console.log('referralsRouter type:', typeof referralsRouter);
console.log('dashboardRouter type:', typeof dashboardRouter);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/purchases", purchasesRouter);
app.use("/api/referrals", referralsRouter);
app.use("/api/dashboard", dashboardRouter);

// Default route
app.get("/", (req, res) => {
    res.send("Referral System API is running 🚀");
});

export default app;
