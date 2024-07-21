import { Header } from "@/components/Header";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@/components/ui/toaster";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Header />
      <div className="container m-w-2xl">
        <Outlet />
        <Toaster />
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
