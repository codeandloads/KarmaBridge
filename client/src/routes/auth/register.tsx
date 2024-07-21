import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { REGISTER_FIELDS, registerUser } from "@/queries/auth";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { MInput } from "@/components/MInput";
import { AxiosError, AxiosResponse } from "axios";
import { MErrors } from "@/utils/errors";
import { useState } from "react";
import { MAlert } from "@/components/MAlert";
import { useToast } from "@/components/ui/use-toast";

export const Route = createFileRoute("/auth/register")({
  component: Register,
});

function Register() {
  const { toast } = useToast();
  const [showAlert, setShowAltert] = useState<boolean>(false);
  const [errors, setErrors] = useState<[string]>([""]);
  const RegisterMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: ({ data, status }: AxiosResponse<REGISTER_FIELDS>) => {
      if (status == 200) {
        form.reset();
        toast({
          title: "Registration Success!",
          description: `You can now login with your email address`,
          variant: "default",
        });
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (data: AxiosError<any, any>) => {
      if (data.response?.status == 400) {
        const error = data.response.data?.errors;
        const errors = MErrors(error);
        setErrors(errors as [string]);
        setShowAltert(true);
      }
    },
  });

  const form = useForm({
    defaultValues: {
      Email: "",
      Password: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      setShowAltert(false);
      RegisterMutation.mutate(value);
    },
  });
  return (
    <>
      <div className="w-2/4 m-auto mt-20">{showAlert ? <MAlert variant="destructive" title="Errors" desc={errors} /> : null}</div>
      <div className="w-1/4 m-auto mt-8">
        <p className="h-1 font-bold mt-2 mb-9 text-xl">Registration</p>
        <div className="">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div>
              <form.Field
                name="Email"
                validators={{
                  onChange: z.string().email("Not a valid email address."),
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => <MInput field={field} />}
              />
            </div>

            <div>
              <form.Field
                name="Password"
                validators={{
                  onChange: z.string().min(8, "Minimum 8 and maximum 16 charcters long.").max(16),
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => <MInput field={field} />}
              />
            </div>
            <div className="mt-2 mb-2">
              <Link to="/auth/login" className="font-semibold">
                Already have an account ?
              </Link>
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? <Spinner /> : "Register"}
                </Button>
              )}
            />
          </form>
        </div>
      </div>
    </>
  );
}
