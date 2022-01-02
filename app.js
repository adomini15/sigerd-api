// *** dependencies settings and imports
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// *** constants

const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;

// *** app
const app = express();

// preconfig mongoose
mongoose.set("runValidators", true);

// *** connect to atlas mongodb
mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		app.listen(port);
	})
	.catch((err) => {
		console.log(err);
	});

// *** routes imports

// User Context
const userRoute = require("./routes/User/user.route");
const authRoute = require("./routes/User/auth.route");
const profileRoute = require("./routes/User/profile.route");
const roleRoute = require("./routes/User/role.route");
const actionRoute = require("./routes/User/action.route");

// Student Context
const studentRoute = require("./routes/Student/student.route");
const fatherRoute = require("./routes/Student/father.route");
const motherRoute = require("./routes/Student/mother.route");
const tutorRoute = require("./routes/Student/tutor.route");

// Course Context
const courseRoute = require("./routes/Course/course.route");

// middlewares
const { validatedAuth } = require("./middlewares/Auth/Auth");

// proxy (important for heroku in production)
// app.enable("trust proxy");

// // cors

app.use(
	cors({
		// credentials: true,
		origin:
			process.env.NODE_ENV == "production"
				? "https://sigerd-web.herokuapp.com"
				: "http://localhost:3001",
	})
);

// cookie-parser
// app.use(cookieParser());

app.use(express.json());

// morgan
app.use(morgan("dev"));

// *** routes

app.use("/users", userRoute);
app.use(authRoute);
app.use("/profiles", validatedAuth, profileRoute);
app.use("/roles", validatedAuth, roleRoute);
app.use("/actions", validatedAuth, actionRoute);
app.use("/students", validatedAuth, studentRoute);
app.use("/fathers", validatedAuth, fatherRoute);
app.use("/mothers", validatedAuth, motherRoute);
app.use("/tutors", validatedAuth, tutorRoute);
app.use("/courses", validatedAuth, courseRoute);
