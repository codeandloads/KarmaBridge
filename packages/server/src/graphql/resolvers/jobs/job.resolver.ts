import {client} from "@/config/config";

// @ts-ignore
const findAllJobsResolverFn = async (_, __, context:typeof client) => {
  console.log(`the context is ${context.job}`);
  return context.job.findMany();
};

// @ts-ignore
const findJobResolverFn= async (_, args:any,context:typeof client) => {
    console.log(`args ${args.id}`);
}

export {
  findAllJobsResolverFn,
  findJobResolverFn
}