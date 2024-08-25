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
import { ArrowLeft, BookmarkIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Category } from "./Category";
import { Type } from "./Type";
import { formatRelative } from "date-fns";

export const JobDetail = ({ job }: { job: JOB }) => {
  {
    console.log(new Date());
  }
  return (
    <>
      <Card className="min-w-full">
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-1 mb-3">
            {/* TODO: pop from the navigation statck, that way a user is 
            redirected back where he/she came from. i.e navigation.pop()  */}
            <Link to="/">
              <ArrowLeft />
            </Link>
            {job.title}
          </CardTitle>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-slate-600">
              {formatRelative(job.createdAt, new Date())}
            </span>
            <Category title={job.category.title} />
            <div className="mb-4">
              {" "}
              <Type type={job.type} />
            </div>
          </div>
          <CardDescription>{job.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent>{job.longDescription}</CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="ghost"
            aria-label="Save"
            size={"icon"}
            className="font-semibold shadow-md border-slate-400"
          >
            <BookmarkIcon />
          </Button>
          <Button
            variant={"outline"}
            className="font-semibold shadow-md border-slate-700"
          >
            <span>Apply</span>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
