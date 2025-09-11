# Bot Configuration Feature

This feature allows authenticated users to configure and send bot information including Bot ID, Knowledge Base name, and branding details.

## API Endpoint

### POST `/api/bot/send`

Sends bot configuration data to the backend service.

**Request Body:**
```json
{
  "botId": "string (required)",
  "knowledgeBaseName": "string (required)", 
  "branding": {
    "name": "string (required)",
    "logo": "string (optional)",
    "primaryColor": "string (optional)",
    "secondaryColor": "string (optional)", 
    "description": "string (optional)"
  },
  "timestamp": "string (ISO 8601)"
}
```

**Response:**
```json
{
  "success": boolean,
  "message": "string",
  "data": {
    "botId": "string",
    "knowledgeBaseName": "string",
    "sentAt": "string (ISO 8601)"
  }
}
```

## UI Components

### BotConfigForm
React component located at `components/bot-config-form.tsx` that provides:
- Form validation
- Loading states
- Success/error feedback
- Color picker inputs
- File URL input for logos

### Protected Route
The bot configuration form is available at `/protected/bot-config` and requires authentication.

## Environment Variables

Optional default values can be set in `.env.local`:
```
NEXT_PUBLIC_DEFAULT_BOT_ID=your-default-bot-id
NEXT_PUBLIC_DEFAULT_KNOWLEDGE_BASE=your-default-knowledge-base  
NEXT_PUBLIC_DEFAULT_BRAND_NAME=your-brand-name
```

## Usage

1. Navigate to `/protected/bot-config` (requires authentication)
2. Fill out the required fields:
   - Bot ID
   - Knowledge Base Name
   - Brand Name
3. Optionally configure branding details:
   - Logo URL
   - Primary/Secondary colors
   - Description
4. Click "Send Bot Configuration" to submit

The form will show success/error feedback and log the configuration data to the server console.