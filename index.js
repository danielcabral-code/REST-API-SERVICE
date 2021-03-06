require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const utilities = require("./utilities/utilities");
const users = require("./routes/route_users");
const exercises = require("./routes/route_exercises");
const defaultPlans = require("./routes/route_defaultPlans");
const userPlans = require("./routes/route_userPlans");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const auth = function (req, res, next) {
  let exceptions = ["/login", "/register", "/users"];
  if (exceptions.indexOf(req.url) >= 0 || req.url.indexOf("recoverpassword")) {
    next();
  } else if (
    exceptions.indexOf(req.url) >= 0 ||
    req.url.indexOf("getdefault") >= 0
  ) {
    next();
  } else {
    utilities.validateToken(req.headers.authorization, (result) => {
      if (result) {
        next();
      } else {
        res.status(401).send("Invalid Token");
      }
    });
  }
};

app.use(express.json());
app.use(auth);
app.use("/", users);
app.use("/exercises", exercises);
app.use("/default_plans", defaultPlans);
app.use("/user_plans", userPlans);

mongoose.connect(
  "mongodb+srv://dtamg2:projetointercalar@projeto.xjdac.mongodb.net/projeto?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to MongoDB");
});

app.listen(port, function () {
  console.log("App is running on port " + port);
});
