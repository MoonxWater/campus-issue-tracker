import os
import sys

# Add the backend directory to the Python path
backend_dir = os.path.join(os.path.dirname(__file__), "..", "backend")
sys.path.append(backend_dir)

from src.main import app
