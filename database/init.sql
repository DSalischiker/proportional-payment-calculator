-- Create the calculations table to store user calculation history
CREATE TABLE calculations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  person_a_name TEXT NOT NULL,
  person_b_name TEXT NOT NULL,
  person_a_income DECIMAL(15,2) NOT NULL,
  person_b_income DECIMAL(15,2) NOT NULL,
  person_a_currency TEXT NOT NULL,
  person_b_currency TEXT NOT NULL,
  total_bill DECIMAL(15,2) NOT NULL,
  bill_currency TEXT NOT NULL,
  person_a_payment DECIMAL(15,2) NOT NULL,
  person_b_payment DECIMAL(15,2) NOT NULL,
  person_a_percentage DECIMAL(5,2) NOT NULL,
  person_b_percentage DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_id for faster queries
CREATE INDEX idx_calculations_user_id ON calculations(user_id);

-- Create an index on created_at for ordering
CREATE INDEX idx_calculations_created_at ON calculations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own calculations
CREATE POLICY "Users can view their own calculations" ON calculations
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own calculations
CREATE POLICY "Users can insert their own calculations" ON calculations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own calculations
CREATE POLICY "Users can update their own calculations" ON calculations
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only delete their own calculations
CREATE POLICY "Users can delete their own calculations" ON calculations
  FOR DELETE USING (auth.uid() = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_calculations_updated_at
  BEFORE UPDATE ON calculations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON calculations TO authenticated;
