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

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

const users = [];

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
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: "fine-jobhub-01.cy2v6bumcfdz.ap-southeast-2.rds.amazonaws.com",
  user: "admin",
  password: "Tick1147---",
  database: "findjob_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const checkAccount = async (email) => {
  try {
    const connection = await pool.getConnection();
    const [existingUsers] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );
    connection.release();

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
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(
          "SELECT * FROM users WHERE email = ?",
          [email],
        );
        connection.release();

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
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id],
    );
    connection.release();

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

    const mailOptions = {
      from: "sms.findjob.web@gmail.com",
      to: email,
      subject: "Your OTP for Verification",
      html: `<p>Thank you for starting the find job website. Please enter the following verification code when prompted. If you don't want to create an account, you can ignore this message. Thank you.</p> \n\n <h2 style="text-align: center;">Verification code: ${generatedOTP}</h2>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).send("Error sending OTP.");
      } else {
        console.log("Email sent: " + info.response);
        res.header("Access-Control-Allow-Origin", "http://localhost:4000");
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

    const connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hashedPassword],
    );
    connection.release();
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

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "sms.findjob.web@gmail.com",
    pass: "ksfzqfnxsqfxklak",
  },
});

app.get("/test", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query("SELECT * FROM users");
    connection.release();

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
app.get("/api",(req,res)=>{
    res.json({"users":["userONe","usertwo"]})
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
