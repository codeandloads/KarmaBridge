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
import MAvatar from "../MAvatar";
import { MLocations } from "../Locations";

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
        <div className="flex flex-col items-start gap-2">
          <MAvatar author={job.author} />
          <div className="grid w-full gap-3 items-center justify-start">
            <Type type={job.type} />
            <Category title={job.category.title} />
            <MLocations locations={job.locations} />
            <div className="flex flex-col space-y-1.5">
              <span className="text-xs text-slate-500 font-semibold">
                View more
              </span>
            </div>
          </div>
        </div>
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
