-- Ejecutar en Supabase > SQL Editor

create table categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  emoji text default '🍔',
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price integer not null,
  emoji text default '🍔',
  image_url text,
  category_id uuid references categories(id) on delete set null,
  active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table additionals (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price integer not null,
  active boolean default true,
  created_at timestamptz default now()
);

-- Datos de ejemplo para Del Bajón
insert into categories (name, emoji, sort_order) values
  ('Hamburguesas', '🍔', 1),
  ('Combos', '🍟', 2),
  ('Bebidas', '🥤', 3);

-- Cargar productos de ejemplo (reemplazá category_id con los IDs reales)
-- Los IDs los ves en la tabla categories después de insertarlos

-- Storage bucket para imágenes
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);

-- Política para que cualquiera pueda ver las imágenes
create policy "Public read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Política para que el admin pueda subir imágenes
create policy "Admin upload product images"
  on storage.objects for insert
  with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

-- Políticas de lectura pública para el menú
alter table categories enable row level security;
alter table products enable row level security;
alter table additionals enable row level security;

create policy "Public read categories" on categories for select using (true);
create policy "Public read products" on products for select using (active = true);
create policy "Public read additionals" on additionals for select using (active = true);

-- Políticas de escritura solo para admin autenticado
create policy "Admin all categories" on categories for all using (auth.role() = 'authenticated');
create policy "Admin all products" on products for all using (auth.role() = 'authenticated');
create policy "Admin all additionals" on additionals for all using (auth.role() = 'authenticated');
