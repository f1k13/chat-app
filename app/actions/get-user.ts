import getSession from "./get-session";
import prisma from "../libs/prismadb";
const getUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    if (!currentUser) return null;
    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getUser;
