const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// Token expired time
const expiresIn = 36 * 60 * 60; // 36 Hours

const register = async (req, res) => {
  let { name, username, email, password } = req.body;
  //   console.log(req.body);
  if (name && username && email && password) {
    // Check username & email availability
    const check = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (!check) {
      try {
        // Hash password
        let hashedPassword = await bcrypt.hash(password, 10);
        // Upload to db
        const data = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            role: "user",
          },
        });

        // create profile
        const profile = await prisma.profile.create({
          data: {
            userId: data.id,
            name,
          },
        });

        res.status(200).json({ msg: "Register success." });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    } else {
      res.status(400).json({
        msg: "Username or email has registered, try another username or email.",
      });
    }
  } else {
    res.status(400).json({ msg: "Please insert required fields!" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const data = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email: username }],
        },
      });

      if (data) {
        const isPasswordValid = await bcrypt.compare(password, data.password);

        if (isPasswordValid) {
          const token = jwt.sign(
            { userId: data.id, role: data.role },
            process.env.JWT_SECRET,
            {
              expiresIn,
            }
          );
          return res.status(200).json({ msg: "Login success.", token });
        }
      }

      return res.status(401).json({ msg: "Login failed." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(400).json({ msg: "Please insert username & password!" });
  }
};

const changePassword = async (req, res) => {
  let { newPassword, confPassword } = req.body;
  let { userId } = req.user;

  if (newPassword && confPassword) {
    try {
      if (newPassword === confPassword) {
        let hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            password: hashedPassword,
          },
        });
        return res.status(200).json({ msg: "success change password" });
      } else {
        return res.status(400).json({ msg: "password did not match!" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(400).json({ msg: "The name field is required." });
  }
};
module.exports = { register, login, changePassword };
