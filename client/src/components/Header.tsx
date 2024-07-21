import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { LogOut, MoonIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch } from "react-redux";
import { useAuth } from "@/redux/hooks/auth";
import { removeTokens } from "@/utils/token";
import { removeAuth } from "@/redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();

  const handleLogout = () => {
    removeTokens();
    dispatch(removeAuth());
  };

  return (
    <>
      <div className="p-3 h-18 bg-slate-300 dark:bg-slate-300 w-full fixed dark:text-white backdrop-blur-xl font-mono font-semibold m-auto top-0 left-0">
        <div className="ml-10 m-w-lg flex gap-2 items-center justify-between">
          <div className="inline-flex gap-3">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
            <Link to="/auth/login" className="[&.active]:font-bold">
              Login
            </Link>
            <Link to="/auth/register" className="[&.active]:font-bold">
              Register
            </Link>
          </div>
          <div className="inline-flex gap-3">
            <div className="flex-1">
              {user && user.Email ? (
                <div className="inline-flex gap-2">
                  <Avatar>
                    <AvatarImage src={user.imageUrl} alt="pro_pic" />
                    <AvatarFallback>
                      {user.FirstName.charAt(0)}
                      {user.LastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="">
                    <Button size={"icon"} variant={"ghost"} onClick={handleLogout}>
                      <LogOut />
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
            <Button size={"icon"} variant={"ghost"}>
              <MoonIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
