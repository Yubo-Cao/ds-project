
"use client";

import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "true";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
        return;
      }

      router.push("/");
    } catch (error) {
      setError((error as Error).message);
    }
  }

  return (
    <>
      <Typography component="h1" variant="h5" gutterBottom>
        Login
      </Typography>

      {justRegistered && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Registration successful! Please log in.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              required
              name="email"
              label="Email Address"
              type="email"
              autoComplete="email"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>

        <Typography variant="body2" align="center">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            style={{ color: "primary.main", textDecoration: "none" }}
          >
            Register here
          </Link>
        </Typography>
      </Box>
    </>
  );
}