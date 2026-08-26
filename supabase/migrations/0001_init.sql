-- TRANSPETRO ESTUDOS — schema inicial do Supabase
--
-- Este arquivo nunca é executado automaticamente pelo app (não existe integração de deploy de
-- migrations neste projeto). Cole o conteúdo inteiro no SQL Editor do painel do Supabase
-- (https://supabase.com/dashboard/project/_/sql/new) e rode uma vez, no seu projeto.
--
-- Cobre exatamente as tabelas que src/lib/supabase/sync.ts já espera (study_sessions,
-- learning_events, attempts, error_entries, review_schedules, review_attempts, mastery_snapshots,
-- essay_submissions, mock_exam_attempts, doubts, course_enrollments, course_day_progress) mais a
-- tabela nova `profiles` (perguntas do cadastro + liberação de acesso ao Professor).
--
-- Todas as tabelas têm RLS (Row Level Security) ligado: cada usuário só enxerga/edita as próprias
-- linhas (auth.uid() = user_id). A chave anon do Supabase é pública por design — a segurança real
-- vem dessas políticas, não do sigilo da chave.

-- ---------------------------------------------------------------------------------------------
-- Função utilitária: mantém updated_at sempre atual em UPDATEs.
-- ---------------------------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------------------------
-- profiles — uma linha por usuário autenticado. Criada e já preenchida automaticamente no
-- cadastro pelo trigger handle_new_user() (mais abaixo), a partir das respostas do formulário
-- (ver src/app/cadastro/page.tsx). `professor_access` é o botão de liberação manual do Professor:
-- por padrão false para todo mundo, true só para o dono (ver comentário no final do arquivo) ou
-- para quem o dono liberar manualmente aqui no painel.
-- ---------------------------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  whatsapp text,
  occupation text,
  study_goal text,
  referral_source text,
  professor_access boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: usuário vê a própria linha" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles: usuário edita a própria linha" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles: usuário insere a própria linha" on public.profiles
  for insert with check (auth.uid() = id);

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Cria automaticamente uma linha em profiles a cada novo cadastro (auth.users), já preenchendo as
-- perguntas extras do formulário — enviadas como `options.data` no supabase.auth.signUp() do
-- cliente (ver src/app/cadastro/page.tsx) e lidas aqui de `raw_user_meta_data`. Rodar como trigger
-- (não como UPDATE feito pelo cliente depois) evita depender de já existir sessão autenticada
-- logo após o cadastro (com confirmação de e-mail ligada, o cliente ainda não tem sessão nesse
-- momento, e uma política RLS de UPDATE bloquearia a escrita).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, whatsapp, occupation, study_goal, referral_source)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'whatsapp',
    new.raw_user_meta_data ->> 'occupation',
    new.raw_user_meta_data ->> 'study_goal',
    new.raw_user_meta_data ->> 'referral_source'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------------------------
-- study_sessions
-- ---------------------------------------------------------------------------------------------
create table if not exists public.study_sessions (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  origin text not null,
  started_at timestamptz not null,
  ended_at timestamptz,
  active_ms integer,
  status text not null,
  resume_point_ref text,
  related_activity_ids text[] not null default '{}',
  schema_version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.study_sessions enable row level security;
create policy "study_sessions: dono da linha" on public.study_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists trg_study_sessions_updated_at on public.study_sessions;
create trigger trg_study_sessions_updated_at
  before update on public.study_sessions
  for each row execute function public.set_updated_at();
create index if not exists idx_study_sessions_user on public.study_sessions (user_id);

-- ---------------------------------------------------------------------------------------------
-- learning_events
-- ---------------------------------------------------------------------------------------------
create table if not exists public.learning_events (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  session_id text,
  kind text not null,
  content_ref jsonb,
  activity_id text,
  metadata jsonb,
  occurred_at timestamptz not null,
  idempotency_key text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, idempotency_key)
);
alter table public.learning_events enable row level security;
create policy "learning_events: dono da linha" on public.learning_events
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists trg_learning_events_updated_at on public.learning_events;
create trigger trg_learning_events_updated_at
  before update on public.learning_events
  for each row execute function public.set_updated_at();
create index if not exists idx_learning_events_user on public.learning_events (user_id);

