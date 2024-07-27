import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/queries/auth";
import { LOGIN_RESPONSE, setToken } from "@/utils/token";
import { AxiosResponse } from "axios";
import { Spinner } from "@/components/ui/spinner";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { FormError } from "@/components/FormError";
import { setAuth } from "@/redux/slices/auth";
import { useAppDispatch } from "@/redux/hooks/store";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const dispath = useAppDispatch();
  const LoginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: AxiosResponse<LOGIN_RESPONSE>) => {
      setToken(data);
      dispath(setAuth(data.data));
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      LoginMutation.mutate(value);
    },
  });
  return (
    <div className="w-1/4 m-auto mt-20">
      <p className="h-1 font-bold mb-9 text-xl">Login</p>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <form.Field
              name="email"
              validators={{
                onChange: z.string().email("Not a valid email address."),
                onChangeAsyncDebounceMs: 500,
              }}
              children={(field) => (
                <>
                  <Input
                    id="email"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FormError field={field} />
                </>
              )}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <form.Field
              name="password"
              validators={{
                onChange: z
                  .string()
                  .min(8, "Minimum 8 and maximum 16 charcters long.")
                  .max(16),
                onChangeAsyncDebounceMs: 500,
              }}
              children={(field) => (
                <>
                  <Input
                    id="password"
                    type="password"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FormError field={field} />
                </>
              )}
            />
          </div>
          <div className="mt-2">
            <Link to="/auth/register" className="font-semibold">
              Don't have an account ?
            </Link>
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? <Spinner /> : "Login"}
              </Button>
            )}
          />
        </form>
      </div>
    </div>
  );
}
