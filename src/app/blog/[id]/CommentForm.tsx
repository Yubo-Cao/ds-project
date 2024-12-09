"use client";

import { useState, FormEvent } from "react";
import { TextField, Button, Paper, Box, Alert } from "@mui/material";
import { insertBlogComment } from "@/lib/db";
import { useSession } from "next-auth/react";

interface CommentData {
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
  onCommentAdded?: (comment: CommentData) => void;
}

export default function CommentForm({
  blogId,
  onCommentAdded,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
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

    try {
      const newComment = await insertBlogComment(blogId, userId, content);
      setContent("");

      if (onCommentAdded) {
        onCommentAdded({
          id: newComment.id,
          content,
          userId: userId,
          blogId,
          createdAt: new Date(),
          user: {
            name: session.user.name || "Unknown User",
          },
        });
      }
    } catch (error) {
      setError("Failed to post comment. Please try again.");
      console.error("Error creating comment:", error);
    }
  }

  return (
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
  );
}
