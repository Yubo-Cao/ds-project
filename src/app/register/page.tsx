"use client";

import { register } from "@/lib/auth";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const gradYears = Array.from({ length: 4 }, (_, i) => 2025 + i);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await register(
        formData.get("email") as string,
        formData.get("password") as string,
        formData.get("firstName") as string,
        formData.get("lastName") as string,
        formData.get("personalEmail") as string,
        {
          "2025": new Date("2025-06-01"),
          "2026": new Date("2026-06-01"),
          "2027": new Date("2027-06-01"),
          "2028": new Date("2028-06-01"),
        }[formData.get("gradYear") as string] as Date
      );

      signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: false,
      });

      router.push("/login?registered=true");
    } catch (error) {
      setError((error as Error).message);
    }
  }

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
          <Typography component="h1" variant="h5" gutterBottom>
            Create an Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  name="firstName"
                  label="First Name"
                  autoComplete="given-name"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  name="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  name="email"
                  label="School Email Address"
                  type="email"
                  autoComplete="email"
                  helperText="Use your school email address"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  name="personalEmail"
                  label="Personal Email Address"
                  type="email"
                  autoComplete="email"
                  helperText="Your non-school email address"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  select
                  fullWidth
                  required
                  name="gradYear"
                  label="Graduation Year"
                  defaultValue="2025"
                >
                  {gradYears.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  inputProps={{ minLength: 8 }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>

            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Link
                href="/login"
                style={{ color: "primary.main", textDecoration: "none" }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
