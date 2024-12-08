"use client";

import { ReactNode } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
