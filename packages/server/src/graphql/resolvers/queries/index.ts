import {
  allPostsQuery,
  postQuery,
} from "@/graphql/resolvers/queries/posts/posts.query";
import { jobQuery } from "@/graphql/resolvers/queries/jobs/jobs.query";

export const Queries = {
  jobs: allPostsQuery,
  job: jobQuery,
  posts: allPostsQuery,
  post: postQuery,
};
