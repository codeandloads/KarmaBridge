import { AUTH_AXIOS } from "@/axios/axios";

export async function getJobs() {
  return await AUTH_AXIOS.get("Jobs/Index");
}

export async function searchJobs(queries: URLSearchParams | undefined) {
  return await AUTH_AXIOS.get("Jobs/Search", { params: queries });
}
