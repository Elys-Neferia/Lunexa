const bcrypt = require("bcrypt");
const pool = require("../lib/db");

class AuthService {
  static async registerUser(username, email, password) {
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE username = ? OR EMAIL = ?",
      [username, email],
    );

    if (existingUsers.length > 0) {
      throw new Error("Username or Email has been used");
    }

    const saltRound = 10;
    const hasedPassword = await bcrypt.hash(password, saltRound);

    const [result] = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, hasedPassword],
    );

    return result.insertId;
  }
}

module.exports = AuthService;
