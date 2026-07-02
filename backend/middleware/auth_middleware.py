# Authentication Middleware
# Middleware for protecting routes that require authentication

from functools import wraps
from flask import request, jsonify
import os
import jwt

SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')

def token_required(fn):
    """Decorator to protect routes with JWT authentication"""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # Extract token from Authorization header
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.replace('Bearer ', '') if auth_header else None
        
        if not token:
            return jsonify({'error': 'Authorization token is missing'}), 401
        
        try:
            # Verify and decode token
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            request.user_id = payload['user_id']
            return fn(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
        except Exception as e:
            return jsonify({'error': 'Token verification failed'}), 401
    
    return wrapper


def validate_input(fn):
    """Decorator to validate user input"""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        data = request.get_json(silent=True) or {}
        request.validated_data = {k: str(v).strip() for k, v in data.items()}
        return fn(*args, **kwargs)
    
    return wrapper
