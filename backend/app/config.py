import os
from pathlib import Path

from redis import Redis


r = Redis('redis', 6379)
BASE_DIR = Path(__file__).parent.parent


class BaseConfig():
    
    SECRET_KEY = os.environ.get('SECRET_KEY', 'super-secret')
    
    SESSION_COOKIE_SAMESITE = 'None'
    SESSION_COOKIE_SECURE = True
    
    # Flask-Session
    SESSION_TYPE = 'redis'
    SESSION_REDIS = r
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    
    # Flask-SQLAlchemy
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', f'sqlite:///{BASE_DIR}/db.sqlite3')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://postgres:postgres@db/postgres')
    
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
    
    # OAuth 2.0
    OAUTH2_PROVIDERS = dict(
        # eBay OAuth 2.0 documentation:
        # https://developer.ebay.com/api-docs/static/oauth-authorization-code-grant.html
        ebay = dict(
            client_id = os.environ.get('EBAY_CLIENT_ID'),
            client_secret = os.environ.get('EBAY_CLIENT_SECRET'),
            authorize_url = 'https://auth.ebay.com/oauth2/authorize',
            token_url = 'https://api.ebay.com/identity/v1/oauth2/token',
            userinfo = dict(
                url = 'https://apiz.ebay.com/commerce/identity/v1/user',
                email = lambda json: json['individualAccount']['email'] if json['accountType'] == 'INDIVIDUAL' else json['businessAccount'],
            ),
            # authorize_url = 'https://auth.sandbox.ebay.com/oauth2/authorize',
            # token_url = 'https://api.sandbox.ebay.com/identity/v1/oauth2/token',
            # userinfo = dict(
            #     url = 'https://apiz.sandbox.ebay.com/commerce/identity/v1/user',
            #     email = lambda json: json['individualAccount']['email'] if json['accountType'] == 'INDIVIDUAL' else json['businessAccount'],
            # ),
            scopes = [
                'https://api.ebay.com/oauth/api_scope',
                'https://api.ebay.com/oauth/api_scope/commerce.identity.readonly',
                # 'https://api.ebay.com/oauth/api_scope/buy.offer.auction',
            ],
            # scopes = [
            #     # view public data from eBay
            #     'https://api.ebay.com/oauth/api_scope',
            #     # search and view eBay product catalog information
            #     'https://api.ebay.com/oauth/api_scope/commerce.catalog.readonly',
            #     # view and manage bidding activities for auctions
            #     'https://api.ebay.com/oauth/api_scope/buy.offer.auction',
            #     # view a user's basic information, such as username or business account details, from their eBay member account
            #     'https://api.ebay.com/oauth/api_scope/commerce.identity.readonly',
            #     # view a user's personal email information from their eBay member account
            #     'https://api.ebay.com/oauth/api_scope/commerce.identity.email.readonly',
            # ],
            redirect_uri = os.environ.get('EBAY_REDIRECT_URI'),
        ),
        # Google OAuth 2.0 documentation:
        # https://developers.google.com/identity/protocols/oauth2/web-server
        google = dict(
            client_id = os.environ.get('GOOGLE_CLIENT_ID'),
            client_secret = os.environ.get('GOOGLE_CLIENT_SECRET'),
            authorize_url = 'https://accounts.google.com/o/oauth2/auth',
            token_url = 'https://accounts.google.com/o/oauth2/token',
            userinfo = dict(
                url = 'https://www.googleapis.com/oauth2/v3/userinfo',
                email = lambda json: json['email'],
            ),
            scopes = [
                'https://www.googleapis.com/auth/userinfo.email',
            ],
        )
    )


class TestingConfig(BaseConfig):
    pass


class ProductionConfig(BaseConfig):
    pass
