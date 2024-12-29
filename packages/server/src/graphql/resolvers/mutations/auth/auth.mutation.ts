import * as argon2 from "argon2";
import {
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import { client } from "@/prisma.config";

// @ts-ignore
const registerMutation = async (_, args: any, context: typeof client) => {
  const { email, password } = args;
  const hashed = await argon2.hash(password);
  if (!hashed) {
    console.error("Cannot hash user !");
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
      if (!user) {
        console.log("CREATE USER");
      }
      console.log(`USER FOUND`);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return "Email already exists";
        }
      }
    }
  }
};

// @ts-ignore
const addPostMutation = async (_, __, context: typeof client) => {};

export { addPostMutation, registerMutation };
