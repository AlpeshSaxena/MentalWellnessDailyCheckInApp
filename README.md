# Mental Wellness Daily Check-In App

A full-stack application that helps users track their daily mental wellness through mood, stress level, and sleep quality check-ins, with AI-generated insights to promote self-awareness and well-being.

## 🌍 SDG 3 Alignment: Good Health & Well-Being

This project aligns with **UN Sustainable Development Goal 3 (Good Health & Well-Being)** by:

- Promoting mental wellness awareness among youth and young adults (15-30 years)
- Providing a non-intrusive daily check-in system to track mental wellness patterns
- Using AI-generated insights to encourage self-reflection and healthy habits
- Supporting early recognition of wellness patterns without medical diagnosis

**Ethical Framework**: This application does not provide medical diagnosis or treatment. It is a wellness tool designed to promote self-awareness and healthy habits. All users are clearly informed that this is not medical advice.

## 📋 Problem Statement

Mental wellness is a critical component of overall health, especially for youth and young adults who face increasing pressures from academics, work, and social life. However, many young people lack accessible tools to:

- Track their daily mental wellness patterns
- Receive personalized, non-judgmental insights
- Build awareness of their emotional and mental state over time

This application addresses these needs by providing a simple, user-friendly daily check-in system that combines self-reporting with AI-generated wellness insights.

## 🏗️ Architecture Overview

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Frontend  │────────▶│   Backend   │────────▶│   Supabase  │
│  (React +   │  POST   │  (Express)  │  Store  │ (PostgreSQL)│
│   Vite +    │ /api/   │             │  Data   │             │
│  Tailwind)  │ checkin │             │         │             │
└─────────────┘         └──────┬──────┘         └─────────────┘
                                │
                                │ POST
                                ▼
                         ┌─────────────┐
                         │ Relay.app   │
                         │  Webhook    │
                         │  (AI)       │
                         └─────────────┘
```

### Technology Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **AI Integration**: Relay.app webhook
- **Deployment**: 
  - Frontend: Vercel or Netlify
  - Backend: Render

## 🚀 How to Run Locally

### Prerequisites

- Node.js 18+ installed
- Supabase account and project created
- Relay.app webhook URL configured
- Git installed

### Step 1: Clone and Setup

```bash
# Navigate to project directory
cd mental-wellness-app
```

### Step 2: Setup Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `supabase/schema.sql` to create the `check_ins` table

### Step 3: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Edit .env and fill in your values:
# - SUPABASE_URL (from Supabase project settings)
# - SUPABASE_ANON_KEY (from Supabase project settings)
# - RELAY_WEBHOOK_URL (your Relay.app webhook URL)
# - FRONTEND_URL (http://localhost:5173 for local dev)

# Start backend server
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:3000`

### Step 4: Setup Frontend

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Edit .env and set:
# VITE_API_URL=http://localhost:3000

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### Step 5: Test the Application

1. Open `http://localhost:5173` in your browser
2. Fill out the check-in form:
   - Select your mood (1-5)
   - Choose stress level (low/medium/high)
   - Select sleep quality (poor/average/good)
   - Optionally add a note
3. Click "Submit Check-In"
4. View the AI-generated wellness insight

## 📁 Project Structure

```
mental-wellness-app/
├── backend/
│   ├── server.js          # Express server with /api/checkin endpoint
│   ├── package.json       # Backend dependencies
│   ├── .env.example       # Environment variables template
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # React entry point
│   │   ├── index.css      # Global styles with Tailwind
│   │   └── components/
│   │       ├── CheckInForm.jsx    # Check-in form component
│   │       └── Disclaimer.jsx     # Disclaimer component
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── postcss.config.js  # PostCSS configuration
│   ├── package.json       # Frontend dependencies
│   ├── .env.example       # Environment variables template
│   └── .gitignore
├── supabase/
│   └── schema.sql         # Database schema
└── README.md              # This file
```

## 🔄 API Flow Explanation

1. **User submits form** → Frontend sends POST request to `/api/checkin` with:
   - `mood` (1-5)
   - `stress_level` (low/medium/high)
   - `sleep_quality` (poor/average/good)
   - `note` (optional text)

2. **Backend receives request** → Validates input and adds timestamp

3. **Backend calls Relay.app webhook** → Sends payload:
   ```json
   {
     "mood": 4,
     "stress_level": "medium",
     "sleep_quality": "good",
     "note": "Feeling optimistic today",
     "timestamp": "2024-01-13T18:00:00Z",
     "sdg": "SDG 3"
   }
   ```

4. **Relay.app returns AI insight** → Backend receives AI-generated wellness insight text

5. **Backend stores in Supabase** → Saves all data including AI insight to `check_ins` table

6. **Backend returns response** → Frontend receives:
   ```json
   {
     "success": true,
     "ai_insight": "Your AI-generated insight here...",
     "timestamp": "2024-01-13T18:00:00Z",
     "id": "uuid-here"
   }
   ```

7. **Frontend displays insight** → User sees AI-generated wellness insight

## 🚢 Deployment

### Frontend (Vercel/Netlify)

1. **Build the frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**:
   - Connect your Git repository
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable: `VITE_API_URL` (your deployed backend URL)

3. **Deploy to Netlify**:
   - Connect your Git repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variable: `VITE_API_URL` (your deployed backend URL)

### Backend (Render)

1. **Connect repository** to Render
2. **Create new Web Service**
3. **Set build command**: `cd backend && npm install`
4. **Set start command**: `cd backend && npm start`
5. **Add environment variables**:
   - `PORT` (Render will set this automatically)
   - `FRONTEND_URL` (your deployed frontend URL)
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `RELAY_WEBHOOK_URL`

6. **Update frontend** `.env` with deployed backend URL

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=3000
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
RELAY_WEBHOOK_URL=https://api.relay.app/webhooks/your-webhook-id
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

## 🧪 Testing Checklist

- [ ] Form validation works (required fields)
- [ ] Mood selection (1-5) works
- [ ] Stress level selection works
- [ ] Sleep quality selection works
- [ ] Optional note field works
- [ ] Loading state displays during submission
- [ ] Error handling displays for API failures
- [ ] AI insight displays after successful submission
- [ ] Disclaimer is visible
- [ ] Data is stored in Supabase
- [ ] CORS is properly configured

## 🔮 Future Improvements

- **Historical View**: Display past check-ins in a calendar or timeline view
- **Trends & Analytics**: Show mood/stress/sleep trends over time with charts
- **Reminders**: Daily notification/reminder to complete check-in
- **Export Data**: Allow users to export their check-in history
- **Privacy Features**: Add user authentication and data encryption
- **Mobile App**: Native mobile app version
- **Social Features**: Optional anonymous community support (with privacy controls)
- **Resources**: Links to mental health resources and hotlines
- **Customizable Insights**: Allow users to set preferences for insight tone/style

## 📝 License

MIT License - Feel free to use this project for educational purposes.

## ⚠️ Important Disclaimer

**This is not medical advice.** This application is a wellness tool designed to help you track your daily mental wellness and promote self-awareness. It does not provide medical diagnosis, treatment, or professional mental health services. If you are experiencing a mental health crisis or need professional support, please contact a licensed mental health professional or emergency services.

## 👤 Author

Built as a capstone project aligned with UN SDG 3: Good Health & Well-Being.

---

**Note**: This is a minimal, production-ready implementation focused on correctness and clarity. The codebase is intentionally kept simple to demonstrate the core functionality without over-engineering.
