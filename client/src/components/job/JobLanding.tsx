import { JobItem } from "@/components/job/JobItem";
import { JOB } from "karmabridge-types";
import { SearchBar } from "../search/search";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/store";
import { selectJobs, setJobs } from "@/redux/slices/jobs";
import { useEffect } from "react";
import { Paginate } from "../pagination/paginate";
import { useGetJobsQuery } from "@/redux/services/jobs/jobs.service";
import { JobDetails } from "./JobDetails";

export const JobLanding = () => {
  const dispath = useAppDispatch();
  const { isLoading, data, error } = useGetJobsQuery();

  useEffect(() => {
    if (!error && data?.jobs) {
      dispath(setJobs(data));
    }
  }, [data, dispath, error]);

  const { jobs } = useAppSelector(selectJobs);

  return (
    <>
      <div className="w-full max-w-3xl items-center space-x-2 m-auto">
        <SearchBar />
      </div>
      <div
        className="max-w-3xl m-auto grid xl:grid-cols-3 sm:grid-cols-1 lg:grid-cols-2 grid-cols-2
      gap-4"
      >
        {isLoading ? (
          <>Loading...</>
        ) : (
          jobs && jobs?.map((job: JOB) => <JobItem key={job.id} job={job} />)
        )}
      </div>
      <Paginate />
    </>
  );
};

// INFO: , fetch individual job based on the job ID : https://redux-toolkit.js.org/rtk-query/usage/queries
