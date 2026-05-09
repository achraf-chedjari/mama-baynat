-- Migration: Initial schema for Mama Baynat platform
CREATE TABLE IF NOT EXISTS houses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  city TEXT NOT NULL,
  price_per_night NUMERIC NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  max_guests INTEGER NOT NULL,
  images TEXT[] DEFAULT '{}',
  rating NUMERIC DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  amenities TEXT[] DEFAULT '{}',
  latitude NUMERIC,
  longitude NUMERIC,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'booked', 'maintenance'))
);

CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read'))
);

ALTER TABLE houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_houses" ON houses FOR SELECT USING (TRUE);
CREATE POLICY "admin_all_houses" ON houses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "public_insert_bookings" ON bookings FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "admin_read_bookings" ON bookings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "admin_update_bookings" ON bookings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "public_insert_contacts" ON contacts FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "admin_read_contacts" ON contacts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "admin_update_contacts" ON contacts FOR UPDATE USING (auth.role() = 'authenticated');
