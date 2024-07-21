import { FieldApi } from "@tanstack/react-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FormError } from "./FormError";

export const MInput = ({ field }: { field: FieldApi<any, any, any, any> }) => {
  return (
    <>
      <Label htmlFor={field.name}>{field.name}</Label>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FormError field={field} />
    </>
  );
};
