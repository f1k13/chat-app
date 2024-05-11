import getUser from "@/app/actions/get-user";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface Iparams {
  conversationId?: string;
}

export const DELETE = async (req: Request, { params }: { params: Iparams }) => {
  try {
    const { conversationId } = params;
    const user = await getUser();
    if (!user?.id) return new NextResponse("Unauthorized", { status: 401 });
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    if (!existingConversation)
      return new NextResponse("Invalid id", { status: 400 });

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [user.id],
        },
      },
    });
    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
