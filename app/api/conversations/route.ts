import getUser from "@/app/actions/get-user";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request) => {
  try {
    const user = await getUser();
    const body = await req.json();
    const { userId, isGroup, members, name } = body;
    if (!user?.id || !user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("invalid date", { status: 400 });
    }
    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((item: { value: string }) => ({
                id: item.value,
              })),
              {
                id: user.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversation);
    }

    const exisitingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [user.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, user.id],
            },
          },
        ],
      },
    });

    const singleConversation = exisitingConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: user.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};
