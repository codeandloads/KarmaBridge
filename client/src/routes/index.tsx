import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobs } from "@/queries/jobs";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({ queryKey: ["jobs"], queryFn: getJobs });

  return (
    <>
      <div className="mt-20">
        <div>
          <p className="h-1 font-bold">All Jobs</p>
        </div>
        <div className="mt-10">{isLoading ? <>Loading...</> : data?.data.map((job) => <div key={job.id}>{job.title}</div>)}</div>
      </div>
    </>
  );
}
