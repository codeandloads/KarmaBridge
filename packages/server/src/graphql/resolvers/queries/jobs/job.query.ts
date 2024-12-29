import { client } from "@/prisma.config";

// @ts-ignore
const findAllJobsResolver = async (_, __, context: typeof client) => {
  console.log(`the context is ${context.job}`);
  return context.job.findMany();
};

// @ts-ignore
const findJobResolver = async (_, args: any, context: typeof client) => {
  console.log(`args ${args.id}`);
};

export { findAllJobsResolver, findJobResolver };
