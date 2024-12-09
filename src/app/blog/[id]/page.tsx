import { getBlogById, getBlogComments } from "@/lib/db";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { Typography, Box, Paper } from "@mui/material";
import CommentForm from "./ComentForm";

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
    <Box>
      <Typography variant="h3" className="mb-4">
        {blog.title}
      </Typography>
      <Typography variant="subtitle2" className="text-gray-600 mb-6">
        Published on {format(new Date(blog.date), "PPpp")}
      </Typography>
      <article className="prose prose-lg max-w-none">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </article>

      <Box className="mt-10">
        <Typography variant="h5" className="mb-4">
          Comments
        </Typography>
        <Paper className="p-4 mb-4">
          {comments.length === 0 ? (
            <Typography>No comments yet.</Typography>
          ) : (
            comments.map((c) => (
              <Box key={c.id} className="mb-4">
                <Typography variant="subtitle2" className="text-gray-700">
                  {c.author_id} on {format(new Date(c.date), "PPpp")}
                </Typography>
                <Typography>{c.content}</Typography>
              </Box>
            ))
          )}
        </Paper>
        <CommentForm blogId={blogId} />
      </Box>
    </Box>
  );
}
