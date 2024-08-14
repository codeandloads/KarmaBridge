import { useGetJobQuery } from "@/redux/services/jobs/jobs.service";

export const JobDetails = ({ id }: { id: string }) => {
  console.log("job details", id);
  const { data, error, isLoading } = useGetJobQuery({ id });
  if (isLoading) {
    return <>Loading details...</>;
  }
  if (error) {
    return <>{JSON.stringify(error)}</>;
  }
  return <div>{JSON.stringify(data)}</div>;
};
