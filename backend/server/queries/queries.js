const { setConfig } = require("../config/config");

{
    const cmd = {
        emailSQL: "SELECT * from users WHERE email = ?",
        usernameSQL: "SELECT * from users WHERE username = ?",
        idSQL: "SELECT * FROM users WHERE id = ?",
        connection: await setConfig.pool.getConnection(),
        emailpass:  "INSERT INTO users (email, password_hash) VALUES (?, ?)",

    }

    module.exports = { cmd };
}
