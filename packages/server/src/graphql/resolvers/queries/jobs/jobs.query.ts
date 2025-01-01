import { client } from "@/prisma.config";

// @ts-ignore
const allJobsQuery = async (_, __, context: typeof client) => {
  return context.job.findMany();
};

// @ts-ignore
const jobQuery = async (_, args: any, context: typeof client) => {
  return context.job.findUnique({ where: { id: args.id } });
};

export { allJobsQuery, jobQuery };
