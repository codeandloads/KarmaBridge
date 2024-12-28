import {findAllJobsResolverFn, findJobResolverFn} from "./jobs/job.resolver";

// INFO: RESOLVERS
export const resolvers = {
  Query: {
    jobs: findAllJobsResolverFn,
    job: findJobResolverFn,
  },
};
