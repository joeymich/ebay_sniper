from flask import Blueprint

snipe = Blueprint('snipe', __name__)

from . import model, routes  # noqa
