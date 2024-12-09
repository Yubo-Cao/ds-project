import Link from "next/link";
import { getAllBlogs } from "@/lib/db";
import { Typography, Card, CardContent, CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { format } from "date-fns";
import { Blog } from "@/db/schema";

export const revalidate = 1;

export default async function BlogIndexPage() {
  const blogs = await getAllBlogs();

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Blog
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 10, lg: 8 }}>
        <Grid container spacing={2}>
          {blogs.map((b: Blog) => (
            <Grid size={{ xs: 12 }} key={b.id}>
              <Link href={`/blog/${b.id}`} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {b.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Posted on {format(new Date(b.date), "PPpp")}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
