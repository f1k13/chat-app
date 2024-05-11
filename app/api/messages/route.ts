import getUser from "@/app/actions/get-user";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
export const POST = async (req: Request) => {
  try {
    const user = await getUser();
    const body = await req.json();
    const { message, image, conversationId } = body;
    if (!user?.id || !user?.email) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: user.id,
          },
        },
        seen: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
