import os
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from pathlib import Path

# Add current directory to path for imports
sys.path.insert(0, os.path.dirname(__file__))

from middleware.auth_middleware import token_required
from controllers.auth_controller import AuthController
from controllers.detection_controller import DetectionController

load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')

# Configure CORS for both development and production
cors_origins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    os.getenv('FRONTEND_URL', '')
]
CORS(app, origins=[origin for origin in cors_origins if origin])

# Ensure uploads directory exists
UPLOAD_DIR = Path(__file__).resolve().parent / 'uploads'
UPLOAD_DIR.mkdir(exist_ok=True)

# ============== Health Check ==============
@app.get('/api/health')
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Deep Fake Detection API is running'})

# ============== Authentication Routes ==============
@app.post('/api/register')
def register():
    """Register a new user"""
    return AuthController.register()

@app.post('/api/login')
def login():
    """Login user"""
    return AuthController.login()

@app.post('/api/logout')
def logout():
    """Logout user"""
    return AuthController.logout()

# ============== Detection Routes ==============
@app.post('/api/detect-image')
@token_required
def detect_image():
    """Detect if uploaded image is deepfake"""
    return DetectionController.detect_image(request.user_id)

@app.post('/api/detect-video')
@token_required
def detect_video():
    """Detect if uploaded video is deepfake"""
    return DetectionController.detect_video(request.user_id)

# ============== History Routes ==============
@app.get('/api/history')
@token_required
def get_history():
    """Get detection history for logged-in user"""
    return DetectionController.get_history(request.user_id)

@app.delete('/api/history/<int:item_id>')
@token_required
def delete_history(item_id):
    """Delete a history entry"""
    return DetectionController.delete_history(request.user_id, item_id)

# ============== Error Handlers ==============
@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    app.run(debug=debug, host='0.0.0.0', port=port)
