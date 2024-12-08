export type Member = {
  id: number;
  date_joined: Date;
  graduation_year: Date;
  first_name: string;
  last_name: string;
  school_email: string;
  personal_email: string;
  phone_number?: string;
  address?: string;
};

export type Blog = {
  id: number;
  title: string;
  date: Date;
  content: string;
  author_id: number;
};

export type BlogAttachment = {
  id: number;
  mime_type: string;
  file_content: string; // base64 or some reference
  blog_id: number;
};

export type BlogComment = {
  id: number;
  date: Date;
  content: string;
  author_id: number;
  blog_id: number;
};

export type OfficerRole = {
  id: number;
  name: string;
  description: string;
};

export type Officer = {
  id: number;
  date_promoted: Date;
  date_demoted?: Date;
  officer_role_id: number;
  member_id: number;
};

export type Division = {
  id: number;
  name: string;
  description: string;
};

export type DivisionEnrollment = {
  id: number;
  date: Date;
  division_id: number;
  member_id: number;
};

export type MailingList = {
  id: number;
  name: string;
  description: string;
};

export type MailingListSubscription = {
  id: number;
  date: Date;
  mailing_list_id: number;
  member_id: number;
};

export type CompetitiveTeam = {
  id: number;
  name: string;
  description: string;
};

export type CompetitiveTeamEnrollment = {
  id: number;
  date: Date;
  team_role: string;
  competitive_team_id: number;
  member_id: number;
};

export type Event = {
  id: number;
  name: string;
  date: Date;
  description: string;
  location: string;
  division_id?: number;
};

export type EventEnrollment = {
  id: number;
  date: Date;
  event_id: number;
  member_id: number;
};
