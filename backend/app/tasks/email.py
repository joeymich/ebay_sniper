from celery import shared_task
from flask_mail import Message

from app.extensions import mail


@shared_task
def send_verification_email(user_email, otc):
    message = Message(
        'Jacob\'s App - Verify your email',
        sender='jacobimmich@gmail.com',
        recipients=[user_email],
        body=f'Please use the following one-time code to verify your email address: {otc}',
    )
    mail.send(message)
    