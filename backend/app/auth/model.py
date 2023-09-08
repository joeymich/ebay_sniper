import uuid
import datetime

from sqlalchemy import Column, Text, String, Boolean, DateTime, UUID, ForeignKey
from sqlalchemy.orm import relationship

from app import db


class User(db.Model):
    __tablename__ = 'user'
    
    # basic user info
    # id = Column(String(36), primary_key=True, default=str(uuid.uuid4()), unique=True, index=True)
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    email = Column(String(254), unique=True, index=True, nullable=True)
    password = Column(Text, nullable=True) # no idea how long
    email_verified = Column(Boolean, default=False, nullable=False)
    
    # verification code
    verification_code = Column(String(8), nullable=True)
    verification_code_expiration = Column(DateTime)
    
    # notification email data
    notification_email = Column(String(345))
    notification_email_verified = Column(Boolean, default=False, nullable=False)
    
    # google oauth data
    is_google_oauth = Column(Boolean, default=False)
    google_sub = Column(String(255), unique=True, index=True) # no idea how long
    
    # ebay oauth data
    # is_ebay_oauth = Column(Boolean, default=False)
    ebay_user_id = Column(String(255), unique=True, index=True) # no idea how long
    ebay_username = Column(String(255), unique=True) # no idea how long
    ebay_refresh_token = Column(String(255)) # no idea how long
    
    ebay_accounts = relationship('EbayAccount', backref='owner')
    
    # snipes
    snipes = relationship('Snipe', backref='owner')
    
    # time data
    created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    deleted_at = Column(DateTime)
    
    def __repr__(self):
        return f'<User {self.id}'
    
    
class EbayAccount(db.Model):
    __tablename__ = 'ebay_account'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ebay_user_id = Column(String(255))
    ebay_username = Column(String(255))
    ebay_refresh_token = Column(String(255))
    
    user_id = Column(UUID, ForeignKey('user.id', ondelete='cascade'))
    