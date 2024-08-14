import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { JOB, JOBS_RESPONSE } from "karmabridge-types";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/Jobs/" }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query<JOBS_RESPONSE, void>({
      query: () => "Index",
    }),
    getJob: builder.query<JOB, { id: string }>({
      query: (id) => `${id}`,
    }),
    searchJobs: builder.query<
      JOBS_RESPONSE,
      { Title: string | undefined; Query: string | undefined }
    >({
      query: (body) => `Search/?Query=${body.Query}&Title=${body.Title}`,
    }),
  }),
});

export const { useGetJobsQuery, useSearchJobsQuery, useGetJobQuery } = jobsApi;
