import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JOB } from "karmabridge-types";
import { BookmarkIcon, HeartIcon, Send } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Type } from "./Type";
import { Category } from "./Category";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const JobItem = ({ job }: { job: JOB }) => {
  return (
    <Card className="mb-3 mt-4">
      <CardHeader>
        <CardTitle className="font-mono text-md">
          <Link
            to="/job/$jobId"
            params={{
              jobId: job.refId,
            }}
          >
            {job.title}
          </Link>
        </CardTitle>
        <div className="inline-flex gap-1 items-center">
          <Avatar className="text-sm">
            <AvatarImage src={job.author.image} alt="pro_pic" />
            <AvatarFallback>
              {job.author.firstName?.charAt(0)}
              {job.author.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div
            className="text-pretty font-semibold text-slate-700 
          text-xs"
          >
            <span className="inline-flex flex-col items-start">
              {job.author.firstName} {job.author.lastName}
              <span className="text-slate-400">HR at .Org</span>
            </span>
          </div>
        </div>
        <CardDescription className="h-5">
          {job.shortDescription}
        </CardDescription>
        <CardDescription>
          {job.longDescription ? (
            <>{job.longDescription.substring(0, 120)}...</>
          ) : null}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <Type type={job.type} />
            <Category title={job.category.title} />
            <div className="flex flex-col space-y-1.5">
              <span className="text-xs text-slate-500 font-semibold">
                View more
              </span>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="space-x-2">
          <Button variant="outline" size={"icon"}>
            <HeartIcon />
          </Button>
          <Button
            variant="ghost"
            aria-label="Save"
            size={"icon"}
            className="font-semibold shadow-md border-slate-400"
          >
            <BookmarkIcon />
          </Button>
        </div>
        <Link
          to={`/job/$jobId`}
          params={{ jobId: job.refId }}
          className="border border-slate-700 rounded-md p-2 shadow-md"
        >
          <span className="inline-flex gap-1 justify-center items-center">
            Apply <Send size={"1.2em"} />
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
};
