import { AXIOS } from "@/axios/axios";
import {} from "../components/MInput";

export type REGISTER_FIELDS = {
  Email: string;
  Password: string;
};
export async function loginUser({ email, password }: { email: string; password: string }) {
  return await AXIOS.post("Login", { email, password });
}

export async function registerUser(values: REGISTER_FIELDS) {
  return await AXIOS.post("Register", values);
}
