-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Profiles Table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  address text,
  role text default 'user',
  created_at timestamptz default now()
);

-- Create Catalogs Table
create table if not exists public.catalogs (
  id text primary key,
  name text not null,
  image text,
  icon text,
  parent_category text,
  created_at timestamptz default now()
);

-- Create Products Table
create table if not exists public.products (
  id text primary key,
  name text not null,
  price numeric not null,
  original_price numeric,
  image text,
  category text,
  catalog_id text references public.catalogs(id),
  rating numeric default 0,
  is_virtual_ready boolean default false,
  created_at timestamptz default now()
);

-- Add stock column if it doesn't exist
do $$ 
begin 
  if not exists (select 1 from information_schema.columns where table_name='products' and column_name='stock') then 
    alter table public.products add column stock numeric default 0; 
  end if; 
end $$;

-- Add variants column if it doesn't exist
do $$ 
begin 
  if not exists (select 1 from information_schema.columns where table_name='products' and column_name='variants') then 
    alter table public.products add column variants jsonb default '[]'::jsonb; 
  end if; 
end $$;

-- Create Orders Table
create table if not exists public.orders (
  id text primary key,
  user_id uuid references auth.users(id),
  date timestamptz default now(),
  status text default 'Pending',
  total numeric not null,
  customer_name text,
  shipping_address text,
  phone text,
  payment_method text,
  items jsonb, -- Stores the array of cart items
  created_at timestamptz default now()
);

-- Create Custom Designs Table
create table if not exists public.custom_designs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  front_text text,
  back_text text,
  front_image_url text,
  back_image_url text,
  color text,
  text_color text,
  font_size numeric,
  created_at timestamptz default now()
);

-- Create Virtual Try-Ons Table
create table if not exists public.virtual_try_ons (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  input_image text, -- Storing base64 for now as we don't have storage buckets setup
  generated_image text, -- Storing base64
  items jsonb,
  created_at timestamptz default now()
);

-- Create User Credits Table
create table if not exists public.user_credits (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) unique,
  credits numeric default 5, -- Give 5 free credits for virtual try-on
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create App Admins Table (Used for staff/admin management)
create table if not exists public.app_admins (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  password text not null, -- Hashed password
  full_name text,
  role text default 'staff', -- 'admin', 'staff', 'manager'
  department text,
  created_at timestamptz default now()
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.catalogs enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.custom_designs enable row level security;
alter table public.virtual_try_ons enable row level security;
alter table public.user_credits enable row level security;
alter table public.app_admins enable row level security;

-- Policies

-- Profiles: Users can view/edit their own profile. Public can view basic info (optional).
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
drop policy if exists "Users can insert their own profile." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;

create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Function to check if current user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.app_admins
    where id = auth.uid() and (role = 'admin' or role = 'manager' or role = 'staff')
  );
end;
$$ language plpgsql security definer;

-- App Admins: Only admins can manage the table.
drop policy if exists "Admins can manage all admin records." on public.app_admins;
create policy "Admins can manage all admin records." on public.app_admins
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- Allow users to view their own record
drop policy if exists "Users can view own admin record." on public.app_admins;
create policy "Users can view own admin record." on public.app_admins
  for select
  using (auth.uid() = id);

-- Catalogs: Public read access. Admin write access (simplified for now: allow all authenticated to read).
drop policy if exists "Catalogs are viewable by everyone." on public.catalogs;
create policy "Catalogs are viewable by everyone." on public.catalogs for select using (true);
-- (Add admin write policy later)

-- Products: Public read access. Admin manage access.
drop policy if exists "Products are viewable by everyone." on public.products;
drop policy if exists "Admins can insert products." on public.products;
drop policy if exists "Admins can update products." on public.products;
drop policy if exists "Admins can delete products." on public.products;

create policy "Products are viewable by everyone." on public.products for select using (true);
create policy "Admins can insert products." on public.products for insert with check (public.is_admin());
create policy "Admins can update products." on public.products for update using (public.is_admin());
create policy "Admins can delete products." on public.products for delete using (public.is_admin());

-- Orders: Users can view their own orders. Admin can view all.
drop policy if exists "Users can view own orders." on public.orders;
drop policy if exists "Users can insert own orders." on public.orders;
drop policy if exists "Admins can view all orders." on public.orders;

create policy "Users can view own orders." on public.orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders." on public.orders for insert with check (auth.uid() = user_id);
-- Allow admins to view all orders
create policy "Admins can view all orders." on public.orders for select using (auth.uid() in (select id from public.app_admins));

-- Custom Designs: Users can view/create their own designs.
drop policy if exists "Users can view own designs." on public.custom_designs;
drop policy if exists "Users can insert own designs." on public.custom_designs;

create policy "Users can view own designs." on public.custom_designs for select using (auth.uid() = user_id);
create policy "Users can insert own designs." on public.custom_designs for insert with check (auth.uid() = user_id);

-- Virtual Try-Ons: Users can view/create their own try-ons.
drop policy if exists "Users can view own try-ons." on public.virtual_try_ons;
drop policy if exists "Users can insert own try-ons." on public.virtual_try_ons;

