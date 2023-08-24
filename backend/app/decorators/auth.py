import functools

from flask import session
from werkzeug.exceptions import Unauthorized

from app.auth.model import User


def session_required(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        user_id = session.get('user_id')
        
        if user_id is None:
            raise Unauthorized('Not logged in.')
        
        user = User.query.filter_by(id=user_id).first()
        
        if user is None:
            raise Unauthorized('Not logged in.')
        
        response = f(*args, **kwargs)
        return response
    
    return wrapper
