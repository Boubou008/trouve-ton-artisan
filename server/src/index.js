import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categories.js";
import artisansRouter from "./routes/artisans.js";
import contactRouter from "./routes/contact.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/categories", categoriesRouter);
app.use("/api/artisans", artisansRouter);
app.use("/api/contact", contactRouter);

// healthcheck
app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}`);
});
