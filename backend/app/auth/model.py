import uuid
import datetime

from sqlalchemy import Column, Text, String, Boolean, DateTime

from app import db


class User(db.Model):
    __tablename__ = 'user'
    
    # basic user info
    id = Column(String(36), primary_key=True, default=str(uuid.uuid4()), unique=True, index=True)
    email = Column(String(254), unique=True, index=True, nullable=True)
    password = Column(Text, nullable=True) # no idea how long
    email_verified = Column(Boolean, default=False, nullable=False)
    
    # notification email data
    notification_email = Column(String(345))
    notification_email_verified = Column(Boolean, default=False, nullable=False)
    
    # google oauth data
    is_google_oauth = Column(Boolean, default=False)
    google_sub = Column(String(255), unique=True, index=True) # no idea how long
    
    # ebay oauth data
    is_ebay_oauth = Column(Boolean, default=False)
    ebay_user_id = Column(String(255), unique=True, index=True) # no idea how long
    
    ebay_refresh_token = Column(String(255)) # no idea how long
    
    # time data
    created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    deleted_at = Column(DateTime)
    
    def __repr__(self):
        return f'<User {self.id}'
    