create policy "Users can view own try-ons." on public.virtual_try_ons for select using (auth.uid() = user_id);
create policy "Users can insert own try-ons." on public.virtual_try_ons for insert with check (auth.uid() = user_id);

-- User Credits: Users can view/update their own credits.
drop policy if exists "Users can view own credits." on public.user_credits;
drop policy if exists "Users can update own credits." on public.user_credits;
drop policy if exists "Users can insert own credits." on public.user_credits;

create policy "Users can view own credits." on public.user_credits for select using (auth.uid() = user_id);
create policy "Users can update own credits." on public.user_credits for update using (auth.uid() = user_id);
create policy "Users can insert own credits." on public.user_credits for insert with check (auth.uid() = user_id);


-- Function to handle new user signup automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to give new users free credits
create or replace function public.give_new_user_credits()
returns trigger as $$
begin
  insert into public.user_credits (user_id, credits)
  values (new.id, 5);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for giving new user credits
drop trigger if exists on_new_user_credits on auth.users;
create trigger on_new_user_credits
  after insert on auth.users
  for each row execute procedure public.give_new_user_credits();

-- Seed Data
insert into public.catalogs (id, name, image, icon, parent_category) values
('c1', 'Borka', 'https://images.unsplash.com/photo-1589467381464-9d10e08f5209?auto=format&fit=crop&q=80&w=400', 'User', 'women'),
('c2', 'Hijab', 'https://images.unsplash.com/photo-1584844281358-15496f8b92b6?auto=format&fit=crop&q=80&w=400', 'Smile', 'women'),
('c3', 'Saree', 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=400', 'Scissors', 'women'),
('c4', 'Three Piece', 'https://images.unsplash.com/photo-1583391733958-d15f07011438?auto=format&fit=crop&q=80&w=400', 'Layers', 'women'),
('c5', 'Palazzo', 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=400', 'Columns', 'women'),
('c6', 'Jacket', 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=400', 'Wind', 'women'),
('c7', 'Panjabi', 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&q=80&w=400', 'UserCheck', 'men'),
('c8', 'Shirt', 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=400', 'Briefcase', 'men'),
('c9', 'T-Shirt', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400', 'Smile', 'men'),
('c10', 'Pajama', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400', 'Moon', 'men'),
('c22', 'Fotua', 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?auto=format&fit=crop&q=80&w=400', 'Sun', 'men'),
('c23', 'Jacket', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400', 'Wind', 'men'),
('c24', 'Custom T-Shirt', 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=400', 'PenTool', 'men'),
('c11', 'Baby Boy', 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400', 'Baby', 'baby'),
('c12', 'Baby Girl', 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=400', 'Heart', 'baby'),
('c13', 'Toys', 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400', 'Gamepad2', 'baby'),
('c14', 'Sneakers', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', 'Activity', 'shoes'),
('c15', 'Formal', 'https://images.unsplash.com/photo-1614252235316-02015ea26d18?auto=format&fit=crop&q=80&w=400', 'Briefcase', 'shoes'),
('c16', 'Sandals', 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=400', 'Sun', 'shoes'),
('c17', 'Nagra', 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=400', 'Star', 'shoes'),
('c18', 'Watches', 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400', 'Watch', 'accs'),
('c19', 'Bags', 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400', 'ShoppingBag', 'accs'),
('c20', 'Jewelry', 'https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?auto=format&fit=crop&q=80&w=400', 'Gem', 'accs'),
('c21', 'Sunglasses', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400', 'Glasses', 'accs')
on conflict (id) do nothing;

insert into public.products (id, name, price, image, category, catalog_id, rating) values
('p1', 'Premium Dubai Borka', 2500, 'https://images.unsplash.com/photo-1589467381464-9d10e08f5209?auto=format&fit=crop&q=80&w=400', 'women', 'c1', 5),
('p2', 'Georgette Hijab', 450, 'https://images.unsplash.com/photo-1584844281358-15496f8b92b6?auto=format&fit=crop&q=80&w=400', 'women', 'c2', 4),
('p3', 'Dhakai Jamdani Saree', 4500, 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=400', 'women', 'c3', 5),
('p4', 'Cotton Three Piece', 1250, 'https://images.unsplash.com/photo-1583391733958-d15f07011438?auto=format&fit=crop&q=80&w=400', 'women', 'c4', 2),
('p5', 'Premium Silk Panjabi', 2500, 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&q=80&w=400', 'men', 'c7', 5),
('p6', 'Cotton Casual Shirt', 850, 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=400', 'men', 'c8', 3),
('p7', 'Leather Sandal', 1200, 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=400', 'shoes', 'c16', 4),
('p8', 'Traditional Nagra', 950, 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=400', 'shoes', 'c17', 2),
('p9', 'Gold Plated Necklace', 3500, 'https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?auto=format&fit=crop&q=80&w=400', 'accs', 'c20', 5),
('p10', 'Leather Handbag', 2200, 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400', 'accs', 'c19', 3)
on conflict (id) do nothing;
