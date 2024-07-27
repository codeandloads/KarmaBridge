import { useQuery } from "@tanstack/react-query";
import { searchJobs } from "@/queries/jobs";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Button } from "../ui/button";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import type { JOB } from "karmabridge-types";
import { useAppSelector } from "@/redux/hooks/store";
import { selectJobs } from "@/redux/slices/jobs";

export const SearchBar = () => {
  const queryClient = useQueryClient();

  const [mParams, setMParams] = useState<URLSearchParams | undefined>();
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const { data: results } = useQuery({
    queryKey: ["jobs", mParams],
    queryFn: () => searchJobs(mParams),
    enabled: shouldFetch,
  });

  const jobs = useAppSelector(selectJobs);

  console.log("jobs from state", jobs);

  const form = useForm({
    defaultValues: {
      Keyword: "",
      Query: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const params = new URLSearchParams();
      params.append("Title", value.Keyword);
      params.append("Query", value.Query);
      setMParams(params);
      setShouldFetch(true);
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  return (
    <div className="w-full max-w-3xl items-center space-x-2 m-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="mt-2 border border-slate-600 rounded-md gap-2 p-2 flex flex-row justify-normal items-center">
          <div className="w-1/2">
            <form.Field
              name="Keyword"
              validators={{
                onChange: z.string().min(3, "Not a valid search keyword."),
                onChangeAsyncDebounceMs: 500,
              }}
              children={(field) => (
                <>
                  <Input
                    id={field.name}
                    className="border-r-0"
                    name={field.name}
                    value={field.state.value}
                    placeholder="keywords..."
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            />
          </div>
          <div className="w-1/2">
            <form.Field
              name="Query"
              validators={{
                onChangeAsyncDebounceMs: 500,
              }}
              children={(field) => (
                <>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="City, State , Street, Suburb, PostCode"
                    className="border-l-0"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            />
          </div>
          <div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  variant={"secondary"}
                >
                  {isSubmitting ? (
                    <Spinner />
                  ) : (
                    <>
                      <SearchIcon />
                    </>
                  )}
                </Button>
              )}
            />
          </div>
        </div>
      </form>
      {results?.data.map((job: JOB) => <p>{job.title}</p>)}
    </div>
  );
};
