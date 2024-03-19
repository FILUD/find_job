const express = require("express");
const session = require("express-session");
const passport = require("passport"); // Add this line
const bodyParser = require("body-parser");
const { setConfig } = require("./config");
const crypto = require("crypto");
const cors = require("cors");
const route = require("./route"); // Correct the import statement

const app = express();

const generateSecretKey = () => {
    return crypto.randomBytes(64).toString("hex");
};
const secretKey = generateSecretKey();
app.use(
    session({
        secret: secretKey,
        resave: false,
        saveUninitialized: false,
    }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(setConfig.corsOption));

//use all code in route
app.use("/", route);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
