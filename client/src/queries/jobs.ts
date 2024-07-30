import { AUTH_AXIOS } from "@/axios/axios";

export async function getJobs() {
  return await AUTH_AXIOS.get("Jobs/Index");
}

export async function searchJobs({
  title,
  query,
}: {
  title: string | undefined;
  query: string | undefined;
}) {
  return await AUTH_AXIOS.get(`Jobs/Search?Title=${title}&Query=${query}`);
}
