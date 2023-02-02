const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  try {
    const data = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        brand: true,
      },
    });

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const data = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
      include: {
        brand: true,
      },
    });

    if (data) {
      return res.status(200).json({ data });
    } else {
      return res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, brandId, description, sku } = req.body;
  if ((name && brandId) || description || sku) {
    try {
      // Check brandId
      const check = await prisma.brand.findUnique({
        where: {
          id: brandId,
        },
      });

      if (check) {
        const data = await prisma.product.create({
          data: {
            name,
            brandId: parseInt(brandId),
            description,
            sku,
          },
        });

        res.status(200).json({ msg: "Create new product success" });
      } else {
        return res
          .status(400)
          .json({ msg: `Brand with this ID was not found.` });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(400).json({ msg: "Insert required fields." });
  }
};
const updateProduct = async (req, res) => {
  const { name, brandId, description, sku } = req.body;
  const { productId } = req.params;
  if ((name && brandId) || description || sku) {
    try {
      // Check brandId
      const check = await prisma.brand.findUnique({
        where: {
          id: brandId,
        },
      });

      if (check) {
        const data = await prisma.product.update({
          data: {
            name,
            brandId: parseInt(brandId),
            description,
            sku,
            updatedAt: new Date(),
          },
          where: {
            id: parseInt(productId),
          },
        });

        res.status(200).json({ msg: "Update product success" });
      } else {
        return res
          .status(400)
          .json({ msg: `Brand with this ID was not found.` });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(400).json({ msg: "Insert required fields." });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const data = prisma.product.delete({
      where: {
        id: parseInt(productId),
      },
    });
    res.status(200).json({ msg: "Delete product success" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getRating = async (req, res) => {
  let { productId } = req.params;
  try {
    let find = await prisma.review.findMany({
      where: {
        productId: parseInt(productId),
      },
      select: {
        rating: true,
        productId: true,
      },
    });
    let num = [];
    find.map(data => {
      num.push(data.rating);
    });
    let totalRating = num.reduce((partialSum, a) => partialSum + a, 0);
    let rating = totalRating / num.length;
    if (rating) {
      res.status(200).json({ data: rating.toString().slice(0, 5) });
    } else {
      res.status(400).json({ message: "no rating" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getRating,
};
