import { Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/queries/auth";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function ProfileEdit() {
  const RegisterMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {},
  });

  const form = useForm({
    defaultValues: {
      email: "",
      MiddleName: "",
      LastName: "",
      UserName: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      RegisterMutation.mutate(value);
    },
  });
  return (
    <div className="w-1/4 m-auto mt-20">
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
            <Label htmlFor="email">Username</Label>
            <form.Field
              name="UserName"
              validators={{
                onChange: z
                  .string()
                  .min(8, "Username should be greater than 8 charcters."),
                onChangeAsyncDebounceMs: 500,
              }}
              children={(field) => (
                <>
                  <Input
                    id="username"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div className="text-red-600 font-semibold text-xs mt-1 opacity-80">
                    {field.state.meta.errors ? (
                      <em role="alert">{field.state.meta.errors.join(", ")}</em>
                    ) : null}
                  </div>
                </>
              )}
            />
          </div>
          <div>
            <Label htmlFor="firstname">Firstname</Label>
            <form.Field
              name="firstname"
              children={(field) => (
                <Input
                  id="firstname"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </div>

          <div>
            <Label htmlFor="middlename">Middlename</Label>
            <form.Field
              name="MiddleName"
              children={(field) => (
                <Input
                  id="middlename"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </div>

          <div>
            <Label htmlFor="lastname">Lastname</Label>
            <form.Field
              name="LastName"
              children={(field) => (
                <Input
                  id="lastname"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <form.Field
              name="email"
              children={(field) => (
                <Input
                  id="email"
                  type="email"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <form.Field
              name="password"
              children={(field) => (
                <Input
                  id="password"
                  type="password"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
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
  );
}
