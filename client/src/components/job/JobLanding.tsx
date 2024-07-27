import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/queries/jobs";
import { JobItem } from "@/components/job/JobItem";
import { JOB } from "karmabridge-types";
import { SearchBar } from "../search/search";
import { useAppDispatch } from "@/redux/hooks/store";
import { setJobs } from "@/redux/slices/jobs";

export const JobLanding = () => {
  const dispath = useAppDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  if (!error && data?.data) {
    dispath(setJobs(data.data[0]));
  }

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
            data?.data?.map((job: JOB) => <JobItem key={job.id} job={job} />)
          )}
        </div>
      </div>
    </>
  );
};
