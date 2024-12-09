export type MemberDetails = {
  id: number;
  first_name: string;
  last_name: string;
  school_email: string;
  personal_email: string;
  phone_number?: string;
  address?: string;
  date_joined: Date;
  graduation_year: Date;
  divisions: Array<{
    name: string;
    date: Date;
  }>;
  officer_roles: Array<{
    name: string;
    description: string;
    date_promoted: Date;
    date_demoted?: Date;
  }>;
  teams: Array<{
    name: string;
    team_role: string;
    date: Date;
  }>;
  events: Array<{
    name: string;
    date: Date;
    location: string;
  }>;
};
