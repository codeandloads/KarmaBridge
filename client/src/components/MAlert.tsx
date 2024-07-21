import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

type VARIANT = "default" | "destructive";

export const MAlert = ({ variant, title, desc }: { variant: VARIANT; title: string; desc: [string] }) => {
  return (
    <Alert variant={variant} className="z-[-1]">
      <Terminal className="h-3 w-3" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {desc.map((d, index) => (
          <p key={index}>
            {index + 1}. {d}
          </p>
        ))}
      </AlertDescription>
    </Alert>
  );
};
