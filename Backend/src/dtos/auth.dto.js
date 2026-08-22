class RegisterDTO {
  constructor(data) {
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
  }

  validate() {
    let errors = [];

    if (!this.username || this.username.trim().length < 3) {
      errors.push("Username must have above 3 characters");
    }

    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push("Email not valid");
    }

    if (!this.password || this.password.length < 6) {
      errors.push("Password must have above 6 characters");
    }

    return errors;
  }
}

class LoginDTO {
  constructor(data) {
    this.username = data.username;
    this.password = data.password;
  }

  validate() {
    let errors = [];

    if (!this.username) {
      errors.push("Please enter your username");
    }

    if (!this.password) {
      errors.push("Please enter your password");
    }

    return errors;
  }
}

module.exports = { RegisterDTO, LoginDTO };
