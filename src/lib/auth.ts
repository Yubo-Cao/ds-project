"use server";

import { sql } from "@vercel/postgres";
import { hashPassword } from "./hash-utils";

export async function register(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  personalEmail: string,
  gradYear: Date
) {
  const hashedPassword = await hashPassword(password);

  const {
    rows: [member],
  } = await sql`
      INSERT INTO members (first_name, last_name, school_email, personal_email, graduation_year, date_joined)
      VALUES (${firstName}, ${lastName}, ${email}, ${personalEmail}, ${gradYear.toISOString()}, NOW())
      RETURNING id`;

  await sql`
      INSERT INTO user_auth (member_id, password_hash, is_active)
      VALUES (${member.id}, ${hashedPassword}, true)`;
}
