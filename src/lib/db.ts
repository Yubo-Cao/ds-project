"use server";

import { Blog, BlogComment, CompetitiveTeam, Event } from "@/db/schema";
import { MemberDetails } from "@/types/member-details";
import { sql } from "@vercel/postgres";
import { TeamWithMembers } from "./schema";

export async function getAllMembers() {
  const { rows } = await sql<MemberDetails>`
    SELECT 
      m.*,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'name', d.name,
            'date', de.date
          )
        ) FILTER (WHERE d.id IS NOT NULL), '[]'
      ) as divisions,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'name', orols.name,
            'description', orols.description,
            'date_promoted', o.date_promoted,
            'date_demoted', o.date_demoted
          )
        ) FILTER (WHERE orols.id IS NOT NULL), '[]'
      ) as officer_roles,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'name', ct.name,
            'team_role', cte.team_role,
            'date', cte.date
          )
        ) FILTER (WHERE ct.id IS NOT NULL), '[]'
      ) as teams,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'name', e.name,
            'date', e.date,
            'location', e.location
          )
        ) FILTER (WHERE e.id IS NOT NULL), '[]'
      ) as events
    FROM members m
    LEFT JOIN division_enrollments de ON m.id = de.member_id
    LEFT JOIN divisions d ON de.division_id = d.id
    LEFT JOIN officers o ON m.id = o.member_id
    LEFT JOIN officer_roles orols ON o.officer_role_id = orols.id
    LEFT JOIN competitive_team_enrollments cte ON m.id = cte.member_id
    LEFT JOIN competitive_teams ct ON cte.competitive_team_id = ct.id
    LEFT JOIN event_enrollments ee ON m.id = ee.member_id
    LEFT JOIN events e ON ee.event_id = e.id
    GROUP BY m.id
    ORDER BY m.last_name, m.first_name;
  `;
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

export async function getAllTeamsWithMembers() {
  const { rows } = await sql<TeamWithMembers>`
    SELECT 
      ct.*,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'id', m.id,
            'first_name', m.first_name,
            'last_name', m.last_name,
            'team_role', cte.team_role,
            'date', cte.date
          )
        ) FILTER (WHERE m.id IS NOT NULL), '[]'
      ) as members
    FROM competitive_teams ct
    LEFT JOIN competitive_team_enrollments cte ON ct.id = cte.competitive_team_id
    LEFT JOIN members m ON cte.member_id = m.id
    GROUP BY ct.id
    ORDER BY ct.name;
  `;
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
  return (await getBlogComments(blogId))[0];
}

export async function getUserByEmail(email: string) {
  const { rows } = await sql`
    SELECT m.*, ua.password_hash, ua.is_active 
    FROM members m
    JOIN user_auth ua ON m.id = ua.member_id
    WHERE m.school_email = ${email} OR m.personal_email = ${email}
    LIMIT 1;
  `;
  return rows[0];
}
