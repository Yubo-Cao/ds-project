"use client";

import { ReactNode } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "@/components/AuthProvider";

const theme = createTheme({});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
