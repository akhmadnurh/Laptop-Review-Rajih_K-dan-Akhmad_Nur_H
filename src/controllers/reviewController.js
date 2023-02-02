const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createReview = async (req, res) => {
  let { userId } = req.user;
  let { idProduct } = req.params;
  let { content, rating } = req.body;
  try {
    if (content && rating) {
      await prisma.review.create({
        data: {
          content,
          rating: Number(rating),
          productId: parseInt(idProduct),
          userId,
        },
      });
      return res.status(200).json({ msg: "Success Create new Review" });
    } else {
      return res.status(400).json({ msg: "The field is required." });
    }
  } catch (error) {
    return res.status(404).json({ msg: "id Product Not Found" });
  }
};

const updateReview = async (req, res) => {
  let { userId } = req.user;
  let { idReview } = req.params;
  let { content, rating } = req.body;

  try {
    if (content && rating) {
      let find = await prisma.review.findFirst({
        where: {
          AND: [
            {
              userId: parseInt(userId),
            },
            { id: parseInt(idReview) },
          ],
        },
      });
      if (find) {
        await prisma.review.update({
          where: {
            id: parseInt(idReview),
          },
          data: {
            content,
            rating: Number(rating),
          },
        });
        return res.status(200).json({ msg: "Success Update Review" });
      } else {
        return res
          .status(401)
          .json({ msg: "Unauthorized. Cannot Update the review" });
      }
    } else {
      return res.status(400).json({ msg: "The field is required." });
    }
  } catch (error) {
    return res.status(404).json({ msg: "id Review Not Found" });
  }
};

const getByIdReview = async (req, res) => {
  let { id } = req.params;

  try {
    const find = await prisma.review.findFirstOrThrow({
      where: {
        id: parseInt(id),
      },
      include: {
        comment: true,
      },
    });
    return res.status(200).json({ data: find });
  } catch (error) {
    return res.status(404), json({ msg: "id Product Not Found" });
  }
};

const deleteReview = async (req, res) => {
  let { idReview } = req.params;
  let { userId, role } = req.user;

  try {
    let find = await prisma.review.findFirstOrThrow({
      where: {
        AND: [
          {
            userId: parseInt(userId),
          },
          { id: parseInt(idReview) },
        ],
      },
    });
    if (find || role === "admin") {
      await prisma.review.delete({
        where: {
          id: parseInt(idReview),
        },
      });
      return res.status(200).json({ msg: "Success Delete Review" });
    } else {
      return res
        .status(401)
        .json({ msg: "Unauthorized. Cannot Delete the review" });
    }
  } catch (error) {
    return res.status(404).json({ msg: "id Review Not Found" });
  }
};

module.exports = { createReview, getByIdReview, updateReview, deleteReview };
