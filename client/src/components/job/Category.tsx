import { Layers2Icon } from "lucide-react";

export function Category({ title }: { title: string }) {
  return (
    <div className="flex flex-row gap-2 justify-normal items-center">
      <div className="text-sm">
        <Layers2Icon size={"1.2em"} />
      </div>
      <div className="text-sm font-semibold">{title}</div>
    </div>
  );
}
