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
  //   let { id } = req.userId;
  //   console.log(id);

  try {
    if (
      name === "" ||
      address === "" ||
      phoneNumber === "" ||
      bornDate === ""
    ) {
      res.status(400).json({ message: "The name field is requeried." });
      return;
    } else if (
      name === " " ||
      address === " " ||
      phoneNumber === " " ||
      bornDate === " "
    ) {
      res.status(400).json({ message: "The name field is requeried." });
      return;
    }

    const create = await prisma.profile.update({
      where: {
        id: 1,
      },
      data: {
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        bornDate: new Date(bornDate),
        userId: parseInt("1"),
      },
    });
    res.status(200).json({ message: create });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = { getProfileById, createProfileDetail };
