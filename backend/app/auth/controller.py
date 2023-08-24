from flask import session
from werkzeug.exceptions import Conflict, Unauthorized

from app.utils import validate_request_body
from app.extensions import bcrypt, db
from app.auth import auth
from app.auth.model import User
from app.auth.schema import SignUpRequestSchema, SignUpResponseSchema, LogInRequestSchema, LogInResponseSchema
from app.decorators import session_required


@auth.route('/signup', methods=['POST'])
def signup():
    
    data = validate_request_body(SignUpRequestSchema())
    
    email = data.get('email')
    password = data.get('password')
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    user_exists = User.query.filter_by(email=email).first() is not None
    
    if user_exists:
        raise Conflict('A user with this email already exists.')
    
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session['user_id'] = new_user.id
    
    return SignUpRequestSchema().dump(new_user)


@auth.route('/login', methods=['POST'])
def login():
    
    data = validate_request_body(LogInRequestSchema())
    
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
        
    if user is None or not bcrypt.check_password_hash(user.password, password):
        raise Unauthorized('Log in info is incorrect.')
    
    session['user_id'] = user.id
    
    return LogInResponseSchema().dump(user)


@auth.route('/logout', methods=['DELETE'])
@session_required
def logout():
    session.pop('user_id')
    return {
        'message': 'Successfully logged out.'
    }


@auth.route('/protected', methods=['GET'])
@session_required
def protected():
    return {}


@auth.route('/resend', methods=['GET'])
def resend():
    pass


@auth.route('/reset-link', methods=['GET'])
def reset_link():
    pass
