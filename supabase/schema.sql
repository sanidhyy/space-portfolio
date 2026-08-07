create table if not exists public.cms_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('portfolio-uploads', 'portfolio-uploads', true)
on conflict (id) do update set public = true;

drop policy if exists "Public portfolio uploads are readable" on storage.objects;

create policy "Public portfolio uploads are readable"
on storage.objects for select
using (bucket_id = 'portfolio-uploads');
