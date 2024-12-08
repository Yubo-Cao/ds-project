import Link from "next/link";
import { getAllBlogs } from "@/lib/db";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { format } from "date-fns";
import { Blog } from "@/db/schema";

export default async function BlogIndexPage() {
  const blogs = await getAllBlogs();

  return (
    <Box>
      <Typography variant="h4" className="mb-4">
        Blog
      </Typography>
      <Paper className="p-4">
        <List>
          {blogs.map((b: Blog) => (
            <ListItem key={b.id}>
              <ListItemText
                primary={<Link href={`/blog/${b.id}`}>{b.title}</Link>}
                secondary={`Posted on ${format(new Date(b.date), "PPpp")}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
