"use client";

import { useState, FormEvent } from "react";
import { TextField, Button } from "@mui/material";
import { insertBlogComment } from "@/lib/db";

export default function CommentForm({ blogId }: { blogId: number }) {
  const [content, setContent] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (content.trim().length === 0) return;

    try {
      await insertBlogComment(blogId, 1, content);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        label="Add a comment"
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
}
