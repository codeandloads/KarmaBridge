import { AUTH_AXIOS } from "@/axios/axios";

export async function ProfileInfo() {
  return await AUTH_AXIOS.get("User/Info");
}
