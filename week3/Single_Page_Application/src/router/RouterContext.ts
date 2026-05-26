import { createContext, useContext } from "react";

interface RouterContextValue {
  path: string;
  push: (to: string) => void;
}

export const RouterContext = createContext<RouterContextValue>({
  path: "/",
  push: () => {},
});

export const useRouterContext = () => useContext(RouterContext);
