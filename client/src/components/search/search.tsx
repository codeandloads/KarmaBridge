import { useQuery } from "@tanstack/react-query";
import { searchJobs } from "@/queries/jobs";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Button } from "../ui/button";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import type { JOB } from "karmabridge-types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/store";
import { selectJobs, setJobs } from "@/redux/slices/jobs";

export const SearchBar = () => {
  const queryClient = useQueryClient();
  const dispath = useAppDispatch();

  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>();
  const [query, setQuery] = useState<string | undefined>();

  const {
    data: results,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["search_jobs", title, query],
    queryFn: () => searchJobs({ title, query }),
    enabled: shouldFetch,
  });

  useEffect(() => {
    function SearchJobs(data: JOB[]) {
      if (!error && data) {
        dispath(setJobs(data));
      }
    }
    SearchJobs(results?.data);
  }, [dispath, error, results?.data]);

  const form = useForm({
    defaultValues: {
      Keyword: "",
      Query: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      setTitle(value.Keyword);
      setQuery(value.Query);
      queryClient.invalidateQueries({ queryKey: ["search_jobs"] });
      setShouldFetch(true);
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
                // onChange: z.string().min(3, "Not a valid search keyword."),
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
                  className="bg-indigo-500 text-white"
                >
                  {isSubmitting ? <Spinner /> : <>Find jobs</>}
                </Button>
              )}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
