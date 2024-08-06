import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { JOBS_RESPONSE } from "karmabridge-types";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/Jobs/" }),
  tagTypes: ["Jobs"],
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
  }),
});

export const { useGetJobsQuery, useSearchJobsQuery } = jobsApi;
