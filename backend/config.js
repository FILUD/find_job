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
  }
  module.exports = { setConfig };
}
