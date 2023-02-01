const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProfileById = async (req, res) => {
  let { id } = req.params;
  try {
    const findProfile = await prisma.profile.findUniqueOrThrow({
      where: { id: parseInt(id) },
      select: {
        name: true,
        address: true,
        phoneNumber: true,
        bornDate: true,
      },
    });

    res.status(200).json({ profile: findProfile });
  } catch (error) {
    res.status(404).json({ message: "Bad Request" });
  }
};

const updateProfileDetail = async (req, res) => {
  let { name, address, phoneNumber, bornDate } = req.body;
  let { userId } = req.user;

  if (name || address || phoneNumber || bornDate) {
    try {
      const create = await prisma.profile.update({
        where: {
          userId,
        },
        data: {
          name,
          address,
          phoneNumber,
          bornDate: new Date(bornDate),
        },
      });
      return res.status(200).json({ message: create });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  } else {
    return res.status(400).json({ message: "The name field is required." });
  }
};

module.exports = { getProfileById, updateProfileDetail };
