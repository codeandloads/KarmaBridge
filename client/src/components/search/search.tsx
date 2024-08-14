import { zodValidator } from "@tanstack/zod-form-adapter";
import { Button } from "../ui/button";
import { useForm } from "@tanstack/react-form";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useSearchJobsQuery } from "@/redux/services/jobs/jobs.service";
import { useAppDispatch } from "@/redux/hooks/store";
import { setJobs } from "@/redux/slices/jobs";

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState<boolean>(true);
  const [searchParmas, setSearchParams] = useState<{
    Title: string | undefined;
    Query: string | undefined;
  }>({ Query: undefined, Title: undefined });

  const { data, error, isLoading, isFetching } =
    useSearchJobsQuery(searchParmas);

  useEffect(() => {
    if (!skip && !isLoading && !error && data && !isFetching) {
      dispatch(setJobs(data));
      setSkip(true);
    }
  }, [skip, isLoading, error, data, dispatch, isFetching]);

  const form = useForm({
    defaultValues: {
      Keyword: "",
      Query: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      setSearchParams({ Title: value.Keyword, Query: value.Query });
      setSkip(false);
    },
  });

  return (
    <>
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
    </>
  );
};
