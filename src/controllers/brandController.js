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
      return res.status(200).json({ message: "success create brand" });
    } else {
      return res.status(400).json({ message: "The name field is required." });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateBrand = async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;

  try {
    if (name) {
      await prisma.brand.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          updatedAt: new Date(),
        },
      });
      return res.status(200).json({ message: "success updated brand" });
    } else {
      return res.status(400).json({ message: "The name field is required." });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getById = async (req, res) => {
  let { id } = req.params;

  try {
    let find = await prisma.brand.findFirstOrThrow({
      where: {
        id: parseInt(id),
      },
      include: {
        product: true,
      },
    });

    return res.status(200).json({ data: find });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getall = async (req, res) => {
  try {
    let get = await prisma.brand.findMany();
    return res.status(200).json({ data: get });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteBrand = async (req, res) => {
  let { id } = req.params;

  try {
    await prisma.brand.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({ message: "Success Delete Brand" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { createBrand, getById, getall, updateBrand, deleteBrand };
