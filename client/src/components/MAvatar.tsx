import { AUTHOR } from "karmabridge-types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const MAvatar = ({ author }: { author: AUTHOR }) => {
  return (
    <div>
      <div className="inline-flex gap-2 items-center">
        <Avatar className="h-8 w-8">
          {author.imageUrl ? (
            // TODO: think about it !
            <AvatarImage
              src={`http://localhost:5000/avatars/${author.imageUrl}`}
              alt="pro_pic"
            />
          ) : (
            <AvatarFallback>
              {author.firstName?.charAt(0)}
              {author.lastName?.charAt(0)}
            </AvatarFallback>
          )}
        </Avatar>
        <div
          className="text-pretty font-semibold text-slate-700 
          text-xs mt-2"
        >
          <span className="inline-flex flex-col items-start">
            {author.firstName} {author.lastName}
            <span className="text-slate-400">HR at .Org</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MAvatar;
