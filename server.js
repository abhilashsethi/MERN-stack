require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
mongoose.set("strictQuery", false);

//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

//routes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
	.connect(process.env.MONG_URI)
	.then(() => {
		//listen for request
		app.listen(process.env.PORT, () => {
			// console.log("connected to db and Listening on port 4000");
			console.log(`Connected to db and Listening on Port ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});

// //listen for request
// app.listen(process.env.PORT, () => {
// 	console.log("Listening on port 4000");
// });
