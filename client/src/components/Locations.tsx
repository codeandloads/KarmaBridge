import { LOCATION } from "karmabridge-types";
import { LocateFixedIcon } from "lucide-react";

export const MLocations = ({ locations }: { locations: LOCATION[] }) => {
  return (
    <>
      {locations.map((job: LOCATION, i: number) => (
        <div key={i} className="inline-flex flex-row gap-1 m-0 p-0">
          <div>
            <LocateFixedIcon />
          </div>
          <div>
            <span>
              {job.city}, {job.state}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
