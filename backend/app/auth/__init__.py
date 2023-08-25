from flask import Blueprint

auth = Blueprint('auth', __name__)

from . import model, routes  # noqa
