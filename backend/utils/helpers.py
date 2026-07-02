# Utility Helpers
# Common utility functions for the application

import os
from pathlib import Path
import mimetypes

def get_file_extension(filename):
    """Get file extension from filename"""
    return os.path.splitext(filename)[1].lower()

def is_valid_image(filename):
    """Check if file is a valid image"""
    valid_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
    return get_file_extension(filename) in valid_extensions

def is_valid_video(filename):
    """Check if file is a valid video"""
    valid_extensions = {'.mp4', '.avi', '.mov', '.mkv', '.flv', '.wmv'}
    return get_file_extension(filename) in valid_extensions

def get_mimetype(filename):
    """Get MIME type of file"""
    mime_type, _ = mimetypes.guess_type(filename)
    return mime_type

def ensure_directory(directory):
    """Ensure directory exists, create if needed"""
    Path(directory).mkdir(parents=True, exist_ok=True)

def format_response(data, message="Success", status_code=200):
    """Format API response"""
    return {
        'status': 'success' if status_code < 400 else 'error',
        'message': message,
        'data': data
    }, status_code
