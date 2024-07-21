import { FieldApi } from "@tanstack/react-form";

export const FormError = ({ field }: { field: FieldApi<any, any, any, any> }) => {
  return (
    <div className="text-red-600 font-semibold text-xs m-2 opacity-80 p-1 h-2">
      {field.state.meta.errors ? <em role="alert">{field.state.meta.errors.join(", ")}</em> : null}
    </div>
  );
};
