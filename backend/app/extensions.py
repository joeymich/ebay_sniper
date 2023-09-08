from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_session import Session
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_mail import Mail
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import MetaData

CONVENTION = {
  "ix": "ix_%(column_0_label)s",
  "uq": "uq_%(table_name)s_%(column_0_name)s",
  "ck": "ck_%(table_name)s_%(constraint_name)s",
  "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
  "pk": "pk_%(table_name)s"
}

db = SQLAlchemy(metadata=MetaData(naming_convention=CONVENTION))
migrate = Migrate(compare_type=True)
ma = Marshmallow()
sess = Session()
limiter = Limiter(key_func=get_remote_address)
mail = Mail()
bcrypt = Bcrypt()
cors = CORS(supports_credentials=True)
