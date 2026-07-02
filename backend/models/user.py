# User Model
# Defines the user data structure and related operations

class User:
    """User model for authentication and profile management"""
    
    def __init__(self, id, name, email, password):
        self.id = id
        self.name = name
        self.email = email
        self.password = password
        self.created_at = None
    
    def to_dict(self):
        """Convert user to dictionary (for JSON responses)"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at
        }
