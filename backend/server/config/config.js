{
  const setConfig = {
    //cors
    corsOption: {
      origin: "*",
      credentials: true,
      optionSuccessStatus: 200
    },
    // node mailer
    nodemailer: {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "sms.findjob.web@gmail.com",
        pass: "ksfzqfnxsqfxklak"
      }
    },
    // pool SQL
    pool: {
        host: "fine-jobhub-01.cy2v6bumcfdz.ap-southeast-2.rds.amazonaws.com",
        user: "admin",
        password: "Tick1147---",
        database: "findjob_db",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    },

    mailOptions : {
      from: "sms.findjob.web@gmail.com",
      to: email,
      subject: "Your OTP for Verification",
      html: `<p>Thank you for starting the find job website. Please enter the following verification code when prompted. If you don't want to create an account, you can ignore this message. Thank you.</p> \n\n <h2 style="text-align: center;">Verification code: ${generatedOTP}</h2>`,
    }



  }
  module.exports = { setConfig };
}


