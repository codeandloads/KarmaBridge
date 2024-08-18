import { JobDetail } from "@/components/job/JobDetail";
import { useGetJobQuery } from "@/redux/services/jobs/jobs.service";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/job/$jobId")({
  component: Details,
});

function Details() {
  const { jobId } = Route.useParams();
  const { data, error, isLoading } = useGetJobQuery({ id: jobId });
  if (error) {
    return <>{JSON.stringify(error)}</>;
  }
  return isLoading ? (
    <>Loading details...</>
  ) : (
    data && (
      <div className="m-auto max-w-2xl xl:max-w-3xl md:max-w-md sm:max-w-sm">
        <div className="mt-20">
          <div className="mt-10 max-w-3xl m-auto">
            <JobDetail job={data} />
          </div>
        </div>
      </div>
    )
  );
}
