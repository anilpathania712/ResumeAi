# 🤖 AI Resume Analyzer

An AI-powered resume analysis tool that scores your resume against Applicant Tracking Systems (ATS), identifies keyword gaps, and provides actionable improvement suggestions — all in seconds.

Built with **React 19**, **FastAPI**, and **Groq AI** (LLaMA 3.3 70B).

---

## ✨ Features

- **ATS Scoring** — Get a 0–100 score showing how well your resume performs against ATS filters
- **Keyword Gap Analysis** — See which skills match your target role and which are missing
- **Improvement Suggestions** — Receive AI-generated tips to strengthen your resume
- **Professional Summary Rewriter** — Get an AI-rewritten summary tailored to your target role
- **Multiple Roles** — Analyze against Frontend, Backend, Full Stack, Data Analyst, PM, DevOps, or any custom role
- **PDF Upload** — Drag and drop or click to upload (up to 5 MB)
- **Responsive Design** — Works beautifully on desktop and mobile

---

## 🛠️ Tech Stack

### Frontend

| Technology     | Purpose                 |
| -------------- | ----------------------- |
| React 19       | UI framework            |
| Vite 7         | Build tool & dev server |
| Tailwind CSS 4 | Utility-first styling   |
| React Router 7 | Client-side routing     |
| Recharts       | ATS score visualization |
| React Select   | Creatable role selector |
| Axios          | HTTP client             |
| Lucide React   | Icons                   |

### Backend

| Technology    | Purpose                                |
| ------------- | ---------------------------------------|
| FastAPI       | Python API framework                   |
| Groq SDK      | AI inference (llama-3.3-70b-versatile) |
| PyPDF2        | PDF text extraction                    |
| Uvicorn       | ASGI server                            |
| python-dotenv | Environment variables                  |

---

## 📁 Project Structure

```
ai-resume-analyzer/
├── backend/
│   ├── venv/
│   │   ├── main.py            # FastAPI server & API routes
│   │   ├── ai_engine.py       # Groq AI integration & prompt
│   │   └── resume_parser.py   # PDF text extraction
│   ├── .env                   # Backend env vars (gitignored)
│   ├── .gitignore
│   └── requirements.txt       # Python dependencies
│
├── frontend/
│   ├── public/
│   │   └── favicon-32x32.png
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Home/
│   │   │   │   ├── Header.jsx          # Hero section
│   │   │   │   └── ResultsSection.jsx  # ATS score & analysis cards
│   │   │   ├── Navbar.jsx              # Navigation bar
│   │   │   ├── Features.jsx            # Features page
│   │   │   └── About.jsx               # About page
│   │   ├── App.jsx            # Router, Home page & Error Boundary
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles & animations
│   ├── .env.development       # Dev API URL
│   ├── .env.production        # Prod API URL (edit before deploy)
│   ├── index.html             # HTML entry with SEO meta tags
│   ├── vite.config.js         # Build config with chunk splitting
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- **Python** 3.10+
- A free **Groq API key** — get one at [console.groq.com](https://console.groq.com)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ResumeAi.git
cd ResumeAi
```

### 2. Backend Setup

```bash
cd backend

# Create & activate virtual environment
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env   # or create manually
```

Add your Groq API key to `backend/.env`:

```env
GROQ_API_KEY=your_groq_api_key_here
ALLOWED_ORIGINS=http://localhost:5173
MAX_FILE_SIZE_MB=5
DEBUG=false
PORT=8000
WEB_CONCURRENCY=1
```

Start the backend:

```bash
cd venv
uvicorn main:app --reload
```

The API will be running at `http://localhost:8000`.

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 📦 Production Build

### Frontend

1. Update the API URL in `frontend/.env.production`:

   ```env
   VITE_API_URL=https://your-api-domain.com
   ```

2. Build the optimized bundle:

   ```bash
   cd frontend
   npm run build
   ```

3. The production-ready files will be in `frontend/dist/`.

### Build Optimizations

- **Chunk splitting** — React, Recharts, and React-Select are split into separate vendor bundles for better caching
- **Terser minification** — Console logs and debugger statements are stripped
- **Source maps** — Generated for production debugging
- **Lazy loading** — Features and About pages are code-split and loaded on demand
- **Error boundary** — Catches render crashes with a user-friendly fallback UI

### Backend

```bash
cd backend/venv
python main.py
```

Or with Uvicorn directly:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🔌 API Endpoints

| Method | Endpoint    | Description                                |
| ------ | ----------- | ------------------------------------------ |
| `GET`  | `/`         | Server status check                        |
| `GET`  | `/health`   | Health check for deployment platforms      |
| `POST` | `/analyze/` | Analyze a resume PDF against a target role |

### POST `/analyze/`

**Request** (multipart/form-data):

| Field  | Type       | Description            |
| ------ | ---------- | ---------------------- |
| `file` | File (PDF) | Resume file (max 5 MB) |
| `role` | String     | Target job role        |

**Response**:

```json
{
  "analysis": "ATS Score: 75\n\nMatched Skills:\n- Python\n- FastAPI\n..."
}
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable           | Default                 | Description                     |
| ------------------ | ----------------------- | ------------------------------- |
| `GROQ_API_KEY`     | —                       | **Required.** Groq API key      |
| `ALLOWED_ORIGINS`  | `http://localhost:5173` | Comma-separated CORS origins    |
| `MAX_FILE_SIZE_MB` | `5`                     | Max upload file size in MB      |
| `DEBUG`            | `false`                 | Enable debug logging & API docs |
| `PORT`             | `8000`                  | Server port                     |
| `WEB_CONCURRENCY`  | `1`                     | Number of Uvicorn workers       |

### Frontend (`frontend/.env.*`)

| Variable       | Default                 | Description          |
| -------------- | ----------------------- | -------------------- |
| `VITE_API_URL` | `http://localhost:8000` | Backend API base URL |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
