import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JOB, TYPES } from "karmabridge-types";
import { Building2, HeartIcon, Layers2Icon, Send } from "lucide-react";
import { TypeMapper } from "./TypeMapper";

export const JobItem = ({ job }: { job: JOB }) => {
  return (
    <Card className="mb-3 mt-4">
      <CardHeader>
        <CardTitle className="font-mono text-md">{job.title}</CardTitle>
        <CardDescription className="h-4">
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
        <Button variant="outline" size={"icon"}>
          <HeartIcon />
        </Button>
        <Button variant="outline" size={"default"}>
          <span className="inline-flex gap-1 justify-center items-center">
            Apply <Send size={"1.2em"} />
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

function Category({ title }: { title: string }) {
  return (
    <div className="flex flex-row gap-2 justify-normal items-center">
      <div className="text-sm">
        <Layers2Icon size={"1.2em"} />
      </div>
      <div className="text-sm font-semibold">{title}</div>
    </div>
  );
}

function Type({ type }: { type: TYPES }) {
  return (
    <div className="flex flex-row gap-2 justify-normal items-center">
      <div className="text-sm">
        <Building2 size={"1.2em"} />
      </div>
      <div className="text-sm font-semibold">
        <TypeMapper type={type} />
      </div>
    </div>
  );
}
