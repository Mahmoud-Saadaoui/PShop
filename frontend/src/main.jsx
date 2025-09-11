import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from "./routes.jsx";
import { AppProvider } from "./context/appContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {     
      gcTime: 60 * 20 * 1000,  
      retry: 2,                   
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router />
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);