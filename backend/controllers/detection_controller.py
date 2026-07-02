# Detection Controller
# Handles image and video detection requests

from flask import request, jsonify
from services.detection_service import DetectionService
from pathlib import Path
import os

detection_service = DetectionService()
UPLOAD_DIR = Path(__file__).resolve().parent.parent / 'uploads'
UPLOAD_DIR.mkdir(exist_ok=True)

detection_history = []  # In-memory storage (replace with PostgreSQL)

class DetectionController:
    """Controller for handling detection endpoints"""
    
    @staticmethod
    def detect_image(user_id):
        """Detect if an uploaded image is deepfake or real"""
        file = request.files.get('file')
        
        if not file:
            return jsonify({'error': 'No file uploaded'}), 400
        
        # Save file
        filename = f"{user_id}_{file.filename}"
        save_path = UPLOAD_DIR / filename
        file.save(save_path)
        
        # Run detection
        result = detection_service.detect_image(str(save_path))
        
        # Store in history
        detection_history.append({
            'id': len(detection_history) + 1,
            'user_id': user_id,
            'filename': filename,
            'file_type': 'image',
            'prediction': result['prediction'],
            'confidence': result['confidence'],
            'processing_time': result['processing_time']
        })
        
        return jsonify(result), 200
    
    @staticmethod
    def detect_video(user_id):
        """Detect if an uploaded video is deepfake or real"""
        file = request.files.get('file')
        
        if not file:
            return jsonify({'error': 'No file uploaded'}), 400
        
        # Save file
        filename = f"{user_id}_{file.filename}"
        save_path = UPLOAD_DIR / filename
        file.save(save_path)
        
        # Run detection
        result = detection_service.detect_video(str(save_path))
        
        # Store in history
        detection_history.append({
            'id': len(detection_history) + 1,
            'user_id': user_id,
            'filename': filename,
            'file_type': 'video',
            'prediction': result['prediction'],
            'confidence': result['confidence'],
            'processing_time': result['processing_time']
        })
        
        return jsonify(result), 200
    
    @staticmethod
    def get_history(user_id):
        """Get detection history for user"""
        user_history = [item for item in detection_history if item['user_id'] == user_id]
        return jsonify(user_history), 200
    
    @staticmethod
    def delete_history(user_id, history_id):
        """Delete a history entry"""
        global detection_history
        
        item = next((h for h in detection_history if h['id'] == history_id and h['user_id'] == user_id), None)
        
        if not item:
            return jsonify({'error': 'History entry not found'}), 404
        
        detection_history = [h for h in detection_history if h['id'] != history_id]
        return jsonify({'message': 'History entry deleted'}), 200
