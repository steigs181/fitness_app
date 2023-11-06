const express = require("express"); 
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
require("./config/mongoose.config")
require("./routes/user.routes")(app);
require("./routes/workout.routes")(app);
app.listen(8000, ()=>console.log("Listening on Port 8000"))