from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_session import Session
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_mail import Mail
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_cors import CORS


db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()
sess = Session()
limiter = Limiter(key_func=get_remote_address)
mail = Mail()
bcrypt = Bcrypt()
cors = CORS(supports_credentials=True)
