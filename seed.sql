
-- public.divisions definition

-- Drop table

-- DROP TABLE public.divisions;

CREATE TABLE public.divisions (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	description text NOT NULL,
	CONSTRAINT divisions_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX divisions_name_idx ON public.divisions USING btree (name);


-- public.mailing_lists definition

-- Drop table

-- DROP TABLE public.mailing_lists;

CREATE TABLE public.mailing_lists (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	description text NOT NULL,
	CONSTRAINT mailing_lists_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX mailing_lists_name_idx ON public.mailing_lists USING btree (name);


-- public.members definition

-- Drop table

-- DROP TABLE public.members;

CREATE TABLE public.members (
	id serial4 NOT NULL,
	date_joined timestamp NOT NULL,
	graduation_year timestamp NOT NULL,
	first_name varchar NOT NULL,
	last_name varchar NOT NULL,
	school_email varchar NOT NULL,
	personal_email varchar NOT NULL,
	phone_number varchar NULL,
	address varchar NULL,
	CONSTRAINT members_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX members_personal_email_idx ON public.members USING btree (personal_email);
CREATE UNIQUE INDEX members_school_email_idx ON public.members USING btree (school_email);


-- public.officer_roles definition

-- Drop table

-- DROP TABLE public.officer_roles;

CREATE TABLE public.officer_roles (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	description text NOT NULL,
	CONSTRAINT officer_roles_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX officer_roles_name_idx ON public.officer_roles USING btree (name);


-- public.blogs definition

-- Drop table

-- DROP TABLE public.blogs;

CREATE TABLE public.blogs (
	id serial4 NOT NULL,
	title varchar NOT NULL,
	"date" timestamp NOT NULL,
	"content" text NOT NULL,
	author_id int4 NOT NULL,
	CONSTRAINT blogs_pkey PRIMARY KEY (id),
	CONSTRAINT blogs_author_id_members_id_fk FOREIGN KEY (author_id) REFERENCES public.members(id)
);


-- public.competitive_teams definition

-- Drop table

-- DROP TABLE public.competitive_teams;

CREATE TABLE public.competitive_teams (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	description text NULL,
	division_id int4 NOT NULL,
	CONSTRAINT competitive_teams_pkey PRIMARY KEY (id),
	CONSTRAINT competitive_teams_division_id_fkey FOREIGN KEY (division_id) REFERENCES public.divisions(id),
	CONSTRAINT competitive_teams_divisions_fk FOREIGN KEY (division_id) REFERENCES public.divisions(id)
);
CREATE UNIQUE INDEX competitive_teams_name_idx ON public.competitive_teams USING btree (name);


-- public.division_enrollments definition

-- Drop table

-- DROP TABLE public.division_enrollments;

CREATE TABLE public.division_enrollments (
	id serial4 NOT NULL,
	"date" timestamp NOT NULL,
	division_id int4 NOT NULL,
	member_id int4 NOT NULL,
	CONSTRAINT division_enrollments_pkey PRIMARY KEY (id),
	CONSTRAINT division_enrollments_division_id_divisions_id_fk FOREIGN KEY (division_id) REFERENCES public.divisions(id),
	CONSTRAINT division_enrollments_member_id_members_id_fk FOREIGN KEY (member_id) REFERENCES public.members(id)
);


-- public.events definition

-- Drop table

-- DROP TABLE public.events;

CREATE TABLE public.events (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	"date" timestamp NOT NULL,
	description text NOT NULL,
	"location" varchar NOT NULL,
	division_id int4 NULL,
	CONSTRAINT events_pkey PRIMARY KEY (id),
	CONSTRAINT events_division_id_divisions_id_fk FOREIGN KEY (division_id) REFERENCES public.divisions(id)
);


-- public.mailing_list_subscriptions definition

-- Drop table

-- DROP TABLE public.mailing_list_subscriptions;

CREATE TABLE public.mailing_list_subscriptions (
	id serial4 NOT NULL,
	"date" timestamp NOT NULL,
	mailing_list_id int4 NOT NULL,
	member_id int4 NOT NULL,
	CONSTRAINT mailing_list_subscriptions_pkey PRIMARY KEY (id),
	CONSTRAINT mailing_list_subscriptions_mailing_list_id_mailing_lists_id_fk FOREIGN KEY (mailing_list_id) REFERENCES public.mailing_lists(id),
	CONSTRAINT mailing_list_subscriptions_member_id_members_id_fk FOREIGN KEY (member_id) REFERENCES public.members(id)
);


-- public.officers definition

-- Drop table

-- DROP TABLE public.officers;

CREATE TABLE public.officers (
	id serial4 NOT NULL,
	date_promoted timestamp NOT NULL,
	date_demoted timestamp NULL,
	officer_role_id int4 NOT NULL,
	member_id int4 NOT NULL,
	CONSTRAINT officers_pkey PRIMARY KEY (id),
	CONSTRAINT officers_member_id_members_id_fk FOREIGN KEY (member_id) REFERENCES public.members(id),
	CONSTRAINT officers_officer_role_id_officer_roles_id_fk FOREIGN KEY (officer_role_id) REFERENCES public.officer_roles(id)
);


-- public.sessions definition

-- Drop table

-- DROP TABLE public.sessions;

CREATE TABLE public.sessions (
	id serial4 NOT NULL,
	user_id int4 NULL,
	"token" text NOT NULL,
	expires_at timestamp NOT NULL,
	created_at timestamp NOT NULL,
	CONSTRAINT sessions_pkey PRIMARY KEY (id),
	CONSTRAINT sessions_token_key UNIQUE (token),
	CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.members(id)
);
CREATE INDEX idx_sessions_token ON public.sessions USING btree (token);


-- public.user_auth definition

-- Drop table

-- DROP TABLE public.user_auth;

CREATE TABLE public.user_auth (
	id serial4 NOT NULL,
	member_id int4 NULL,
	password_hash text NOT NULL,
	last_login timestamp NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT user_auth_member_id_key UNIQUE (member_id),
	CONSTRAINT user_auth_pkey PRIMARY KEY (id),
	CONSTRAINT user_auth_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.members(id)
);
CREATE INDEX idx_user_auth_member ON public.user_auth USING btree (member_id);


-- public.blog_attachments definition

-- Drop table

-- DROP TABLE public.blog_attachments;

CREATE TABLE public.blog_attachments (
	id serial4 NOT NULL,
	mime_type varchar NOT NULL,
	file_content text NOT NULL,
	blog_id int4 NOT NULL,
	CONSTRAINT blog_attachments_pkey PRIMARY KEY (id),
	CONSTRAINT blog_attachments_blog_id_blogs_id_fk FOREIGN KEY (blog_id) REFERENCES public.blogs(id)
);


-- public.blog_comments definition

-- Drop table

-- DROP TABLE public.blog_comments;

CREATE TABLE public.blog_comments (
	id serial4 NOT NULL,
	"date" timestamp NOT NULL,
	"content" text NOT NULL,
	author_id int4 NOT NULL,
	blog_id int4 NOT NULL,
	CONSTRAINT blog_comments_pkey PRIMARY KEY (id),
	CONSTRAINT blog_comments_author_id_members_id_fk FOREIGN KEY (author_id) REFERENCES public.members(id),
	CONSTRAINT blog_comments_blog_id_blogs_id_fk FOREIGN KEY (blog_id) REFERENCES public.blogs(id)
);


-- public.competitive_team_enrollments definition

-- Drop table

-- DROP TABLE public.competitive_team_enrollments;

CREATE TABLE public.competitive_team_enrollments (
	id serial4 NOT NULL,
	"date" timestamp NOT NULL,
	team_role varchar NOT NULL,
	competitive_team_id int4 NOT NULL,
	member_id int4 NOT NULL,
	CONSTRAINT competitive_team_enrollments_pkey PRIMARY KEY (id),
	CONSTRAINT competitive_team_enrollments_competitive_team_id_competitive_te FOREIGN KEY (competitive_team_id) REFERENCES public.competitive_teams(id),
	CONSTRAINT competitive_team_enrollments_member_id_members_id_fk FOREIGN KEY (member_id) REFERENCES public.members(id)
);


-- public.event_enrollments definition

-- Drop table

-- DROP TABLE public.event_enrollments;

CREATE TABLE public.event_enrollments (
	id serial4 NOT NULL,
	"date" timestamp NOT NULL,
	event_id int4 NOT NULL,
	member_id int4 NOT NULL,
	CONSTRAINT event_enrollments_pkey PRIMARY KEY (id),
	CONSTRAINT event_enrollments_event_id_events_id_fk FOREIGN KEY (event_id) REFERENCES public.events(id),
	CONSTRAINT event_enrollments_member_id_members_id_fk FOREIGN KEY (member_id) REFERENCES public.members(id)
);

INSERT INTO members VALUES(1,'2023-08-15 00:00:00.000000','2025-05-25 00:00:00.000000','Katie','Chen','katie.chen1234@g.gcpsk12.org','katie.chen@gmail.com',NULL,NULL);

INSERT INTO members VALUES(2,'2023-08-15 00:00:00.000000','2025-05-25 00:00:00.000000','Yubo','Cao','yubo.cao1234@g.gcpsk12.org','yubo.cao@gmail.com',NULL,NULL);
INSERT INTO members VALUES(3,'2023-08-15 00:00:00.000000','2026-05-25 00:00:00.000000','Minh','Nyugen','minh.nyugen1234@g.gcpsk12.org','minh.nyugen@gmail.com',NULL,NULL);
INSERT INTO members VALUES(4,'2023-08-15 00:00:00.000000','2026-05-25 00:00:00.000000','Brian','Zhou','brian.zhou1234@g.gcpsk12.org','brian.zhou@gmail.com',NULL,NULL);
INSERT INTO members VALUES(5,'2023-08-15 00:00:00.000000','2025-05-25 00:00:00.000000','Max','Lee','max.lee1234@g.gcpsk12.org','max.lee@gmail.com',NULL,NULL);
INSERT INTO members VALUES(6,'2023-08-15 00:00:00.000000','2025-05-25 00:00:00.000000','Kevin','Lee','kevin.lee1234@g.gcpsk12.org','kevin.lee@gmail.com',NULL,NULL);
INSERT INTO members VALUES(7,'2023-08-15 00:00:00.000000','2026-05-25 00:00:00.000000','Elizabeth','Tsiporkin','elizabeth.tsiporkin1234@g.gcpsk12.org','elizabeth.tsiporkin@gmail.com',NULL,NULL);
INSERT INTO members VALUES(8,'2023-08-15 00:00:00.000000','2026-05-25 00:00:00.000000','Vishva','Patel','vishva.patel1234@g.gcpsk12.org','vishva.patel@gmail.com',NULL,NULL);
INSERT INTO members VALUES(9,'2023-08-15 00:00:00.000000','2026-05-25 00:00:00.000000','James','Overcash','james.overcash1234@g.gcpsk12.org','james.overcash@gmail.com',NULL,NULL);
INSERT INTO members VALUES(10,'2023-08-15 00:00:00.000000','2025-05-25 00:00:00.000000','Jase','George','jase.george1234@g.gcpsk12.org','jase.george@gmail.com',NULL,NULL);
INSERT INTO members VALUES(11,'2023-08-15 00:00:00.000000','2025-05-25 00:00:00.000000','Nekita','Ghimire','nekita.ghimire1234@g.gcpsk12.org','nekita.ghimire@gmail.com',NULL,NULL);
INSERT INTO members VALUES(12,'2023-08-15 00:00:00.000000','2027-05-25 00:00:00.000000','Luke','Cheng','luke.cheng1234@g.gcpsk12.org','luke.cheng@gmail.com',NULL,NULL);
INSERT INTO members VALUES(13,'2023-08-15 00:00:00.000000','2027-05-25 00:00:00.000000','Edmund','Fung','edmund.fung1234@g.gcpsk12.org','edmund.fung@gmail.com',NULL,NULL);
INSERT INTO members VALUES(14,'2023-08-15 00:00:00.000000','2027-05-25 00:00:00.000000','BanAnh','Doan','bananh.doan1234@g.gcpsk12.org','bananh.doan@gmail.com',NULL,NULL);
INSERT INTO members VALUES(15,'2023-08-15 00:00:00.000000','2027-05-25 00:00:00.000000','Jackie','Lu','jackie.lu1234@g.gcpsk12.org','jackie.lu@gmail.com',NULL,NULL);
INSERT INTO members VALUES(16,'2023-08-15 00:00:00.000000','2027-05-25 00:00:00.000000','Achilleas','Galanis','achilleas.galanis1234@g.gcpsk12.org','achilleas.galanis@gmail.com',NULL,NULL);
INSERT INTO members VALUES(17,'2023-08-15 00:00:00.000000','2027-05-25 00:00:00.000000','Zoe','Lee','zoe.lee1234@g.gcpsk12.org','zoe.lee@gmail.com',NULL,NULL);
INSERT INTO members VALUES(18,'2023-08-15 00:00:00.000000','2027-05-25 00:00:00.000000','Ana','Padamadan','ana.padamadan1234@g.gcpsk12.org','ana.padamadan@gmail.com',NULL,NULL);
INSERT INTO members VALUES(19,'2023-08-15 00:00:00.000000','2027-05-25 00:00:00.000000','Minju','Suh','minju.suh1234@g.gcpsk12.org','minju.suh@gmail.com',NULL,NULL);
INSERT INTO members VALUES(20,'2023-08-15 00:00:00.000000','2027-05-25 00:00:00.000000','Ishaan','Patel','ishaan.patel1234@g.gcpsk12.org','ishaan.patel@gmail.com',NULL,NULL);

INSERT INTO officer_roles VALUES(1,'President','Lead club operations and coordinate with faculty advisor');
INSERT INTO officer_roles VALUES(2,'Vice President of Finance','Oversee club finances and logistics');
INSERT INTO officer_roles VALUES(3,'Vice President of Marketing','Direct marketing and communications');
INSERT INTO officer_roles VALUES(4,'Head of Advertising','Manage club advertising and outreach');
INSERT INTO officer_roles VALUES(5,'Head of Competitions','Coordinate competitive programming events');
INSERT INTO officer_roles VALUES(6,'Head of Fundraising','Lead fundraising initiatives');
INSERT INTO officer_roles VALUES(7,'Algorithmic Programming Head','Lead competitive programming division');
INSERT INTO officer_roles VALUES(8,'Algorithmic Programming Officer','Support competitive programming activities');
INSERT INTO officer_roles VALUES(9,'CyberDragons Head','Lead cybersecurity division');
INSERT INTO officer_roles VALUES(10,'CyberDragons Officer','Support cybersecurity activities');
INSERT INTO officer_roles VALUES(11,'CS101 Head','Lead introductory programming division');
INSERT INTO officer_roles VALUES(12,'CS101 Officer','Support introductory programming instruction');

INSERT INTO divisions VALUES(1,'CS 101','Introduction to basic programming concepts');
INSERT INTO divisions VALUES(2,'Algorithms','Study of algorithms and data structures');
INSERT INTO divisions VALUES(3,'CyberDragons','Focus on cybersecurity, including picoCTF, CyberPatriot, and more');

INSERT INTO officers VALUES(1,'2023-08-20 00:00:00.000000',NULL,1,1);
INSERT INTO officers VALUES(2,'2023-08-20 00:00:00.000000',NULL,1,2);
INSERT INTO officers VALUES(3,'2023-08-20 00:00:00.000000',NULL,2,3);
INSERT INTO officers VALUES(4,'2023-08-20 00:00:00.000000',NULL,3,4);
INSERT INTO officers VALUES(5,'2023-08-20 00:00:00.000000',NULL,4,5);
INSERT INTO officers VALUES(6,'2023-08-20 00:00:00.000000',NULL,5,6);
INSERT INTO officers VALUES(7,'2023-08-20 00:00:00.000000',NULL,6,7);
INSERT INTO officers VALUES(8,'2023-08-20 00:00:00.000000',NULL,6,8);
INSERT INTO officers VALUES(9,'2023-08-20 00:00:00.000000',NULL,7,9);
INSERT INTO officers VALUES(10,'2023-08-20 00:00:00.000000',NULL,8,12);
INSERT INTO officers VALUES(11,'2023-08-20 00:00:00.000000',NULL,8,13);
INSERT INTO officers VALUES(12,'2023-08-20 00:00:00.000000',NULL,9,10);
INSERT INTO officers VALUES(13,'2023-08-20 00:00:00.000000',NULL,10,14);
INSERT INTO officers VALUES(14,'2023-08-20 00:00:00.000000',NULL,10,15);
INSERT INTO officers VALUES(15,'2023-08-20 00:00:00.000000',NULL,10,16);
INSERT INTO officers VALUES(16,'2023-08-20 00:00:00.000000',NULL,10,11);
INSERT INTO officers VALUES(17,'2023-08-20 00:00:00.000000',NULL,11,11);
INSERT INTO officers VALUES(18,'2023-08-20 00:00:00.000000',NULL,12,17);
INSERT INTO officers VALUES(19,'2023-08-20 00:00:00.000000',NULL,12,18);
INSERT INTO officers VALUES(20,'2023-08-20 00:00:00.000000',NULL,12,19);
INSERT INTO officers VALUES(21,'2023-08-20 00:00:00.000000',NULL,12,20);

INSERT INTO competitive_teams VALUES(1,'Lambda',NULL,3);
INSERT INTO competitive_teams VALUES(2,'Mu',NULL,3);
INSERT INTO competitive_teams VALUES(3,'Zeta',NULL,3);
INSERT INTO competitive_teams VALUES(4,'Psi',NULL,3);
INSERT INTO competitive_teams VALUES(5,'Phi',NULL,3);

INSERT INTO events VALUES(1,'FoTaM','2024-12-01 00:00:00.000000','Future of Technlogy and Medicine conference with guest speakers','LLLH',NULL);

INSERT INTO blogs VALUES (
    1, 
    'Getting Started with Python', 
    '2023-09-01 00:00:00.000000',
    REPLACE('# Getting Started with Python\n\nPython is a versatile and powerful programming language that''s widely used in various fields, including web development, data analysis, artificial intelligence, scientific computing, and more.\n\n## Why Learn Python?\n\n- **Easy to Read and Write:** Python''s syntax is clear and intuitive, making it an excellent choice for beginners.\n- **Versatile:** Python can be used for a wide range of applications, from simple scripts to complex machine learning algorithms.\n- **Large Community:** With a vast community of developers, you''ll find plenty of resources, libraries, and frameworks to help you build almost anything.\n\n## Installing Python\n\nTo get started, you''ll need to install Python on your computer. You can download the latest version from the [official website](https://www.python.org/downloads/).\n\n### Steps to Install:\n\n1. **Download the Installer:** Visit the [Python downloads page](https://www.python.org/downloads/) and download the installer for your operating system.\n2. **Run the Installer:** Open the downloaded file and follow the on-screen instructions. Make sure to check the box that says "Add Python to PATH" during installation.\n3. **Verify the Installation:** Open your terminal or command prompt and type:\n\n', '\n', CHR(10)),
    1
);

INSERT INTO competitive_team_enrollments VALUES(1,'2024-08-20 00:00:00.000000','TL',1,10);
INSERT INTO competitive_team_enrollments VALUES(2,'2024-08-20 00:00:00.000000','TL',3,2);

INSERT INTO blog_comments VALUES(1,'2023-09-02 00:00:00.000000','Great tutorial! Very helpful for beginners.',2,1);
