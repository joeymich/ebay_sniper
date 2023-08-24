import os
from pathlib import Path

from redis import Redis


r = Redis('redis', 6379)
BASE_DIR = Path(__file__).parent.parent


class BaseConfig():
    
    SECRET_KEY = os.environ.get('SECRET_KEY', 'super-secret')
    SESSION_COOKIE_SECURE = True
    
    # Flask-Session
    SESSION_TYPE = 'redis'
    SESSION_REDIS = r
    
    # Flask-SQLAlchemy
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', f'sqlite:///{BASE_DIR}/db.sqlite3')
    
    # Celery
    CELERY = dict(
        broker_url=os.environ.get('BROKER_URL', 'redis://redis:6379/0'),
        result_backend=os.environ.get('RESULT_BACKEND', 'redis://redis:6379/0'),
        task_ignore_result=True,
    )
    
    # Flask-Mail
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = os.environ.get('MAIL_PORT', 465)
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_USE_SSL = True


class DevelopmentConfig(BaseConfig):
    DEBUG = True


class TestingConfig(BaseConfig):
    pass


class ProductionConfig(BaseConfig):
    pass
