-- Mental Wellness Daily Check-In App - Supabase Schema
-- 
-- SDG 3 Alignment: Good Health & Well-Being
-- This schema stores daily wellness check-in data with AI-generated insights
-- to help users track their mental wellness over time.
--
-- Ethical Note: This data is stored for wellness tracking purposes only.
-- It does not constitute medical records and should not be used for diagnosis.

-- Create check_ins table
CREATE TABLE IF NOT EXISTS check_ins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mood INTEGER NOT NULL CHECK (mood >= 1 AND mood <= 5),
    stress_level TEXT NOT NULL CHECK (stress_level IN ('low', 'medium', 'high')),
    sleep_quality TEXT NOT NULL CHECK (sleep_quality IN ('poor', 'average', 'good')),
    note TEXT,
    ai_insight TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for efficient date-based queries
CREATE INDEX IF NOT EXISTS idx_check_ins_created_at ON check_ins(created_at DESC);

-- Add comment to table
COMMENT ON TABLE check_ins IS 'Stores daily mental wellness check-ins with AI-generated insights. Aligned with SDG 3: Good Health & Well-Being.';

-- Add comments to columns
COMMENT ON COLUMN check_ins.mood IS 'Mood rating from 1 (lowest) to 5 (highest)';
COMMENT ON COLUMN check_ins.stress_level IS 'Stress level: low, medium, or high';
COMMENT ON COLUMN check_ins.sleep_quality IS 'Sleep quality: poor, average, or good';
COMMENT ON COLUMN check_ins.note IS 'Optional user note';
COMMENT ON COLUMN check_ins.ai_insight IS 'AI-generated wellness insight from Relay.app';
COMMENT ON COLUMN check_ins.created_at IS 'Timestamp when check-in was submitted';
