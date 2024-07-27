import { JobLanding } from "@/components/job/JobLanding";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div className=" m-auto m-w-xl xl:m-w-3xl md:max-w-md sm:max-w-sm"></div>
      <div className="mt-20">
        <div className="mt-10 max-w-3xl m-auto">
          <JobLanding />
        </div>
      </div>
    </>
  );
}
