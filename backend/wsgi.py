from app import create_app
from app.config import DevelopmentConfig

flask_app = create_app(DevelopmentConfig)
celery_app = flask_app.extensions['celery']

import watchfiles  # noqa
import psycopg2  # noqa