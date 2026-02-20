# 🎓 StandupCopilot for Student Communities

<div align="center">

![StandupCopilot Banner](https://img.shields.io/badge/StandupCopilot-AI%20Student%20Check--ins-6366f1?style=for-the-badge&logo=robot&logoColor=white)

**AI-Powered Project Check-ins for Student Group Work**

Transform your group project chaos into organized progress with AI voice facilitation, automatic task updates, and intelligent summaries to WhatsApp/Discord/Slack.

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-Voice%20AI-black?style=flat-square)](https://elevenlabs.io/)

**Student Tool Integrations:**

[![Trello](https://img.shields.io/badge/Trello-0052CC?style=flat-square&logo=trello&logoColor=white)](https://trello.com/)
[![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white)](https://notion.so/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/)
[![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white)](https://discord.com/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=flat-square&logo=whatsapp&logoColor=white)](https://whatsapp.com/)

</div>

---

## ✨ What is StandupCopilot?

StandupCopilot is an **AI-powered project check-in platform** designed for student group projects. It conducts voice-based standups using ElevenLabs AI, automatically extracts updates, syncs them to Trello/Notion/GitHub, and sends summaries to WhatsApp/Discord/Slack. **No more group project chaos, last-minute rushes, or unequal contributions!**

### 🎯 Key Highlights

- 🎙️ **AI Moderator** conducts friendly check-ins via voice or async text
- 📝 **Automatic Transcription** - focus on your work, not note-taking
- 🔄 **Task Sync** to Trello, Notion, GitHub Projects automatically
- 📊 **Smart Summaries** to WhatsApp, Discord, Slack, or Email
- 🤖 **LLM-Powered Analysis** detects blockers, risks, and contribution patterns
- 📅 **Flexible Scheduling** - daily, before deadlines, or custom
- 🚨 **Deadline Risk Alerts** - get early warnings before submissions
- ⚖️ **Fairness Signals** - detect contribution imbalances
- 🧑‍🏫 **Lecturer Dashboard** - evidence for grading and supervision

---

## 🌟 Features

### 🎤 Student-Friendly Check-in Experience
- **AI Moderator** asks students about their assigned tasks in a friendly, encouraging tone
- **Voice OR Async Text** - join live meetings or submit async updates
- **Natural Conversation** - speak/type naturally, AI understands student language
- **Real-time Transcription** - see what's being discussed live
- **Jitsi/Google Meet Integration** - optional video, or use in-app voice
- **Encourages Quiet Members** - AI ensures everyone gets a chance to share

### 🧠 Intelligent AI Processing
- **LLM Extraction** - Claude or Gemini extracts structured updates
- **Smart Task Matching** - links discussions to Trello cards, Notion tasks, or GitHub issues
- **Blocker Detection** - identifies difficulties and flags them automatically
- **Deadline Risk Analysis** - predicts submission risks based on progress patterns
- **Contribution Analysis** - detects participation imbalances and inactive members
- **Workload Distribution** - identifies overburdened students
- **Wellbeing Detection** - flags stress/overload patterns

### 📋 Multi-Platform Task Integration
- **Trello** - auto-sync to cards, update status, add comments
- **Notion** - update task databases, link to standup notes
- **GitHub Projects** - sync issues, update status, add discussion
- **Manual Entry** - add tasks directly if no integration
- **Auto-fetch** - pulls assigned tasks automatically
- **Full History** - tracks all changes with timestamps

### 💬 Multi-Channel Communication
- **WhatsApp** - receive summaries and alerts via WhatsApp groups
- **Discord** - post digests to Discord channels
- **Slack/Teams** - professional team communication
- **Email** - send summaries to all members
- **Standup Notifications** - alerts when check-in starts
- **Simple Digest Format** - clean, readable summary:
  ```
  📋 Group Project Check-in — Feb 18
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  Task: UI Mockups for Login Page
  Status: 🟢 On Track
  Completed: Initial wireframes done
  Next: Finalize color scheme
  Deadline: Feb 20
  Blockers: None
  Member: Sarah Chen
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  Task: Backend API Development
  Status: 🟡 At Risk
  Progress: 60% complete
  Blocker: Missing database credentials
  Needs: Help from team lead
  Deadline: Feb 22 (2 days)
  Member: Alex Kumar
  ```
- **Rich Formatting** - emoji status indicators, clear sections
- **Project History** - stored for lecturer review and grading evidence

### 📊 Dashboard & Progress Tracking
- **Beautiful Student UI** - modern, friendly design
- **Real-time Stats** - total check-ins, active projects, completion rates
- **Active Projects** - see ongoing group work
- **Upcoming Deadlines** - visual deadline tracker
- **Contribution Metrics** - fair participation visualization
- **Risk Indicators** - 🟢🟡🔴 for deadline health

---

## 🎓 Student-Optimized Modes

### 🎯 **Assignment Mode**
**Perfect for course projects and assignments**

- **Tailored AI Questions:**
  - "What did you complete since last check-in?"
  - "What are you working on next?"
  - "Any difficulties or blockers?"
  - "Do you need help from teammates or lecturer?"
  - "When will your tasks be ready?"

- **Tracks Deliverables:**
  - 📊 Reports & Documentation
  - 📊 Presentation Slides
  - 💻 Code & Implementation
  - 🎨 Design Assets
  - 🧪 Testing & QA

- **Deadline Focus:**
  - Automatic deadline countdown
  - Risk alerts when progress is slow
  - Suggests task redistribution

---

### ⚡ **Hackathon Mode**
**High-intensity, fast-paced team coordination**

- **Rapid Check-ins** - every 2-4 hours
- **Blocker-First Questions** - "What's blocking you RIGHT NOW?"
- **Priority Focus** - "What's the most critical thing to finish?"
- **Quick Updates** - optimized for speed
- **Real-time Dashboard** - live progress tracking
- **Energy Detection** - flags burnout or fatigue
- **MVP Focus** - helps teams prioritize essential features

---

### 🧑‍🏫 **Lecturer/Supervisor View**
**Evidence-based assessment and early intervention**

- **Progress Visibility:**
  - See all group check-ins
  - Track individual contributions
  - Monitor deadline risks
  - Identify struggling teams

- **Contribution Analytics:**
  - Participation frequency per student
  - Task completion rates
  - Quality of updates (AI-assessed)
  - Comparison across teams

- **Grading Support:**
  - Export contribution reports
  - Evidence for peer assessment
  - Identifies free-riders early
  - Shows who did what

- **Intervention Alerts:**
  - Teams at risk of missing deadlines
  - Students showing stress patterns
  - Unequal workload distribution
  - Suggests when to step in

---

### 🚨 **Deadline Risk Detection**
**Predictive analytics to prevent last-minute disasters**

- **Risk Scoring:**
  - 🟢 **On Track** - progress matches timeline
  - 🟡 **At Risk** - falling behind, needs attention
  - 🔴 **Critical** - unlikely to meet deadline without intervention

- **Predictive Signals:**
  - Slow progress velocity
  - Repeated postponements
  - Incomplete task dependencies
  - Low check-in frequency
  - Increasing blockers

- **Smart Recommendations:**
  - "Move Task X to next sprint"
  - "Redistribute workload - Alex is overloaded"
  - "Schedule extra check-in before deadline"
  - "Escalate to lecturer for help"

---

### ⚖️ **Contribution & Fairness Signals**
**Promotes accountability and equitable teamwork**

- **Detects Imbalances:**
  - Members with 0 contributions
  - Uneven task distribution
  - One person doing most work
  - Free-rider patterns

- **Participation Metrics:**
  - Check-in attendance rate
  - Tasks completed vs assigned
  - Quality of updates
  - Responsiveness to blockers

- **Encourages Accountability:**
  - Private nudges to inactive members
  - Visibility of contribution gaps
  - Fair workload suggestions
  - Peer pressure through transparency

---

### 😌 **Wellbeing & Stress Detection**
**Supports student mental health during projects**

- **Detects Overload Patterns:**
  - Repeated mentions of stress/overwhelm
  - Working late nights/weekends
  - Too many tasks assigned
  - Burnout language in updates

- **Suggests Workload Redistribution:**
  - "Sarah has 8 tasks, Alex has 2 - redistribute?"
  - "Team is working 15hr days - reduce scope?"
  - "3 members mentioned stress this week"

- **Encourages Balance:**
  - Reminds about breaks
  - Suggests realistic timelines
  - Flags unsustainable pace

---

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Relational database
- **SQLAlchemy** - ORM
- **APScheduler** - Job scheduling
- **WebSockets** - Real-time audio streaming
- **httpx** - Async HTTP client

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide Icons** - Icon library

### AI & Voice
- **ElevenLabs** - Conversational AI agent
- **Anthropic Claude Haiku 4.5** - LLM reasoning
- **Gemini 3** - Alternative LLM
- **WebRTC** - Audio capture

### Integrations
- **Trello API** - Card management and updates
- **Notion API** - Database syncing
- **GitHub Projects API** - Issue tracking
- **WhatsApp Business API** - Student group messaging
- **Discord API** - Server and channel integration
- **Slack API** - Team communication
- **Jitsi Meet** - Video conferencing
- **Google Meet** - Alternative video option

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                StandupCopilot for Students                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   React UI   │◄──►│  FastAPI     │◄──►│  PostgreSQL  │      │
│  │  TypeScript  │    │   Python     │    │   Database   │      │
│  └──────┬───────┘    └──────┬───────┘    └──────────────┘      │
│         │                   │                                    │
│         │ WebSocket         │ REST APIs                          │
│         ▼                   ▼                                    │
│  ┌─────────────────────────────────────────────────────┐        │
│  │        Student Communication & Task Platforms        │        │
│  ├──────────┬─────────┬────────┬────────┬─────────┬───┤        │
│  │ElevenLabs│WhatsApp │ Trello │ Notion │ Discord │Git│        │
│  │ Voice AI │Business │  API   │  API   │   API   │Hub│        │
│  │ (Agent)  │   API   │        │        │         │API│        │
│  └──────────┴─────────┴────────┴────────┴─────────┴───┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Audio Flow Architecture

```
Student Microphone → Browser → WebSocket → Backend → ElevenLabs Agent
                                                         ↓
                                                    AI Response
                                                         ↓
Backend ← WebSocket ← Browser ← Audio Playback ← ElevenLabs
   ↓
Transcript Storage → LLM Processing → Task Updates → Multi-Platform Summary
                                           ↓
                        (Trello/Notion/GitHub + WhatsApp/Discord/Slack)
```

---

## 📂 Project Structure

```
standup-copilot/
├── backend/
│   ├── app/
│   │   ├── main.py                      # FastAPI app + WebSocket
│   │   ├── config.py                    # Environment configuration
│   │   ├── database.py                  # PostgreSQL connection
│   │   ├── models.py                    # SQLAlchemy models
│   │   ├── schemas.py                   # Pydantic schemas
│   │   ├── services/
│   │   │   ├── elevenlabs_service.py    # ElevenLabs AI agent
│   │   │   ├── voice_endpoint.py        # Voice/Text WebSocket handler
│   │   │   ├── trello_service.py        # Trello API integration
│   │   │   ├── notion_service.py        # Notion API integration
│   │   │   ├── github_service.py        # GitHub Projects integration
│   │   │   ├── whatsapp_service.py      # WhatsApp Business API
│   │   │   ├── discord_service.py       # Discord bot integration
│   │   │   ├── slack_service.py         # Slack Web API
│   │   │   ├── reasoning_service.py     # LLM extraction (Claude/GPT/Gemini)
│   │   │   ├── standup_summary_service.py # Summary generation
│   │   │   ├── contribution_service.py  # Contribution analysis
│   │   │   ├── risk_detection_service.py # Deadline risk detection
│   │   │   ├── jitsi_service.py         # Jitsi/Google Meet integration
│   │   │   └── scheduler_service.py     # APScheduler jobs
│   │   └── routes/
│   │       ├── projects.py              # Project & check-in CRUD
│   │       ├── integrations.py          # Platform integration endpoints
│   │       ├── config.py                # Configuration endpoints
│   │       ├── analytics.py             # Dashboard & contribution stats
│   │       └── lecturer.py              # Lecturer dashboard endpoints
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── DashboardPage.tsx        # Student dashboard with projects
    │   │   ├── ConfigPage.tsx           # Project setup wizard
    │   │   ├── CheckinMeetingPage.tsx   # Voice/text check-in UI
    │   │   ├── HistoryPage.tsx          # Check-in archive
    │   │   ├── LecturerDashboard.tsx    # Supervisor overview
    │   │   └── ContributionPage.tsx     # Contribution analytics
    │   ├── components/
    │   │   ├── Common/
    │   │   │   ├── Sidebar.tsx          # Student-friendly navigation
    │   │   │   └── Navbar.tsx           # Light navbar
    │   │   └── Dashboard/
    │   │       ├── ProjectCard.tsx      # Project status cards
    │   │       ├── DeadlineTracker.tsx  # Deadline countdown
    │   │       └── ContributionChart.tsx # Contribution visualization
    │   ├── services/
    │   │   └── audioPlaybackService.ts  # Audio playback management
    │   ├── api/
    │   │   └── client.ts                # API client
    │   └── types/
    │       └── index.ts                 # TypeScript types
    ├── assets/
    │   └── copilot.svg                  # Custom logo
    └── package.json
```

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **PostgreSQL 14+**
- **API Keys** (choose based on your integrations):
  - **Required:**
    - ElevenLabs API key (for AI voice agent)
    - Anthropic/OpenAI/Gemini API key (for LLM)
  - **Task Management** (at least one):
    - Trello API key & token
    - Notion integration token
    - GitHub personal access token
  - **Communication** (at least one):
    - WhatsApp Business API credentials
    - Discord bot token
    - Slack bot token
  - **Optional:**
    - Jitsi domain/app ID (for hosted video)
    - Google Meet API key

### 1. Clone Repository

```bash
git clone https://github.com/muni-iamneo/standup-copilot.git
cd standup-copilot
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create database
createdb standupcopilot

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Run migrations
alembic upgrade head

# Start server
python -m uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

### 4. Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## ⚙️ Configuration

### Environment Variables

Create `backend/.env`:

```env
# Application
APP_NAME=StandupCopilot for Students
DEBUG=true

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/standupcopilot

# Task Management Integrations
TRELLO_API_KEY=your_trello_key
TRELLO_TOKEN=your_trello_token
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=your_database_id
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
GITHUB_ORG=your_org_or_username

# Communication Platforms
WHATSAPP_BUSINESS_API_KEY=your_whatsapp_key
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
DISCORD_BOT_TOKEN=your_discord_token
DISCORD_GUILD_ID=your_server_id
SLACK_BOT_TOKEN=xoxb-xxxxxxxxxxxxx  # optional
SLACK_APP_ID=your_app_id
SLACK_CLIENT_ID=your_client_id
SLACK_CLIENT_SECRET=your_client_secret

# ElevenLabs AI Voice
ELEVENLABS_API_KEY=sk_xxxxxxxxxxxxx
ELEVENLABS_AGENT_ID=agent_xxxxxxxxxxxxx

# Video Conferencing
JITSI_DOMAIN=8x8.vc  # or meet.jit.si
JITSI_APP_ID=vpaas-magic-cookie-xxxxxxxxxxxxx
GOOGLE_MEET_API_KEY=your_google_key  # optional

# LLM (choose one)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx  # Claude
OPENAI_API_KEY=sk-xxxxxxxxxxxxx  # GPT
GEMINI_API_KEY=your_gemini_key  # Gemini
LLM_PROVIDER=anthropic  # or "openai" or "gemini"

# CORS
CORS_ORIGINS=["http://localhost:5173"]
```

### ElevenLabs Agent Configuration

Configure your ElevenLabs agent with student-friendly prompts:

**System Prompt:**
```
You are a friendly AI check-in moderator for student group projects.

TEAM TASKS:
{{tasks_list}}

TEAM MEMBERS:
{{members_list}}

YOUR ROLE:
- Be warm, encouraging, and supportive
- Ask students about their assigned tasks from the list
- Use EXACT task IDs and names
- NEVER invent fake tasks
- Encourage quieter students to share
- Detect stress or struggles and offer support

QUESTIONS TO ASK:
1. "What did you complete since last check-in?"
2. "What are you working on next?"
3. "Any blockers or things you're stuck on?"
4. "Do you need help from teammates or your lecturer?"
5. "When do you expect to finish your current task?"

BE SUPPORTIVE: If a student sounds stressed, acknowledge it and suggest help.
```

**Dynamic Variables:**
- `tasks_list` - Populated from Trello/Notion/GitHub
- `members_list` - Student names and assigned tasks

See `docs/elevenlabs_agent_config.md` for full configuration.

---

## 🔄 How It Works

### 1️⃣ Schedule Standup (Project Setup)
1. **Create standup session** for your group project
2. **Enter course/project name** (e.g., "CS401 Final Project", "Hackathon Team")
3. **Select frequency:**
   - Daily check-ins
   - Before deadline (auto-scheduled)
   - Custom schedule (Mon/Wed/Fri, etc.)
4. **Choose communication channel:**
   - WhatsApp group
   - Discord server
   - Slack/Teams
5. **Select team members** from your group
6. **Add/import tasks from:**
   - Trello boards
   - Notion databases
   - GitHub Projects
   - Manual task entry
7. **Auto-fetch assigned tasks** (if platform integrated)

### 2️⃣ Standup Execution (Check-in Experience)
1. **Notification sent** at scheduled time to chosen channel
2. **Students join:**
   - Live voice meeting (Jitsi/Google Meet/in-app)
   - OR submit async voice/text update
3. **AI moderator starts session** with friendly greeting
4. **AI asks student-friendly prompts:**
   - "What did you complete since last check-in?"
   - "What are you working on next?"
   - "Any blockers or difficulties?"
   - "Do you need help from teammates or lecturer?"
   - "When will your tasks be ready?"
5. **Students respond naturally** via voice or text
6. **Real-time transcription** displayed for transparency
7. **AI encourages quieter members** to participate
8. **Progress tracked** - completed/in-progress/blockers

### 3️⃣ Automatic Processing (AI Intelligence)
1. **Conversation transcribed** and stored securely
2. **LLM extracts structured data:**
   - Completed tasks
   - In-progress work
   - Blockers and difficulties
   - ETA and deadline concerns
   - Help requests
3. **Matches updates to tasks** in Trello/Notion/GitHub
4. **Syncs task status** automatically:
   - Updates Trello cards
   - Syncs Notion task database
   - Updates GitHub issue status
5. **Detects risks:**
   - Missed progress patterns
   - Repeated delays
   - Hidden blockers
   - Deadline jeopardy
6. **Smart alerts generated:**
   - ⚠️ Deadline risk warnings
   - ⚖️ Uneven workload detection
   - 🚩 Free-rider signals (inactive members)
   - 😌 Stress/overload patterns
7. **Optional escalation** suggestions to lecturer

### 4️⃣ Summary Generation (Clarity Output)
1. **Generates standup digest** with:
   - ✅ Completed items
   - ⏳ In-progress work
   - 🚫 Blockers
   - 👤 Member responsibilities
   - 📅 Deadline status (🟢🟡🔴)
2. **Posted automatically to:**
   - WhatsApp group
   - Discord channel
   - Slack/Teams
   - Email to all members
3. **Stored in project history** for later review
4. **Accessible in dashboard** anytime
5. **Available to lecturer** for supervision and grading

---

## 💡 Value Proposition for Students

### 🎯 **Reduces Group Project Chaos**
- No more "Wait, who's doing what?"
- Clear task ownership
- Organized progress tracking

### 📈 **Improves Team Accountability**
- Everyone knows what everyone is doing
- Transparent contribution tracking
- Social pressure to stay active

### 🚨 **Surfaces Blockers Early**
- Problems caught before they become crises
- Early intervention opportunities
- Prevents last-minute disasters

### ⏰ **Prevents Last-Minute Rush**
- Regular check-ins maintain momentum
- Deadline tracking and alerts
- Proactive risk management

### ⚖️ **Encourages Fair Contribution**
- Contribution imbalance detection
- Evidence for peer assessment
- Discourages free-riding

### 🤝 **Supports Shy/Quiet Students**
- AI ensures everyone gets a turn
- Async option for introverts
- Equal voice for all

### 🎓 **Helps Lecturers Grade Fairly**
- Evidence of individual contributions
- Early warning system for struggling teams
- Data-driven peer assessment

### 🧘 **Reduces Stress & Anxiety**
- Organized workflow clarity
- Workload balance monitoring
- Wellbeing-aware AI

---

## 🌍 SDG Alignment

### **SDG 4 – Quality Education**
- Enhances collaborative learning outcomes
- Provides equal participation opportunities
- Evidence-based assessment  support
- Supports inclusive education practices

### **SDG 8 – Decent Work & Wellbeing**
- Promotes fair workload distribution
- Detects and prevents student burnout
- Encourages healthy team dynamics
- Wellbeing monitoring and support

### **SDG 9 – Innovation & Digitalisation**
- Leverages AI for educational innovation
- Promotes digital literacy
- Advances EdTech capabilities
- Prepares students for AI-augmented workplaces

---

## 📊 Summary Format Example

```
📋 CS401 Group Project Check-in — Feb 18, 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Task: UI Mockups for Login Screen
Status: 🟢 On Track (90% complete)
Completed: Wireframes & initial designs done
Next: Final color scheme approval
Deadline: Feb 20 (2 days)
Blockers: None
Student: Sarah Chen

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Task: Backend API - User Authentication
Status: 🟡 At Risk (60% complete)
Progress: Basic endpoints working
Blockers: Missing database credentials from team lead
Help Needed: Database access setup
Deadline: Feb 22 (4 days) ⚠️
Student: Alex Kumar

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Task: Database Schema Design
Status: 🔴 Critical (20% complete)
Progress: ER diagram drafted only
Blockers: Unclear requirements, team conflicts
Concerns: Very behind schedule
Deadline: Feb 19 (TOMORROW) 🚨
Student: Jamie Lee

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ TEAM ALERTS:
• Jamie needs immediate help - task critically behind
• Workload imbalance detected - Jamie (3 tasks), Sam (0 tasks)
• Suggest redistributing database testing to Sam
• Alex missing credentials - escalate to team lead

📅 Project Deadline: Feb 25 (7 days)
📊 Overall Progress: 57% complete
🚦 Status: 🟡 At Risk - recommend extra check-in on Feb 20
```

---

## 🎨 UI Design

### Dashboard (Light Theme)
- **Friendly, welcoming design** for students
- **Blue gradient hero** with "Your Projects" branding
- **Stats cards** showing:
  - Total check-ins completed
  - Active group projects
  - On-track vs at-risk projects
  - Your contribution score
- **Project cards** with deadline countdown
- **Clean, modern** student-friendly aesthetic

### Meeting Page (Dark Theme)
- **Dark background** (#0a0a0f, #0f0f1a) - easy on eyes
- **High contrast text** for readability
- **Video embed** (Jitsi/Google Meet) optional
- **Live transcript sidebar** - see what everyone says
- **Voice/Text toggle** - choose your input mode
- **Friendly AI avatar** - makes interaction warm
- **Simple controls** (mute, video, end check-in)

### Lecturer Dashboard
- **Team overview grid** - see all group projects
- **Contribution heatmap** - visualize participation
- **Risk alerts** prominently displayed
- **Export options** for grading reports
- **Intervention suggestions** highlighted

### Sidebar
- **Student-friendly navigation**
- **Custom copilot icon** (friendly robot)
- **Quick links:**
  - My Projects
  - Schedule Check-in
  - History & Archive
  - Settings

---

## 📖 API Documentation

### Key Endpoints

#### Voice/Text WebSocket
```
WS /standup/{id}/voice?project_id={project_id}&channel_id={channel_id}
```
Handles real-time audio streaming, text input, and transcription.

#### Project & Check-in Management
- `POST /api/projects` - Create new group project
- `GET /api/projects` - List student's projects
- `POST /api/projects/{id}/checkin` - Schedule check-in
- `GET /api/projects/{id}/history` - View check-in history
- `GET /api/analytics/dashboard` - Student dashboard stats
- `GET /api/analytics/contribution` - Contribution metrics

#### Task Integration Endpoints
- `GET /api/integrations/trello/boards` - Get Trello boards
- `GET /api/integrations/trello/cards` - Fetch cards
- `GET /api/integrations/notion/databases` - Get Notion databases
- `GET /api/integrations/github/projects` - List GitHub projects
- `GET /api/integrations/github/issues` - Fetch issues

#### Communication Platform Sync
- `GET /api/integrations/whatsapp/groups` - Get WhatsApp groups
- `GET /api/integrations/discord/channels` - List Discord channels
- `GET /api/integrations/slack/channels` - Get Slack channels

#### Lecturer Dashboard
- `GET /api/lecturer/teams` - View all supervised teams
- `GET /api/lecturer/contributions` - Contribution reports
- `GET /api/lecturer/risks` - Teams at risk
- `POST /api/lecturer/export` - Export grading data

#### Integration Health
- `GET /api/config/health` - Check all integration connectivity
- `POST /api/config/test` - Test platform connections

Full API docs: http://localhost:8000/docs

---

## � Development

### Running Tests

```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test
```

### Building for Production

```bash
# Backend
cd backend
docker build -t standupcopilot-backend .

# Frontend
cd frontend
npm run build
```

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

MIT License - see LICENSE file for details.

---

## 🙏 Acknowledgments

Built with amazing tools for student success:

**AI & Voice:**
- [ElevenLabs](https://elevenlabs.io/) - Conversational AI agent
- [Anthropic](https://anthropic.com/) - Claude AI reasoning
- [Google Gemini](https://deepmind.google/technologies/gemini/) - Alternative LLM

**Task Management:**
- [Trello](https://trello.com/) - Visual project boards
- [Notion](https://notion.so/) - All-in-one workspace
- [GitHub](https://github.com/) - Code & project tracking

**Communication:**
- [WhatsApp Business API](https://business.whatsapp.com/) - Group messaging
- [Discord](https://discord.com/) - Community servers
- [Slack](https://slack.com/) - Team collaboration

**Infrastructure:**
- [FastAPI](https://fastapi.tiangolo.com/) - Python web framework
- [React](https://react.dev/) - Modern UI framework
- [PostgreSQL](https://postgresql.org/) - Reliable database
- [Jitsi](https://jitsi.org/) - Open-source video conferencing

---

<div align="center">

**Built with ❤️ for better group projects and student success**

*Empowering students to collaborate effectively and learn together*

[Report Bug](https://github.com/muni-iamneo/standup-copilot/issues) • [Request Feature](https://github.com/muni-iamneo/standup-copilot/issues)

</div>
