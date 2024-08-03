import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/queries/jobs";
import { JobItem } from "@/components/job/JobItem";
import { JOB } from "karmabridge-types";
import { SearchBar } from "../search/search";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/store";
import { selectJobs, setJobs } from "@/redux/slices/jobs";
import { useEffect, useState } from "react";
import { Paginate } from "../pagination/paginate";

export const JobLanding = () => {
  const dispath = useAppDispatch();
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
    enabled: shouldFetch,
  });

  useEffect(() => {
    setShouldFetch(true);

    if (!error && data?.data) {
      dispath(setJobs(data.data));
    }
  }, [data?.data, dispath, error]);

  const jobs = useAppSelector(selectJobs);

  return (
    <>
      <div className="w-full max-w-3xl items-center space-x-2 m-auto">
        <SearchBar />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mt-8">
          {isLoading ? (
            <>Loading...</>
          ) : (
            jobs && jobs?.map((job: JOB) => <JobItem key={job.id} job={job} />)
          )}
        </div>
      </div>
      <Paginate />
    </>
  );
};
