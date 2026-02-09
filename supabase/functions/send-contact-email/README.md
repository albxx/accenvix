# Send Contact Email Edge Function

This Supabase Edge Function sends contact form emails using Resend.

## Setup

### 1. Get Resend API Key
1. Sign up at https://resend.com
2. Get your API key from the dashboard
3. For testing, you can use `onboarding@accenvix.com` as the sender

### 2. Add Environment Variable
In your Supabase dashboard, go to **Settings > Edge Functions** and add:
- `RESEND_API_KEY` - Your Resend API key

### 3. Deploy the Function
```bash
cd supabase
supabase functions deploy send-contact-email
```

### 4. Set Up Secrets
```bash
supabase secrets set --project-ref your-project-id RESEND_API_KEY=your-api-key
```

## Testing Locally

```bash
cd supabase/functions/send-contact-email
supabase functions serve send-contact-email
```

Then test with curl:
```bash
curl -X POST http://localhost:54321/functions/v1/send-contact-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test Subject","message":"Test message"}'
```

## Environment Variables Required

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Your Resend API key for sending emails |

## Email Flow

1. **To Admin**: Sends notification to `hello@accenvix.com` with full message details
2. **To User**: Sends confirmation email to the submitter

## Frontend Integration

The frontend sends requests to:
```
POST {SUPABASE_URL}/functions/v1/send-contact-email
Headers:
  Authorization: Bearer {SUPABASE_ANON_KEY}
  Content-Type: application/json

Body:
  { name, email, subject, message }