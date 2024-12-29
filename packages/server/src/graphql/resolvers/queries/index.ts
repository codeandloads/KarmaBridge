import {
  findAllJobsResolver,
  findJobResolver,
} from "@/graphql/resolvers/queries/jobs/job.query";

export const Queries = {
  jobs: findAllJobsResolver,
  job: findJobResolver,
};
