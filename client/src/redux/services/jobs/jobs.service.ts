import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { JOBS_RESPONSE } from "karmabridge-types";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/Jobs/" }),
  tagTypes: ["jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query<JOBS_RESPONSE, void>({
      query: () => "Index",
    }),
    searchJobs: builder.query<
      JOBS_RESPONSE,
      { Title: string | undefined; Query: string | undefined }
    >({
      query: (body) => `Search/?Query=${body.Query}&Title=${body.Title}`,
    }),
    // TODO: search jobs, should take in search paramerters and after a sucess response it should invalidate the cache i.e our tag wit "jobs" and return in transformed jobs just like in line 11.
  }),
});

export const { useGetJobsQuery, useSearchJobsQuery } = jobsApi;
