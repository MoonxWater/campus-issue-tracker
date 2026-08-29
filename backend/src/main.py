from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from src.routes import issue_routes

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Campus Issue Tracker API")

# Configure CORS so the React frontend can communicate with the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://campus-issue-tracker-pi.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(issue_routes.router)

@app.get("/api/health")
def health_check():
    return {"message": "Campus Issue Tracker API is running"}

