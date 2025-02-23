require('dotenv').config();
require("./cron/cronJobs");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));

app.use(router)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

