const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getMessage = async (req, res) => {
  const { userId } = req.user;

  try {
    const data = await prisma.message.groupBy({
      by: ["receiverId"],
      where: {
        senderId: parseInt(userId),
      },
      _count: {
        receiverId: true,
      },
    });

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getMessageByReceiverId = async (req, res) => {
  const { userId } = req.user;
  const { receiverId } = req.params;

  try {
    const data = await prisma.message.findMany({
      where: {
        OR: [
          {
            AND: [
              { senderId: parseInt(userId) },
              { receiverId: parseInt(receiverId) },
            ],
          },
          {
            AND: [
              { senderId: parseInt(receiverId) },
              { receiverId: parseInt(userId) },
            ],
          },
        ],
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

const sendMessage = async (req, res) => {
  const { userId } = req.user;
  const { receiverId } = req.params;
  const { content } = req.body;

  if (content) {
    try {
      const data = await prisma.message.create({
        data: {
          content,
          senderId: parseInt(userId),
          receiverId: parseInt(receiverId),
        },
      });

      return res.status(200).json({ msg: "Send message success." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(400).json({ msg: "Insert the required fields." });
  }
};
const deleteMessage = async (req, res) => {
  const { userId } = req.user;
  const { messageId } = req.params;

  try {
    // Get data
    const data = await prisma.message.findFirst({
      where: {
        AND: [{ id: parseInt(messageId) }, { senderId: parseInt(userId) }],
      },
    });

    if (data) {
      await prisma.message.delete({
        where: {
          id: parseInt(messageId),
        },
      });
      return res.status(200).json({ msg: "Delete message success." });
    } else {
      return res
        .status(401)
        .json({ msg: "Unauthorized, user doesn't same as the sender." });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = {
  getMessage,
  getMessageByReceiverId,
  sendMessage,
  deleteMessage,
};
