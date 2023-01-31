const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProfileById = async (req, res) => {
  let { id } = req.body;
  try {
    const findProfile = await prisma.profile.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ profile: findProfile });
  } catch (error) {
    res.status(404).json({ message: "Bad Request" });
  }
};

const createProfileDetail = async (req, res) => {
  let { name, address, phoneNumber, bornDate } = req.body;
  let { id } = req.body;

  try {
    if (name === "") {
      res.status(400).json({ message: "The name field is requeried." });
    } else if (name === " ") {
      res.status(400).json({ message: "The name field is requeried." });
    }

    const create = await prisma.profile.create({
      data: { name, address, phoneNumber, bornDate, userId: id },
    });
    res.status(200).json({ message: "success create profile" });
  } catch (error) {
    res.status(404).json({ message: "Bad Request" });
  }
};
module.exports = { getProfileById, createProfileDetail };
