"use client";

import { useState, FormEvent } from "react";
import {
  TextField,
  Button,
  Paper,
  Box,
  Alert,
  Typography,
  Divider,
} from "@mui/material";
import { insertBlogComment } from "@/lib/db";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

export interface CommentData {
  id: number;
  content: string;
  userId: string;
  blogId: number;
  createdAt: Date;
  user: {
    name: string;
  };
}

interface CommentFormProps {
  blogId: number;
  initialComments: CommentData[];
}

export default function CommentForm({
  blogId,
  initialComments,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [comments, setComments] = useState(initialComments);
  const { data: session } = useSession();
  // @ts-expect-error - id is added in the jwt callback
  const userId = session?.user?.id;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!session?.user) {
      setError("Please log in to comment");
      return;
    }

    if (content.trim().length === 0) {
      setError("Comment cannot be empty");
      return;
    }

    const optimisticComment: CommentData = {
      id: Date.now(),
      content,
      userId: userId,
      blogId: blogId,
      createdAt: new Date(),
      user: {
        name: session.user.name || "Anonymous",
      },
    };

    setComments((prev) => [...prev, optimisticComment]);
    setContent("");

    try {
      await insertBlogComment(blogId, userId, content);
    } catch (error) {
      setComments((prev) => prev.filter((c) => c.id !== optimisticComment.id));
      setError("Failed to post comment. Please try again.");
      setContent(content); // Restore content
      console.error("Error creating comment:", error);
    }
  }

  return (
    <>
      <Paper sx={{ p: 3, mb: 3 }}>
        {comments.length === 0 ? (
          <Typography color="text.secondary">No comments yet.</Typography>
        ) : (
          comments.map((c, index) => (
            <Box key={c.id}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {c.userId} on {format(new Date(c.createdAt), "PPpp")}
                </Typography>
                <Typography variant="body1">{c.content}</Typography>
              </Box>
              {index < comments.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
          ))
        )}
      </Paper>
      <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Add a comment"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit" disabled={!session?.user}>
              {session?.user ? "Submit Comment" : "Login to Comment"}
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
}
