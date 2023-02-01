const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createBrand = async (req, res) => {
  let { name } = req.body;
  try {
    if (name) {
      await prisma.brand.create({
        data: {
          name,
        },
      });
      res.status(200).json({ message: "success create brand" });
    } else {
      res.status(400).json({ message: "The name field is required." });
    }
  } catch (error) {
    return res.status(404).json({ message: "Bad Request" });
  }
};
