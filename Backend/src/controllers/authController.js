const AuthService = require("../services/authService");
const { RegisterDTO, LoginDTO } = require("../dtos/auth.dto");

class AuthController {
  static async register(req, res) {
    try {
      //debug
      console.log("Dữ liệu nhận được từ Postman:", req.body);

      const registerData = new RegisterDTO(req.body);
      const validationErrors = registerData.validate();

      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }

      const newUserId = await AuthService.registerUser(
        registerData.username,
        registerData.email,
        registerData.password,
      );

      res.status(201).json({
        message: "Register successfully",
        userId: newUserId,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const loginData = new LoginDTO(req.body);
      const validationErrors = loginData.validate();

      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }

      const loginResult = await AuthService.loginUser(
        loginData.username,
        loginData.password,
      );

      res.status(200).json({
        message: "Login successfully",
        token: loginResult.token,
        user: loginResult.user,
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
