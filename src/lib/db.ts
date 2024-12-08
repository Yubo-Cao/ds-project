"use server";

import { CompetitiveTeam, Member, Event, Blog, BlogComment } from "@/db/schema";
import { sql } from "@vercel/postgres";

export async function getAllMembers() {
  const { rows } =
    await sql<Member>`SELECT * FROM members ORDER BY last_name, first_name;`;
  return rows;
}

export async function getAllEvents() {
  const { rows } = await sql<Event>`SELECT * FROM events ORDER BY date;`;
  return rows;
}

export async function getAllTeams() {
  const { rows } =
    await sql<CompetitiveTeam>`SELECT * FROM competitive_teams ORDER BY name;`;
  return rows;
}

export async function getAllBlogs() {
  const { rows } = await sql<Blog>`SELECT * FROM blogs ORDER BY date DESC;`;
  return rows;
}

export async function getBlogById(id: number) {
  const { rows } = await sql`SELECT * FROM blogs WHERE id = ${id} LIMIT 1;`;
  return rows[0];
}

export async function getBlogComments(blogId: number) {
  const { rows } =
    await sql<BlogComment>`SELECT bc.*, m.first_name, m.last_name FROM blog_comments bc
    JOIN members m ON bc.author_id = m.id
    WHERE bc.blog_id = ${blogId}
    ORDER BY bc.date DESC;`;
  return rows;
}

export async function insertBlogComment(
  blogId: number,
  authorId: number,
  content: string
) {
  const now = new Date().toISOString();
  await sql`INSERT INTO blog_comments (date, content, author_id, blog_id)
    VALUES (${now}, ${content}, ${authorId}, ${blogId});`;
  return getBlogComments(blogId);
}
