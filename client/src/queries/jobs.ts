import { AUTH_AXIOS } from "@/axios/axios";

export async function getJobs() {
  return await AUTH_AXIOS.get("Jobs/Index");
}
