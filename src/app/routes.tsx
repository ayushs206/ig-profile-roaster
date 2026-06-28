import { createBrowserRouter, Outlet } from "react-router";
import { InputPage } from "./pages/InputPage";
import { LoadingPage } from "./pages/LoadingPage";
import { ResultsPage } from "./pages/ResultsPage";

function RootLayout() {
  return (
    <div className="min-h-screen bg-[#FFF7FA] text-[#111111] font-space overflow-hidden relative">
      <Outlet />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: InputPage },
      { path: "loading", Component: LoadingPage },
      { path: "results", Component: ResultsPage },
    ],
  },
]);
