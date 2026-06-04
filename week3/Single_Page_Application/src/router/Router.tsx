import { type ReactNode } from "react";
import { RouterContext } from "./RouterContext";
import { useRouter } from "./useRouter";
import { Navbar } from "../components/Navbar";

interface RouteProps {
  path: string;
  element: ReactNode;
}

interface RouterProps {
  routes: RouteProps[];
  notFound: ReactNode;
}

export function Router({ routes, notFound }: RouterProps) {
  const router = useRouter();

  const matched = routes.find((route) => route.path === router.path);

  return (
    <RouterContext.Provider value={router}>
      <Navbar />
      {matched ? matched.element : notFound}
    </RouterContext.Provider>
  );
}
