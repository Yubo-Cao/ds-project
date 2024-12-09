import { Container, Box, Paper } from "@mui/material";
import { Suspense } from "react";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </Paper>
      </Box>
    </Container>
  );
}
