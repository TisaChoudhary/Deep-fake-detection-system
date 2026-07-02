# Authentication Service
# Handles user registration, login, and JWT token generation

from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os

class AuthService:
    """Service for handling authentication"""
    
    def __init__(self, secret_key=None):
        self.secret_key = secret_key or os.getenv('SECRET_KEY', 'dev-secret-key')
    
    def hash_password(self, password):
        """Hash a password for secure storage"""
        return generate_password_hash(password)
    
    def verify_password(self, hashed_password, password):
        """Verify a password against a hash"""
        return check_password_hash(hashed_password, password)
    
    def create_token(self, user):
        """Create JWT token for authenticated user"""
        payload = {
            'user_id': user['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        return jwt.encode(payload, self.secret_key, algorithm='HS256')
    
    def verify_token(self, token):
        """Verify and decode JWT token"""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
