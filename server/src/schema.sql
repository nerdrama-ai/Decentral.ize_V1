create table if not exists users (
id uuid primary key,
handle text unique not null,
display_name text,
bio text,
public_key text,
private_key text,
created_at timestamp with time zone default now()
);


create table if not exists posts (
id uuid primary key,
author_id uuid references users(id) on delete cascade,
content text not null,
media_refs jsonb default '[]',
in_reply_to text,
visibility text default 'public',
created_at timestamp with time zone default now()
);


create index if not exists posts_author_created_idx on posts(author_id, created_at desc);


create table if not exists follows (
follower_id uuid references users(id) on delete cascade,
followee_actor_url text not null,
state text default 'requested',
primary key (follower_id, followee_actor_url)
);


create table if not exists deliveries (
post_id uuid references posts(id) on delete cascade,
target_actor_url text not null,
status text default 'pending',
primary key (post_id, target_actor_url)
);


create table if not exists media (
cid text primary key,
mime_type text,
size bigint,
pinned boolean default false
);


create table if not exists reports (
id uuid primary key,
reporter_id uuid references users(id) on delete cascade,
target_id text not null,
reason text,
status text default 'open',
created_at timestamp with time zone default now()
);


-- ActivityPub raw objects for fidelity
create table if not exists activity_objects (
id text primary key,
body jsonb not null,
created_at timestamp with time zone default now()
);
