create table
  public.articles (
    id bigint generated by default as identity not null,
    seo jsonb not null,
    title text not null,
    slug text not null,
    content jsonb null,
    image text not null,
    user uuid not null,
    public boolean not null default false,
    created_at timestamp with time zone not null default timezone ('utc'::text, now()),
    updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
    constraint article_pkey primary key (id),
    constraint article_slug_key unique (slug),
    constraint articles_user_fkey foreign key ("users") references users (uuid) on delete set null
  ) tablespace pg_default;

create trigger handle_updated_at before
update on articles for each row
execute function moddatetime ('updated_at');