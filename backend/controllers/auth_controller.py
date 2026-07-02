# Authentication Controller
# Handles user registration and login requests

from flask import request, jsonify
from services.auth_service import AuthService

auth_service = AuthService()
users_db = []  # In-memory user store (replace with PostgreSQL)

class AuthController:
    """Controller for handling authentication endpoints"""
    
    @staticmethod
    def register():
        """Register a new user"""
        data = request.get_json(silent=True) or {}
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        # Validation
        if not email or not password or len(password) < 6:
            return jsonify({'error': 'Email and password (min 6 chars) required'}), 400
        
        # Check if user exists
        if any(user['email'] == email for user in users_db):
            return jsonify({'error': 'User already exists'}), 400
        
        # Create new user
        user = {
            'id': len(users_db) + 1,
            'name': name or 'User',
            'email': email,
            'password': auth_service.hash_password(password)
        }
        users_db.append(user)
        
        # Generate token
        token = auth_service.create_token(user)
        
        return jsonify({
            'token': token,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email']
            }
        }), 201
    
    @staticmethod
    def login():
        """Authenticate and log in a user"""
        data = request.get_json(silent=True) or {}
        
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({'error': 'Email and password required'}), 400
        
        # Find user
        user = next((u for u in users_db if u['email'] == email), None)
        
        if not user or not auth_service.verify_password(user['password'], password):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Generate token
        token = auth_service.create_token(user)
        
        return jsonify({
            'token': token,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email']
            }
        }), 200
    
    @staticmethod
    def logout():
        """Logout user (token invalidation handled on client)"""
        return jsonify({'message': 'Logged out successfully'}), 200
