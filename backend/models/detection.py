# Detection Model
# Defines the detection history data structure

class DetectionHistory:
    """Model for storing detection results"""
    
    def __init__(self, id, user_id, filename, file_type, prediction, confidence, processing_time):
        self.id = id
        self.user_id = user_id
        self.filename = filename
        self.file_type = file_type  # 'image' or 'video'
        self.prediction = prediction  # 'Real' or 'Fake'
        self.confidence = confidence
        self.processing_time = processing_time
        self.created_at = None
    
    def to_dict(self):
        """Convert to dictionary for JSON responses"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'filename': self.filename,
            'file_type': self.file_type,
            'prediction': self.prediction,
            'confidence': self.confidence,
            'processing_time': self.processing_time,
            'created_at': self.created_at
        }
