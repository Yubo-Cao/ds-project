import { getBlogById, getBlogComments } from "@/lib/db";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { Typography, Box, Paper, Container, Divider } from "@mui/material";
import CommentForm from "./CommentForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BlogPostPage({ params: p }: Props) {
  const params = await p;
  const blogId = parseInt(params.id, 10);
  const blog = await getBlogById(blogId);
  const comments = await getBlogComments(blogId);

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

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Comments ({comments.length})
          </Typography>
          <Paper sx={{ p: 3, mb: 3 }}>
            {comments.length === 0 ? (
              <Typography color="text.secondary">No comments yet.</Typography>
            ) : (
              comments.map((c, index) => (
                <Box key={c.id}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {c.author_id} on {format(new Date(c.date), "PPpp")}
                    </Typography>
                    <Typography variant="body1">{c.content}</Typography>
                  </Box>
                  {index < comments.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
              ))
            )}
          </Paper>
          <CommentForm blogId={blogId} />
        </Box>
      </Box>
    </Container>
  );
}
