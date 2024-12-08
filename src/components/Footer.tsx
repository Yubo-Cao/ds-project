"use client";

import { Typography, Box } from "@mui/material";

export default function Footer() {
  return (
    <Box className="mt-10 py-4 bg-gray-200 text-center">
      <Typography variant="body2" className="text-gray-700">
        © {new Date().getFullYear()} GSMST Computer Science Club. All rights
        reserved.
      </Typography>
    </Box>
  );
}
