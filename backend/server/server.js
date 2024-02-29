const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mysql = require("mysql2/promise");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");
const { setConfig } = require("./config/config");
const { cmd } = require("./queries/queries")

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

app.use(cors(config.corsOption));

// Nodemailer
const transporter = nodemailer.createTransport(config.nodemailer);

// Pool MySQL
const pool = mysql.createPool(setConfig.pool);
// const cmd.connection = await pool.getconnection();

// CheckAccount
const checkAccount = async (email) => {
  try {
    const [existingUsers] = await cmd.connection.execute(
      cmd.emailSQL,
      [email],
    );
    cmd.connection.release();
    return existingUsers.length > 0;
  } catch (error) {
    console.error(error);
    throw new Error("Error checking account.");
  }
};

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const [rows] = await cmd.connection.execute(
          cmd.emailSQL,
          [email],
        );
        cmd.connection.release();
        if (!rows.length) {
          return done(null, false, { message: "Incorrect email." });
        }
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(
          password,
          user.password_hash,
        );
        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await cmd.connection.execute(
      cmd.idSQL,
      [id],
    );
    cmd.connection.release();

    if (!rows.length) {
      return done(new Error("User not found."));
    }

    const user = rows[0];
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/sendOTP",
    failureRedirect: "/login",
    failureFlash: true,
  }),
);

app.get("/sendOTP", async (req, res) => {
  try {
    // const email = req.body;
    const email = req.user ? req.user.email : null;

    if (!email) {
      return res.status(400).send("User not authenticated or email not found.");
    }
    const generatedOTP = Math.floor(1000 + Math.random() * 9000);
    storedOTP = generatedOTP;
    // const mailOptions = {
    //   from: "sms.findjob.web@gmail.com",
    //   to: email,
    //   subject: "Your OTP for Verification",
    //   html: `<p>Thank you for starting the find job website. Please enter the following verification code when prompted. If you don't want to create an account, you can ignore this message. Thank you.</p> \n\n <h2 style="text-align: center;">Verification code: ${generatedOTP}</h2>`,
    // };
    transporter.sendMail(setConfig.mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).send("Error sending OTP.");
      } else {
        console.log("Email sent: " + info.response);
        // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        return res.status(200).send("OTP has been sent to your email.");
      }
    });
  } catch (err) {
    console.error("Error in sending OTP:", err);
    return res.status(500).send("Error sending OTP.");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const accountExists = await checkAccount(email);

    if (accountExists) {
      return res.status(400).send("Email already exists.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await cmd.connection.execute(
      cmd.emailpass,[email, hashedPassword],
    );
    cmd.connection.release();
    res.status(201).send("User registered successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user.");
  }
});

app.post("/verifyOTP", async (req, res) => {
  const { enteredOTP } = req.body;

  if (enteredOTP === storedOTP) {
    res.status(200).send("OTP verified successfully!");
  } else {
    res.status(400).send("Invalid OTP. Please retry.");
  }
});

app.get("/test", async (req, res) => {
  try {
    const [results] = await cmd.connection.query("SELECT * FROM users");
    cmd.connection.release();

    let message = "";

    if (!results.length) {
      message = "User table data is null";
    } else {
      message = "Successfully select all users";
    }
    res.send({ error: false, dataCharacter: results, message: message });
  } catch (error) {
    console.error("Error fetching data from the database:", error.message);
    res.status(500).send({ error: true, message: error.message });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
