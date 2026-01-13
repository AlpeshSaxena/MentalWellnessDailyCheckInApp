# API Documentation

## Base URL
- Local: `http://localhost:3000`
- Production: Your deployed backend URL

## Endpoints

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Mental Wellness API is running"
}
```

---

### POST /api/checkin
Submit a daily wellness check-in.

**Request Body:**
```json
{
  "mood": 4,
  "stress_level": "medium",
  "sleep_quality": "good",
  "note": "Optional note here"
}
```

**Field Requirements:**
- `mood` (required): Integer between 1 and 5
- `stress_level` (required): One of `"low"`, `"medium"`, `"high"`
- `sleep_quality` (required): One of `"poor"`, `"average"`, `"good"`
- `note` (optional): String text

**Success Response (200):**
```json
{
  "success": true,
  "ai_insight": "Your AI-generated wellness insight text here...",
  "timestamp": "2024-01-13T18:00:00.000Z",
  "id": "uuid-here"
}
```

**Error Responses:**

400 Bad Request - Missing or invalid fields:
```json
{
  "success": false,
  "error": "Missing required fields: mood, stress_level, and sleep_quality are required"
}
```

500 Internal Server Error:
```json
{
  "success": false,
  "error": "Failed to save check-in data",
  "details": "Error message here"
}
```

---

## CORS
The API is configured to accept requests from the frontend URL specified in `FRONTEND_URL` environment variable.
