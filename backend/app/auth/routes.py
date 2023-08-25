import random
import math
from datetime import datetime, timedelta

from flask import session
from werkzeug.exceptions import Conflict, Unauthorized

from app.utils import validate_request_body
from app.extensions import bcrypt, db
from app.auth import auth
from app.auth.model import User
from app.auth.schema import SignUpRequestSchema, SignUpResponseSchema, LogInRequestSchema, LogInResponseSchema
from app.decorators import session_required

from app.tasks import send_verification_email


def generate_otc(n: int = 6) -> str:
    return ''.join([str(math.floor(random.random() * 10)) for i in range(n)])


@auth.route('/signup', methods=['POST'])
def signup():
    
    data = validate_request_body(SignUpRequestSchema())
    
    email = data.get('email')
    password = data.get('password')
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    user_exists = User.query.filter_by(email=email).first() is not None
    
    if user_exists:
        raise Conflict('A user with this email already exists.')
    
    new_user = User(email=email, password=hashed_password, verification_code=generate_otc(), verification_code_expiration=datetime.utcnow() + timedelta(minutes=15))
    
    task = send_verification_email.delay(new_user.email, new_user.verification_code)
    
    db.session.add(new_user)
    db.session.commit()
    
    session['user_id'] = new_user.id
    
    return SignUpResponseSchema().dump(new_user)


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
@session_required
def resend():
    user = User.query.filter_by(id=session.get('user_id')).first()
    if datetime.utcnow() > user.verification_code_expiration:
        user.verification_code = generate_otc()
        user.verification_code_expiration = datetime.utcnow() + timedelta(minutes=15)
        db.session.commit()
        task = send_verification_email.delay(user.email, user.verification_code)
    else:
        task = send_verification_email.delay(user.email, user.verification_code)
    return {
        'task_id': task.task_id
    }


@auth.route('/user')
@session_required
def user():
    user_id = session.get('user_id')
    user = User.query.filter_by(id=user_id).first()
    return {
        'email': user.email,
        'created_at': user.created_at,
        'email_verified': user.email_verified,
    }


@auth.route('/verify/<token>')
@session_required
def confirm(token):
    # token 6 digit code
    user_id = session.get('user_id')
    user = User.query.filter_by(id=user_id).first()
    
    if user.verification_code != token:
        raise Unauthorized('One time code incorrect.')
    
    if user.verification_code_expiration < datetime.utcnow():
        raise Unauthorized('One time code expired.')
    
    user.email_verified = True
    db.session.commit()
    
    return {
        'message': 'Email confirmed.',
        'time left': str(user.verification_code_expiration - datetime.utcnow()),
    }


@auth.route('/reset-link', methods=['GET'])
def reset_link():
    pass
