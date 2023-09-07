from flask import Flask
from celery import Celery, Task
from werkzeug.exceptions import HTTPException

from app.extensions import db, migrate, ma, sess, limiter, mail, bcrypt, cors
from app.config import BaseConfig, DevelopmentConfig
from app.auth import auth
from app.oauth import oauth
from app.snipe import snipe
from app.ebay_test import ebay_test


def create_app(config: BaseConfig = DevelopmentConfig) -> Flask:
    app = Flask(__name__)
    
    app.config.from_object(config)
        
    register_extensions(app)
    register_blueprints(app)
    register_error_handlers(app)
    
    with app.app_context():
        db.create_all()
            
    return app


def register_extensions(app: Flask) -> None:
    celery_init_app(app)
    db.init_app(app)
    # migrate.init_app(app, db)
    ma.init_app(app)
    sess.init_app(app)
    limiter.init_app(app)
    mail.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)
    
    
def register_blueprints(app: Flask) -> None:
    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(oauth, url_prefix='/oauth')
    app.register_blueprint(snipe, url_prefix='/snipe')
    app.register_blueprint(ebay_test, url_prefix='/ebay_test')


def register_error_handlers(app: Flask) -> None:
    @app.errorhandler(HTTPException)
    def handle_too_many_requests(e: HTTPException):
        return {
            'code': e.code,
            'name': e.name,
            'description': e.description,
        }, e.code


def celery_init_app(app: Flask) -> Celery:
    class FlaskTask(Task):
        def __call__(self, *args: object, **kwargs: object) -> object:
            with app.app_context():
                return self.run(*args, **kwargs)
    
    celery_app = Celery(app.name, task_cls=FlaskTask)
    celery_app.config_from_object(app.config['CELERY'])
    celery_app.set_default()
    app.extensions['celery'] = celery_app        
    return celery_app
