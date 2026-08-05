-- GEMBA QLA - QUICK LOSS ANALYZER
-- Supabase Relational Database Schema (PostgreSQL Compatible)

-- 1. Companies / Müşteri Kartları Tablosu
CREATE TABLE IF NOT EXISTS public.companies (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "company_id" TEXT UNIQUE NOT NULL,
    "company_name" TEXT NOT NULL,
    "sector" TEXT,
    "location" TEXT,
    "consultant" TEXT,
    "visit_date" TEXT,
    "status" TEXT DEFAULT 'Active',
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Operation Data / Saha ve COPQ Verileri Tablosu
CREATE TABLE IF NOT EXISTS public.operation_data (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "company_id" TEXT UNIQUE NOT NULL REFERENCES public.companies("company_id") ON DELETE CASCADE,
    "turnover_lira" TEXT,
    "copq_rate" TEXT,
    "oee" TEXT,
    "scrap_rate" TEXT,
    "rework_rate" TEXT,
    "overtime_rate" TEXT,
    "lead_time" TEXT,
    "covered_area" TEXT,
    "operators_count" TEXT,
    "data_json" JSONB,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Assessments / Değerlendirme ve Notlar Tablosu
CREATE TABLE IF NOT EXISTS public.assessments (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "assessment_id" TEXT UNIQUE NOT NULL,
    "company_id" TEXT UNIQUE NOT NULL REFERENCES public.companies("company_id") ON DELETE CASCADE,
    "overall_score" NUMERIC DEFAULT 0,
    "potential_saving" NUMERIC DEFAULT 0,
    "investment_need" NUMERIC DEFAULT 0,
    "payback_period" NUMERIC DEFAULT 0,
    "notes" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Observations / Saha Tespit ve Gözlem Tablosu
CREATE TABLE IF NOT EXISTS public.observations (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "observation_id" TEXT UNIQUE NOT NULL,
    "company_id" TEXT REFERENCES public.companies("company_id") ON DELETE CASCADE,
    "category" TEXT,
    "finding" TEXT,
    "improvement" TEXT,
    "priority" TEXT,
    "impact" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Proposals / Opsiyonlu ROI Teklifleri Tablosu
CREATE TABLE IF NOT EXISTS public.proposals (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "proposal_id" TEXT UNIQUE NOT NULL,
    "company_id" TEXT REFERENCES public.companies("company_id") ON DELETE CASCADE,
    "selected_option" TEXT,
    "budget_try" NUMERIC,
    "annual_gain_min" NUMERIC,
    "annual_gain_max" NUMERIC,
    "roi_min" NUMERIC,
    "roi_max" NUMERIC,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operation_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- Policies (Re-creatable)
DO $$
BEGIN
    DROP POLICY IF EXISTS "Allow public read access" ON public.companies;
    DROP POLICY IF EXISTS "Allow public insert access" ON public.companies;
    DROP POLICY IF EXISTS "Allow public update access" ON public.companies;
    DROP POLICY IF EXISTS "Allow public delete access" ON public.companies;

    DROP POLICY IF EXISTS "Allow public read operation_data" ON public.operation_data;
    DROP POLICY IF EXISTS "Allow public insert operation_data" ON public.operation_data;
    DROP POLICY IF EXISTS "Allow public update operation_data" ON public.operation_data;

    DROP POLICY IF EXISTS "Allow public read assessments" ON public.assessments;
    DROP POLICY IF EXISTS "Allow public insert assessments" ON public.assessments;
    DROP POLICY IF EXISTS "Allow public update assessments" ON public.assessments;

    DROP POLICY IF EXISTS "Allow public read observations" ON public.observations;
    DROP POLICY IF EXISTS "Allow public insert observations" ON public.observations;

    DROP POLICY IF EXISTS "Allow public read proposals" ON public.proposals;
    DROP POLICY IF EXISTS "Allow public insert proposals" ON public.proposals;
END $$;

CREATE POLICY "Allow public read access" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.companies FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.companies FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON public.companies FOR DELETE USING (true);

CREATE POLICY "Allow public read operation_data" ON public.operation_data FOR SELECT USING (true);
CREATE POLICY "Allow public insert operation_data" ON public.operation_data FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update operation_data" ON public.operation_data FOR UPDATE USING (true);

CREATE POLICY "Allow public read assessments" ON public.assessments FOR SELECT USING (true);
CREATE POLICY "Allow public insert assessments" ON public.assessments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update assessments" ON public.assessments FOR UPDATE USING (true);

CREATE POLICY "Allow public read observations" ON public.observations FOR SELECT USING (true);
CREATE POLICY "Allow public insert observations" ON public.observations FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read proposals" ON public.proposals FOR SELECT USING (true);
CREATE POLICY "Allow public insert proposals" ON public.proposals FOR INSERT WITH CHECK (true);
