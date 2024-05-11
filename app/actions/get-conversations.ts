import prisma from "../libs/prismadb";
import getUser from "./get-user";

const getConversations = async () => {
  const user = await getUser();

  if (!user?.id) return [];
  try {
    const conversation = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: user.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return conversation;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
