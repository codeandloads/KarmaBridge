import { useSelector } from "react-redux";
import { selectCurrentUser } from "../slices/profile";
import { useMemo } from "react";

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  return useMemo(() => ({ user }), [user]);
};
