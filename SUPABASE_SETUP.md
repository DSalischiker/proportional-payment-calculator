# Supabase Setup Guide

This guide will help you set up Supabase for the Proportional Payment Calculator project.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in your project details:
   - Name: `proportional-payment-calculator`
   - Database Password: (create a secure password)
   - Region: (choose the closest to your users)
6. Click "Create new project"

## 2. Get Your Project Credentials

After your project is created:

1. Go to Settings → API
2. Copy your Project URL and Anon Public Key
3. Update your `.env.local` file:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 3. Set Up the Database

1. Go to the SQL Editor in your Supabase dashboard
2. Copy the contents of `/database/init.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the script

This will create:
- The `calculations` table with proper structure
- Row Level Security (RLS) policies for data protection
- Indexes for better performance
- Triggers for automatic timestamp updates

## 4. Configure Google Authentication

1. Go to Authentication → Providers in your Supabase dashboard
2. Find Google and click to configure
3. Enable Google provider
4. You'll need to set up Google OAuth credentials:

### Setting up Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure the OAuth consent screen if prompted
6. For Application type, choose "Web application"
7. Add authorized redirect URIs:
   - `https://your-project-ref.supabase.co/auth/v1/callback`
   - For local development: `http://localhost:5173/`

8. Copy the Client ID and Client Secret
9. Paste them into your Supabase Google provider configuration
10. Save the configuration

## 5. Test the Setup

1. Start your development server: `npm run dev`
2. The app should now show a login screen
3. Try signing in with Google
4. After successful login, you should see the calculator
5. Make a calculation - it should be saved to your history

## 6. Database Schema

The `calculations` table structure:

```sql
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key to auth.users)
- person_a_name: TEXT
- person_b_name: TEXT
- person_a_income: DECIMAL(15,2)
- person_b_income: DECIMAL(15,2)
- person_a_currency: TEXT
- person_b_currency: TEXT
- total_bill: DECIMAL(15,2)
- bill_currency: TEXT
- person_a_payment: DECIMAL(15,2)
- person_b_payment: DECIMAL(15,2)
- person_a_percentage: DECIMAL(5,2)
- person_b_percentage: DECIMAL(5,2)
- created_at: TIMESTAMP WITH TIME ZONE
- updated_at: TIMESTAMP WITH TIME ZONE
```

## Security Features

- **Row Level Security (RLS)**: Users can only access their own calculations
- **Authentication Required**: All database operations require authentication
- **Secure by Default**: The anon key only allows authenticated operations

## Troubleshooting

### Common Issues:

1. **Environment Variables**: Make sure your `.env.local` file is properly configured and the variables start with `VITE_`

2. **CORS Issues**: Ensure your site URL is added to your Supabase project settings under Authentication → URL Configuration

3. **Google OAuth Issues**: 
   - Check that your redirect URLs are correctly configured
   - Ensure your Google OAuth app is not in testing mode if you want public access

4. **Database Permissions**: If you get permission errors, make sure you ran the complete `init.sql` script

### Getting Help:

- Check the Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Review the browser console for any error messages
- Check the Supabase dashboard logs under Logs & Monitoring

## Development vs Production

For production deployment:
1. Update your environment variables with production URLs
2. Configure your production domain in Supabase Authentication settings
3. Update Google OAuth redirect URIs to include your production domain
4. Consider setting up database backups and monitoring
