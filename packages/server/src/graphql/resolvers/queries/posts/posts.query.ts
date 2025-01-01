import { client } from "@/prisma.config";

// @ts-ignore
const allPostsQuery = async (_, __, context: typeof client) => {
  return context.post.findMany();
};

// @ts-ignore
const postQuery = async (_, args: any, context: typeof client) => {
  return context.post.findUnique({ where: { id: args.id } });
};

export { allPostsQuery, postQuery };