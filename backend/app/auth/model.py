import uuid
import datetime

from sqlalchemy import Column, Text, String, Boolean, DateTime

from app import db


class User(db.Model):
    __tablename__ = 'user'
    
    # basic user info
    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()), unique=True, index=True)
    email = db.Column(db.String(254), unique=True, index=True, nullable=True)
    password = db.Column(db.Text, nullable=True) # no idea how long
    email_verified = db.Column(db.Boolean, default=False, nullable=False)
    
    # verification code
    verification_code = db.Column(db.String(8), nullable=True)
    verification_code_expiration = db.Column(db.DateTime)
    
    # notification email data
    notification_email = db.Column(db.String(345))
    notification_email_verified = db.Column(db.Boolean, default=False, nullable=False)
    
    # google oauth data
    is_google_oauth = db.Column(db.Boolean, default=False)
    google_sub = db.Column(db.String(255), unique=True, index=True) # no idea how long
    
    # ebay oauth data
    is_ebay_oauth = db.Column(db.Boolean, default=False)
    ebay_user_id = db.Column(db.String(255), unique=True, index=True) # no idea how long
    
    ebay_refresh_token = db.Column(db.String(255)) # no idea how long
    
    # time data
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    deleted_at = db.Column(db.DateTime)
    
    def __repr__(self):
        return f'<User {self.id}'
    