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
      res.status(200).json({ message: "success updated brand" });
    } else {
      res.status(400).json({ message: "The name field is required." });
    }
  } catch (error) {
    res.status(400).json({ message: "The name field is required." });
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

    res.status(200).json({ data: find });
  } catch (error) {
    res.status(404).json({ message: "Bad Request" });
  }
};

const getall = async (req, res) => {
  try {
    let get = await prisma.brand.findMany();
    res.status(200).json({ data: get });
  } catch (error) {
    res.status(404).json({ message: "No Data Brand" });
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

    res.status(200).json({ message: "Success Delete Brand" });
  } catch (error) {
    res.status(404).json({ message: "No Data Brand" });
  }
};
module.exports = { createBrand, getById, getall, updateBrand, deleteBrand };
