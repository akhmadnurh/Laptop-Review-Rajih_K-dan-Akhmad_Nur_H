const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCommentsByReviewId = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const data = await prisma.comment.findMany({
      where: {
        reviewId: parseInt(reviewId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getCommentsByUserId = async (req, res) => {
  const { userId } = req.user;

  try {
    const data = await prisma.comment.findMany({
      where: {
        userId: parseInt(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createComment = async (req, res) => {
  const { userId } = req.user;
  const { reviewId } = req.params;
  const { content } = req.body;

  if (content) {
    try {
      const data = await prisma.comment.create({
        data: {
          content,
          userId: parseInt(userId),
          reviewId: parseInt(reviewId),
        },
      });
      return res.status(200).json({ msg: "create new comment success." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(400).json({ msg: "Insert the required fields." });
  }
};

const updateComment = async (req, res) => {
  const { userId } = req.user;
  const { commentId } = req.params;
  const { content } = req.body;

  if (content) {
    try {
      // Check userId is creator of the comment
      const check = await prisma.comment.findFirst({
        where: {
          AND: [{ id: parseInt(commentId) }, { userId: parseInt(userId) }],
        },
      });
      if (check) {
        const data = await prisma.comment.update({
          data: {
            content,
            updatedAt: new Date(),
          },
          where: {
            id: parseInt(commentId),
          },
        });

        return res.status(200).json({ msg: "Update comment success." });
      } else {
        return res
          .status(401)
          .json({ msg: "Unauthorized. Cannot update the comment." });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(400).json({ msg: "Insert the required field." });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId, role } = req.user;

  try {
    // Check userId is the creator of the comment or role is admin
    const check = await prisma.comment.findFirstOrThrow({
      where: {
        AND: [{ userId: parseInt(userId) }, { id: parseInt(commentId) }],
      },
    });
    if (check || role === "admin") {
      const data = await prisma.comment.delete({
        where: {
          id: parseInt(commentId),
        },
      });
      return res.status(200).json({ msg: "Delete comment success." });
    } else {
      return res
        .status(401)
        .json({ msg: "Unauthorized. Cannot delete the comment." });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getCommentsByReviewId,
  getCommentsByUserId,
  createComment,
  updateComment,
  deleteComment,
};
