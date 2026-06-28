import { createBrowserRouter, Outlet } from "react-router";
import { InputPage } from "./pages/InputPage";
import { LoadingPage } from "./pages/LoadingPage";
import { ResultsPage } from "./pages/ResultsPage";
import { Toaster } from "sonner";

function RootLayout() {
  return (
    <div className="min-h-screen bg-[#FFF7FA] text-[#111111] font-space overflow-hidden relative">
      <Outlet />
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: "white",
            border: "4px solid black",
            color: "black",
            fontFamily: "inherit",
            fontWeight: "bold",
            borderRadius: "0px",
            boxShadow: "4px 4px 0px #111",
            padding: "16px",
            fontSize: "14px"
          }
        }} 
      />
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
