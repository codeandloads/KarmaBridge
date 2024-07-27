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

export const JobItem = ({ job }: { job: JOB }) => {
  return (
    <Card className="w-[350px] mb-3">
      <CardHeader>
        <CardTitle className="font-mono text-md">{job.title}</CardTitle>
        <CardDescription>{job.shortDescription}</CardDescription>
        <CardDescription>{job.longDescription}</CardDescription>
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
      <div className="text-sm font-semibold">{type}</div>
    </div>
  );
}
