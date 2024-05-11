import prisma from "../libs/prismadb";

import getUser from "./get-user";

const getConversationById = async (conversationId: string) => {
  try {
    const user = await getUser();
    if (!user?.email) return null;
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    return conversation;
  } catch (error: any) {
    console.error(error);
  }
};

export default getConversationById;
