const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const { config } = require("../config/config");
const { cmd } = require("../mysql/queries");

const setup = () => {
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
  const pool = mysql.createPool(config.pool);

  // Check existed email and username 
  const checkAccount = async (email, username) => {
    try {
      // const connection = await pool.getConnection();
      const [existEmail] = await cmd.connection.execute(
        cmd.emailSQL, [email]
      );
      const [existUsername] = await cmd.connection.execute(
        cmd.usernameSQL, [username]
      );
      connection.release();

      return {
        email: existEmail.length > 0 ? existEmail[0] : null,
        username: existUsername.length > 0 ? existUsername[0] : null
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error checking account.");
    }
  };



  return { app, transporter, pool };
};

module.exports = setup;
