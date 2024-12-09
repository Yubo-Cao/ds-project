import { getBlogById, getBlogComments } from "@/lib/db";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { Typography, Box, Paper, Container } from "@mui/material";
import CommentForm, { CommentData } from "./CommentForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BlogPostPage({ params: p }: Props) {
  const params = await p;
  const blogId = parseInt(params.id, 10);
  const blog = await getBlogById(blogId);
  const comments = (await getBlogComments(blogId)).map((c) => ({
    id: c.id,
    content: c.content,
    userId: c.author_id + "",
    blogId: c.blog_id,
    createdAt: c.date,
    user: {
      name: `${c.first_name} ${c.last_name}`,
    },
  })) as CommentData[];

  if (!blog) return <div>Blog post not found</div>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Published on {format(new Date(blog.date), "PPpp")}
        </Typography>
        <Paper sx={{ p: 4, my: 4 }}>
          <article className="prose prose-lg max-w-none">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </article>
        </Paper>

        <Box sx={{ mt: 12 }}>
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>
          <CommentForm blogId={blogId} initialComments={comments} />
        </Box>
      </Box>
    </Container>
  );
}
