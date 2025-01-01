import * as argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { client } from "@/prisma.config";

// @ts-ignore
const registerMutation = async (_, args: any, context: typeof client) => {
  const { email, password } = args;
  const hashed = await argon2.hash(password);
  if (!hashed) {
    return {
      success: false,
      error: { code: 400, message: "Cannot hash your password" },
    };
  } else {
    try {
      const user = await context.user.create({
        data: {
          firstName: "",
          lastName: "",
          email: email,
          password: hashed,
        },
      });
      return { success: true, code: 200, data: user };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return {
            success: false,
            error: { code: 400, message: "Email already exists" },
          };
        }
      }
    }
  }
};


export { registerMutation };
