import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, name, password } = body;
    const username = await prisma.user.findFirst({
      where: {
        name: name,
      },
    });
    const userEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }
    if (userEmail) {
      return new NextResponse("Email already exist", { status: 400 });
    }
    if (username) {
      return new NextResponse("Username already exist", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse("internal error", { status: 500 });
  }
}
