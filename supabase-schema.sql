-- ============================================================
-- هيكل قاعدة البيانات لمنصة "ماما بينات"
-- قم بتنفيذ هذا الملف في SQL Editor في Supabase
-- ============================================================

-- 0. جدول المدن (لإضافة مدن جديدة بسهولة)
CREATE TABLE IF NOT EXISTS cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- إضافة المدن الافتراضية
INSERT INTO cities (name, slug, is_active) VALUES
  ('بني حواء', 'beni-haoua', TRUE),
  ('الدومية', 'doumia', TRUE),
  ('وادقوسين', 'oued-koussine', TRUE)
ON CONFLICT (name) DO NOTHING;

-- 1. جدول المنازل
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
  address TEXT DEFAULT '',
  map_url TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'booked', 'maintenance'))
);

-- 2. جدول الحجوزات
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

-- 3. جدول التواصل
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read'))
);

-- سياسات الأمان (RLS)
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- الجميع يقرأ المدن
CREATE POLICY "public_read_cities" ON cities FOR SELECT USING (TRUE);
-- فقط المدير يعدل المدن
CREATE POLICY "admin_all_cities" ON cities FOR ALL USING (auth.role() = 'authenticated');

-- السماح للجميع بقراءة المنازل
CREATE POLICY "public_read_houses" ON houses FOR SELECT USING (TRUE);
-- فقط المدير يعدل المنازل
CREATE POLICY "admin_all_houses" ON houses FOR ALL USING (auth.role() = 'authenticated');

-- الكل يضيف حجوزات
CREATE POLICY "public_insert_bookings" ON bookings FOR INSERT WITH CHECK (TRUE);
-- الجميع يقرأ حالة الحجوزات (للتحقق من التوفر)
CREATE POLICY "public_read_bookings" ON bookings FOR SELECT USING (TRUE);
-- المدير يعدل الحجوزات
CREATE POLICY "admin_update_bookings" ON bookings FOR UPDATE USING (auth.role() = 'authenticated');

-- الكل يضيف تواصل
CREATE POLICY "public_insert_contacts" ON contacts FOR INSERT WITH CHECK (TRUE);
-- المدير يقرأ ويعدل التواصل
CREATE POLICY "admin_read_contacts" ON contacts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "admin_update_contacts" ON contacts FOR UPDATE USING (auth.role() = 'authenticated');

-- 4. إضافة الأعمدة الجديدة إذا كان الجدول موجوداً
ALTER TABLE houses ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';
ALTER TABLE houses ADD COLUMN IF NOT EXISTS map_url TEXT DEFAULT '';
ALTER TABLE houses ADD COLUMN IF NOT EXISTS address TEXT DEFAULT '';

-- 5. جدول إعدادات الموقع (لإدارة معلومات التواصل والدعم)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- معلومات التواصل
  owner_name TEXT DEFAULT 'المالك',
  owner_phone TEXT DEFAULT '213550000000',
  owner_email TEXT DEFAULT 'owner@mamabinat.dz',
  whatsapp_message TEXT DEFAULT 'مرحباً، أود الاستفسار عن المنزل',
  -- روابط التواصل الاجتماعي
  instagram TEXT DEFAULT '',
  twitter TEXT DEFAULT '',
  facebook TEXT DEFAULT '',
  -- معلومات عامة
  tagline TEXT DEFAULT 'بيتك في كل مكان.. مع ماما بينات',
  description TEXT DEFAULT 'منصة حجز وتأجير المنازل في ولاية بومرداس والجزائر',
  address TEXT DEFAULT 'ولاية بومرداس، الجزائر',
  -- الدعم
  support_phone TEXT DEFAULT '213550000000',
  support_email TEXT DEFAULT 'support@mamabinat.dz',
  support_hours TEXT DEFAULT 'من 9 صباحاً إلى 9 مساءً',
  -- سياسات
  cancellation_policy TEXT DEFAULT 'يمكن إلغاء الحجز قبل 24 ساعة من تاريخ الوصول',
  privacy_policy TEXT DEFAULT 'نحن نحترم خصوصيتك. لن يتم مشاركة معلوماتك مع أي طرف ثالث.',
  about_us TEXT DEFAULT 'ماما بينات هي منصة حجز وتأجير المنازل في الجزائر، نوفر أفضل خيارات الإقامة في ولاية بومرداس.'
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_settings" ON site_settings FOR SELECT USING (TRUE);
CREATE POLICY "admin_all_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- إدراج الصف الافتراضي
INSERT INTO site_settings (id) VALUES (gen_random_uuid())
ON CONFLICT DO NOTHING;

-- 6. إعدادات التخزين (Storage) للصور
-- أنشئ Bucket بإسم 'house-images' عام من Supabase Dashboard:
-- Storage → New bucket → house-images (Public bucket)
