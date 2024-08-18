import { TYPES } from "karmabridge-types";
import { Building2 } from "lucide-react";
import { TypeMapper } from "./TypeMapper";

export function Type({ type }: { type: TYPES }) {
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
