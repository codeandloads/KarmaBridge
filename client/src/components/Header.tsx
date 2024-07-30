import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { LogOut, MoonIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { removeTokens } from "@/utils/token";
import { removeAuth, selectAccessToken } from "@/redux/slices/auth";
import { ProfileInfo } from "@/queries/profile";
import { useQuery } from "@tanstack/react-query";
import { AvatarShimmer } from "./shimmers/avatar.shimmer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/store";

export const Header = () => {
  const dispatch = useAppDispatch();

  const { data: info, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: ProfileInfo,
  });

  const handleLogout = () => {
    removeTokens();
    dispatch(removeAuth());
  };

  console.log(useAppSelector(selectAccessToken));

  return (
    <>
      <div className="p-3 h-18 dark:bg-slate-700 border border-b-2 w-full fixed dark:text-white text-black backdrop-blur-xl font-mono font-semibold m-auto top-0 left-0">
        <div className="max-w-3xl flex gap-2 items-center justify-between flex-grow m-auto">
          <div className="inline-flex gap-5">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
          </div>
          <div className="inline-flex gap-3 items-center">
            <div className="flex-1 inline-flex items-center">
              {isLoading ? (
                <AvatarShimmer />
              ) : info?.data ? (
                <div className="inline-flex gap-2">
                  <Avatar>
                    <AvatarImage src={info?.data.imageUrl} alt="pro_pic" />
                    <AvatarFallback>
                      {info?.data.firstName?.charAt(0)}
                      {info?.data.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="">
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={handleLogout}
                    >
                      <LogOut />
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <Link to="/auth/login" className="[&.active]:font-bold">
                    Login
                  </Link>
                </div>
              )}
            </div>
            <div>
              <Button size={"icon"} variant={"ghost"}>
                <MoonIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
