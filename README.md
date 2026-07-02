# Deep Fake Detection System

This project is a full-stack deep fake detection system designed to identify whether uploaded images or videos are real or AI-generated. It provides a modern web-based interface for users to upload media, analyze it, view confidence scores, and review detection history.

## Project Objective
The main goal of this project is to build an intelligent system that can:
- Detect deep fake images and videos
- Analyze uploaded media using AI-based detection logic
- Display prediction results with confidence levels
- Highlight suspicious manipulated regions visually
- Store detection history and support report generation

## What is Deep Fake?
Deep fake technology uses artificial intelligence and deep learning to create highly realistic fake images, videos, or audio that can mimic real people. These manipulations are often used to spread misinformation, impersonate individuals, or deceive viewers. Deep fake detection systems help identify such synthetic media by examining visual artifacts, inconsistencies, and model-based patterns.

## Main Features
- Modern dark-themed glassmorphism UI
- Responsive landing page, authentication pages, dashboard, detection page, history page, and profile page
- Secure login and signup using JWT authentication
- Upload and analyze images and videos
- Real/Fake prediction with confidence percentage
- AI explanation and processing time display
- Detection history tracking
- Clean frontend and backend architecture for scalability

## Tech Stack
- Frontend: React.js, Vite, React Router
- Backend: Python Flask
- Database: PostgreSQL
- AI: PyTorch, OpenCV, Pillow
- Security: JWT, password hashing, input validation

## Project Structure
- frontend/: React application with pages, components, services, and styling
- backend/: Flask application with routes, controllers, services, middleware, and AI modules
- README.md: project overview and setup instructions

## Local Setup

### 1) Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will run at http://localhost:5173

### 2) Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```
The backend will run at http://localhost:5000

## API Endpoints
- POST /api/register
- POST /api/login
- POST /api/logout
- POST /api/detect-image
- POST /api/detect-video
- GET /api/history
- DELETE /api/history/<id>
- GET /api/health

## Notes
- The current backend includes a local demo flow so the system can run immediately without a full database connection.
- For production, the project can be upgraded to a full PostgreSQL-backed solution with a real pretrained deep fake detection model and PDF report generation.

## Future Enhancements
- PostgreSQL database integration
- Real PyTorch-based deep fake detection model
- Grad-CAM-based heatmap visualization
- Email notifications and PDF report download
- Admin panel and analytics dashboard
