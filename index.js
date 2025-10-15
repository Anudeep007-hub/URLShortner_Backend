import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

// Local imports
import router from "./routes/urlRoute.js";
import staticRoute from "./routes/staticRoute.js";
import connectToMongoDB from "./config/db.js";
// Configuring the .env setup
dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToMongoDB(process.env.MONGO_URI).then(
    () => console.log(`MongoDB is connected`)
).catch(err => console.error('MongoDB connection error', err));

// Controllers (API)
app.use("/url", router); 
app.use('/api', staticRoute);

// If a frontend build exists in /frontend/dist serve it
const frontendDist = path.resolve('./frontend/dist');
app.use(express.static(frontendDist));

// Use a generic middleware instead of app.get with wildcard to avoid path-to-regexp issues
app.use((req, res, next) => {
  // if the request starts with /api or /url let API handle it
  if (req.path.startsWith('/api') || req.path.startsWith('/url')) return next();
  // else, serve frontend index.html if it exists
  return res.sendFile(path.join(frontendDist, 'index.html'), (err) => {
    if (err) return next();
  });
});

app.get("/", (req, res) => {
    res.status(200).json('Hey server is runnig pretty good')
})


app.listen(PORT, () => {
    console.log(`Server strted at port: ${PORT}`)
});
