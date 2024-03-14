import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./global/reactQuery.ts";
import { CustomProvider } from "rsuite";
import "rsuite/Loader/styles/index.css";
import Dialog from "./components/dialog/Dialog.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CustomProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <App />
          <Dialog />
        </RecoilRoot>
      </QueryClientProvider>
    </CustomProvider>
  </React.StrictMode>,
);
