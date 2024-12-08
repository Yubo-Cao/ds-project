import { Typography, Box } from "@mui/material";

export default function HomePage() {
  return (
    <Box className="flex flex-col items-center justify-center py-20">
      <Typography variant="h2" className="text-center font-bold mb-4">
        GSMST Computer Science Club
      </Typography>
      <Typography variant="h6" className="text-center text-gray-600 max-w-lg">
        Welcome to the website of the CS Club of the #1 High School in Georgia.
        Created and maintained by GSMST students.
      </Typography>
    </Box>
  );
}
