const bcrypt = require("bcrypt");
const pool = require("../lib/db");
const jwt = require("jsonwebtoken");

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

  static async loginUser(username, password) {
    const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (users.length === 0) {
      throw new Error("This account isnt existed");
    }

    const user = users[0];

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        userName: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return {
      token: token,
      userInfo: { id: user.id, username: user.username, role: user.role },
    };
  }
}

module.exports = AuthService;
