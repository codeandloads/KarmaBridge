import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/queries/jobs";
import { JobItem } from "@/components/JobItem";
import { JOB } from "karmabridge-types";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  return (
    <>
      <div className="mt-20 m-w-xl xl:m-w-3xl md:max-w-md sm:max-w-sm">
        <div>
          <p className="h-1 font-bold">Browse All Jobs</p>
        </div>
        <div className="mt-10">
          {isLoading ? (
            <>Loading...</>
          ) : (
            data?.data.map((job: JOB) => <JobItem key={job.id} job={job} />)
          )}
        </div>
      </div>
    </>
  );
}