-- ---------------------------------------------------------------------------------------------
-- attempts
-- ---------------------------------------------------------------------------------------------
create table if not exists public.attempts (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id text not null,
  session_id text,
  activity_id text,
  subject_slug text,
  topic_slug text,
  syllabus_codes text[] not null default '{}',
  selected_key text not null,
  correct_key text,
  is_correct boolean not null,
  result text,
  attempt_number integer,
  response_time_ms integer,
  confidence text,
  consulted_aid_before_answering boolean,
  question_origin text,
  mode text not null,
  mock_exam_attempt_id text,
  idempotency_key text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, idempotency_key)
);
alter table public.attempts enable row level security;
create policy "attempts: dono da linha" on public.attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists trg_attempts_updated_at on public.attempts;
create trigger trg_attempts_updated_at
  before update on public.attempts
  for each row execute function public.set_updated_at();
create index if not exists idx_attempts_user on public.attempts (user_id);

-- ---------------------------------------------------------------------------------------------
-- error_entries
-- ---------------------------------------------------------------------------------------------
create table if not exists public.error_entries (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id text,
  subject_slug text,
  topic_slug text not null,
  syllabus_codes text[] not null default '{}',
  concept text,
  cause text not null,
  correct_rule text not null,
  source_ref jsonb,
  next_review_date text not null,
  resolved boolean not null default false,
  first_occurrence_at timestamptz not null,
  last_occurrence_at timestamptz not null,
  occurrence_count integer not null default 1,
  evidence_attempt_ids text[] not null default '{}',
  subsequent_correct_attempt_ids text[] not null default '{}',
  severity text not null,
  status text not null,
  status_history jsonb not null default '[]',
  student_note text,
  error_nature text not null,
  error_nature_origin text,
  error_nature_confidence text,
  origin text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.error_entries enable row level security;
create policy "error_entries: dono da linha" on public.error_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists trg_error_entries_updated_at on public.error_entries;
create trigger trg_error_entries_updated_at
  before update on public.error_entries
  for each row execute function public.set_updated_at();
create index if not exists idx_error_entries_user on public.error_entries (user_id);

-- ---------------------------------------------------------------------------------------------
-- review_schedules
-- ---------------------------------------------------------------------------------------------
create table if not exists public.review_schedules (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  item_type text not null,
  item_id text not null,
  error_entry_id text,
  reason text not null,
  interval_index integer not null default 0,
  strategy_version text not null,
  priority text not null,
  next_review_date text not null,
  last_reviewed_at timestamptz,
  status text not null,
  recommended_activity_refs jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.review_schedules enable row level security;
create policy "review_schedules: dono da linha" on public.review_schedules
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists trg_review_schedules_updated_at on public.review_schedules;
create trigger trg_review_schedules_updated_at
  before update on public.review_schedules
  for each row execute function public.set_updated_at();
create index if not exists idx_review_schedules_user on public.review_schedules (user_id);

-- ---------------------------------------------------------------------------------------------
-- review_attempts
-- ---------------------------------------------------------------------------------------------
create table if not exists public.review_attempts (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  review_schedule_id text not null,
  reviewed_at timestamptz not null,
  result text not null,
  result_before text,
  result_after text,
  related_attempt_ids text[] not null default '{}',
  decision text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.review_attempts enable row level security;
create policy "review_attempts: dono da linha" on public.review_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists trg_review_attempts_updated_at on public.review_attempts;
create trigger trg_review_attempts_updated_at
  before update on public.review_attempts
  for each row execute function public.set_updated_at();
create index if not exists idx_review_attempts_user on public.review_attempts (user_id);

-- ---------------------------------------------------------------------------------------------
-- mastery_snapshots — app não manda `id` (upsert por onConflict "user_id,topic_slug,concept"),
-- então o id aqui é só interno do Postgres.
-- NOTA: quando concept é NULL, o UNIQUE abaixo não deduplica entre si (comportamento padrão do
-- Postgres para NULL em UNIQUE) — na pior hipótese gera snapshots duplicados para esse caso
-- específico, sem quebrar nada (é só um cache recalculável).
-- ---------------------------------------------------------------------------------------------
create table if not exists public.mastery_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  subject_slug text,
  syllabus_codes text[] not null default '{}',
  topic_slug text not null,
  concept text,
  lessons_completed integer not null default 0,
  accuracy_rate numeric,
  recent_accuracy_rate numeric,
  attempts_count integer not null default 0,
  average_response_time_ms integer,
  average_confidence text,
  correct_low_confidence_count integer not null default 0,
  wrong_high_confidence_count integer not null default 0,
  recent_result_sequence text[] not null default '{}',
  open_difficulty_count integer not null default 0,
  recurrent_difficulty_count integer not null default 0,
  reviews_completed integer not null default 0,
  performance_before_review text,
  performance_after_review text,
  last_activity_at timestamptz,
  next_review_date text,
  mastery_level text not null,
  evidence_attempt_ids text[] not null default '{}',
  rule_version text not null,
  computed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, topic_slug, concept)
);
alter table public.mastery_snapshots enable row level security;
create policy "mastery_snapshots: dono da linha" on public.mastery_snapshots
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists trg_mastery_snapshots_updated_at on public.mastery_snapshots;
create trigger trg_mastery_snapshots_updated_at
  before update on public.mastery_snapshots
  for each row execute function public.set_updated_at();
create index if not exists idx_mastery_snapshots_user on public.mastery_snapshots (user_id);

-- ---------------------------------------------------------------------------------------------
-- essay_submissions
-- ---------------------------------------------------------------------------------------------
create table if not exists public.essay_submissions (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  essay_prompt_id text not null,
  session_id text,
  previous_version_id text,
  content text not null,
  line_count integer,
  time_spent_ms integer,
  evaluation jsonb,
  points_fixed_from_previous text[] not null default '{}',
  points_pending_from_previous text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.essay_submissions enable row level security;
create policy "essay_submissions: dono da linha" on public.essay_submissions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists trg_essay_submissions_updated_at on public.essay_submissions;
create trigger trg_essay_submissions_updated_at
  before update on public.essay_submissions
  for each row execute function public.set_updated_at();
create index if not exists idx_essay_submissions_user on public.essay_submissions (user_id);

-- ---------------------------------------------------------------------------------------------
-- mock_exam_attempts
-- ---------------------------------------------------------------------------------------------
create table if not exists public.mock_exam_attempts (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  mock_exam_id text not null,
  session_id text,
  started_at timestamptz not null,
  finished_at timestamptz,
  status text not null,
  answers jsonb not null default '[]',
  attempt_ids text[] not null default '{}',
  score_by_subject jsonb,
  total_score numeric,
  compared_to_previous_attempt_id text,
  generated_review_ids text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.mock_exam_attempts enable row level security;
create policy "mock_exam_attempts: dono da linha" on public.mock_exam_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists trg_mock_exam_attempts_updated_at on public.mock_exam_attempts;
create trigger trg_mock_exam_attempts_updated_at
  before update on public.mock_exam_attempts
  for each row execute function public.set_updated_at();
create index if not exists idx_mock_exam_attempts_user on public.mock_exam_attempts (user_id);

-- ---------------------------------------------------------------------------------------------
-- doubts
-- ---------------------------------------------------------------------------------------------
create table if not exists public.doubts (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null,
  content_ref jsonb not null,
  excerpt text,
  message text,
  status text not null,
  resolved_at timestamptz,
  resolution_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.doubts enable row level security;
create policy "doubts: dono da linha" on public.doubts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists trg_doubts_updated_at on public.doubts;
create trigger trg_doubts_updated_at
  before update on public.doubts
  for each row execute function public.set_updated_at();
create index if not exists idx_doubts_user on public.doubts (user_id);

-- ---------------------------------------------------------------------------------------------
-- course_enrollments
-- ---------------------------------------------------------------------------------------------
create table if not exists public.course_enrollments (
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  plan_version text not null,
  start_date text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);
alter table public.course_enrollments enable row level security;
create policy "course_enrollments: dono da linha" on public.course_enrollments
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists trg_course_enrollments_updated_at on public.course_enrollments;
create trigger trg_course_enrollments_updated_at
  before update on public.course_enrollments
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------------------------
-- course_day_progress
-- ---------------------------------------------------------------------------------------------
create table if not exists public.course_day_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  plan_version text not null,
  day integer not null,
  status text not null,
  current_step_id text,
  completed_step_ids text[] not null default '{}',
  session_id text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id, day)
);
alter table public.course_day_progress enable row level security;
create policy "course_day_progress: dono da linha" on public.course_day_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists trg_course_day_progress_updated_at on public.course_day_progress;
create trigger trg_course_day_progress_updated_at
  before update on public.course_day_progress
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------------------------
-- PASSO MANUAL (rodar depois de você mesmo se cadastrar no app pelo menos uma vez):
-- libera o Professor para a sua conta. Troque o e-mail abaixo pelo seu.
-- ---------------------------------------------------------------------------------------------
-- update public.profiles set professor_access = true where email = 'SEU_EMAIL_AQUI@exemplo.com';
