const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async getUsers(req, res) {
    try {
      let users = await User.findAll();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async register(req, res) {
    try {
      const { username, email, password, role } = req.body;
      let image = "https://via.placeholder.com/100";

      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        res.status(400).json({
          message: "Email already used",
        });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const result = await User.create({
          username,
          email,
          password: hashedPassword,
          role,
          image,
        });

        res.status(201).json(result);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        res.status(400).json({ message: "Email not found" });
      } else {
        const matchPassword = bcrypt.compareSync(password, user.password);

        if (matchPassword) {
          const token = jwt.sign(
            { username: user.username, createdAt: user.createdAt },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
          );
          res.status(200).json({
            message: "Login Success",
            token: token,
          });
        } else {
          res.status(400).json({ message: "Invalid Password" });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async delete(req, res) {
    try {
      let id = +req.params.id;

      let result = await User.destroy({
        where: { id: id },
      });

      result === 1
        ? res.status(200).json({
            message: `Id ${id} has been deleted.`,
          })
        : res.status(400).json({
            message: `Id ${id} has not been deleted.`,
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async update(req, res) {
    try {
      let id = +req.params.id;
      const { username, email, password, role, image } = req.body;

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      let result = await User.update(
        {
          username,
          email,
          password: hashedPassword,
          role,
          image,
        },
        {
          where: { id: id },
        }
      );

      result[0] === 1
        ? res.status(200).json({
            message: `Id ${id} has been updated.`,
          })
        : res.status(400).json({
            message: `Id ${id} has not been updated.`,
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getDetails(req, res) {
    try {
      const id = +req.params.id;

      let result = await User.findByPk(id);

      result
        ? res.status(200).json(result)
        : res.status(404).json({
            message: `User id ${id} not found`,
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async checkToken(req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        if (verify) {
          next();
        }
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = UserController;
