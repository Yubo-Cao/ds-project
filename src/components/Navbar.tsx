import NextLink from "next/link";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { HomeIcon, FileText, Users, Calendar, UserPlus } from "lucide-react";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0, fontWeight: "bold" }}
        >
          GSMST CS Club
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          {[
            { href: "/", icon: <HomeIcon />, label: "Home" },
            { href: "/blog", icon: <FileText />, label: "Blog" },
            { href: "/members", icon: <Users />, label: "Members" },
            { href: "/events", icon: <Calendar />, label: "Events" },
            { href: "/teams", icon: <UserPlus />, label: "Teams" },
          ].map(({ href, icon, label }) => (
            <Button
              key={href}
              component={NextLink}
              href={href}
              startIcon={icon}
              sx={{
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
