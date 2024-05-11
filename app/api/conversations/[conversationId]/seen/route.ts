import getUser from "@/app/actions/get-user";
import { Conversation } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Iparams {
  conversationId?: string;
}

export const POST = async (req: Request, { params }: { params: Iparams }) => {
  try {
    const user = await getUser();
    const { conversationId } = params;

    if (!user?.id || !user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });
    if (!conversation) {
      return new NextResponse("Invalid id", { status: 400 });
    }
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    console.log(error, "error");
    return new NextResponse("Internal error", { status: 500 });
  }
};
